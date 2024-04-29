// Example utilities for basic transformation matrix operations

/**
 * Calculate a translate matrix
 * @param tx {number} Translation on axis x
 * @param [ty = 0] {number} Translation on axis y
 * @returns {Matrix} Affine Matrix
 */
export function translate(tx: number, ty = 0) {
  return {
    a: 1,
    c: 0,
    e: tx,
    b: 0,
    d: 1,
    f: ty,
  };
}

const { cos, sin, PI } = Math;
/**
 * Calculate a rotation matrix
 * @param angle {number} Angle in radians
 * @param [cx] {number} If (cx,cy) are supplied the rotate is about this point
 * @param [cy] {number} If (cx,cy) are supplied the rotate is about this point
 * @returns {Matrix} Affine Matrix
 */
export function rotate(angle: number, cx: any, cy: any) {
  const cosAngle = cos(angle);
  const sinAngle = sin(angle);
  const rotationMatrix = {
    a: cosAngle,
    c: -sinAngle,
    e: 0,
    b: sinAngle,
    d: cosAngle,
    f: 0,
  };
  if (isUndefined(cx) || isUndefined(cy)) {
    return rotationMatrix;
  }

  return transform([translate(cx, cy), rotationMatrix, translate(-cx, -cy)]);
}

export function transform(...matrices: any) {
  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;

  const multiply = (m1: any, m2: any) => {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b,
      d: m1.b * m2.c + m1.d * m2.d,
      f: m1.b * m2.e + m1.d * m2.f + m1.f,
    };
  };

  switch (matrices.length) {
    case 0:
      throw new Error("no matrices provided");

    case 1:
      return matrices[0];

    case 2:
      return multiply(matrices[0], matrices[1]);

    default: {
      const [m1, m2, ...rest] = matrices;
      const m = multiply(m1, m2);
      return transform(m, ...rest);
    }
  }
}

/**
 * Merge multiple matrices into one
 * @param matrices {...Matrix | Matrix[]} Matrices listed as separate parameters or in an array
 * @returns {Matrix} Affine Matrix
 */
export function compose(...matrices: any) {
  return transform(...matrices);
}

/**
 * Calculate a scaling matrix
 * @param sx {number} Scaling on axis x
 * @param [sy = sx] {number} Scaling on axis y (default sx)
 * @param [cx] {number} If (cx,cy) are supplied the scaling is about this point
 * @param [cy] {number} If (cx,cy) are supplied the scaling is about this point
 * @returns {Matrix} Affine Matrix
 */
export function scale(sx: number, sy = 0, cx = 0, cy = 0) {
  if (isUndefined(sy)) sy = sx;

  const scaleMatrix = {
    a: sx,
    c: 0,
    e: 0,
    b: 0,
    d: sy,
    f: 0,
  };

  if (isUndefined(cx) || isUndefined(cy)) {
    return scaleMatrix;
  }

  return transform([translate(cx, cy), scaleMatrix, translate(-cx, -cy)]);
}

export function isUndefined(val: any) {
  return typeof val === "undefined";
}
