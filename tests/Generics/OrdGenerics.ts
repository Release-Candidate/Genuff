// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     OrdGenerics.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */
/* eslint-disable max-lines-per-function */

import { assert } from "chai";
import * as fc from "fast-check";
import { Ord } from "Generics/Types";
import { EPSILON } from "Math/Math";

const BIGGER_THAN_EPSILON = EPSILON + 0.01 * EPSILON;
const SMALLER_THAN_EPSILON = EPSILON - 0.01 * EPSILON;

export function ordTests<T extends Ord>(
  typeName: string,
  arbType: fc.Arbitrary<T>,
  addFunc: (a: T, epsilon: number) => T
) {
  describe(`Testing Ord constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing lessOrEqual`, () => {
      it(`${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.lessOrEqual(addFunc(a, SMALLER_THAN_EPSILON)));
            assert.isTrue(a.lessOrEqual(addFunc(a, -SMALLER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(a.lessOrEqual(addFunc(a, -1.0)));
            assert.isFalse(a.lessOrEqual(addFunc(a, -BIGGER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ max: -1.0, min: -10000 }),
            (a, b) => {
              assert.isFalse(a.lessOrEqual(addFunc(a, b)));
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.lessOrEqual(addFunc(a, 1.0)));
            assert.isTrue(a.lessOrEqual(addFunc(a, BIGGER_THAN_EPSILON)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, 1.0).lessOrEqual(a));
              assert.isFalse(addFunc(a, BIGGER_THAN_EPSILON).lessOrEqual(a));
              assert.isTrue(addFunc(a, 1.0).biggerThan(a));
              assert.isTrue(addFunc(a, BIGGER_THAN_EPSILON).biggerThan(a));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(a.lessOrEqual(addFunc(a, b)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, b).lessOrEqual(a));
              assert.isTrue(addFunc(a, b).biggerThan(a));
            }
          }),
          { verbose: true }
        );
      });
      it(`Random Epsilon: ${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(a.lessOrEqual(addFunc(a, eps - 0.1 * eps), eps));
              assert.isTrue(a.lessOrEqual(addFunc(a, 0.1 * eps - eps), eps));
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
              assert.isFalse(a.lessOrEqual(addFunc(a, -1.0), eps));
              assert.isFalse(a.lessOrEqual(addFunc(a, -eps - 0.1 * eps), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ max: -1.0, min: -10000 }),
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(a.lessOrEqual(addFunc(a, b), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(a.lessOrEqual(addFunc(a, 1.0), eps));
              assert.isTrue(a.lessOrEqual(addFunc(a, eps + 0.1 * eps), eps));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, 1.0).lessOrEqual(a, eps));
                assert.isFalse(addFunc(a, eps + 0.1 * eps).lessOrEqual(a, eps));
              }
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 0.5 }),
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isTrue(a.lessOrEqual(addFunc(a, b), eps));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, b).lessOrEqual(a, eps));
              }
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
    });
    describe(`${typeName}: Testing lessThan`, () => {
      it(`${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.lessThan(addFunc(a, 1.0)));
            assert.isTrue(a.lessThan(addFunc(a, BIGGER_THAN_EPSILON)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, 1.0).lessThan(a));
              assert.isFalse(addFunc(a, BIGGER_THAN_EPSILON).lessThan(a));
              assert.isTrue(addFunc(a, 1.0).biggerOrEqual(a));
              assert.isTrue(addFunc(a, BIGGER_THAN_EPSILON).biggerOrEqual(a));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(a.lessThan(addFunc(a, b)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, b).lessThan(a));
              assert.isTrue(addFunc(a, b).biggerOrEqual(a));
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing biggerOrEqual`, () => {
      it(`${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.biggerOrEqual(addFunc(a, SMALLER_THAN_EPSILON)));
            assert.isTrue(a.biggerOrEqual(addFunc(a, -SMALLER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(a.biggerOrEqual(addFunc(a, 1.0)));
            assert.isFalse(a.biggerOrEqual(addFunc(a, BIGGER_THAN_EPSILON)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 1.0 }), (a, b) => {
            assert.isFalse(a.biggerOrEqual(addFunc(a, b)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.biggerOrEqual(addFunc(a, -1.0)));
            assert.isTrue(a.biggerOrEqual(addFunc(a, -BIGGER_THAN_EPSILON)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, -1.0).biggerOrEqual(a));
              assert.isFalse(addFunc(a, -BIGGER_THAN_EPSILON).biggerOrEqual(a));
              assert.isTrue(addFunc(a, -1.0).lessThan(a));
              assert.isTrue(addFunc(a, -BIGGER_THAN_EPSILON).lessThan(a));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy >, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ max: -0.5, min: -10000 }),
            (a, b) => {
              assert.isTrue(a.biggerOrEqual(addFunc(a, b)));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, b).biggerOrEqual(a));
                assert.isTrue(addFunc(a, b).lessThan(a));
              }
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
              assert.isTrue(a.biggerOrEqual(addFunc(a, eps - 0.1 * eps), eps));
              assert.isTrue(a.biggerOrEqual(addFunc(a, 0.1 * eps - eps), eps));
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
              assert.isFalse(a.biggerOrEqual(addFunc(a, 1.0), eps));
              assert.isFalse(a.biggerOrEqual(addFunc(a, eps + 0.1 * eps), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1 }),
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(a.biggerOrEqual(addFunc(a, b), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(a.biggerOrEqual(addFunc(a, -1.0), eps));
              assert.isTrue(a.biggerOrEqual(addFunc(a, -eps - 0.1 * eps), eps));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, -1.0).biggerOrEqual(a, eps));
                assert.isFalse(
                  addFunc(a, -eps - 0.1 * eps).biggerOrEqual(a, eps)
                );
              }
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy >, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ max: -0.5, min: -10000 }),
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isTrue(a.biggerOrEqual(addFunc(a, b), eps));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, b).biggerOrEqual(a, eps));
              }
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
    });
    describe(`${typeName}: Testing biggerThan`, () => {
      it(`${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(a.biggerThan(addFunc(a, -1.0)));
            assert.isTrue(a.biggerThan(addFunc(a, -BIGGER_THAN_EPSILON)));
            if (!a.isPartial) {
              assert.isFalse(addFunc(a, -1.0).biggerThan(a));
              assert.isFalse(addFunc(a, -BIGGER_THAN_EPSILON).biggerThan(a));
              assert.isTrue(addFunc(a, -1.0).lessOrEqual(a));
              assert.isTrue(addFunc(a, -BIGGER_THAN_EPSILON).lessOrEqual(a));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy >, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ max: -0.5, min: -10000 }),
            (a, b) => {
              assert.isTrue(a.biggerThan(addFunc(a, b)));
              if (!a.isPartial) {
                assert.isFalse(addFunc(a, b).biggerThan(a));
                assert.isTrue(addFunc(a, b).lessOrEqual(a));
              }
            }
          ),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing transitivity`, () => {
      it(`${typeName} <= is transitive`, () => {});
    });
    describe(`${typeName}: Testing reflexivity`, () => {
      it(`${typeName} <= is reflexive`, () => {});
    });
  });
}
