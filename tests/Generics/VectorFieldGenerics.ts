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
import { VectorSpace } from "Generics/Types";

export function vectorTests<S, T extends VectorSpace>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T
) {
  describe(`Testing VectorSpace constraint for ${typeName}`, () => {
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
      it(`${typeName}: addition is associative`, () => {
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
            assert.isTrue(v.add(v.multScalar(-1)).equal(v.null()));
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing subtract`, () => {
      it(`${typeName}: nullvector is neutral element`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.subtract(v.null()).equal(v));
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing multScalar`, () => {
      it(`${typeName}: nullvector stays null`, () => {
        fc.assert(
          fc.property(arbType, fc.double(), (a, t) => {
            const v = constructor(a).null();
            assert.isTrue(v.multScalar(t).equal(v));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: scalar 1 is neutral element`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.multScalar(1).equal(v));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: multiplication is distributive (addition)`, () => {
        fc.assert(
          fc.property(arbType, arbType, fc.double(), (a, b, t) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(
              v
                .add(w)
                .multScalar(t)
                .equal(v.multScalar(t).add(w.multScalar(t)))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: multiplication is distributive (subtraction)`, () => {
        fc.assert(
          fc.property(arbType, arbType, fc.double(), (a, b, t) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(
              v
                .subtract(w)
                .multScalar(t)
                .equal(v.multScalar(t).subtract(w.multScalar(t)))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: multiplication is compatible to field multiplication`, () => {
        fc.assert(
          fc.property(arbType, fc.double(), fc.double(), (a, s, t) => {
            const v = constructor(a);
            assert.isTrue(
              v
                .multScalar(s)
                .multScalar(t)
                .equal(v.multScalar(t * s))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: multiplication is distributive to field addition`, () => {
        fc.assert(
          fc.property(arbType, fc.double(), fc.double(), (a, s, t) => {
            const v = constructor(a);
            assert.isTrue(
              v
                .multScalar(s)
                .add(v.multScalar(t))
                .equal(v.multScalar(s + t))
            );
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing addScalar`, () => {
      it(`${typeName}: vector with scalar 0 added is same`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.addScalar(0).equal(v));
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing dot (product)`, () => {
      it(`${typeName}: dot product involving nullvector is 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            const n = v.null();
            assert.isTrue(v.dot(n).equal(0));
            assert.isTrue(n.dot(v).equal(0));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product of the same vector >= 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.dot(v).biggerOrEqual(0));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product is commutative`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(v.dot(w).equal(w.dot(v)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product is distributive (vector add)`, () => {
        fc.assert(
          fc.property(arbType, arbType, arbType, (a, b, c) => {
            const v = constructor(a);
            const w = constructor(b);
            const u = constructor(c);
            assert.isTrue(v.dot(w.add(u)).equal(v.dot(w) + v.dot(u)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product is distributive (field mult)`, () => {
        fc.assert(
          fc.property(arbType, arbType, fc.double(), (a, b, t) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(v.dot(w.multScalar(t)).equal(t * v.dot(w)));
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing normalize`, () => {
      it(`${typeName}: normalized vector has length 1`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            // eslint-disable-next-line newline-per-chained-call
            assert.isTrue(v.normalize().length().equal(1));
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing norm`, () => {
      it(`${typeName}: norm of nullvector is 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a).null();
            assert.isTrue(v.norm().equal(0));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: norm is always >= 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.norm().biggerOrEqual(0));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: reverse triangle inequality holds for norm`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(
              Math.abs(v.norm() - w.norm()).lessOrEqual(v.subtract(w).norm())
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: norm is the same as length`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.norm().equal(v.length()));
          }),
          { verbose: true }
        );
      });
    });
  });
}
