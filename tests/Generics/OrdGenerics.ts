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
import { ge, gt, le, lt, Ord } from "Generics/Types";
import { EPSILON } from "Math/Math";

// eslint-disable-next-line max-params
export function ordTests<S, T extends Ord>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T,
  addFunc: (a: S, eps: number) => T,
  epsilon: number
) {
  const BIGGER_THAN_EPSILON = epsilon > 0 ? epsilon + 0.01 * epsilon : EPSILON;
  const SMALLER_THAN_EPSILON = epsilon - 0.01 * epsilon;
  describe(`Testing Ord constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing lessOrEqual, epsilon: ${epsilon}`, () => {
      it(`${typeName}s should compare equal: ${SMALLER_THAN_EPSILON}`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a)[le](addFunc(a, SMALLER_THAN_EPSILON), epsilon)
            );
            assert.isTrue(
              constructor(a)[le](addFunc(a, -SMALLER_THAN_EPSILON), epsilon)
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal, ${BIGGER_THAN_EPSILON}`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(constructor(a)[le](addFunc(a, -1.0), epsilon));
            assert.isFalse(
              constructor(a)[le](addFunc(a, -BIGGER_THAN_EPSILON), epsilon)
            );
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
              assert.isFalse(constructor(a)[le](addFunc(a, b), epsilon));
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(constructor(a)[le](addFunc(a, 1.0), epsilon));
            assert.isTrue(
              constructor(a)[le](addFunc(a, BIGGER_THAN_EPSILON), epsilon)
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, 1.0)[le](constructor(a), epsilon));
              assert.isFalse(
                addFunc(a, BIGGER_THAN_EPSILON)[le](constructor(a), epsilon)
              );
              assert.isTrue(addFunc(a, 1.0)[gt](constructor(a)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON)[gt](constructor(a))
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(constructor(a)[le](addFunc(a, b), epsilon));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, b)[le](constructor(a), epsilon));
              assert.isTrue(addFunc(a, b)[gt](constructor(a)));
            }
          }),
          { verbose: true }
        );
      });
      it(`Random Epsilon: ${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a)[le](addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a)[le](addFunc(a, 0.1 * eps - eps), eps)
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isFalse(constructor(a)[le](addFunc(a, -1.0), eps));
              assert.isFalse(
                constructor(a)[le](addFunc(a, -eps - 0.1 * eps), eps)
              );
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(constructor(a)[le](addFunc(a, b), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(constructor(a)[le](addFunc(a, 1.0), eps));
              assert.isTrue(
                constructor(a)[le](addFunc(a, eps + 0.1 * eps), eps)
              );
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, 1.0)[le](constructor(a), eps));
                assert.isFalse(
                  addFunc(a, eps + 0.1 * eps)[le](constructor(a), eps)
                );
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, b, eps) => {
              assert.isTrue(constructor(a)[le](addFunc(a, b), eps));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b)[le](constructor(a), eps));
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
            assert.isTrue(constructor(a)[lt](addFunc(a, 1.0)));
            assert.isTrue(constructor(a)[lt](addFunc(a, BIGGER_THAN_EPSILON)));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, 1.0)[lt](constructor(a)));
              assert.isFalse(
                addFunc(a, BIGGER_THAN_EPSILON)[lt](constructor(a))
              );
              assert.isTrue(addFunc(a, 1.0)[ge](constructor(a), epsilon));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON)[ge](constructor(a), epsilon)
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(constructor(a)[lt](addFunc(a, b)));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, b)[lt](constructor(a)));
              assert.isTrue(addFunc(a, b)[ge](constructor(a), epsilon));
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing biggerOrEqual, epsilon: ${epsilon}`, () => {
      it(`${typeName}s should compare equal: ${SMALLER_THAN_EPSILON}`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a)[ge](addFunc(a, SMALLER_THAN_EPSILON), epsilon)
            );
            assert.isTrue(
              constructor(a)[ge](addFunc(a, -SMALLER_THAN_EPSILON), epsilon)
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(constructor(a)[ge](addFunc(a, 1.0), epsilon));
            assert.isFalse(
              constructor(a)[ge](addFunc(a, BIGGER_THAN_EPSILON), epsilon)
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 1.0 }), (a, b) => {
            assert.isFalse(constructor(a)[ge](addFunc(a, b), epsilon));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(constructor(a)[ge](addFunc(a, -1.0), epsilon));
            assert.isTrue(
              constructor(a)[ge](addFunc(a, -BIGGER_THAN_EPSILON), epsilon)
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, -1.0)[ge](constructor(a), epsilon));
              assert.isFalse(
                addFunc(a, -BIGGER_THAN_EPSILON)[ge](constructor(a), epsilon)
              );
              assert.isTrue(addFunc(a, -1.0)[lt](constructor(a)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON)[lt](constructor(a))
              );
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
              assert.isTrue(constructor(a)[ge](addFunc(a, b), epsilon));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b)[ge](constructor(a), epsilon));
                assert.isTrue(addFunc(a, b)[lt](constructor(a)));
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(
                constructor(a)[ge](addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a)[ge](addFunc(a, 0.1 * eps - eps), eps)
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isFalse(constructor(a)[ge](addFunc(a, 1.0), eps));
              assert.isFalse(
                constructor(a)[ge](addFunc(a, eps + 0.2 * eps), eps)
              );
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1.1 }),
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(constructor(a)[ge](addFunc(a, b), eps));
            }
          ),
          { verbose: true, numRuns: 1000 }
        );
      });
      it(`Random Epsilon: ${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(
            arbType,
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, eps) => {
              assert.isTrue(constructor(a)[ge](addFunc(a, -1.0), eps));
              assert.isTrue(
                constructor(a)[ge](addFunc(a, -eps - 0.1 * eps), eps)
              );
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, -1.0)[ge](constructor(a), eps));
                assert.isFalse(
                  addFunc(a, -eps - 0.1 * eps)[ge](constructor(a), eps)
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
            fc.double({ min: 1e-14, max: 1e-10 }),
            (a, b, eps) => {
              assert.isTrue(constructor(a)[ge](addFunc(a, b), eps));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b)[ge](constructor(a), eps));
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
            assert.isTrue(constructor(a)[gt](addFunc(a, -1.0)));
            assert.isTrue(constructor(a)[gt](addFunc(a, -BIGGER_THAN_EPSILON)));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, -1.0)[gt](constructor(a)));
              assert.isFalse(
                addFunc(a, -BIGGER_THAN_EPSILON)[gt](constructor(a))
              );
              assert.isTrue(addFunc(a, -1.0)[le](constructor(a), epsilon));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON)[le](constructor(a), epsilon)
              );
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
              assert.isTrue(constructor(a)[gt](addFunc(a, b)));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b)[gt](constructor(a)));
                assert.isTrue(addFunc(a, b)[le](constructor(a), epsilon));
              }
            }
          ),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: Testing transitivity`, () => {
      describe(`${typeName} <= is transitive`, () => {
        it(`${typeName}'s lessOrEqual is transitive`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              assert.isTrue(constructor(a)[le](addFunc(a, 1.0), epsilon));
              assert.isTrue(
                constructor(a)[le](addFunc(a, BIGGER_THAN_EPSILON), epsilon)
              );
              assert.isTrue(addFunc(a, 1.0)[le](addFunc(a, 3.0), epsilon));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON)[le](
                  addFunc(a, 3 * BIGGER_THAN_EPSILON),
                  epsilon
                )
              );
              assert.isTrue(constructor(a)[le](addFunc(a, 3.0), epsilon));
              assert.isTrue(
                constructor(a)[le](addFunc(a, 3 * BIGGER_THAN_EPSILON), epsilon)
              );
            }),
            { verbose: true }
          );
        });
        it(`${typeName}'s lessOrEqual is transitive, random`, () => {
          fc.assert(
            fc.property(
              arbType,
              fc.double({ min: 0.5 }),
              fc.double({ min: 2.0, max: 1000 }),
              (a, b, c) => {
                assert.isTrue(constructor(a)[le](addFunc(a, b), epsilon));
                assert.isTrue(addFunc(a, b)[le](addFunc(a, c * b), epsilon));
                assert.isTrue(constructor(a)[le](addFunc(a, c * b), epsilon));
              }
            ),
            { verbose: true }
          );
        });
      });
      describe(`${typeName} >= is transitive`, () => {
        it(`${typeName}'s biggerOrEqual is transitive`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              assert.isTrue(constructor(a)[ge](addFunc(a, -1.0), epsilon));
              assert.isTrue(
                constructor(a)[ge](addFunc(a, -BIGGER_THAN_EPSILON), epsilon)
              );
              assert.isTrue(addFunc(a, -1.0)[ge](addFunc(a, -3.0), epsilon));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON)[ge](
                  addFunc(a, -3 * BIGGER_THAN_EPSILON),
                  epsilon
                )
              );
              assert.isTrue(constructor(a)[ge](addFunc(a, -3.0), epsilon));
              assert.isTrue(
                constructor(a)[ge](
                  addFunc(a, -3 * BIGGER_THAN_EPSILON),
                  epsilon
                )
              );
            }),
            { verbose: true }
          );
        });
        it(`${typeName}'s biggerOrEqual is transitive, random`, () => {
          fc.assert(
            fc.property(
              arbType,
              fc.double({ min: 0.5 }),
              fc.double({ min: 2.0, max: 1000 }),
              (a, b, c) => {
                assert.isTrue(constructor(a)[ge](addFunc(a, -b)));
                assert.isTrue(addFunc(a, -b)[ge](addFunc(a, -c * b)));
                assert.isTrue(constructor(a)[ge](addFunc(a, -c * b)));
              }
            ),
            { verbose: true }
          );
        });
      });
      describe(`${typeName} < is transitive`, () => {
        it(`${typeName}'s lessThan is transitive`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              assert.isTrue(constructor(a)[lt](addFunc(a, 1.0)));
              assert.isTrue(
                constructor(a)[lt](addFunc(a, BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, 1.0)[lt](addFunc(a, 3.0)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON)[lt](
                  addFunc(a, 3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a)[lt](addFunc(a, 3.0)));
              assert.isTrue(
                constructor(a)[lt](addFunc(a, 3 * BIGGER_THAN_EPSILON))
              );
            }),
            { verbose: true }
          );
        });
        it(`${typeName}'s lessThan is transitive, random`, () => {
          fc.assert(
            fc.property(
              arbType,
              fc.double({ min: 0.5 }),
              fc.double({ min: 2.0, max: 1000 }),
              (a, b, c) => {
                assert.isTrue(constructor(a)[lt](addFunc(a, b)));
                assert.isTrue(addFunc(a, b)[lt](addFunc(a, c * b)));
                assert.isTrue(constructor(a)[lt](addFunc(a, c * b)));
              }
            ),
            { verbose: true }
          );
        });
      });
      describe(`${typeName} > is transitive`, () => {
        it(`${typeName}'s biggerThan is transitive`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              assert.isTrue(constructor(a)[gt](addFunc(a, -1.0)));
              assert.isTrue(
                constructor(a)[gt](addFunc(a, -BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, -1.0)[gt](addFunc(a, -3.0)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON)[gt](
                  addFunc(a, -3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a)[gt](addFunc(a, -3.0)));
              assert.isTrue(
                constructor(a)[gt](addFunc(a, -3 * BIGGER_THAN_EPSILON))
              );
            }),
            { verbose: true }
          );
        });
        it(`${typeName}'s biggerThan is transitive, random`, () => {
          fc.assert(
            fc.property(
              arbType,
              fc.double({ min: 0.5 }),
              fc.double({ min: 2.0, max: 1000 }),
              (a, b, c) => {
                assert.isTrue(constructor(a)[gt](addFunc(a, -b)));
                assert.isTrue(addFunc(a, -b)[gt](addFunc(a, -c * b)));
                assert.isTrue(constructor(a)[gt](addFunc(a, -c * b)));
              }
            ),
            { verbose: true }
          );
        });
      });
    });
    describe(`${typeName}: Testing reflexivity`, () => {
      it(`${typeName}'s lessOrEqual is reflexive`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a)[le](addFunc(a, SMALLER_THAN_EPSILON), epsilon)
            );
            assert.isTrue(
              addFunc(a, SMALLER_THAN_EPSILON)[le](constructor(a), epsilon)
            );
            assert.isTrue(constructor(a)[le](constructor(a), epsilon));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}'s biggerOrEqual is reflexive`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a)[ge](addFunc(a, SMALLER_THAN_EPSILON), epsilon)
            );
            assert.isTrue(
              addFunc(a, SMALLER_THAN_EPSILON)[ge](constructor(a), epsilon)
            );
            assert.isTrue(constructor(a)[ge](constructor(a), epsilon));
          }),
          { verbose: true }
        );
      });
    });
  });
}
