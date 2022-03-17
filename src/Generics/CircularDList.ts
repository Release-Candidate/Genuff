// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     CircularDList.ts
// Date:     17.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

/**
 * This is a circular, doubly linked list.
 *
 * Fields:
 *  * value - The value of the node.
 *  * left - Link to the left neighbor ('before').
 *  * right - Link to the right neighbor ('after').
 */
export class CircularDList<T> {
  value: T;
  left: CircularDList<T>;
  right: CircularDList<T>;

  /**
   * Return a new circular doubly linked list that links to itself.
   *
   * The `value` is set to `item`, `left` and `right` link to itself.
   *
   * @param item The value of the node.
   */
  constructor(item: T) {
    this.value = item;
    this.left = this;
    this.right = this;
  }

  /**
   * Return a string representation of the circular doubly linked list.
   *
   * @returns A string representation of the circular doubly linked list.
   */
  toString(): string {
    return toStringR<T>(this);
  }
}

/**
 * The type of a search result.
 *
 * If the item has been found, the node with the item as value is returned.
 * Else `"NotFound"` is returned.
 */
export type SearchResult<T> = "NotFound" | CircularDList<T>;

/**
 * Construct a circular double linked list from the given array.
 *
 * The first element is the value of the returned node, the elements after the
 * first are appended to the right of this node.
 *
 * @param arr The array to construct the circular doubly linked list from.
 *
 * @returns The filled circular doubly linked list. Returns `null` if the given
 * array is empty.
 */
export function fromArray<T>(arr: Array<T>) {
  if (arr === []) {
    return null;
  }
  // eslint-disable-next-line no-magic-numbers
  let retVal = new CircularDList(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    insertLeft(retVal, arr[i]);
  }

  return retVal;
}

/**
 * Convert the circular doubly linked list to an array.
 *
 * The first element of the array is the value of the given node, the elements
 * after the first are the nodes to the right of the given node.
 *
 * @param dList The circular doubly linked list to convert.
 *
 * @returns The circular doubly linked list converted to an array.
 */
export function toArray<T>(dList: CircularDList<T>): Array<T> {
  const start = dList;
  let curr = dList;
  let retVal = [curr.value];
  while (curr.right !== start) {
    curr = curr.right;
    retVal.push(curr.value);
  }

  return retVal;
}

/**
 * Map the values of the nodes of the circular doubly linked list by applying a
 * function to each of the values.
 *
 * @param dList The circular doubly linked list to map.
 * @param f The function to apply to each node's value.
 *
 * @returns The mapped circular doubly linked list.
 */
export function map<S, T>(
  dList: CircularDList<S>,
  f: (e: S) => T
): CircularDList<T> {
  const start = dList;
  let curr = dList;
  let retVal = new CircularDList(f(curr.value));
  while (curr.right !== start) {
    curr = curr.right;
    insertLeft(retVal, f(curr.value));
  }

  return retVal;
}

/**
 * Reduce the circular doubly linked list by applying a function to the value of
 * each node and the given accumulator.
 *
 * Accumulates to the right (always traversing to the right neighbor node).
 *
 * @param dList The circular doubly linked list to reduce.
 * @param f The function to apply to each element `e` and the accumulator `acc`.
 * @param first The starting value of the accumulator.
 *
 * @returns The reduced circular doubly linked list.
 */
export function reduceR<S, T>(
  dList: CircularDList<S>,
  f: (e: S, acc: T) => T,
  first: T
): T {
  const start = dList;
  let curr = dList;
  let retVal = f(curr.value, first);
  while (curr.right !== start) {
    curr = curr.right;
    retVal = f(curr.value, retVal);
  }

  return retVal;
}

/**
 * Reduce the circular doubly linked list by applying a function to the value of
 * each node and the given accumulator.
 *
 * Accumulates to the left (always traversing to the left neighbor node).
 *
 * @param dList The circular doubly linked list to reduce.
 * @param f The function to apply to each element `e` and the accumulator `acc`.
 * @param first The starting value of the accumulator.
 *
 * @returns The reduced circular doubly linked list.
 */
export function reduceL<S, T>(
  dList: CircularDList<S>,
  f: (acc: T, e: S) => T,
  first: T
): T {
  const start = dList;
  let curr = dList;
  let retVal = f(first, curr.value);
  while (curr.left !== start) {
    curr = curr.left;
    retVal = f(retVal, curr.value);
  }

  return retVal;
}

/**
 * Return the first node (to the right) that matches the given predicate.
 *
 * @param dList The circular doubly linked list to search.
 * @param pred The predicate to apply to each node. If this returns true, the
 *             node is returned.
 *
 * @returns The first node when going to the 'right' that fulfills the predicate.
 * If no such node has been found, `"NotFound"` is returned.
 */
export function searchIfR<T>(
  dList: CircularDList<T>,
  pred: (node: CircularDList<T>) => boolean
): SearchResult<T> {
  const start = dList;
  let curr = dList;
  let retVal: SearchResult<T> = "NotFound";
  while (curr.right !== start) {
    if (pred(curr)) {
      return curr;
    }
    curr = curr.right;
  }

  return retVal;
}

/**
 * Return the first node (to the left) that matches the given predicate.
 *
 * @param dList The circular doubly linked list to search.
 * @param pred The predicate to apply to each node. If this returns true, the
 *             node is returned.
 *
 * @returns The first node when going to the 'left' that fulfills the predicate.
 * If no such node has been found, `"NotFound"` is returned.
 */
