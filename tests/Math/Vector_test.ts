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

import * as fc from "fast-check";

const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
const arbVec4 = fc.record({
  x: fc.double(),
  y: fc.double(),
  z: fc.double(),
  w: fc.double(),
});
const arbVec10 = fc.record({
  x1: fc.double(),
  x2: fc.double(),
  x3: fc.double(),
  x4: fc.double(),
  x5: fc.double(),
  x6: fc.double(),
  x7: fc.double(),
  x8: fc.double(),
  x9: fc.double(),
  x10: fc.double(),
});

describe("Testing Math/Vector", () => {
  // Tests for `add` ===========================================================
  describe("Testing add", () => {
    //it("add is commutative (Waring: real equality!)", () => {
    //   fc.assert(
    //     fc.property(arbVec2, arbVec2, (a, b) =>
    //       assert.deepEqual(V.add(a, b), V.add(b, a))
    //     ),
    //     { verbose: true }
    //   );
    //   fc.assert(
    //     fc.property(arbVec3, arbVec3, (a, b) =>
    //       assert.deepEqual(V.add(a, b), V.add(b, a))
    //     ),
    //     { verbose: true }
    //   );
    //   fc.assert(
    //     fc.property(arbVec4, arbVec4, (a, b) =>
    //       assert.deepEqual(V.add(a, b), V.add(b, a))
    //     ),
    //     { verbose: true }
    //   );
    //   fc.assert(
    //     fc.property(arbVec10, arbVec10, (a, b) =>
    //       assert.deepEqual(V.add(a, b), V.add(b, a))
    //     ),
    //     { verbose: true }
    //   );
    // });
    // it("add is distributive", () => {
    //   fc.assert(
    //     fc.property(arbVec2, arbVec2, arbVec2, (a, b, c) => {
    //       const v = V.add(a, b);
    //       const w = V.add(b, c);
    //       assert(V.equal(V.add(v, c), V.add(a, w)));
    //     }),
    //     { verbose: true }
    //   );
    // });
  });
});
