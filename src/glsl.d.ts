// Declare module for .glsl files to allow importing them as strings
declare module '*.glsl' {
  const content: string & { interpolate(params: Record<string, unknown>): string; };
  export default content;
} 