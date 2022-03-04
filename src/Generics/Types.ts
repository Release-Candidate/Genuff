// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Types.ts
// Date:     24.Feb.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

import Decimal from "decimal.js";

/**
 * Floating point number types.
 */
export type FloatNumbers = number | Decimal;

/**
 * Type constraint of objects containing only `number` properties - or none at
 * all.
 * The same as `Record<string, T>`.
 */
export type OnlyNumbers = {
  [key in string]: number;
};

/**
 * Type constraint for non-empty objects.
 */
export type NotEmpty<T> = keyof T extends never ? "Object can't be empty" : {};

/**
 * The identity function.
 *
 * Returns the argument given to it.
 *
 * @param x - The argument to return.
 * @returns The argument `x`.
 */
export function id<T>(x: T) {
  return x;
}

/**
 * Addition.
 *
 * Use `a[plus](b)` for `a + b`.
 */
export const plus = Symbol("+");
/**
 * Addition of a scalar to every component of a vector.
 *
 * Use `v[plusScalar](t)` for `[x1 + t, x2 + t, ... , xn + t]`.
 */
export const plusScalar = Symbol("+S");
/**
 * Subtraction.
 *
 * Use `a[minus](b)` for `a - b`.
 */
export const minus = Symbol("-");
/**
 * Multiplication.
 *
 * Use `a[mult](b)` for `a * b`.
 */
export const mult = Symbol("*");
/**
 * Dot product of two vectors.
 *
 * Use `v[dot](w)` for `v ⋅ w`.
 */
export const dot = Symbol("⋅");
/**
 * Cross product of two vectors.
 *
 * Use `v[cross](w)` for `v × w`.
 */
export const cross = Symbol("×");
/**
 * Multiply a vector by a scalar.
 *
 * Use `v[multScalar](t)` for `t * v`.
 */
export const multScalar = Symbol("*S");
/**
 * Division.
 *
 * Use `a[div](b)` for `a / b`.
 */
export const div = Symbol("/");
/**
 * Absolute value.
 *
 * Use `a[abs]()` for `|a|`.
 */
export const abs = Symbol("||");
/**
 * Square root.
 *
 * use `a[sqrt]()` for `sqrt(a)`.
 */
export const sqrt = Symbol("/-");
/**
 * Equality, check for equality `===`.
 *
 * Use `a[equal](b)` for `a === b`.
 */
export const eq = Symbol("===");
/**
 * Not equal, check for inequality `!==`.
 *
 * Use `a[neq](b)` for `a !== b`.
 */
export const neq = Symbol("!==");
/**
 * Less than or equal, `<=`.
 *
 * Use `a[le](b)` for `a <= b`.
 */
export const le = Symbol("<=");
/**
 * Greater than or equal, `>=`.
 *
 * Use `a[ge](b)` for `a >= b`.
 */
export const ge = Symbol(">=");
/**
 * Less than, `<`.
 *
 * Use `a[lt](b)` for `a < b`.
 */
export const lt = Symbol("<");
/**
 * Greater than, `>`.
 *
 * Use `a[gt](b)` for `a > b`.
 */
export const gt = Symbol(">");

/**
 * An interval type.
 *
 * If `min` and `max` are included in the interval depends on the usage.
 * To make this intent explizit, there are `OpenInterval` and `ClosedInterval`.
 */
export type Interval<T> = { min: T; max: T };

/**
 * An interval type, `min` and `max` are not included, it is the set
 * `{ x | min < x < max}`.
 */
export type OpenInterval<T> = { min: T; max: T };

/**
 * An interval type, `min` and `max` are included, it is the set
 * `{ x | min <= x <= max}`.
 */
export type ClosedInterval<T> = { min: T; max: T };

/**
 * Functor definition without higher kinded types, we just name the type `FT`.
 *
 * This is just so we can use `map` with generic functions.
 */
export type Functor<S, T, FT> = {
  /**
   * Iterate through all elements of `this` and apply the function `f` to each
   * element.
   *
   * @param f The function to apply to each element of `this`.
   * @returns The mapped object.
   */
  map(f: (e: S) => T): FT;
};

/**
 * Foldable definition
 */
export type Foldable<A extends Field, T> = {
  /**
   * Reduce the object to a scalar value.
   *
   * @param f The function to apply to each element of `this`.
   * @param initialValue The starting value of the fold.
   * @returns The object reduced to a single value.
   */
  reduce<S>(f: (acc: S, e: T) => S, initialValue: S): S;

  /**
   * Convert the object to an array.
   *
   * E.g. each property of `this` is converted to an element of an array.
   *
   * @returns The object converted to an array.
   */
  toArray(): A[];
};

/**
 * Show constraint.
 *
 * To be able to print the type to the console, a log file or similar.
 */
export type Show = {
  /**
   * Return a string representation of an object suitable for logging or debug
   * output.
   *
   * May no be the same as `toString`, which is a representation suitable for
   * serialization.
   *
   * @returns A string representation of `this` suitable for debug or log
   * output.
   */
  show(): string;
};

/**
 * String conversion constraint.
 *
 * To be able to convert the type to a string. Not necessary the same as `Show`.
 */
export type ToString = {
  /**
   * Return a string representation of the object.
   *
   * Usable for serialization.
   * May not be the same as `show`, which is suitable for printing to a console
   * or a log file.
   *
   * @returns A string representation of `this`.
   */
  toString(): string;
};

