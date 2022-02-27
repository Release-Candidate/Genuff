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
  map(f: (e: S) => T): FT;
};

/**
 * Foldable definition
 */
export type Foldable<T> = {
  reduce<S>(f: (acc: S, e: T) => S, initialValue: S): S;
  toArray(): number[];
};

/**
 * Show constraint.
 *
 * To be able to print the type to the console, a log file or similar.
 */
export type Show = {
  show(): string;
};

/**
 * String conversion constraint.
 *
 * To be able to convert the type to a string. Not necessary the same as `Show`.
 */
export type ToString = {
  toString(): string;
};

/**
 * Equality constraint.
 *
 *  To be able to test for equality and inequality.
 */
export interface Equal {
  equal(b: this): boolean;
  notEqual(b: this): boolean;
}

/**
 * Ordering constraint.
 *
 * To be able to order elements of the type.
 */
export interface Ord {
  lessOrEqual(b: this): boolean;
  biggerOrEqual(b: this): boolean;
  lessThan(b: this): boolean;
  biggerThan(b: this): boolean;
  readonly isPartial: boolean;
}

/**
 * Constraint for a vector field with norm and inner product.
 */
export interface VectorField<T> {
  add(b: T): T;
  subtract(b: T): T;
  multScalar(t: number): T;
  addScalar(t: number): T;
  dot(b: T): number;
  normalize(): T;
  norm(): number;
  length(): number;
  dimension(): number;
  null(): T;
}
