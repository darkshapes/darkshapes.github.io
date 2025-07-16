"use client"

import React, { useRef, useEffect } from 'react';
import REGL from 'regl';

import constants from '@/components/neuron/constants';
import { defaultPosition, defaultAngles, Position, Angles, Vec3 } from '@/components/neuron/types';
import { Container } from '@/components/neuron/styles';

import frag from '@/components/neuron/frag.glsl';
import vert from '@/components/neuron/vert.glsl';

const length = constants.BRANCH_COUNT as number;

const branchDirs = Array.from({ length }, (_, i) => {
  const fi = i
  const z   = 1 - 2 * (fi + 0.5) / length
  const rxy = Math.sqrt(Math.max(0, 1 - z * z))
  const theta = fi * (3 - Math.sqrt(5)) * Math.PI
  return [ Math.cos(theta) * rxy, 
           Math.sin(theta) * rxy, 
           z
         ] as Vec3
})

const bumpPos = Array.from({ length }, () => Math.random())

const Neuron = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // dragging state
  const dragging            = useRef(false)
  const startPosition       = useRef<Position>(defaultPosition)
  const currentPosition     = useRef<Position>(defaultPosition)
  const baseAngles          = useRef<Angles>(defaultAngles)
  const startAngles         = useRef<Angles>(defaultAngles)

  // normalize mouse event into [0..1]
  const normalize = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return defaultPosition;
    const x = (e.clientX - rect.left) / rect.width
    const y = 1 - (e.clientY - rect.top) / rect.height
    return {x, y} as Position
  }

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return

    // mouse event handlers
    const onDown = (e: MouseEvent) => {
      dragging.current = true
      startPosition.current = normalize(e)
      currentPosition.current = normalize(e)
      startAngles.current = { ...baseAngles.current }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup',   onUp)
    }

    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      currentPosition.current = normalize(e)
    }

    const onUp = () => {
      dragging.current = false
      // commit the drag delta into baseAngles
      const dx = currentPosition.current.x - startPosition.current.x
      const dy = currentPosition.current.y - startPosition.current.y
      baseAngles.current.yaw   = startAngles.current.yaw   + dx * Math.PI
      baseAngles.current.pitch = startAngles.current.pitch + dy * Math.PI
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }

    const canvas = canvasRef.current
    canvas.addEventListener('mousedown', onDown)

    // initialize regl at full device resolution
    const supersample = 1
    const regl = REGL({
      canvas,
      attributes: { antialias: true },
      pixelRatio: window.devicePixelRatio * supersample
    })

    const resizeBuffer = () => {
        const cw = canvas.clientWidth
        const ch = canvas.clientHeight
  
        // compute target buffer size
        const w = Math.round(cw * window.devicePixelRatio * supersample)
        const h = Math.round(ch * window.devicePixelRatio * supersample)
  
        // only update if changed
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width  = w
          canvas.height = h
          regl.poll()      // tells regl to update viewport & uniforms
        }
    }

    resizeBuffer()
    const ro = new ResizeObserver(resizeBuffer)
    ro.observe(canvas)
    window.addEventListener('resize', resizeBuffer)

    // one full‐screen triangle
    const drawScene = regl({
      vert,
      frag: frag.interpolate(constants),
      attributes: {
        position: regl.buffer([
          [-2, -2],
          [ 4, -2],
          [-2,  4],
        ])
      },
      uniforms: {
        time:      ({ time }: { time: number }) => time,
        resolution: ({ viewportWidth, viewportHeight }: { viewportWidth: number, viewportHeight: number }) => [
          viewportWidth,
          viewportHeight
        ],
        yaw:       () => {
          if (dragging.current) {
            const dx = currentPosition.current.x - startPosition.current.x
            return startAngles.current.yaw + dx * Math.PI
          }
          return baseAngles.current.yaw
        },
        pitch:     () => {
          if (dragging.current) {
            const dy = currentPosition.current.y - startPosition.current.y
            return startAngles.current.pitch + dy * Math.PI
          }
          return baseAngles.current.pitch
        },
        ...branchDirs.uniforms('branchDirs', branchDirs),
        ...bumpPos.uniforms('bumpPos', bumpPos),
      },
      count: 3
    })

    regl.frame(() => {
      regl.clear({ color: [0.0, 0.0, 0.0, 0.0], depth: 1 })
      drawScene()
    })

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resizeBuffer)
      canvas.removeEventListener('mousedown', onDown)
      regl.destroy()
    }
  }, [])

  return (
    <Container>
      <canvas ref={canvasRef} />
    </Container>
  )
}

export default Neuron;