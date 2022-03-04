// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     VectorSpaceGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */
/* eslint-disable max-lines-per-function */

import { assert } from "chai";
import * as fc from "fast-check";
import {
  abs,
  dot,
  eq,
  Field,
  ge,
  le,
  minus,
  mult,
  multScalar,
  plus,
  plusScalar,
  VectorSpace,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

// eslint-disable-next-line max-params
export function vectorTests<S, U extends Field, T extends VectorSpace<U>>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T,
  fromNumber: (a: number) => U
) {
  describe(`Testing VectorSpace constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing add`, () => {
      it(`${typeName}: nullvector is neutral element`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v[plus](v.null())[eq](v));

            assert.isTrue(v.null()[plus](v)[eq](v));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: addition is commutative`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(v[plus](w)[eq](w[plus](v)));
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
            const temp1 = v[plus](w);
            const temp2 = w[plus](u);
            assert.isTrue(temp1[plus](u)[eq](v[plus](temp2)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: addition of inverse element is nullvector`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v[minus](v)[eq](v.null()));
            assert.isTrue(v[plus](v[multScalar](fromNumber(-1)))[eq](v.null()));
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
            assert.isTrue(v[minus](v.null())[eq](v));
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
            assert.isTrue(v[multScalar](fromNumber(t))[eq](v));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: scalar 1 is neutral element`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v[multScalar](fromNumber(1))[eq](v));
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
              v[plus](w)
                // eslint-disable-next-line no-unexpected-multiline
                [multScalar](fromNumber(t))
                // eslint-disable-next-line no-unexpected-multiline
                [eq](
                  v[multScalar](fromNumber(t))[plus](
                    w[multScalar](fromNumber(t))
                  )
                )
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
              v[minus](w)
                // eslint-disable-next-line no-unexpected-multiline
                [multScalar](fromNumber(t))
                // eslint-disable-next-line no-unexpected-multiline
                [eq](
                  v[multScalar](fromNumber(t))[minus](
                    w[multScalar](fromNumber(t))
                  )
                )
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
              v[multScalar](fromNumber(s))
                // eslint-disable-next-line no-unexpected-multiline
                [multScalar](fromNumber(t))
                // eslint-disable-next-line no-unexpected-multiline
                [eq](v[multScalar](fromNumber(t * s)))
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
              v[multScalar](fromNumber(s))
                // eslint-disable-next-line no-unexpected-multiline
                [plus](v[multScalar](fromNumber(t)))
                // eslint-disable-next-line no-unexpected-multiline
                [eq](v[multScalar](fromNumber(s + t)))
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
            assert.isTrue(v[plusScalar](fromNumber(0))[eq](v));
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
            assert.isTrue(v[dot](n)[eq](fromNumber(0)));
            assert.isTrue(n[dot](v)[eq](fromNumber(0)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product of the same vector >= 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v[dot](v)[ge](fromNumber(0)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product is commutative`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(v[dot](w)[eq](w[dot](v)));
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
            assert.isTrue(
              v[dot](w[plus](u))[eq](v[dot](w)[plus](v[dot](u)), EPSILON)
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: dot product is distributive (field mult)`, () => {
        fc.assert(
          fc.property(arbType, arbType, fc.double(), (a, b, t) => {
            const v = constructor(a);
            const w = constructor(b);
            assert.isTrue(
              v[dot](w[multScalar](fromNumber(t)))[eq](
                fromNumber(t)[mult](v[dot](w)),
                EPSILON
              )
            );
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

            assert.isTrue(v.normalize().length()[eq](fromNumber(1), EPSILON));
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
            assert.isTrue(v.norm()[eq](fromNumber(0)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: norm is always >= 0`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.norm()[ge](fromNumber(0)));
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
              v.norm()[minus](w.norm())[abs]()[le](v[minus](w).norm())
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: norm is the same as length`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const v = constructor(a);
            assert.isTrue(v.norm()[eq](v.length()));
          }),
          { verbose: true }
        );
      });
    });
  });
}
