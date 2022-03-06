// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Interpolation_test.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */

import { id } from "Generics/Types";
import { AitkenInterpolation } from "../../src/Math/AitkenInterpolation";
import { KroghIIInterpolation } from "../../src/Math/KroghIIInterpolation";
import { KroghIInterpolation } from "../../src/Math/KroghIInterpolation";
import { LagrangeInterpolation } from "../../src/Math/LagrangeInterpolation";
import { LinearInterpolation } from "../../src/Math/LinearInterpolation";
import { EPSILON } from "../../src/Math/Math";
import { NevilleInterpolation } from "../../src/Math/NevilleInterpolation";
import {
  interpolationTests,
  polynomialInterpolationTests,
} from "../Generics/InterpolationGenerics";

describe("Testing Math/Interpolation", () => {
  describe("Testing Linear Interpolation", () => {
    interpolationTests(
      "Linear",
      (arr) => new LinearInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
  describe("Testing Aitken Interpolation", () => {
    polynomialInterpolationTests(
      "Aitken",
      (arr) => new AitkenInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON * 10
    );
    interpolationTests(
      "Aitken",
      (arr) => new AitkenInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
  describe("Testing Neville Interpolation", () => {
    polynomialInterpolationTests(
      "Neville",
      (arr) => new NevilleInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON * 10
    );
    interpolationTests(
      "Neville",
      (arr) => new NevilleInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
  describe("Testing Lagrange Interpolation", () => {
    polynomialInterpolationTests(
      "Lagrange",
      (arr) => new LagrangeInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON * 10
    );
    interpolationTests(
      "Lagrange",
      (arr) => new LagrangeInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
  describe("Testing Krogh I Interpolation", () => {
    polynomialInterpolationTests(
      "Krogh I",
      (arr) => new KroghIInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON * 10
    );
    interpolationTests(
      "Krogh I",
      (arr) => new KroghIInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
  describe("Testing Krogh II Interpolation", () => {
    polynomialInterpolationTests(
      "Krogh II",
      (arr) => new KroghIIInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON * 10
    );
    interpolationTests(
      "Krogh II",
      (arr) => new KroghIIInterpolation(arr as Array<[number, number]>),
      id,
      EPSILON
    );
  });
});
