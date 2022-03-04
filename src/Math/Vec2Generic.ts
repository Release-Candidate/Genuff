// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vec2Generic.ts
// Date:     04.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

import {
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
  OrderedVectorSpace,
  plus,
  plusScalar,
  Show,
  sqrt,
  ToString,
  VectorSpace,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

export type Vec2RecordGen<T extends Field> = { x: T; y: T };

/**
 * A class of a 2 dimensional vector.
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
export class Vec2Generic<T extends Field> // eslint-disable-next-line indent
  implements
    Functor<T, T, Vec2Generic<T>>,
    Foldable<T, { value: T; name: string }>,
    Show,
    ToString,
    Equal,
    Ord,
    VectorSpace<T>,
    OrderedVectorSpace<T>
{
  /**
   * Constructs a new 2 dimensional vector.
   *
   * @param v The values of the vector to construct.
   */
  constructor(private readonly v: Vec2RecordGen<T>) {}

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
    return `{ x: ${this.v.x.toString()}, y: ${this.v.y.toString()} }`;
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
    return `[ x: ${this.v.x.toString()}, y: ${this.v.y.toString()} ]`;
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
    return new Vec2Generic<T>({ x: f(this.v.x), y: f(this.v.y) }) as this;
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
    return f(acc, { value: this.v.y, name: "y" });
  }

  /**
   * Convert the vector to an array.
   *
   * @returns The vector converted to an array.
   */
  toArray(): T[] {
    return [this.v.x, this.v.y];
  }

  // Implementation of Types.VectorSpace. ======================================

  /**
   * Add a vector to this vector.
   *
   * @param b The vector to add.
   * @returns The sum of both vectors
   */
  [plus](b: this): this {
    return new Vec2Generic<T>({
      x: this.v.x[plus](b.v.x),
      y: this.v.y[plus](b.v.y),
    }) as this;
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param b The vector to subtract.
   * @returns The sum of both vectors
   */
  [minus](b: this): this {
    return new Vec2Generic<T>({
      x: this.v.x[minus](b.v.x),
      y: this.v.y[minus](b.v.y),
    }) as this;
  }

  /**
   * Multiplicate each component of the vector by the given value.
   *
   * @param t The scalar value to multiply the vector with.
   * @returns The vector element wise multiplicated with the given value.
   */
  [multScalar](t: T): this {
    return new Vec2Generic<T>({
      x: this.v.x[mult](t),
      y: this.v.y[mult](t),
    }) as this;
  }

  /**
   * Add the given scalar value to each component of the vector.
   *
   * @param t The scalar value to add to each component of the vector.
   * @returns The vector with the scalar added to it.
   */
  [plusScalar](t: T): this {
    return new Vec2Generic<T>({
      x: this.v.x[plus](t),
      y: this.v.y[plus](t),
    }) as this;
  }

  /**
   * Calculate the dot product (scalar product) of the two vectors.
   *
   * @param b The vector to calculate the dot product with.
   * @returns The dot product (scalar product) of both vectors.
   */
  [dot](b: this): T {
    return this.v.x[mult](b.v.x)[plus](this.v.y[mult](b.v.y));
  }

  /**
   * Return a vector pointing in the same direction as this one with a length of
   * 1 (a unit vector).
   *
   * @returns The normalized vector. Returns a new vector, does not alter the
   * existing one.
   */
  normalize(): this {
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
    return this.v.x[mult](this.v.x)[plus](this.v.y[mult](this.v.y))[sqrt]();
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
    return this.v.x[mult](this.v.x)[plus](this.v.y[mult](this.v.y))[sqrt]();
  }

  /**
   * The dimension of a two dimensional vector: 2
   *
   * @returns 2, the dimension of a 2 dimensional vector.
   */
  // eslint-disable-next-line class-methods-use-this
  dimension(): number {
    // eslint-disable-next-line no-magic-numbers
    return 2;
  }

  /**
   * Return the null vector, [0, 0].
   *
   * @returns The null vector, [0, 0].
   */
  // eslint-disable-next-line class-methods-use-this
  null(): this {
    const nullVal = this.v.x.null();
    return new Vec2Generic<T>({ x: nullVal, y: nullVal }) as this;
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
    return prop1 && prop2;
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
    return !prop1 || !prop2;
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
  [le](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[le](b.v.x, epsilon);
    const prop2 = this.v.y[le](b.v.y, epsilon);
    return prop1 && prop2;
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
  [ge](b: this, epsilon: number = EPSILON): boolean {
    const prop1 = this.v.x[ge](b.v.x, epsilon);
    const prop2 = this.v.y[ge](b.v.y, epsilon);
    return prop1 && prop2;
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
    return this.v.x[lt](b.v.x) && this.v.y[lt](b.v.y);
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
    return this.v.x[gt](b.v.x) && this.v.y[gt](b.v.y);
  }

  /**
   * This vector field has a partial ordering, which means that not all vectors
   * can be compared against each other.
   */
  readonly isPartial = true;
}

/**
 * Unit vector in x direction ([1, 0]).
 */
export const unitX = new Vec2Generic({ x: 1, y: 0 });

/**
 * Unit vector in y direction ([0, 1]).
 */
export const unitY = new Vec2Generic({ x: 0, y: 1 });

/**
 * The dimension of a 2 dimensional vector: 2.
 */
export const dimension = 2;

/**
 * The null vector, the vector [0 , 0].
 */
export const nullVec = new Vec2Generic({ x: 0, y: 0 });
