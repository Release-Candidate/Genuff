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
      it(`Adding ${typeName}s to nullvector`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.add(v.null()).equal(v));
          }),
          { verbose: true }
        );
      });
    });
  });
}
