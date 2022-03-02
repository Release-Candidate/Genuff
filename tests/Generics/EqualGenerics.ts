// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     EqualGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */
/* eslint-disable max-lines-per-function */

import { assert } from "chai";
import * as fc from "fast-check";
import { Equal } from "Generics/Types";
import { EPSILON } from "Math/Math";

const BIGGER_THAN_EPSILON = EPSILON + 0.01 * EPSILON;
const SMALLER_THAN_EPSILON = EPSILON - 0.01 * EPSILON;

// eslint-disable-next-line max-params
export function equalityTests<S, T extends Equal>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T,
  addFunc: (a: S, epsilon: number) => T
) {
  describe(`Testing Equality constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing equal`, () => {
      it(`${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).equal(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              constructor(a).equal(addFunc(a, -SMALLER_THAN_EPSILON))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Symmetry of ${typeName}'s equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).equal(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              addFunc(a, SMALLER_THAN_EPSILON).equal(constructor(a))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Reflexivity of ${typeName}'s equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(constructor(a).equal(constructor(a)));
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(
              constructor(a).equal(addFunc(a, BIGGER_THAN_EPSILON))
            );
            assert.isFalse(
              constructor(a).equal(addFunc(a, -BIGGER_THAN_EPSILON))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1.0 }),
            fc.double({ max: -1.0, min: -10000 }),
            (a, b, c) => {
              assert.isFalse(constructor(a).equal(addFunc(a, b)));
              assert.isFalse(constructor(a).equal(addFunc(a, c)));
            }
          ),
          { verbose: true }
        );
      });
      it(`Random Epsilon: ${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a).equal(addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a).equal(addFunc(a, 0.1 * eps - eps), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isFalse(
                constructor(a).equal(addFunc(a, eps + 0.1 * eps), eps)
              );
              assert.isFalse(
                constructor(a).equal(addFunc(a, -eps - 0.1 * eps), eps)
              );
            }
          ),
          { verbose: true }
        );
      });
      it(`Random Epsilon: symmetry of ${typeName}'s equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a).equal(addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                addFunc(a, eps - 0.1 * eps).equal(constructor(a), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: reflexivity of ${typeName}'s equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(constructor(a).equal(constructor(a), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
    });
    describe(`${typeName}: Testing notEqual`, () => {
      it(`${typeName}s should compare notEqual`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).notEqual(addFunc(a, BIGGER_THAN_EPSILON))
            );
            assert.isTrue(
              constructor(a).notEqual(addFunc(a, -BIGGER_THAN_EPSILON))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Symmetry of ${typeName}'s notEqual`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).notEqual(addFunc(a, BIGGER_THAN_EPSILON))
            );
            assert.isTrue(
              addFunc(a, BIGGER_THAN_EPSILON).notEqual(constructor(a))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`${typeName}s should compare notEqual, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1.0 }),
            fc.double({ max: -1.0, min: -10000 }),
            (a, b, c) => {
              assert.isTrue(constructor(a).notEqual(addFunc(a, b)));
              assert.isTrue(constructor(a).notEqual(addFunc(a, c)));
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare notEqual`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(
              constructor(a).notEqual(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isFalse(
              constructor(a).notEqual(addFunc(a, -SMALLER_THAN_EPSILON))
            );
          }),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should compare notEqual`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a).notEqual(addFunc(a, eps + 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a).notEqual(addFunc(a, -eps - 0.1 * eps), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: symmetry of ${typeName}'s notEqual`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a).notEqual(addFunc(a, eps + 0.1 * eps), eps)
              );
              assert.isTrue(
                addFunc(a, eps + 0.1 * eps).notEqual(constructor(a), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should not compare notEqual`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isFalse(
                constructor(a).notEqual(addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isFalse(
                constructor(a).notEqual(addFunc(a, 0.1 * eps - eps), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
    });
  });
}
