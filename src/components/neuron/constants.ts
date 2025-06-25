import { Integer, Float } from './types';

// export const BRANCH_COUNT: Float   = new Float(10);
export const BRANCH_COUNT: Integer = new Integer(10);
export const SPHERE_RADIUS: Float  = new Float(1);
export const BRANCH_LENGTH: Float  = new Float(10);
export const MIN_BRANCH_RAD: Float = new Float(0.05);
export const MAX_BRANCH_RAD: Float = new Float(0.15);
export const MAX_STEPS: Integer    = new Integer(50);
export const EPSILON: Float        = new Float(0.01);
export const FAR_CLIP: Float       = new Float(10);

const constants = {
    BRANCH_COUNT,
    SPHERE_RADIUS,
    BRANCH_LENGTH,
    MIN_BRANCH_RAD,
    MAX_BRANCH_RAD,
    MAX_STEPS,
    EPSILON,
    FAR_CLIP,
}

export default constants;