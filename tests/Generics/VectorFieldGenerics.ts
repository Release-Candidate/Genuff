// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     VectorFieldGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */
/* eslint-disable max-lines-per-function */

import { assert } from "chai";
import * as fc from "fast-check";
import { VectorField } from "Generics/Types";
import { EPSILON } from "Math/Math";

const BIGGER_THAN_EPSILON = EPSILON + 0.000001 * EPSILON;
const SMALLER_THAN_EPSILON = EPSILON - 0.000001 * EPSILON;

export function vectorTests<S, T extends VectorField>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T
) {
  describe(`Testing VectorField constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing add`, () => {
      it(`${typeName}: nullvector is neutral element`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.add(v.null()).equal(v));
            // eslint-disable-next-line newline-per-chained-call
            assert.isTrue(v.null().add(v).equal(v));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: addition is commutative`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(v.add(w).equal(w.add(v)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: addition is distributive`, () => {
        fc.assert(
          fc.property(arbType, arbType, arbType, (a, b, c) => {
            const v = constructor(a);
            const w = constructor(b);
            const u = constructor(c);
            const temp1 = v.add(w);
            const temp2 = w.add(u);
            assert.isTrue(temp1.add(u).equal(v.add(temp2)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: addition of inverse element is nullvector`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.subtract(v).equal(v.null()));
          }),
          { verbose: true }
        );
      });
    });
  });
}
