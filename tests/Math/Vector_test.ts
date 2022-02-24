// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vector_test.ts
// Date:     24.Feb.2022
//
// ==============================================================================
/* eslint-disable max-params */
/* eslint-disable i18next/no-literal-string */

import { assert } from "chai";
import * as fc from "fast-check";
import * as V from "Math/Vector";

const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
const arbVec4 = fc.record({
  x: fc.double(),
  y: fc.double(),
  z: fc.double(),
  w: fc.double(),
});

describe("Testing Math/Vector", () => {
  // Tests for `add` ===========================================================
  describe("Testing add", () => {
    it("add is commutative", () => {
      fc.assert(
        fc.property(arbVec2, arbVec2, (a, b) =>
          assert.deepEqual(V.add(a, b), V.add(b, a))
        ),
        { verbose: true }
      );
      fc.assert(
        fc.property(arbVec3, arbVec3, (a, b) =>
          assert.deepEqual(V.add(a, b), V.add(b, a))
        ),
        { verbose: true }
      );
      fc.assert(
        fc.property(arbVec4, arbVec4, (a, b) =>
          assert.deepEqual(V.add(a, b), V.add(b, a))
        ),
        { verbose: true }
      );
    });
    it("add is distributive", () => {
      fc.assert(
        fc.property(arbVec2, arbVec2, arbVec2, (a, b, c) => {
          const v = V.add(a, b);
          const w = V.add(b, c);
          assert.deepEqual(V.add(v, c), V.add(a, w));
        }),
        { verbose: true }
      );
    });
  });
});