export function searchIfL<T>(
  dList: CircularDList<T>,
  pred: (node: CircularDList<T>) => boolean
): SearchResult<T> {
  const start = dList;
  let curr = dList;
  let retVal: SearchResult<T> = "NotFound";
  while (curr.left !== start) {
    if (pred(curr)) {
      return curr;
    }
    curr = curr.left;
  }

  return retVal;
}

/**
 * Return the first node (to the right) that has the the given `item` as value.
 *
 * @param dList The circular doubly linked list to search.
 * @param item The value of a node to search for.
 *
 * @returns The first node when going to the 'right' that has `item` as value.
 * If no such node has been found, `"NotFound"` is returned.
 */
export function searchR<T>(dList: CircularDList<T>, item: T): SearchResult<T> {
  const start = dList;
  let curr = dList;
  let retVal: SearchResult<T> = "NotFound";
  while (curr.right !== start) {
    if (curr.value === item) {
      return curr;
    }
    curr = curr.right;
  }

  return retVal;
}

/**
 * Return the first node (to the left) that has the the given `item` as value.
 *
 * @param dList The circular doubly linked list to search.
 * @param item The value of a node to search for.
 *
 * @returns The first node when going to the 'left' that has `item` as value.
 * If no such node has been found, `"NotFound"` is returned.
 */
export function searchL<T>(dList: CircularDList<T>, item: T): SearchResult<T> {
  const start = dList;
  let curr = dList;
  let retVal: SearchResult<T> = "NotFound";
  while (curr.left !== start) {
    if (curr.value === item) {
      return curr;
    }
    curr = curr.left;
  }

  return retVal;
}

/**
 * Delete all nodes with the given `item` as value.
 *
 * @param dList The circular doubly linked list to delete nodes of.
 * @param item Delete nodes from the list which have this as value.
 *
 * @returns The circular doubly linked list with the deleted nodes. If no node
 * has been found `"NotFound"` is returned.
 */
// eslint-disable-next-line max-statements
export function deleteAllNodes<T>(
  dList: CircularDList<T>,
  item: T
): SearchResult<T> {
  let searchRes = searchR(dList, item);
  if (searchRes === "NotFound") {
    return "NotFound";
  }
  let retVal = dList;
  while (searchRes !== "NotFound") {
    const { left, right } = searchRes as CircularDList<T>;
    left.right = right;
    right.left = left;
    retVal = left;
    searchRes = searchR(right, item);
  }

  return retVal;
}

/**
 * Delete the first node to the 'right' nodes with the given `item` as value.
 *
 * @param dList The circular doubly linked list to delete nodes of.
 * @param item Delete the first node from the list which has this as value.
 *
 * @returns The circular doubly linked list with the deleted node. If no node
 * has been found `"NotFound"` is returned.
 */
export function deleteNodeR<T>(
  dList: CircularDList<T>,
  item: T
): SearchResult<T> {
  const searchRes = searchR(dList, item);
  if (searchRes === "NotFound") {
    return "NotFound";
  }
  const { left, right } = searchRes;
  left.right = right;
  right.left = left;
  return left;
}

/**
 * Delete the first node to the 'left' nodes with the given `item` as value.
 *
 * @param dList The circular doubly linked list to delete nodes of.
 * @param item Delete the first node from the list which has this as value.
 *
 * @returns The circular doubly linked list with the deleted node. If no node
 * has been found `"NotFound"` is returned.
 */
export function deleteNodeL<T>(
  dList: CircularDList<T>,
  item: T
): SearchResult<T> {
  const searchRes = searchL(dList, item);
  if (searchRes === "NotFound") {
    return "NotFound";
  }
  const { left, right } = searchRes;
  left.right = right;
  right.left = left;
  return right;
}

/**
 * Insert a node with the given `item` as value to the right of the current one.
 *
 * @param dList The circular doubly linked list to insert the node into.
 * @param item The value of the node to insert
 *
 * @returns The circular doubly linked list with the inserted node.
 */
export function insertRight<T>(dList: CircularDList<T>, item: T) {
  const right = { value: item, left: dList, right: dList.right };
  dList.right.left = right;
  dList.right = right;
  return dList;
}

/**
 * Insert a node with the given `item` as value to the left of the current one.
 *
 * @param dList The circular doubly linked list to insert the node into.
 * @param item The value of the node to insert
 *
 * @returns The circular doubly linked list with the inserted node.
 */
export function insertLeft<T>(dList: CircularDList<T>, item: T) {
  const left = { value: item, left: dList.left, right: dList };
  dList.left.right = left;
  dList.left = left;
  return dList;
}

/**
 * Return a string representation of the circular doubly linked list.
 *
 * Traverses the circular doubly linked list to the 'right'.
 *
 * @param dList The circular doubly linked list to convert.
 *
 * @returns A string representation of the circular doubly linked list.
 */
export function toStringR<T extends { toString: () => string }>(
  dList: CircularDList<T>
) {
  const start = dList;
  let outString = dList.value.toString();
  let curr = dList;
  while (curr.right !== start) {
    outString += ` -> ${curr.right.value.toString()}`;
    curr = curr.right;
  }
  outString += ` -> ${start.value.toString()}`;
  return outString;
}

/**
 * Return a string representation of the circular doubly linked list.
 *
 * Traverses the circular doubly linked list to the 'left'.
 *
 * @param dList The circular doubly linked list to convert.
 *
 * @returns A string representation of the circular doubly linked list.
 */
export function toStringL<T extends { toString: () => string }>(
  dList: CircularDList<T>
) {
  const start = dList;
  let outString = dList.value.toString();
  let curr = dList;
  while (curr.left !== start) {
    outString = `${curr.left.value.toString()} <- ` + outString;
    curr = curr.left;
  }
  outString = `${start.value.toString()} <- ` + outString;
  return outString;
}
