// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     FunctorGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */

import { assert } from "chai";
import * as fc from "fast-check";
import { Functor } from "Generics/Types";

export function equalityTests<S, T, FT extends Functor<S, T, FT>>(
  arbType: fc.Arbitrary<T>,
  addFunc: (a: T, epsilon: number) => T
) {
  describe("Testing Functor constraint", () => {
    // Tests for `add` ===========================================================
    describe("Testing reduce", () => {
      it("Almost the same objects should be equal", () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.equal(addFunc(a, SMALLER_THAN_EPSILON)));
            assert.isTrue(a.equal(addFunc(a, -SMALLER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
      it("Almost the same objects should not be equal", () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(a.equal(addFunc(a, BIGGER_THAN_EPSILON)));
            assert.isFalse(a.equal(addFunc(a, -BIGGER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
    });
  });
}
