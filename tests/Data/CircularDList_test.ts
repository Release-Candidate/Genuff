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
              assert.deepEqual(
                CDList.reduceL(cdList, (acc, _) => acc + 1, 0),
                a.length
              );
              assert.deepEqual(
                CDList.reduceR(cdList, (_, acc) => acc + 1, 0),
                a.length
              );
            }
          }),
          { verbose: true }
        );
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
                    assert.lengthOf(CDList.toArray(deletedList), a.length - 1);
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
                    assert.lengthOf(CDList.toArray(deletedList), a.length - 1);
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
