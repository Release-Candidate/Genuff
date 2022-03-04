// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math.ts
// Date:     25.Feb.2022
//
// ==============================================================================
/* eslint-disable no-extend-native */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-per-chained-call */

import Decimal from "decimal.js";
import {
  abs,
  div,
  dot,
  eq,
  Equal,
  Field,
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
  interface Number
    extends Equal,
      Ord,
      VectorSpace<number>,
      ToString,
      Show,
      Field {}
}

Number.prototype.fromNumber = function (a) {
  return a;
};

Number.prototype[eq] = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return Math.abs((this as number) - b) < epsilon;
};

Number.prototype[neq] = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return Math.abs((this as number) - b) >= epsilon;
};

Number.prototype[le] = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) < b || Math.abs((this as number) - b) < epsilon;
};

Number.prototype[ge] = function (b: number, epsilon = EPSILON) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) > b || Math.abs((this as number) - b) < epsilon;
};

Number.prototype[lt] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) < b;
};

Number.prototype[gt] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) > b;
};

Number.prototype.isPartial = false;

Number.prototype[plus] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) + b;
};

Number.prototype[minus] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) - b;
};

Number.prototype[mult] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) * b;
};

Number.prototype[div] = function (b: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) / b;
};

Number.prototype[sqrt] = function () {
  return Math.sqrt(this as number);
};
Number.prototype[abs] = function () {
  return Math.abs(this as number);
};

Number.prototype[plusScalar] = function (t: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) + t;
};

Number.prototype[multScalar] = function (t: number) {
  // eslint-disable-next-line no-extra-parens
  return (this as number) * t;
};

Number.prototype[dot] = function (b: number) {
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

Number.prototype.one = function () {
  // eslint-disable-next-line no-magic-numbers
  return 1;
};

Number.prototype.show = function () {
  return this.toString();
};

// Extend Decimal.JS class with own Constraints ================================

declare module "decimal.js" {
  // eslint-disable-next-line no-shadow
  interface Decimal extends Equal, ToString, Show, Field {}
}

Decimal.prototype.fromNumber = function (a) {
  return new Decimal(a);
};

Decimal.prototype[plus] = function (b) {
  return this.add(b);
};

Decimal.prototype[minus] = function (b) {
  return this.minus(b);
};

Decimal.prototype[div] = function (b) {
  return this.div(b);
};

Decimal.prototype[mult] = function (b) {
  return this.mul(b);
};

Decimal.prototype[sqrt] = function () {
  return this.sqrt();
};

Decimal.prototype[abs] = function () {
  return this.abs();
};

Decimal.prototype[eq] = function (b, epsilon = 0) {
  return this.minus(b).abs().lessThanOrEqualTo(epsilon);
};

Decimal.prototype[neq] = function (b, epsilon = 0) {
  return !this.minus(b).abs().lessThanOrEqualTo(epsilon);
};

Decimal.prototype[lt] = function (b) {
  return this.lt(b);
};

Decimal.prototype[gt] = function (b) {
  return this.gt(b);
};

Decimal.prototype[le] = function (b, epsilon = 0) {
  return (
    this.lessThanOrEqualTo(b) || this.minus(b).abs().lessThanOrEqualTo(epsilon)
  );
};

Decimal.prototype[ge] = function (b, epsilon = 0) {
  return (
    this.greaterThanOrEqualTo(b) ||
    this.minus(b).abs().lessThanOrEqualTo(epsilon)
  );
};

Decimal.prototype.one = function () {
  // eslint-disable-next-line no-magic-numbers
  return new Decimal(1);
};

Decimal.prototype.null = function () {
  // eslint-disable-next-line no-magic-numbers
  return new Decimal(0);
};

Decimal.prototype.show = function () {
  return this.toString();
};
