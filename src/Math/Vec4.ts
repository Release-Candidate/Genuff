// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vec4.ts
// Date:     25.Feb.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

import {
  Equal,
  Foldable,
  Functor,
  Ord,
  Show,
  ToString,
  VectorSpace,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

/**
 * A class of a 4 dimensional vector.
 *
 * Implements the following constraints:
 * * Functor
 * * Foldable
 * * Show
 * * ToString
 * * Equal
 * * Ord
 * * VectorField
 */
export class Vec4 // eslint-disable-next-line indent
  implements
    Functor<number, number, Vec4>,
    Foldable<{ value: number; name: string }>,
    Show,
    ToString,
    Equal,
    Ord,
    VectorSpace
{
  /**
   * Constructs a new 4 dimensional vector.
   *
   * @param v The values of the vector to construct.
   */
  constructor(private v: { x: number; y: number; z: number; w: number }) {}

  /**
   * Return a string representation of the vector.
   *
   * Usable for serialization.
   * May not be the same as `show`, which is suitable for printing to a console
   * or a log file.
   *
   * @returns A string representation of the vector.
   */
  toString(): string {
    return `{ x: ${this.v.x}, y: ${this.v.y}, z: ${this.v.z}, w: ${this.v.w} }`;
  }

  /**
   * Return a string representation of a vector suitable for logging or debug
   * output.
   *
   * May no be the same as `toString`, which is a representation suitable for
   * serialization.
   *
   * @returns A string representation of the vector suitable for debug or log
   * output.
   */
  show(): string {
    return `[ x: ${this.v.x}, y: ${this.v.y}, z: ${this.v.z}, w: ${this.v.w} ]`;
  }

  /**
   * Iterate through all elements of `this` and apply the function `f` to each
   * element.
   *
   * Implements `Types.Functor`.
   *
   * @param f The function to apply to each element of `this`.
   * @returns The mapped vector.
   */
  map(f: (e: number) => number): this {
    return new Vec4({
      x: f(this.v.x),
      y: f(this.v.y),
      z: f(this.v.z),
      w: f(this.v.w),
    }) as this;
  }

  /**
   * Reduce the vector to a scalar value.
   *
   * @param f The function to apply to each element of the vector
   * @param initialValue The starting value of the fold.
   * @returns The vector reduced to a single value.
   */
  reduce<S>(
    f: (acc: S, e: { value: number; name: string }) => S,
    initialValue: S
  ): S {
    const acc = f(initialValue, { value: this.v.x, name: "x" });
    const acc2 = f(acc, { value: this.v.y, name: "y" });
    const acc3 = f(acc2, { value: this.v.z, name: "z" });
    return f(acc3, { value: this.v.w, name: "w" });
  }

  /**
   * Convert the vector to an array.
   *
   * @returns The vector converted to an array.
   */
  toArray(): number[] {
    return [this.v.x, this.v.y, this.v.z, this.v.w];
  }

  // Implementation of Types.VectorField. ======================================

  /**
   * Add a vector to this vector.
   *
   * @param b The vector to add.
   * @returns The sum of both vectors
   */
  add(b: this): this {
    return new Vec4({
      x: this.v.x + b.v.x,
      y: this.v.y + b.v.y,
      z: this.v.z + b.v.z,
      w: this.v.w + b.v.w,
    }) as this;
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param b The vector to subtract.
   * @returns The sum of both vectors
   */
  subtract(b: this): this {
    return new Vec4({
      x: this.v.x - b.v.x,
      y: this.v.y - b.v.y,
      z: this.v.z - b.v.z,
      w: this.v.w - b.v.w,
    }) as this;
  }

  /**
   * Multiplicate each component of the vector by the given value.
   *
   * @param t The scalar value to multiply the vector with.
   * @returns The vector element wise multiplicated with the given value.
   */
  multScalar(t: number): this {
    return new Vec4({
      x: this.v.x * t,
      y: this.v.y * t,
      z: this.v.z * t,
      w: this.v.w * t,
    }) as this;
  }

  /**
   * Add the given scalar value to each component of the vector.
   *
   * @param t The scalar value to add to each component of the vector.
   * @returns The vector with the scalar added to it.
   */
  addScalar(t: number): this {
    return new Vec4({
      x: this.v.x + t,
      y: this.v.y + t,
      z: this.v.z + t,
      w: this.v.w + t,
    }) as this;
  }

  /**
   * Calculate the dot product (scalar product) of the two vectors.
   *
   * @param b The vector to calculate the dot product with.
   * @returns The dot product (scalar product) of both vectors.
   */
  dot(b: this): number {
    return (
      this.v.x * b.v.x + this.v.y * b.v.y + this.v.z * b.v.z + this.v.w * b.v.w
    );
  }

  /**
   * Calculate the cross product of the two vectors.
   *
   * Sets the 4th coordinate to 1.
   *
   * @param b The vector to calculate the cross product with.
   * @returns The cross product of both vectors.
   */
  cross(b: this): this {
    const x = this.v.y * b.v.z - this.v.z * b.v.y;
    const y = this.v.z * b.v.x - this.v.x * b.v.z;
    const z = this.v.x * b.v.y - this.v.y * b.v.x;
    return new Vec4({ x, y, z, w: 0 }) as this;
  }

  /**
   * Return a vector pointing in the same direction as this one with a length of
   * 1 (a unit vector).
   *
   * @returns The normalized vector. Returns a new vector, does not alter the
   * existing one.
   */
  normalize(): this {
    // eslint-disable-next-line no-magic-numbers
    const fac = 1.0 / this.length();
    return new Vec4({
      x: this.v.x * fac,
      y: this.v.y * fac,
      z: this.v.z * fac,
      w: this.v.w * fac,
    }) as this;
  }

  /**
   * Return the Euclidean norm of the vector.
   *
   * The same as `length()`.
   *
   * @returns The Euclidean norm of the vector.
   */
  norm(): number {
    return Math.sqrt(
      this.v.x * this.v.x +
        this.v.y * this.v.y +
        this.v.z * this.v.z +
        this.v.w * this.v.w
    );
  }

  /**
   * Return the length (Euclidean norm) of the vector.
   *
   * The same as `norm()`.
   *
   * Do not confuse with the number of elements of a vector, its `dimension()`.
   *
   * @returns The length of the vector.
   */
  length(): number {
    return Math.sqrt(
      this.v.x * this.v.x +
        this.v.y * this.v.y +
        this.v.z * this.v.z +
        this.v.w * this.v.w
    );
  }

  /**
   * The dimension of a two dimensional vector: 4
   *
   * @returns 3, the dimension of a 4 dimensional vector.
   */
  // eslint-disable-next-line class-methods-use-this
  dimension(): number {
    // eslint-disable-next-line no-magic-numbers
    return 4;
  }

  /**
   * Return the null vector, [0, 0, 0, 0].
   *
   * @returns The null vector, [0, 0, 0, 0].
   */
  // eslint-disable-next-line class-methods-use-this
  null(): this {
    return new Vec4({ x: 0, y: 0, z: 0, w: 0 }) as this;
  }

  // Implementation of Types.Equal. ============================================

  /**
   * Compare the two vectors for equality.
   *
   * Return `true`, if the vectors are equal (within the given `epsilon`).
   *
   * Do not use `Number.EPSILON` from JS, which is the smallest difference
   * between to consecutive numbers and does not work for comparisons.
   *
   * @param b The vector to compare against.
   * @param epsilon The accuracy of the comparison. Default is
   *                `Math/Math.EPSILON`, which should work for usual usage.
   * @returns `true`, if the two vectors are equal, `false` else.
   */
  equal(b: this, epsilon: number = EPSILON): boolean {
    const prop1 = Math.abs(this.v.x - b.v.x) < epsilon;
    const prop2 = Math.abs(this.v.y - b.v.y) < epsilon;
    const prop3 = Math.abs(this.v.z - b.v.z) < epsilon;
    const prop4 = Math.abs(this.v.w - b.v.w) < epsilon;
    return prop1 && prop2 && prop3 && prop4;
  }

  /**
   * Compare the two vectors for inequality.
   *
   * Return `false`, if the vectors are equal (within the given `epsilon`).
   *
   * Do not use `Number.EPSILON` from JS, which is the smallest difference
   * between to consecutive numbers and does not work for comparisons.
   *
   * @param b The vector to compare against.
   * @param epsilon The accuracy of the comparison. Default is
   *                `Math/Math.EPSILON`, which should work for usual usage.
   * @returns `false`, if the two vectors are equal, `true` else.
   */
  notEqual(b: this, epsilon: number = EPSILON): boolean {
    const prop1 = Math.abs(this.v.x - b.v.x) < epsilon;
    const prop2 = Math.abs(this.v.y - b.v.y) < epsilon;
    const prop3 = Math.abs(this.v.z - b.v.z) < epsilon;
    const prop4 = Math.abs(this.v.w - b.v.w) < epsilon;
    return !prop1 || !prop2 || !prop3 || !prop4;
  }

  // Implementation of Types.Ord. ==============================================

  /**
   * Compare two vectors, if `this <= b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v.lessOrEqual(w) === false` and
   * `w.lessOrEqual(v) === false` holds.
   *
   * Do not use `Number.EPSILON` from JS, which is the smallest difference
   * between to consecutive numbers and does not work for comparisons.
   *
   * @param b The vector to compare against.
   * @param epsilon  The accuracy of the comparison. Default is
   *                `Math/Math.EPSILON`, which should work for usual usage.
   * @returns `true` if this vector is less than or equal to b, `false` else
   *          (which does not mean that the opposite is true)
   */
  lessOrEqual(b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x < b.v.x || Math.abs(this.v.x - b.v.x) < epsilon;
    const prop2 = this.v.y < b.v.y || Math.abs(this.v.y - b.v.y) < epsilon;
    const prop3 = this.v.z < b.v.z || Math.abs(this.v.z - b.v.z) < epsilon;
    const prop4 = this.v.w < b.v.w || Math.abs(this.v.w - b.v.w) < epsilon;
    return prop1 && prop2 && prop3 && prop4;
  }

  /**
   * Compare two vectors, if `this >= b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v.biggerOrEqual(w) === false` and
   * `w.biggerOrEqual(v) === false` holds.
   *
   * Do not use `Number.EPSILON` from JS, which is the smallest difference
   * between to consecutive numbers and does not work for comparisons.
   *
   * @param b The vector to compare against.
   * @param epsilon  The accuracy of the comparison. Default is
   *                `Math/Math.EPSILON`, which should work for usual usage.
   * @returns `true` if this vector is bigger than or equal to b, `false` else
   *          (which does not mean that the opposite is true)
   */
  biggerOrEqual(b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x > b.v.x || Math.abs(this.v.x - b.v.x) < epsilon;
    const prop2 = this.v.y > b.v.y || Math.abs(this.v.y - b.v.y) < epsilon;
    const prop3 = this.v.z > b.v.z || Math.abs(this.v.z - b.v.z) < epsilon;
    const prop4 = this.v.w > b.v.w || Math.abs(this.v.w - b.v.w) < epsilon;
    return prop1 && prop2 && prop3 && prop4;
  }

  /**
   * Compare two vectors, if `this < b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v.lessThan(w) === false` and
   * `w.lessThan(v) === false` holds.
   *
   * @param b The vector to compare against.
   * @returns `true` if this vector is less than b, `false` else
   *          (which does not mean that the opposite is true)
   */
  lessThan(b: this): boolean {
    return (
      this.v.x < b.v.x &&
      this.v.y < b.v.y &&
      this.v.z < b.v.z &&
      this.v.w < b.v.w
    );
  }

  /**
   * Compare two vectors, if `this > b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v.biggerThan(w) === false` and
   * `w.biggerThan(v) === false` holds.
   *
   * @param b The vector to compare against.
   * @returns `true` if this vector is bigger than b, `false` else
   *          (which does not mean that the opposite is true)
   */
  biggerThan(b: this): boolean {
    return (
      this.v.x > b.v.x &&
      this.v.y > b.v.y &&
      this.v.z > b.v.z &&
      this.v.w > b.v.w
    );
  }

  /**
   * This vector field has a partial ordering, which means that not all vectors
   * can be compared against each other.
   */
  readonly isPartial = true;
}

/**
 * Unit vector in x direction ([1, 0, 0, 0]).
 */
export const unitX: Vec4 = new Vec4({ x: 1, y: 0, z: 0, w: 0 });

/**
 * Unit vector in y direction ([0, 1, 0, 0]).
 */
export const unitY: Vec4 = new Vec4({ x: 0, y: 1, z: 0, w: 0 });

/**
 * Unit vector in z direction ([0, 0, 1, 0]).
 */
export const unitZ: Vec4 = new Vec4({ x: 0, y: 0, z: 1, w: 0 });

/**
 * Unit vector in w direction ([0, 0, 0, 1]).
 */
export const unitW: Vec4 = new Vec4({ x: 0, y: 0, z: 0, w: 1 });

/**
 * The dimension of a 4 dimensional vector: 3.
 */
export const dimension = 4;

/**
 * The null vector, the vector [0, 0, 0, 0].
 */
export const nullVec = new Vec4({ x: 0, y: 0, z: 0, w: 0 });
