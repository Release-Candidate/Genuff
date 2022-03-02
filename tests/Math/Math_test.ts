// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math_test.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import { assert } from "chai";
import * as fc from "fast-check";
import { id } from "Generics/Types";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorFieldGenerics";

describe("Testing Math/Math", () => {
  /**
   * Tests of the constraint `Equal`.
   */
  equalityTests("number", fc.double(), id, (a, eps) => a + eps);
  /**
   * Tests of the constraint `Ord`.
   */
  ordTests("number", fc.double(), id, (a, eps) => a + eps);

  /**
   * Tests of the constraint `VectorSpace`.
   */
  vectorTests("number", fc.double(), id);
  describe("number: testing dimension", () => {
    it(`number: dimension is 1`, () => {
      const v = 0;
      // eslint-disable-next-line no-magic-numbers
      assert.equal(v.dimension(), 1);
    });
  });
});
