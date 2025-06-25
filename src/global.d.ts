// Extend Array<T> with uniforms method for shader uniforms
export {}; // Ensure this file is treated as a module

declare global {
  interface Array<T> {
    uniforms(baseName: string, values: readonly T[]): Record<string, T>;
  }
} 