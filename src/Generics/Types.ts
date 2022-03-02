// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Types.ts
// Date:     24.Feb.2022
//
// ==============================================================================

/**
 * Type constraint of objects containing only `number` properties - or none at
 * all.
 * The same as `Record<string, number>`.
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
export type Foldable<T> = {
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
  toArray(): number[];
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
  equal(b: Equal, epsilon?: number): boolean;

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
  notEqual(b: Equal, epsilon?: number): boolean;
}

/**
 * Ordering constraint.
 *
 * To be able to order elements of the type.
 */
export interface Ord {
  lessOrEqual(b: Ord, epsilon?: number): boolean;
  biggerOrEqual(b: Ord, epsilon?: number): boolean;
  lessThan(b: Ord): boolean;
  biggerThan(b: Ord): boolean;
  isPartial: boolean;
}

/**
 * Constraint for a vector field with norm and inner product.
 */
export interface VectorField extends Equal, ToString, Show {
  add(b: VectorField): VectorField;
  subtract(b: VectorField): VectorField;
  multScalar(t: number): VectorField;
  addScalar(t: number): VectorField;
  dot(b: VectorField): number;
  normalize(): VectorField;
  norm(): number;
  length(): number;
  dimension(): number;
  null(): VectorField;
}
