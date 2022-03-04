// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     FoldableGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */

import { assert } from "chai";
import * as fc from "fast-check";
import { Equal, Field, Foldable } from "Generics/Types";

export interface FoldableEqual<S extends Field, T>
  extends Foldable<S, T>,
    Equal {}

export function foldableTests<
  U extends Field,
  S,
  E,
  T extends FoldableEqual<U, E>
>(typeName: string, arbType: fc.Arbitrary<S>, constructor: (v: S) => T) {
  describe(`${typeName}: Testing Foldable constraint`, () => {
    describe(`${typeName}: Testing reduce`, () => {
      it(`${typeName}: reduce of constant 1 is number of properties`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.equal(
              v.reduce((acc, _) => acc + 1, 0),
              v.toArray().length
            );
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing toArray`, () => {
      it(`${typeName}: length of toArray is the number of properties`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.equal(v.toArray().length, Object.keys(a).length);
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: toArray is not the empty array`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.notDeepEqual(v.toArray(), []);
          }),
          { verbose: true }
        );
      });
    });
  });
}