/**
 * Equality constraint.
 *
 *  To be able to test for equality and inequality.
 */
export interface Equal {
  /**
   * Compare two objects using an interval to test against instead of exact
   * equality.
   *
   * @param b The object to test against.
   * @param epsilon The epsilon interval both numbers can be in to be considered
   *        equal.
   *
   * @returns `true` if the objects are almost the same, `false` else.
   */
  [eq](b: this, epsilon?: number): boolean;

  /**
   * Compare two objects using an interval to test against instead of exact
   * equality.
   *
   * @param b The object to test against.
   * @param epsilon The epsilon interval both numbers can be in to be considered
   *        equal.
   *
   * @returns `false` if the objects are almost the same, `true` else.
   */
  [neq](b: this, epsilon?: number): boolean;
}

/**
 * Ordering constraint.
 *
 * To be able to order elements of the type.
 */
export interface Ord {
  /**
   * Less than or equal.
   *
   * Compare `this` to b: `this <= b`.
   *
   * @param b The value to compare against.
   * @param epsilon The precision of the comparison.
   *
   * @returns `true`, if this object is less than or equal to `b`, `false` else.
   */
  [le](b: this, epsilon?: number): boolean;
  /**
   * Greater than or equal.
   *
   * Compare `this` to b: `this >= b`.
   *
   * @param b The value to compare against.
   * @param epsilon The precision of the comparison.
   *
   * @returns `true`, if this object is greater than or equal to `b`, `false` else.
   */
  [ge](b: this, epsilon?: number): boolean;
  /**
   * Less than.
   *
   * Compare `this` to b: `this < b`.
   *
   * @param b The value to compare against.
   *
   * @returns `true`, if this object is less than `b`, `false` else.
   */
  [lt](b: this): boolean;
  /**
   * Greater than.
   *
   * Compare `this` to b: `this > b`.
   *
   * @param b The value to compare against.
   *
   * @returns `true`, if this object is greater than `b`, `false` else.
   */
  [gt](b: this): boolean;
  /**
   * Is this ordering a partial one?
   *
   * If this is a partial one, not all elements can be ordered. For example
   * there exist `a` and `b`, where `a < b` and `b < a` hold, but `a >= b` and
   * `b <= a` do not hold.
   */
  isPartial: boolean;
}

/**
 * Constraint for a vector space with norm and inner product.
 */
export interface VectorSpace<T extends Field> extends Equal, ToString, Show {
  /**
   * Add a vector to `this`.
   *
   * @param b The vector to add.
   *
   * @returns The sum of the two vectors.
   */
  [plus](b: this): this;
  /**
   * Subtract a vector from `this`.
   *
   * @param b The vector to subtract.
   *
   * @returns The difference of the two vectors.
   */
  [minus](b: this): this;
  /**
   * Multiply `this` by a scalar.
   *
   * @param t The scalar to multiply `this` with.
   *
   * @returns The multiplied vector.
   */
  [multScalar](t: T): this;
  /**
   * Add a scalar to every component of `this`.
   *
   * @param t The scalar to add to every component of `this`.
   *
   * @returns The vector with the scalar added to the components.
   */
  [plusScalar](t: T): this;
  /**
   * Calculate the dot product of two vectors.
   *
   * @param b The vector to calculate the dot product of with.
   *
   * @returns The dot product of the two vectors.
   */
  [dot](b: this): T;
  /**
   * Normalize the vector, the returned vector has a length of 1.
   *
   * @returns The normalized vector.
   */
  normalize(): this;
  /**
   * Return the norm of the vector.
   *
   * @returns The norm of the vector.
   */
  norm(): T;
  /**
   * Return the length of the vector.
   *
   * This is not the number of components of this vector, that is `dimension`.
   */
  length(): T;
  /**
   * Return the dimension of the vector, the number of components.
   *
   * @returns The dimension of the vector.
   */
  dimension(): number;
  /**
   * Return the null vector.
   *
   * @returns The null vector.
   */
  null(): this;
}

/**
 * Constraint for an ordered vector space.
 */
export interface OrderedVectorSpace<T extends Field>
  extends VectorSpace<T>,
    Ord {}

/**
 * Constraint for a mathematical field.
 */
export interface Field extends Equal, ToString, Show, Ord {
  /**
   * Convert a number to `this`.
   *
   * @param a The number to convert.
   *
   * @returns The number converted to `this`.
   */
  fromNumber(a: number): this;
  /**
   * Addition.
   *
   * @param b The element to add.
   *
   * @returns The sum of two elements.
   */
  [plus](b: this): this;
  /**
   * Subtraction
   *
   * @param b The element to subtract.
   *
   * @returns The difference of the two elements.
   */
  [minus](b: this): this;
  /**
   * Multiplication.
   *
   * @param b The element to multiply with.
   *
   * @returns The product of the two elements
   */
  [mult](b: this): this;
  /**
   * Division.
   *
   * @param b The element to divide by.
   *
   * @returns The quotient of the two elements.
   */
  [div](b: this): this;
  /**
   * Division.
   *
   * @param b The element to divide by.
   *
   * @returns The quotient of the two elements.
   */
  [sqrt](): this;
  /**
   * Absolute value.
   *
   * @returns the absolute value of `this`.
   */
  [abs](): this;
  /**
   * The neutral element of the multiplication, `1`.
   */
  one(): this;
  /**
   * The neutral element of the addition, `0`.
   */
  null(): this;
}
