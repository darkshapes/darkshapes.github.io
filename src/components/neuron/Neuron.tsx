/*
*/
"use client";

import React, {
  Suspense,
  useMemo,
  useRef,
  useLayoutEffect,
  useEffect,
  ReactNode,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ≈2.399 rad
const SPHERE_RADIUS = 1;

/**
 * Returns `n` almost‑uniformly distributed unit vectors on S²,
 * already rotated by a single random orientation.
 *
 * `jitter` (radians) adds *local* noise per vector, if desired.
 */
const fibonacciSphere = (
  n: number,
  jitter = 0.15,
  seedQuat: THREE.Quaternion | null = null,
) => {
  // One‑off random quaternion to rotate the whole cloud
  const globalQ =
    seedQuat ??
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ),
    );

  const dirs: THREE.Vector3[] = [];

  for (let i = 0; i < n; i++) {
    // Base Fibonacci position (north‑pole‑aligned frame)
    const y = 1 - (i + 0.5) * (2 / n);
    const r = Math.sqrt(1 - y * y);
    const phi = i * GOLDEN_ANGLE;

    const v = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);

    // Optional per‑vector jitter to break perfect symmetry
    if (jitter > 0) {
      const axis = new THREE.Vector3().randomDirection();
      v.applyAxisAngle(axis, (Math.random() - 0.5) * 2 * jitter);
    }

    // ***Apply the single random global rotation***
    v.applyQuaternion(globalQ).normalize();
    dirs.push(v);
  }

  return dirs;
}

/**
 * Creates a cylinder whose **base** is at y = 0 and whose tip is at y = 1.
 * The radius profile is:
 *   • Cubic flare until `thinStart` (bigger at the base, easing smoothly)
 *   • Linear taper toward the tip afterwards
 *
 * Because the geometry is generated once with `useMemo`, every dendrite still
 * shares the same vertex buffer → remains extremely friendly to low‑power GPUs.
 */
function useTaperedCylinder({
  flare = 1.5,
  thinStart = 0.15,
  radialSegments = 20,
  heightSegments = 100,
}: {
  flare?: number;
  thinStart?: number;
  radialSegments?: number;
  heightSegments?: number;
}) {
  return useMemo(() => {
    // 1‑unit tall, open‑ended cylinder, centred on origin at first
    const geo = new THREE.CylinderGeometry(
      1,   // top radius (will be scaled per‑vertex later)
      1,   // bottom radius
      1,   // height (we upscale per‑instance later)
      radialSegments,
      heightSegments,
      true,
    );

    // Translate upward so the **base** now sits on the object origin (0,0,0)
    geo.translate(0, 0.5, 0); // base → 0, tip → 1

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const y = arr[i + 1]; // already in 0 → 1 range
      let scale: number;

      if (y < thinStart) {
        // Cubic flare near the base
        const t = y / thinStart; // 0 → 1 inside flare zone
        scale = 1 + flare * Math.pow(1 - t, 3);
      } else {
        // Linear taper afterwards
        const v = (y - thinStart) / (1 - thinStart); // 0 → 1
        scale = 1 - v;
        scale = Math.max(scale, 0.02); // never collapse completely
      }

      arr[i] *= scale;       // x component
      arr[i + 2] *= scale;   // z component
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, [flare, thinStart, radialSegments, heightSegments]);
}

export function Spin({
  speedX = 0.15,   // rad s⁻¹
  speedY = 0.10,
  children,
}: {
  speedX?: number;
  speedY?: number;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speedX;
    ref.current.rotation.y += delta * speedY;
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * Renders a sphere with many dendritic spokes.
 * Each spoke is a single instanced tapered cylinder.
 */
const Dendrites = ({
  count = 64,
  length = 500,
  radius = 0.02,
  flare = 1.5,
  thinStart = 0.15,
  sphereRadius = 1,
  // optional tweakables ↓
  heightRange = [0.7, 1.3],   // min / max multiplier for length (y)
  thickRange  = [0.8, 1.25],  // min / max multiplier for radius (x & z)
}: {
  count?: number;
  length?: number;
  radius?: number;
  flare?: number;
  thinStart?: number;
  sphereRadius?: number;
  heightRange?: [number, number];
  thickRange?: [number, number];
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const taperedGeo = useTaperedCylinder({ flare, thinStart });

  /**  ---------- 1. one‑time random factors, stable across re‑renders ---------- */
  const scales = useMemo(() => {
    const [hMin, hMax] = heightRange;
    const [tMin, tMax] = thickRange;

    return Array.from({ length: count }, () => ({
      y: THREE.MathUtils.randFloat(hMin, hMax),        // height multiplier
      xz: THREE.MathUtils.randFloat(tMin, tMax),       // radius multiplier
    }));
  //  ❗️re‑compute only if the *amount* of instances changes
  }, [count, heightRange, thickRange]);

  /* tidy‑up */
  useEffect(() => () => taperedGeo.dispose(), [taperedGeo]);

  /**  ---------- 2. build matrices once geometry & random scales are ready ---------- */
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const dirs  = fibonacciSphere(count, /* jitter = */ 0.50);

    for (let i = 0; i < count; i++) {
      const dir     = dirs[i];
      const { y, xz } = scales[i];

      dummy.position.copy(dir).multiplyScalar(sphereRadius);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      dummy.scale.set(radius * xz, length * y, radius * xz); // ⬅️ randomised!
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, length, radius, sphereRadius, scales]);

  return (
    <instancedMesh ref={meshRef} args={[taperedGeo, undefined, count]}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

const Nucleus = ({ r = 1 }) => (
  <mesh renderOrder={0}>
    <sphereGeometry args={[r, 32, 16]} />
    <meshBasicMaterial
      opacity={0}           /* stays invisible               */
      colorWrite={false}    /* no colour written             */
      depthWrite={true}     /* but depth *is* written        */
      transparent={false}   /* ⬅️  crucial – treat as opaque */
      blending={THREE.NoBlending}
    />
  </mesh>
);

export function FrustumShift({ ratio = 0.26 }: { ratio?: number }) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    camera.setViewOffset(
      size.width,
      size.height,
      size.width * ratio, // (-) so the *scene* moves left
      0,
      size.width,
      size.height,
    );
    camera.updateProjectionMatrix();
    return () => camera.clearViewOffset?.();
  }, [camera, size, ratio]);

  return null;
}

const Neuron = () => (
  <Canvas
    /* Transparent background so only the geometry is visible */
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    camera={{ position: [0, 0, 4], near: 0.1, far: 2000 }}
    dpr={[1, 1.5]}
    style={{ width: "100%", height: "100%", background: "transparent" }}
  >
    <Suspense fallback={null}>
      <FrustumShift ratio={0.26} />

      <Spin speedX={-0.15} speedY={0.10}>
        <Nucleus r={SPHERE_RADIUS} />
        {/* tweak flare, thinStart, length & radius as you wish */}
        <Dendrites sphereRadius={SPHERE_RADIUS - 0.05} count={10} length={10} radius={0.025} flare={7} thinStart={0.1} />
      </Spin>

      <OrbitControls enablePan={false} enableZoom={false} enableDamping />
    </Suspense>
  </Canvas>
);

export default Neuron;