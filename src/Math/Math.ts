// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math.ts
// Date:     25.Feb.2022
//
// ==============================================================================
/* eslint-disable no-extend-native */

import { Equal, Ord, VectorField } from "Generics/Types";

/**
 * Epsilon to use for float comparisons.
 *
 * Do not use `Number.EPSILON`, as errors in floating point calculations are
 * bigger than `Number.EPSILON`, which is the smallest difference between two
 * floating point numbers of type `number`.
 */
export const EPSILON = 1e-10;

// Extend JS number by own constraints =========================================

/**
 * Extend JS native `number` with interfaces `VectorField`, `Equal` and `Ord`.
 */
declare global {
  interface Number extends Equal, Ord, VectorField<number> {}
}

/**
 * Compare two numbers using a small interval of 'equality'.
 */
Number.prototype.equal = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return Math.abs((this as number) - b) < epsilon;
};

/**
 * Compare two numbers using a small interval of 'equality'.
 */
Number.prototype.notEqual = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return Math.abs((this as number) - b) >= epsilon;
};

/**
 * Check, if two numbers are 'almost' the same or the first is smaller than the
 * second.
 */
Number.prototype.lessOrEqual = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) < b || Math.abs((this as number) - b) < epsilon;
};

/**
 * Check, if two numbers are 'almost' the same or the first is bigger than the
 * second.
 */
Number.prototype.biggerOrEqual = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) > b || Math.abs((this as number) - b) < epsilon;
};

/**
 * Check, if the first number is smaller than the second.
 */
Number.prototype.lessThan = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) < b;
};

/**
 * Check, if the first number is bigger than the second.
 */
Number.prototype.biggerThan = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) > b;
};

/**
 * The ordering is not a partial but a total one.
 */
Number.prototype.isPartial = false;

Number.prototype.add = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) + b;
};

Number.prototype.subtract = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) - b;
};

Number.prototype.addScalar = function (t: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) + t;
};

Number.prototype.multScalar = function (t: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) * t;
};

Number.prototype.dot = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) * b;
};

Number.prototype.normalize = function () {
  // eslint-disable-next-line no-magic-numbers
  return 1.0;
};

Number.prototype.norm = function () {
  return Math.abs(this as number);
};

Number.prototype.length = function () {
  return Math.abs(this as number);
};

Number.prototype.dimension = function () {
  // eslint-disable-next-line no-magic-numbers
  return 1;
};

Number.prototype.null = function () {
  // eslint-disable-next-line no-magic-numbers
  return 0;
};
