// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Interpolation.ts
// Date:     03.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */

import { Field, minus } from "Generics/Types";
import { Vec2RecordGen } from "Math/Vec2Generic";

const INDEX_NOT_FOUND = -1;

/**
 * Constraints for interpolation functions.
 */
export interface Interpolation<T extends Field> {
  point(t: T): Vec2RecordGen<T>;
  f(x: T): T;
  f1(x: T): T;
  tangent(x: T): Vec2RecordGen<T>;
  curvature(x: T): T;
  radius(x: T): T;
  getPoints(): Array<T[]>;
  setF({
    x,
    f,
    f1,
    tangent,
    curvature,
    radius,
  }: {
    x: T;
    f: T;
    f1?: T;
    tangent?: T;
    curvature?: T;
    radius?: T;
  }): void;
}

export class LinearInterpolation<T extends Field> implements Interpolation<T> {
  private scratch: Array<T> = [];

  constructor(private arr: Array<[T, T]>) {
    this.arr.sort(([a, _x], [b, _y]) => a[minus](b).toNumber());
  }

  point(t: T): Vec2RecordGen<T> {
    throw new Error("Method not implemented.");
  }

  f(x: T): T {
    throw new Error("Method not implemented.");
  }

  f1(x: T): T {
    throw new Error("Method not implemented.");
  }

  tangent(x: T): Vec2RecordGen<T> {
    throw new Error("Method not implemented.");
  }

  curvature(x: T): T {
    // eslint-disable-next-line no-magic-numbers
    return this.arr[0][0].fromNumber(0);
  }

  radius(x: T): T {
    // eslint-disable-next-line no-magic-numbers
    return this.arr[0][0].fromNumber(NaN);
  }

  /**
   * Return the known points to interpolate as an array of tuples `[x, f(x)]`.
   *
   * @returns The known points to interpolate as an array of tuples `[x, f(x)]`.
   */
  getPoints(): Array<[T, T]> {
    return this.arr;
  }

  setF({ x, f }: { x: T; f: T }): void {
    const found = this.arr.findIndex(([xS, _y]) => xS === x);
    if (found === INDEX_NOT_FOUND) {
      this.arr.push([x, f]);
      this.arr.sort(([a, _x], [b, _y]) => a[minus](b).toNumber());
    } else {
      this.arr[found] = [x, f];
    }
  }
}
