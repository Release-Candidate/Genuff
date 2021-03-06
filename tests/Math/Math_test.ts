// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math_test.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */

import { assert } from "chai";
import Decimal from "decimal.js";
import * as fc from "fast-check";
import { id } from "Generics/Types";
import { EPSILON } from "Math/Math";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorSpaceGenerics";

describe("Testing Math/Math", () => {
  describe("Testing Number", () => {
    /**
     * Tests of the constraint `Equal`.
     */
    equalityTests("number", fc.double(), id, (a, eps) => a + eps, EPSILON);
    /**
     * Tests of the constraint `Ord`.
     */
    ordTests("number", fc.double(), id, (a, eps) => a + eps, EPSILON);

    /**
     * Tests of the constraint `VectorSpace`.
     */
    vectorTests("number", fc.double(), id, id);
    describe("number: testing dimension", () => {
      it(`number: dimension is 1`, () => {
        const v = 0;
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v.dimension(), 1);
      });
    });
  });
  describe("Testing Decimal", () => {
    /**
     * Tests of the constraint `Equal`.
     */
    equalityTests(
      "Decimal",
      fc.double(),
      (a) => new Decimal(a),
      (a, eps) => new Decimal(a + eps),
      0
    );
    /**
     * Tests of the constraint `Ord`.
     */
    ordTests(
      "Decimal",
      fc.double(),
      (a) => new Decimal(a),
      (a, eps) => new Decimal(a + eps),
      0
    );
  });
});
