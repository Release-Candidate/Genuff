// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vec4Generic.ts
// Date:     04.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

import {
  cross,
  div,
  dot,
  eq,
  Equal,
  Field,
  Foldable,
  Functor,
  ge,
  gt,
  le,
  lt,
  minus,
  mult,
  multScalar,
  neq,
  Ord,
  plus,
  plusScalar,
  Show,
  sqrt,
  ToString,
  VectorSpace,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

/**
 * A class of a 4 dimensional vector.
 *
 * Never changes the value of `this`, always returns a new object.
 *
 * Implements the following constraints:
 * * Functor
 * * Foldable
 * * Show
 * * ToString
 * * Equal
 * * Ord
 * * VectorSpace
 */
export class Vec4Generic<T extends Field> // eslint-disable-next-line indent
  implements
    Functor<T, T, Vec4Generic<T>>,
    Foldable<T, { value: T; name: string }>,
    Show,
    ToString,
    Equal,
    Ord,
    VectorSpace<T>
{
  /**
   * Constructs a new 4 dimensional vector.
   *
   * @param v The values of the vector to construct.
   */
  constructor(private readonly v: { x: T; y: T; z: T; w: T }) {}

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
    return `{ x: ${this.v.x.toString()}, y: ${this.v.y.toString()}, z: ${this.v.z.toString()}, w: ${this.v.w.toString()} }`;
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
    return `[ x: ${this.v.x.toString()}, y: ${this.v.y.toString()}, z: ${this.v.z.toString()}, w: ${this.v.w.toString()} ]`;
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
  map(f: (e: T) => T): this {
    return new Vec4Generic<T>({
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
    f: (acc: S, e: { value: T; name: string }) => S,
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
  toArray(): T[] {
    return [this.v.x, this.v.y, this.v.z, this.v.w];
  }

  // Implementation of Types.VectorSpace. ======================================

  /**
   * Add a vector to this vector.
   *
   * @param b The vector to add.
   * @returns The sum of both vectors
   */
  [plus](b: this): this {
    return new Vec4Generic<T>({
      x: this.v.x[plus](b.v.x),
      y: this.v.y[plus](b.v.y),
      z: this.v.z[plus](b.v.z),
      w: this.v.w[plus](b.v.w),
    }) as this;
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param b The vector to subtract.
   * @returns The sum of both vectors
   */
  [minus](b: this): this {
    return new Vec4Generic<T>({
      x: this.v.x[minus](b.v.x),
      y: this.v.y[minus](b.v.y),
      z: this.v.z[minus](b.v.z),
      w: this.v.w[minus](b.v.w),
    }) as this;
  }

  /**
   * Multiplicate each component of the vector by the given value.
   *
   * @param t The scalar value to multiply the vector with.
   * @returns The vector element wise multiplicated with the given value.
   */
  [multScalar](t: T): this {
    return new Vec4Generic<T>({
      x: this.v.x[mult](t),
      y: this.v.y[mult](t),
      z: this.v.z[mult](t),
      w: this.v.w[mult](t),
    }) as this;
  }

  /**
   * Add the given scalar value to each component of the vector.
   *
   * @param t The scalar value to add to each component of the vector.
   * @returns The vector with the scalar added to it.
   */
  [plusScalar](t: T): this {
    return new Vec4Generic<T>({
      x: this.v.x[plus](t),
      y: this.v.y[plus](t),
      z: this.v.z[plus](t),
      w: this.v.w[plus](t),
    }) as this;
  }

  /**
   * Calculate the dot product (scalar product) of the two vectors.
   *
   * @param b The vector to calculate the dot product with.
   * @returns The dot product (scalar product) of both vectors.
   */
  [dot](b: this): T {
    return (
      this.v.x[mult](b.v.x)
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.y[mult](b.v.y))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.z[mult](b.v.z))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.w[mult](b.v.w))
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
  [cross](b: this): this {
    const x = this.v.y[mult](b.v.z)[minus](this.v.z[mult](b.v.y));
    const y = this.v.z[mult](b.v.x)[minus](this.v.x[mult](b.v.z));
    const z = this.v.x[mult](b.v.y)[minus](this.v.y[mult](b.v.x));
    return new Vec4Generic<T>({ x, y, z, w: this.v.y.null() }) as this;
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
    const fac = this.v.x.one()[div](this.length());
    return this[multScalar](fac);
  }

  /**
   * Return the Euclidean norm of the vector.
   *
   * The same as `length()`.
   *
   * @returns The Euclidean norm of the vector.
   */
  norm(): T {
    return (
      this.v.x[mult](this.v.x)
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.y[mult](this.v.y))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.z[mult](this.v.z))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.w[mult](this.v.w))
        // eslint-disable-next-line no-unexpected-multiline
        [sqrt]()
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
  length(): T {
    return (
      this.v.x[mult](this.v.x)
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.y[mult](this.v.y))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.z[mult](this.v.z))
        // eslint-disable-next-line no-unexpected-multiline
        [plus](this.v.w[mult](this.v.w))
        // eslint-disable-next-line no-unexpected-multiline
        [sqrt]()
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
    const nullVal = this.v.x.null();
    return new Vec4Generic<T>({
      x: nullVal,
      y: nullVal,
      z: nullVal,
      w: nullVal,
    }) as this;
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
  [eq](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[eq](b.v.x, epsilon);
    const prop2 = this.v.y[eq](b.v.y, epsilon);
    const prop3 = this.v.z[eq](b.v.z, epsilon);
    const prop4 = this.v.w[eq](b.v.w, epsilon);
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
  [neq](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[eq](b.v.x, epsilon);
    const prop2 = this.v.y[eq](b.v.y, epsilon);
    const prop3 = this.v.z[eq](b.v.z, epsilon);
    const prop4 = this.v.w[eq](b.v.w, epsilon);
    return !prop1 || !prop2 || !prop3 || !prop4;
  }

  // Implementation of Types.Ord. ==============================================

  /**
   * Compare two vectors, if `this <= b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v[le](w) === false` and
   * `w[le](v) === false` holds.
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
  [le](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[le](b.v.x, epsilon);
    const prop2 = this.v.y[le](b.v.y, epsilon);
    const prop3 = this.v.z[le](b.v.z, epsilon);
    const prop4 = this.v.w[le](b.v.w, epsilon);
    return prop1 && prop2 && prop3 && prop4;
  }

  /**
   * Compare two vectors, if `this >= b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v[ge](w) === false` and
   * `w[ge](v) === false` holds.
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
  [ge](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[ge](b.v.x, epsilon);
    const prop2 = this.v.y[ge](b.v.y, epsilon);
    const prop3 = this.v.z[ge](b.v.z, epsilon);
    const prop4 = this.v.w[ge](b.v.w, epsilon);
    return prop1 && prop2 && prop3 && prop4;
  }

  /**
   * Compare two vectors, if `this < b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v[lt](w) === false` and
   * `w[lt](v) === false` holds.
   *
   * @param b The vector to compare against.
   * @returns `true` if this vector is less than b, `false` else
   *          (which does not mean that the opposite is true)
   */
  [lt](b: this): boolean {
    return (
      this.v.x[lt](b.v.x) &&
      this.v.y[lt](b.v.y) &&
      this.v.z[lt](b.v.z) &&
      this.v.w[lt](b.v.w)
    );
  }

  /**
   * Compare two vectors, if `this > b`.
   *
   * Waring: this is just a partial order in the vector field, it is not
   * possible to compare every two vectors. For example there are many vectors
   * v and w for which `v[gt](w) === false` and
   * `w[gt](v) === false` holds.
   *
   * @param b The vector to compare against.
   * @returns `true` if this vector is bigger than b, `false` else
   *          (which does not mean that the opposite is true)
   */
  [gt](b: this): boolean {
    return (
      this.v.x[gt](b.v.x) &&
      this.v.y[gt](b.v.y) &&
      this.v.z[gt](b.v.z) &&
      this.v.w[gt](b.v.w)
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
export const unitX = new Vec4Generic({ x: 1, y: 0, z: 0, w: 0 });

/**
 * Unit vector in y direction ([0, 1, 0, 0]).
 */
export const unitY = new Vec4Generic({ x: 0, y: 1, z: 0, w: 0 });

/**
 * Unit vector in z direction ([0, 0, 1, 0]).
 */
export const unitZ = new Vec4Generic({ x: 0, y: 0, z: 1, w: 0 });

/**
 * Unit vector in w direction ([0, 0, 0, 1]).
 */
export const unitW = new Vec4Generic({ x: 0, y: 0, z: 0, w: 1 });

/**
 * The dimension of a 4 dimensional vector: 3.
 */
export const dimension = 4;

/**
 * The null vector, the vector [0, 0, 0, 0].
 */
export const nullVec = new Vec4Generic({ x: 0, y: 0, z: 0, w: 0 });
