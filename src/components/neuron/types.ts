/* eslint-disable @typescript-eslint/no-explicit-any */

export class Integer extends Number {
    constructor(value: number) {
      super(Math.trunc(value));
    }
  
    override valueOf(): number {
      return super.valueOf();
    }
}
  
export class Float extends Number {
    constructor(value: number) {
      super(value);
    }
  
    override valueOf(): number {
      return super.valueOf();
    }
  
    override toString(radix?: number): string {
      // use the normal Number.prototype.toString
      const s = super.toString(radix);
      // only for base-10 (or default); you could extend for other radix if needed
      if ((radix === undefined || radix === 10) && !s.includes('.')) {
        return `${s}.0`;
      }
      return s;
    }
}

(String.prototype as any).interpolate = function(params: Record<string, any>) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    console.log(names, vals);
    console.log(vals.map(v => v.toString()));
    return new Function(...names, `return \`${this}\`;`)(...vals.map(v => v.toString()));
};

(Array.prototype as any).uniforms = function<T>(
    baseName: string,
    values: readonly T[]
  ): Record<string, T> {
    return Object.fromEntries(
      values.map((v, i) => ([ `${baseName}[${i}]`, v ]))
    )
};

export type Position = {
    x: number
    y: number
};

export const defaultPosition: Position = { x: 0, y: 0 };

export type Angles = {
    yaw: number
    pitch: number
};

export const defaultAngles: Angles = { yaw: 45, pitch: 45 };

export type Vec3 = [number, number, number];