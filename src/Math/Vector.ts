// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  GenuffY
// File:     LinAlg.ts
// Date:     24.Feb.2022
//
// ==============================================================================

import {
  Equal,
  Foldable,
  Functor,
  NotEmpty,
  OnlyNumbers,
  Ord,
  Show,
  ToString,
  VectorSpace,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

export type VecArg<T> = OnlyNumbers & NotEmpty<T>;

export type VecN = OnlyNumbers;

/**
 * The class of a general n-dimensional vector.
 *
 * Implements the constraints
 *  * Show
 *  * ToString
 *  * Equal
 *  * Ord
 *  * VectorField
 *  * Functor
 *  * Foldable
 */
export class Vector<T extends VecArg<T>> // eslint-disable-next-line indent
  implements
    Show,
    ToString,
    Equal,
    Ord,
    VectorSpace,
    Functor<number, number, Vector<T>>,
    Foldable<{ value: number; name: string }>
{
  /**
   * Constructor.
   *
   * Takes a non-empty object with only number properties as argument.
   *
   * @param v The vector-like object to construct the Vector from.
   */
  constructor(private v: T) {}

  /**
   * Return a string representation of the vector.
   *
   * Usable for serialization.
   * May not be the same as `show`, which is suitable for printing to a console
   * or a log file.
   *
   * @returns A string representation of the vector.
   */
  toString() {
    return (
      this.reduce(
        (acc, { value, name }) => acc + `${name}: ${value.toString()}, `,
        "{ "
      ) + "}"
    );
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
    return this.toString();
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
  map(f: (e: number) => number) {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = f(this.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c);
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
  ) {
    let retVal = initialValue;
    for (const prop in this.v) {
      retVal = f(retVal, { value: this.v[prop], name: prop });
    }
    return retVal;
  }

  /**
   * Convert the vector to an array.
   *
   * The elements in the array have the same order as the string properties in
   * the vector.
   *
   * @returns The vector converted to an array.
   */
  toArray(): number[] {
    let c = [];
    for (const prop in this.v) {
      c.push(this.v[prop]);
    }
    return c;
  }

  // Implementation of `Types.VectorField` =====================================

  /**
   * Add a vector to this vector.
   *
   * @param b The vector to add.
   * @returns The sum of both vectors
   */
  add(b: this): this {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] + b.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param b The vector to subtract.
   * @returns The sum of both vectors
   */
  subtract(b: this): this {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] - b.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  /**
   * Multiplicate each component of the vector by the given value.
   *
   * @param t The scalar value to multiply the vector with.
   * @returns The vector element wise multiplicated with the given value.
   */
  multScalar(t: number): this {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] * t) as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  /**
   * Add the given scalar value to each component of the vector.
   *
   * @param t The scalar value to add to each component of the vector.
   * @returns The vector with the scalar added to it.
   */
  addScalar(t: number): this {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] + t) as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  /**
   * Calculate the dot product (scalar product) of the two vectors.
   *
   * @param b The vector to calculate the dot product with.
   * @returns The dot product (scalar product) of both vectors.
   */
  dot(b: this): number {
    let retVal = 0;
    for (const prop in this.v) {
      retVal += this.v[prop] * b.v[prop];
    }
    return retVal;
  }

  /**
   * Return a vector pointing in the same direction as this one with a length of
   * 1 (a unit vector).
   *
   * @returns The normalized vector. Returns a new vector, does not alter the
   * existing one.
   */
  normalize(): this {
    let c = {} as T;
    // eslint-disable-next-line no-magic-numbers
    const fac = 1.0 / this.norm();
    for (const prop in this.v) {
      c[prop] = (this.v[prop] * fac) as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  /**
   * Return the Euclidean norm of the vector.
   *
   * The same as `length()`.
   *
   * @returns The Euclidean norm of the vector.
   */
  norm(): number {
    let retVal = 0;
    for (const prop in this.v) {
      retVal += this.v[prop] * this.v[prop];
    }
    return Math.sqrt(retVal);
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
    let retVal = 0;
    for (const prop in this.v) {
      retVal += this.v[prop] * this.v[prop];
    }
    return Math.sqrt(retVal);
  }

  /**
   * Return the dimension of the vector, the number of its components.
   *
   * @returns The dimension of the vector, the number of its components.
   */
  dimension(): number {
    return Object.keys(this.v).length;
  }

  /**
   * Return the null vector, every component of this vector is 0:
   * [0, 0, ... , 0].
   *
   * @returns The null vector, [0, 0, ... , 0].
   */
  null(): this {
    let c = {} as T;
    for (const prop in this.v) {
      // eslint-disable-next-line no-magic-numbers
      c[prop] = 0 as T[Extract<keyof T, string>];
    }
    return new Vector(c) as this;
  }

  // Implementation of `Types.Equal`. ============================================

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
  equal(b: this, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && Math.abs(this.v[prop] - b.v[prop]) < epsilon;
    }
    return retVal;
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
  notEqual(b: this, epsilon: number = EPSILON) {
    for (const prop in this.v) {
      if (Math.abs(this.v[prop] - b.v[prop]) >= epsilon) {
        return true;
      }
    }
    return false;
  }

  // Implementation of `Types.Ord` ===============================================

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
  lessOrEqual(b: this, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      const eq = Math.abs(this.v[prop] - b.v[prop]) < epsilon;
      retVal = retVal && (this.v[prop] < b.v[prop] || eq);
    }
    return retVal;
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
  biggerOrEqual(b: this, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      const eq = Math.abs(this.v[prop] - b.v[prop]) < epsilon;
      retVal = retVal && (this.v[prop] > b.v[prop] || eq);
    }
    return retVal;
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
  lessThan(b: this) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && this.v[prop] < b.v[prop];
    }
    return retVal;
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
  biggerThan(b: this) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && this.v[prop] > b.v[prop];
    }
    return retVal;
  }

  /**
   * This vector field has a partial ordering, which means that not all vectors
   * can be compared against each other.
   */
  readonly isPartial = true;
}
