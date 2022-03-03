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
import { eq, Equal, Functor, id } from "Generics/Types";

export interface FunctorEqual<S, T, FT> extends Functor<S, T, FT>, Equal {}

export function functorTests<S, T, FT extends FunctorEqual<S, S, FT>>(
  typeName: string,
  arbType: fc.Arbitrary<T>,
  constructor: (v: T) => FT
) {
  describe(`${typeName}: Testing Functor constraint`, () => {
    describe(`${typeName}: Testing map`, () => {
      it(`${typeName}: map of id yields same object`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.map(id)[eq](v));
          }),
          { verbose: true }
        );
      });
    });
  });
}
