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

// eslint-disable-next-line max-params
export function ordTests<S, T extends Ord>(
  typeName: string,
  arbType: fc.Arbitrary<S>,
  constructor: (arb: S) => T,
  addFunc: (a: S, epsilon: number) => T
) {
  describe(`Testing Ord constraint for ${typeName}`, () => {
    describe(`${typeName}: Testing lessOrEqual`, () => {
      it(`${typeName}s should compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).lessOrEqual(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              constructor(a).lessOrEqual(addFunc(a, -SMALLER_THAN_EPSILON))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(constructor(a).lessOrEqual(addFunc(a, -1.0)));
            assert.isFalse(
              constructor(a).lessOrEqual(addFunc(a, -BIGGER_THAN_EPSILON))
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
              assert.isFalse(constructor(a).lessOrEqual(addFunc(a, b)));
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(constructor(a).lessOrEqual(addFunc(a, 1.0)));
            assert.isTrue(
              constructor(a).lessOrEqual(addFunc(a, BIGGER_THAN_EPSILON))
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, 1.0).lessOrEqual(constructor(a)));
              assert.isFalse(
                addFunc(a, BIGGER_THAN_EPSILON).lessOrEqual(constructor(a))
              );
              assert.isTrue(addFunc(a, 1.0).biggerThan(constructor(a)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON).biggerThan(constructor(a))
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(constructor(a).lessOrEqual(addFunc(a, b)));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, b).lessOrEqual(constructor(a)));
              assert.isTrue(addFunc(a, b).biggerThan(constructor(a)));
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
              assert.isTrue(
                constructor(a).lessOrEqual(addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a).lessOrEqual(addFunc(a, 0.1 * eps - eps), eps)
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
              assert.isFalse(constructor(a).lessOrEqual(addFunc(a, -1.0), eps));
              assert.isFalse(
                constructor(a).lessOrEqual(addFunc(a, -eps - 0.1 * eps), eps)
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
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(constructor(a).lessOrEqual(addFunc(a, b), eps));
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
              assert.isTrue(constructor(a).lessOrEqual(addFunc(a, 1.0), eps));
              assert.isTrue(
                constructor(a).lessOrEqual(addFunc(a, eps + 0.1 * eps), eps)
              );
              if (!constructor(a).isPartial) {
                assert.isFalse(
                  addFunc(a, 1.0).lessOrEqual(constructor(a), eps)
                );
                assert.isFalse(
                  addFunc(a, eps + 0.1 * eps).lessOrEqual(constructor(a), eps)
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
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isTrue(constructor(a).lessOrEqual(addFunc(a, b), eps));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b).lessOrEqual(constructor(a), eps));
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
            assert.isTrue(constructor(a).lessThan(addFunc(a, 1.0)));
            assert.isTrue(
              constructor(a).lessThan(addFunc(a, BIGGER_THAN_EPSILON))
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, 1.0).lessThan(constructor(a)));
              assert.isFalse(
                addFunc(a, BIGGER_THAN_EPSILON).lessThan(constructor(a))
              );
              assert.isTrue(addFunc(a, 1.0).biggerOrEqual(constructor(a)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON).biggerOrEqual(constructor(a))
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy <, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 0.5 }), (a, b) => {
            assert.isTrue(constructor(a).lessThan(addFunc(a, b)));
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, b).lessThan(constructor(a)));
              assert.isTrue(addFunc(a, b).biggerOrEqual(constructor(a)));
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
            assert.isTrue(
              constructor(a).biggerOrEqual(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              constructor(a).biggerOrEqual(addFunc(a, -SMALLER_THAN_EPSILON))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isFalse(constructor(a).biggerOrEqual(addFunc(a, 1.0)));
            assert.isFalse(
              constructor(a).biggerOrEqual(addFunc(a, BIGGER_THAN_EPSILON))
            );
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should not compare equal, random`, () => {
        fc.assert(
          fc.property(arbType, fc.double({ min: 1.0 }), (a, b) => {
            assert.isFalse(constructor(a).biggerOrEqual(addFunc(a, b)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}s should satisfy >`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, -1.0)));
            assert.isTrue(
              constructor(a).biggerOrEqual(addFunc(a, -BIGGER_THAN_EPSILON))
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, -1.0).biggerOrEqual(constructor(a)));
              assert.isFalse(
                addFunc(a, -BIGGER_THAN_EPSILON).biggerOrEqual(constructor(a))
              );
              assert.isTrue(addFunc(a, -1.0).lessThan(constructor(a)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON).lessThan(constructor(a))
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
              assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, b)));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b).biggerOrEqual(constructor(a)));
                assert.isTrue(addFunc(a, b).lessThan(constructor(a)));
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
              assert.isTrue(
                constructor(a).biggerOrEqual(addFunc(a, eps - 0.1 * eps), eps)
              );
              assert.isTrue(
                constructor(a).biggerOrEqual(addFunc(a, 0.1 * eps - eps), eps)
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
                constructor(a).biggerOrEqual(addFunc(a, 1.0), eps)
              );
              assert.isFalse(
                constructor(a).biggerOrEqual(addFunc(a, eps + 0.1 * eps), eps)
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
            fc.double({ min: 1 }),
            fc.double({ min: 1e-15, max: 1e-10 }),
            (a, b, eps) => {
              assert.isFalse(constructor(a).biggerOrEqual(addFunc(a, b), eps));
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
              assert.isTrue(
                constructor(a).biggerOrEqual(addFunc(a, -1.0), eps)
              );
              assert.isTrue(
                constructor(a).biggerOrEqual(addFunc(a, -eps - 0.1 * eps), eps)
              );
              if (!constructor(a).isPartial) {
                assert.isFalse(
                  addFunc(a, -1.0).biggerOrEqual(constructor(a), eps)
                );
                assert.isFalse(
                  addFunc(a, -eps - 0.1 * eps).biggerOrEqual(
                    constructor(a),
                    eps
                  )
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
              assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, b), eps));
              if (!constructor(a).isPartial) {
                assert.isFalse(
                  addFunc(a, b).biggerOrEqual(constructor(a), eps)
                );
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
            assert.isTrue(constructor(a).biggerThan(addFunc(a, -1.0)));
            assert.isTrue(
              constructor(a).biggerThan(addFunc(a, -BIGGER_THAN_EPSILON))
            );
            if (!constructor(a).isPartial) {
              assert.isFalse(addFunc(a, -1.0).biggerThan(constructor(a)));
              assert.isFalse(
                addFunc(a, -BIGGER_THAN_EPSILON).biggerThan(constructor(a))
              );
              assert.isTrue(addFunc(a, -1.0).lessOrEqual(constructor(a)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON).lessOrEqual(constructor(a))
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
              assert.isTrue(constructor(a).biggerThan(addFunc(a, b)));
              if (!constructor(a).isPartial) {
                assert.isFalse(addFunc(a, b).biggerThan(constructor(a)));
                assert.isTrue(addFunc(a, b).lessOrEqual(constructor(a)));
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
              assert.isTrue(constructor(a).lessOrEqual(addFunc(a, 1.0)));
              assert.isTrue(
                constructor(a).lessOrEqual(addFunc(a, BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, 1.0).lessOrEqual(addFunc(a, 3.0)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON).lessOrEqual(
                  addFunc(a, 3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a).lessOrEqual(addFunc(a, 3.0)));
              assert.isTrue(
                constructor(a).lessOrEqual(addFunc(a, 3 * BIGGER_THAN_EPSILON))
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
                assert.isTrue(constructor(a).lessOrEqual(addFunc(a, b)));
                assert.isTrue(addFunc(a, b).lessOrEqual(addFunc(a, c * b)));
                assert.isTrue(constructor(a).lessOrEqual(addFunc(a, c * b)));
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
              assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, -1.0)));
              assert.isTrue(
                constructor(a).biggerOrEqual(addFunc(a, -BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, -1.0).biggerOrEqual(addFunc(a, -3.0)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON).biggerOrEqual(
                  addFunc(a, -3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, -3.0)));
              assert.isTrue(
                constructor(a).biggerOrEqual(
                  addFunc(a, -3 * BIGGER_THAN_EPSILON)
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
                assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, -b)));
                assert.isTrue(addFunc(a, -b).biggerOrEqual(addFunc(a, -c * b)));
                assert.isTrue(constructor(a).biggerOrEqual(addFunc(a, -c * b)));
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
              assert.isTrue(constructor(a).lessThan(addFunc(a, 1.0)));
              assert.isTrue(
                constructor(a).lessThan(addFunc(a, BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, 1.0).lessThan(addFunc(a, 3.0)));
              assert.isTrue(
                addFunc(a, BIGGER_THAN_EPSILON).lessThan(
                  addFunc(a, 3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a).lessThan(addFunc(a, 3.0)));
              assert.isTrue(
                constructor(a).lessThan(addFunc(a, 3 * BIGGER_THAN_EPSILON))
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
                assert.isTrue(constructor(a).lessThan(addFunc(a, b)));
                assert.isTrue(addFunc(a, b).lessThan(addFunc(a, c * b)));
                assert.isTrue(constructor(a).lessThan(addFunc(a, c * b)));
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
              assert.isTrue(constructor(a).biggerThan(addFunc(a, -1.0)));
              assert.isTrue(
                constructor(a).biggerThan(addFunc(a, -BIGGER_THAN_EPSILON))
              );
              assert.isTrue(addFunc(a, -1.0).biggerThan(addFunc(a, -3.0)));
              assert.isTrue(
                addFunc(a, -BIGGER_THAN_EPSILON).biggerThan(
                  addFunc(a, -3 * BIGGER_THAN_EPSILON)
                )
              );
              assert.isTrue(constructor(a).biggerThan(addFunc(a, -3.0)));
              assert.isTrue(
                constructor(a).biggerThan(addFunc(a, -3 * BIGGER_THAN_EPSILON))
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
                assert.isTrue(constructor(a).biggerThan(addFunc(a, -b)));
                assert.isTrue(addFunc(a, -b).biggerThan(addFunc(a, -c * b)));
                assert.isTrue(constructor(a).biggerThan(addFunc(a, -c * b)));
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
              constructor(a).lessOrEqual(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              addFunc(a, SMALLER_THAN_EPSILON).lessOrEqual(constructor(a))
            );
            assert.isTrue(constructor(a).lessOrEqual(constructor(a)));
          }),
          { verbose: true }
        );
      });
      it(`${typeName}'s biggerOrEqual is reflexive`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            assert.isTrue(
              constructor(a).biggerOrEqual(addFunc(a, SMALLER_THAN_EPSILON))
            );
            assert.isTrue(
              addFunc(a, SMALLER_THAN_EPSILON).biggerOrEqual(constructor(a))
            );
            assert.isTrue(constructor(a).biggerOrEqual(constructor(a)));
          }),
          { verbose: true }
        );
      });
    });
  });
}
