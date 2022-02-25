// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  GenuffY
// File:     LinAlg.ts
// Date:     24.Feb.2022
//
// ==============================================================================

import {
  Equal,
  Foldable,
  Functor,
  NotEmpty,
  OnlyNumbers,
  Ord,
  Show,
  ToString,
  VectorField,
} from "Generics/Types";
import { EPSILON } from "Math/Math";

export type VecArg<T> = OnlyNumbers & NotEmpty<T>;

export type VecN = OnlyNumbers;

export class Vector<T extends VecArg<T>>
  implements
    Show,
    ToString,
    Equal,
    Ord,
    VectorField<Vector<T>>,
    Functor<number, number, Vector<T>>,
    Foldable<{ value: number; prop: string }>
{
  /**
   * Constructor.
   *
   * Takes a non-empty object with only number properties as argument.
   *
   * @param v The vector-like object to construct the Vector from.
   */
  constructor(private v: T) {}

  toString() {
    return (
      this.reduce(
        (acc, { value, prop }) => acc + `${prop}: ${value.toString()}, `,
        "{ "
      ) + "}"
    );
  }

  show(): string {
    return this.toString();
  }

  /**
   * Iterate through all elements of `this` and apply the function `f` to each
   * element.
   *
   * Implements `Types.Functor`.
   *
   * @param f The function to apply to each element of `this`.
   * @returns The mapped vector.
   */
  map(f: (e: number) => number) {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = f(this.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c);
  }

  reduce<S>(
    f: (acc: S, e: { value: number; prop: string }) => S,
    initialValue: S
  ) {
    let retVal = initialValue;
    for (const prop in this.v) {
      retVal = f(retVal, { value: this.v[prop], prop });
    }
    return retVal;
  }

  // Implementation of `Types.VectorField` =====================================

  add(b: Vector<T>) {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] + b.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c);
  }

  subtract(b: Vector<T>) {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = (this.v[prop] - b.v[prop]) as T[Extract<keyof T, string>];
    }
    return new Vector(c);
  }

  multScalar(b: Vector<T>): Vector<T> {
    throw new Error("Method not implemented.");
  }
  addScalar(b: Vector<T>): Vector<T> {
    throw new Error("Method not implemented.");
  }
  cross(b: Vector<T>): Vector<T> {
    throw new Error("Method not implemented.");
  }
  dot(b: Vector<T>): number {
    throw new Error("Method not implemented.");
  }
  normalize(): Vector<T> {
    throw new Error("Method not implemented.");
  }
  norm(): number {
    throw new Error("Method not implemented.");
  }
  length(): number {
    throw new Error("Method not implemented.");
  }
  numElements(): number {
    throw new Error("Method not implemented.");
  }

  null = () => {
    let c = {} as T;
    for (const prop in this.v) {
      c[prop] = 0 as T[Extract<keyof T, string>];
    }
    return new Vector(c);
  };

  // Implementation of `Types.Equal`. ============================================

  equal(b: Vector<T>, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && Math.abs(this.v[prop] - b.v[prop]) < epsilon;
    }
    return retVal;
  }

  notEqual(b: Vector<T>, epsilon: number = EPSILON) {
    for (const prop in this.v) {
      if (Math.abs(this.v[prop] - b.v[prop]) >= epsilon) {
        return true;
      }
    }
    return false;
  }

  // Implementation of `Types.Ord` ===============================================

  lessOrEqual(b: Vector<T>, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      const eq = Math.abs(this.v[prop] - b.v[prop]) < epsilon;
      retVal = retVal && (this.v[prop] < b.v[prop] || eq);
    }
    return retVal;
  }

  biggerOrEqual(b: Vector<T>, epsilon: number = EPSILON) {
    let retVal = true;
    for (const prop in this.v) {
      const eq = Math.abs(this.v[prop] - b.v[prop]) < epsilon;
      retVal = retVal && (this.v[prop] > b.v[prop] || eq);
    }
    return retVal;
  }

  lessThan(b: Vector<T>) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && this.v[prop] < b.v[prop];
    }
    return retVal;
  }

  biggerThan(b: Vector<T>) {
    let retVal = true;
    for (const prop in this.v) {
      retVal = retVal && this.v[prop] > b.v[prop];
    }
    return retVal;
  }
}
