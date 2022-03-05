// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     NevilleInterpolation.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import { Vec2Record } from "Math/Vec2";
import { Interpolation } from "./Interpolation";

const INDEX_NOT_FOUND = -1;

export class NevilleInterpolation implements Interpolation<number> {
  private scratch: number[] = [];

  constructor(private arr: Array<[number, number]>) {
    this.arr.sort(([a, _x], [b, _y]) => a - b);
  }

  point(t: number): { x: number; y: number } {
    return { x: t, y: this.f(t) };
  }

  f(x: number): number {
    const n = this.arr.length;
    for (let i = 0; i < n; i++) {
      //  this.scratch[i] = [...Array(n).keys()]
      this.scratch[i] = this.arr[i][1];
    }

    for (let i = 0; i < n - 1; i++) {
      for (let k = i + 1; k < n; k++) {
        this.scratch[k - i - 1] =
          this.scratch[k - i - 1] +
          // eslint-disable-next-line no-extra-parens
          ((this.arr[k - i - 1][0] - x) *
            (this.scratch[k - i - 1] - this.scratch[k - i])) /
            (this.arr[k][0] - this.arr[k - i - 1][0]);
      }
    }

    return this.scratch[0];
  }

  f1(x: number): number {
    throw new Error("Method not implemented.");
  }

  tangent(x: number): Vec2Record {
    throw new Error("Method not implemented.");
  }

  curvature(x: number): number {
    throw new Error("Method not implemented.");
  }

  radius(x: number): number {
    throw new Error("Method not implemented.");
  }

  /**
   * Return the known points to interpolate as an array of tuples `[x, f(x)]`.
   *
   * @returns The known points to interpolate as an array of tuples `[x, f(x)]`.
   */
  getPoints(): Array<[number, number]> {
    return this.arr;
  }

  setF({ x, f }: { x: number; f: number }): void {
    const found = this.arr.findIndex(([xS, _y]) => xS === x);
    if (found === INDEX_NOT_FOUND) {
      this.arr.push([x, f]);
      this.arr.sort(([a, _x], [b, _y]) => a - b);
    } else {
      this.arr[found] = [x, f];
    }
  }
}
