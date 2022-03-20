// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     CircularDList_test.ts
// Date:     19.Mar.2022
//
// ==============================================================================
/* eslint-disable max-statements */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */

import { assert } from "chai";
import * as fc from "fast-check";
import * as CDList from "../../src/Generics/CircularDList";
import { id } from "../../src/Generics/Types";

function genericCDListTests<S>(typeName: string, arbType: fc.Arbitrary<S>) {
  describe(`Testing generic circular doubly linked list for ${typeName}`, () => {
    describe(`${typeName}: testing fromArray and toArray`, () => {
      it(`${typeName}: fromArray([]) == null`, () => {
        const cdList = CDList.fromArray([]);

        assert.isNull(cdList, "`ERROR: a === [] but fromArray(a) != null`");
      });

      it(`${typeName}: fromArray([]) == null and vice versa`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: fromArray ° toArray == id`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.deepEqual(a, CDList.toArray(cdList));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: fromArray([x]) is 1 element list`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const cdList = CDList.fromArray([a]);
            assert.isNotNull(
              cdList,
              `ERROR: a !== [] but fromArray(a) == null`
            );
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.strictEqual(cdList.value, a);
              assert.strictEqual(cdList.left.value, a);
              assert.strictEqual(cdList.right.value, a);
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: fromArray([a, b]) is 2 element list`, () => {
        fc.assert(
          fc.property(arbType, arbType, (a, b) => {
            const cdList = CDList.fromArray([a, b]);
            assert.isNotNull(
              cdList,
              `ERROR: a !== [] but fromArray(a) == null`
            );
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.strictEqual(cdList.value, a);
              assert.strictEqual(cdList.left.value, b);
              assert.strictEqual(cdList.right.value, b);
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: fromArray([a, b, c]) is 3 element list`, () => {
        fc.assert(
          fc.property(arbType, arbType, arbType, (a, b, c) => {
            const cdList = CDList.fromArray([a, b, c]);
            assert.isNotNull(
              cdList,
              `ERROR: a !== [] but fromArray(a) == null`
            );
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.strictEqual(cdList.value, a);
              assert.strictEqual(cdList.left.value, c);
              assert.strictEqual(cdList.left.left.value, b);
              assert.strictEqual(cdList.right.value, b);
              assert.strictEqual(cdList.right.right.value, c);
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing length`, () => {
      it(`${typeName}: length of random list`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              assert.strictEqual(a.length, CDList.length(cdList));
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: length of 1 element list`, () => {
        fc.assert(
          fc.property(arbType, (a) => {
            const cdList = new CDList.CircularDList(a);
            assert.strictEqual(CDList.length(cdList), 1);
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing goRight`, () => {
      it(`${typeName}: go random steps right`, () => {
        fc.assert(
          fc.property(
            fc.array(arbType, { minLength: 2 }),
            fc.integer(),
            (a, b) => {
              const cdList = CDList.fromArray(a);
              if (cdList == null) {
                assert.fail("ERROR: circular list is null, but array is !=[]");
              } else {
                const numSteps =
                  // eslint-disable-next-line no-extra-parens
                  (Math.abs(b) % (CDList.length(cdList) - 1)) + 1;
                const right = CDList.goRight(cdList, numSteps);
                if (right === "NotFound") {
                  assert.fail("ERROR: goRight returned NotFound");
                } else {
                  assert.strictEqual(a[numSteps], right.value);
                }
              }
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}: 0 steps is same node`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = 0;
              const right = CDList.goRight(cdList, numSteps);
              if (right === "NotFound") {
                assert.fail("ERROR: goRight returned NotFound");
              } else {
                assert.strictEqual(cdList.value, right.value);
                assert.strictEqual(a[numSteps], right.value);
              }
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: 1 step`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = 1;
              const right = CDList.goRight(cdList, numSteps);
              if (right === "NotFound") {
                assert.fail("ERROR: goRight returned NotFound");
              } else {
                assert.strictEqual(cdList.right.value, right.value);
                assert.strictEqual(a[numSteps], right.value);
              }
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: too many steps`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = a.length;
              const right = CDList.goRight(cdList, numSteps);
              assert.strictEqual(
                right,
                "NotFound",
                `length: ${CDList.length(cdList)} steps: ${numSteps}`
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: negative steps`, () => {
        fc.assert(
          fc.property(
            fc.array(arbType, { minLength: 2 }),
            fc.integer(),
            (a, b) => {
              const cdList = CDList.fromArray(a);
              if (cdList == null) {
                assert.fail("ERROR: circular list is null, but array is !=[]");
              } else {
                const numSteps = -Math.abs(b) - 1;
                const right = CDList.goRight(cdList, numSteps);
                assert.strictEqual(
                  right,
                  "NotFound",
                  `length: ${CDList.length(cdList)} steps: ${numSteps}`
                );
              }
            }
          ),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing goLeft`, () => {
      it(`${typeName}: go random steps left`, () => {
        fc.assert(
          fc.property(
            fc.array(arbType, { minLength: 2 }),
            fc.integer(),
            (a, b) => {
              const cdList = CDList.fromArray(a);
              if (cdList == null) {
                assert.fail("ERROR: circular list is null, but array is !=[]");
              } else {
                const numSteps =
                  // eslint-disable-next-line no-extra-parens
                  (Math.abs(b) % (CDList.length(cdList) - 1)) + 1;
                const checkArray = [a[0]].concat(a.slice(1).reverse());
                const left = CDList.goLeft(cdList, numSteps);
                if (left === "NotFound") {
                  assert.fail("ERROR: goRight returned NotFound");
                } else {
                  assert.strictEqual(checkArray[numSteps], left.value);
                }
              }
            }
          ),
          { verbose: true }
        );
      });
      it(`${typeName}: 0 steps is same node`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = 0;
              const left = CDList.goLeft(cdList, numSteps);
              if (left === "NotFound") {
                assert.fail("ERROR: goRight returned NotFound");
              } else {
                assert.strictEqual(cdList.value, left.value);
                assert.strictEqual(a[numSteps], left.value);
              }
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: 1 step`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = 1;
              const left = CDList.goLeft(cdList, numSteps);
              if (left === "NotFound") {
                assert.fail("ERROR: goRight returned NotFound");
              } else {
                assert.strictEqual(cdList.left.value, left.value);
                assert.strictEqual(a[a.length - 1], left.value);
              }
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: too many steps`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
            const cdList = CDList.fromArray(a);
            if (cdList == null) {
              assert.fail("ERROR: circular list is null, but array is !=[]");
            } else {
              const numSteps = a.length;
              const left = CDList.goLeft(cdList, numSteps);
              assert.strictEqual(
                left,
                "NotFound",
                `length: ${CDList.length(cdList)} steps: ${numSteps}`
              );
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: negative steps`, () => {
        fc.assert(
          fc.property(
            fc.array(arbType, { minLength: 2 }),
            fc.integer(),
            (a, b) => {
              const cdList = CDList.fromArray(a);
              if (cdList == null) {
                assert.fail("ERROR: circular list is null, but array is !=[]");
              } else {
                const numSteps = -Math.abs(b) - 1;
                const left = CDList.goLeft(cdList, numSteps);
                assert.strictEqual(
                  left,
                  "NotFound",
                  `length: ${CDList.length(cdList)} steps: ${numSteps}`
                );
              }
            }
          ),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing insert`, () => {
      it(`${typeName}: insertLeft array is array`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 1 }), (a) => {
            const cdList = new CDList.CircularDList(a[0]);
            for (const item of a.slice(1)) {
              CDList.insertLeft(cdList, item);
            }
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.deepEqual(CDList.toArray(cdList), a);
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: insertRight array is reverse array`, () => {
        fc.assert(
          fc.property(fc.array(arbType, { minLength: 1 }), (a) => {
            const cdList = new CDList.CircularDList(a[0]);
            for (const item of a.slice(1).reverse()) {
              CDList.insertRight(cdList, item);
            }
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.deepEqual(CDList.toArray(cdList), a);
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing map`, () => {
      it(`${typeName}: map(l, id) === l`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.deepEqual(CDList.map(cdList, id), cdList);
              assert.deepEqual(CDList.toArray(CDList.map(cdList, id)), a);
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing reduce`, () => {
      it(`${typeName}: reduce result is length`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.strictEqual(
                CDList.reduceL(cdList, (acc, _) => acc + 1, 0),
                a.length
              );
              assert.strictEqual(
                CDList.reduceR(cdList, (_, acc) => acc + 1, 0),
                a.length
              );
            }
          }),
          { verbose: true }
        );
      });
    });
    describe(`${typeName}: testing search`, () => {
      describe(`${typeName}: testing searchR`, () => {
        it(`${typeName}: search random list`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2 }),
              fc.integer(),
              (a, b) => {
                const cdList = CDList.fromArray(a);
                const searchItem = a[Math.abs(b) % a.length];
                if (cdList == null) {
                  assert.fail(
                    "ERROR: circular list is null, but array is !=[]"
                  );
                } else {
                  const searchRes = CDList.searchR(cdList, searchItem);
                  if (searchRes === "NotFound") {
                    assert.fail("ERROR: searchR returned NotFound!");
                  } else {
                    assert.strictEqual(searchItem, searchRes.value);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: search not found`, () => {
          fc.assert(
            fc.property(arbType, arbType, (a, b) => {
              const cdList = new CDList.CircularDList(a);
              const searchItem = b;
              if (a === b) {
                assert.ok(true);
              } else {
                assert.strictEqual(
                  CDList.searchR(cdList, searchItem),
                  "NotFound"
                );
              }
            }),
            { verbose: true }
          );
        });
      });
    });
    describe(`${typeName}: testing deleteNode(s)`, () => {
      describe(`${typeName}: testing deleteAllNodes`, () => {
        it(`${typeName}: deleteAllNodes deletes whole list`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              const cdList = new CDList.CircularDList(a);
              CDList.insertLeft(cdList, a);

              const deletedList = CDList.deleteAllNodes(cdList, a);
              if (deletedList === "NotFound") {
                assert.fail(
                  `ERROR: Element ${a} not found in ${CDList.toStringR(cdList)}`
                );
              } else if (deletedList == null) {
                assert.isTrue(true);
              } else {
                assert.fail(
                  `ERROR: list ${CDList.toStringR(deletedList)} is not null!`
                );
              }
            }),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteAllNodes deletes random item`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2 }),
              fc.integer({ min: 0, max: 1000 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];
                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  const deletedList = CDList.deleteAllNodes(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.notInclude(CDList.toArray(deletedList), toDelete);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteAllNodes deletes current item`, () => {
          fc.assert(
            fc.property(fc.array(arbType, { minLength: 2 }), (a) => {
              const cdList = CDList.fromArray(a);
              const toDelete = a[0];
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
              if (cdList != null) {
                const deletedList = CDList.deleteAllNodes(cdList, toDelete);
                if (deletedList === "NotFound") {
                  assert.fail(
                    `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                      cdList
                    )}`
                  );
                } else if (deletedList == null) {
                  assert.fail("ERROR: list should not be null");
                } else {
                  assert.notInclude(CDList.toArray(deletedList), toDelete);
                }
              }
            }),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteAllNodes deletes random item 3 times`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2 }),
              fc.integer({ min: 0, max: 1000 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];

                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  CDList.insertLeft(cdList, toDelete);
                  CDList.insertRight(cdList, toDelete);
                  const deletedList = CDList.deleteAllNodes(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.notInclude(CDList.toArray(deletedList), toDelete);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
      });
      describe(`${typeName}: testing deleteNodeR`, () => {
        it(`${typeName}: deleteNodeR deletes whole list`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              const cdList = new CDList.CircularDList(a);

              const deletedList = CDList.deleteNodeR(cdList, a);
              if (deletedList === "NotFound") {
                assert.fail(
                  `ERROR: Element ${a} not found in ${CDList.toStringR(cdList)}`
                );
              } else if (deletedList == null) {
                assert.isTrue(true);
              } else {
                assert.fail(
                  `ERROR: list ${CDList.toStringR(deletedList)} is not null!`
                );
              }
            }),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeR deletes random item`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              fc.integer({ min: 0, max: 20 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];
                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  const deletedList = CDList.deleteNodeR(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.strictEqual(
                      CDList.length(deletedList),
                      a.length - 1
                    );
                    const numItems = a.reduce(
                      // eslint-disable-next-line no-extra-parens
                      (acc, e) => (e === toDelete ? acc + 1 : acc),
                      0
                    );

                    const numItemsList = CDList.reduceR(
                      deletedList,
                      // eslint-disable-next-line no-extra-parens
                      (e, acc) => (e === toDelete ? acc + 1 : acc),
                      0
                    );
                    assert.strictEqual(numItems - 1, numItemsList);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeR deletes current item`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              (a) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[0];
                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  const deletedList = CDList.deleteNodeR(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.strictEqual(
                      CDList.length(deletedList),
                      a.length - 1
                    );
                    const numItems = a.reduce(
                      // eslint-disable-next-line no-extra-parens
                      (acc, e) => (e === toDelete ? acc + 1 : acc),
                      0
                    );

                    const numItemsList = CDList.reduceR(
                      deletedList,
                      // eslint-disable-next-line no-extra-parens
                      (e, acc) => (e === toDelete ? acc + 1 : acc),
                      0
                    );
                    assert.strictEqual(numItems - 1, numItemsList);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeR deletes only one of two items`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              fc.integer({ min: 0, max: 100 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];

                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  CDList.insertLeft(cdList, toDelete);
                  const deletedList = CDList.deleteNodeR(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.include(CDList.toArray(deletedList), toDelete);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
      });
      describe(`${typeName}: testing deleteNodeL`, () => {
        it(`${typeName}: deleteNodeL deletes whole list`, () => {
          fc.assert(
            fc.property(arbType, (a) => {
              const cdList = new CDList.CircularDList(a);

              const deletedList = CDList.deleteNodeL(cdList, a);
              if (deletedList === "NotFound") {
                assert.fail(
                  `ERROR: Element ${a} not found in ${CDList.toStringR(cdList)}`
                );
              } else if (deletedList == null) {
                assert.isTrue(true);
              } else {
                assert.fail(
                  `ERROR: list ${CDList.toStringR(deletedList)} is not null!`
                );
              }
            }),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeL deletes random item`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              fc.integer({ min: 0, max: 20 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];
                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  const deletedList = CDList.deleteNodeL(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.strictEqual(
                      CDList.length(deletedList),
                      a.length - 1
                    );
                    const numItems = a.reduce(
                      // eslint-disable-next-line no-extra-parens
                      (acc, e) => (e === toDelete ? acc + 1 : acc),
                      0
                    );

                    const numItemsList = CDList.reduceR(
                      deletedList,
                      // eslint-disable-next-line no-extra-parens
                      (e, acc) => (e === toDelete ? acc + 1 : acc),
                      0
                    );
                    assert.strictEqual(numItems - 1, numItemsList);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeL deletes current item`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              (a) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[0];
                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  const deletedList = CDList.deleteNodeL(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.strictEqual(
                      CDList.length(deletedList),
                      a.length - 1
                    );
                    const numItems = a.reduce(
                      // eslint-disable-next-line no-extra-parens
                      (acc, e) => (e === toDelete ? acc + 1 : acc),
                      0
                    );

                    const numItemsList = CDList.reduceR(
                      deletedList,
                      // eslint-disable-next-line no-extra-parens
                      (e, acc) => (e === toDelete ? acc + 1 : acc),
                      0
                    );
                    assert.strictEqual(numItems - 1, numItemsList);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
        it(`${typeName}: deleteNodeL deletes only one of two items`, () => {
          fc.assert(
            fc.property(
              fc.array(arbType, { minLength: 2, maxLength: 20 }),
              fc.integer({ min: 0, max: 100 }),
              (a, i) => {
                const cdList = CDList.fromArray(a);
                const toDelete = a[i % a.length];

                assert.isNotNull(
                  cdList,
                  `ERROR: a !== [] but fromArray(a) == null`
                );
                if (cdList != null) {
                  CDList.insertRight(cdList, toDelete);
                  const deletedList = CDList.deleteNodeL(cdList, toDelete);
                  if (deletedList === "NotFound") {
                    assert.fail(
                      `ERROR: Element ${toDelete} not found in ${CDList.toStringR(
                        cdList
                      )}`
                    );
                  } else if (deletedList == null) {
                    assert.deepEqual(a, a.reverse());
                  } else {
                    assert.include(CDList.toArray(deletedList), toDelete);
                  }
                }
              }
            ),
            { verbose: true }
          );
        });
      });
    });
  });
}
function numStringCDListTests<S extends { toString: () => string }>(
  typeName: string,
  arbType: fc.Arbitrary<S>
) {
  describe(`Testing number or string circular doubly linked list for ${typeName}`, () => {
    describe(`${typeName}: testing map`, () => {
      it(`${typeName}: map(l, (string +)) === map(arr, (+))`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.deepEqual(
                CDList.toArray(
                  CDList.map(cdList, (e) => e.toString() + "test")
                ),
                a.map((e) => e.toString() + "test")
              );
              assert.deepEqual(CDList.toArray(CDList.map(cdList, id)), a);
            }
          }),
          { verbose: true }
        );
      });
      it(`${typeName}: reduceL is reduceR reversed`, () => {
        fc.assert(
          fc.property(fc.array(arbType), (a) => {
            const cdList = CDList.fromArray(a);
            const leftArr = [a[0]].concat(a.slice(1).reverse());
            if (a.length === 0) {
              assert.isNull(
                cdList,
                "`ERROR: a === [] but fromArray(a) != null`"
              );
            } else {
              assert.isNotNull(
                cdList,
                `ERROR: a !== [] but fromArray(a) == null`
              );
            }
            if (cdList != null) {
              assert.isNotEmpty(cdList);
              assert.strictEqual(
                CDList.reduceL(
                  cdList,
                  (acc, e) => acc + `${e.toString()} `,
                  ""
                ),
                leftArr.reduce((acc, e) => acc + `${e.toString()} `, "")
              );
              assert.strictEqual(
                CDList.reduceR(
                  cdList,
                  (e, acc) => acc + `${e.toString()} `,
                  ""
                ),
                a.reduce((acc, e) => acc + `${e.toString()} `, "")
              );
            }
          }),
          { verbose: true }
        );
      });
    });
  });
}

describe("Testing Generics/CircularDList", () => {
  describe("Testing circular doubly linked list of doubles", () => {
    genericCDListTests("CDList doubles", fc.double());
    numStringCDListTests("CDList doubles", fc.double());
  });
});
