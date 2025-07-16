import { Integer, Float } from './types';

// export const BRANCH_COUNT: Float   = new Float(10);
export const BRANCH_COUNT: Integer = new Integer(10);
export const SPHERE_RADIUS: Float  = new Float(0.5);
export const BRANCH_LENGTH: Float  = new Float(10);
export const MIN_BRANCH_RAD: Float = new Float(0.02);
export const MAX_BRANCH_RAD: Float = new Float(0.10);
export const MAX_STEPS: Integer    = new Integer(100);
export const EPSILON: Float        = new Float(0.001);
export const FAR_CLIP: Float       = new Float(10);
export const THIN_START: Float     = new Float(0.0);
export const THIN_END: Float       = new Float(0.1);

const constants = {
    BRANCH_COUNT,
    SPHERE_RADIUS,
    BRANCH_LENGTH,
    MIN_BRANCH_RAD,
    MAX_BRANCH_RAD,
    MAX_STEPS,
    EPSILON,
    FAR_CLIP,
    THIN_START,
    THIN_END,
}

export default constants;