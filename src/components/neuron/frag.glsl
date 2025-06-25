precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float yaw;
uniform float pitch;

#define BRANCH_COUNT ${BRANCH_COUNT}
#define SPHERE_RADIUS ${SPHERE_RADIUS}
#define BRANCH_LENGTH ${BRANCH_LENGTH}
#define MIN_BRANCH_RAD ${MIN_BRANCH_RAD}
#define MAX_BRANCH_RAD ${MAX_BRANCH_RAD}
#define MAX_STEPS ${MAX_STEPS}
#define EPSILON ${EPSILON}
#define FAR_CLIP ${FAR_CLIP}

uniform vec3 branchDirs[BRANCH_COUNT];
uniform float bumpPos[BRANCH_COUNT];

float hash12(float x) {
    return fract(sin(x*12.9898)*43758.5453);
}

float mapSphere(vec3 p){
    return length(p) - SPHERE_RADIUS;
}

// returns the signed distance to the union of all your branch‐cylinders
float mapBranches(vec3 p){
    float d = 1e5;
    for(int i=0; i<BRANCH_COUNT; i++){
        vec3 dir = branchDirs[i];
        float t = dot(p, dir);
        float cycle = BRANCH_LENGTH - SPHERE_RADIUS;
        float wrapped = mod(t - SPHERE_RADIUS, cycle);
        float tc = wrapped + SPHERE_RADIUS;
        vec3 q  = p - dir*tc;

        float u = (tc - SPHERE_RADIUS) / cycle;
        float taper = smoothstep(0.0, 1.0, 1.0 - u*10.5);
        float bumpWidth = 0.2;
        float bpos = bumpPos[i];
        float bump = smoothstep(bpos - bumpWidth, bpos, u)
                   - smoothstep(bpos, bpos + bumpWidth, u);
        float noise = sin(u*12.0 + hash12(float(i))*6.28)*0.1;
        float rad = mix(MIN_BRANCH_RAD, MAX_BRANCH_RAD, taper)
                    * (1.0 + bump*0.6 + noise);

        float cd = length(q) - rad;
        d = min(d, cd);
        if (d < EPSILON) break;  // early-out
    }
    return d;
}

float rayMarchWithOcclusion(vec3 ro, vec3 rd) {
    float t = 0.0;
    bool hitBranch = false;
    
    for(int i=0; i<MAX_STEPS; i++){
        vec3 pos = ro + rd*t;
        
        float dSphere = mapSphere(pos);
        float dBranch = mapBranches(pos);
        
        // If we're inside or very close to the sphere, we're occluded
        if(dSphere < EPSILON) {
            return -1.0; // Occluded by sphere
        }
        
        // If we hit a branch
        if(dBranch < EPSILON) {
            hitBranch = true;
            break;
        }
        
        // Step by the minimum distance
        float d = min(dSphere, dBranch);
        t += d;
        
        if(t > FAR_CLIP) {
            return -1.0; // Missed everything
        }
    }
    
    return hitBranch ? t : -1.0;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5*resolution) / resolution.y;

    // base camera
    vec3 ro = vec3(2.0, 0.0, 6.0);
    vec3 rd = normalize(vec3(uv, -1.5));

    // apply grabbed + auto-spin rotations
    mat3 Mpitch = mat3(
        1.,0.,0.,
        0.,cos(pitch),-sin(pitch),
        0.,sin(pitch), cos(pitch)
    );
    mat3 Myaw = mat3(
        cos(yaw),0.,sin(yaw),
        0.,1.,0.,
        -sin(yaw),0.,cos(yaw)
    );
    float a = time * 0.2;
    mat3 Mauto = mat3(
        cos(a),0.,sin(a),
        0.,1.,0.,
        -sin(a),0.,cos(a)
    );

    mat3 M = Mauto * Myaw * Mpitch;
    ro = M * ro;
    rd = M * rd;

    float t = rayMarchWithOcclusion(ro, rd);
    
    if(t < 0.0) {
        // Either hit sphere or missed everything
        gl_FragColor = vec4(0.0);
    } else {
        // Hit a branch and it's not occluded
        gl_FragColor = vec4(1.0);
    }
}