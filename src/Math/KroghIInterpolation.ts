// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     KroghIInterpolation.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import { Vec2Record } from "Math/Vec2";
import { Interpolation } from "./Interpolation";

const INDEX_NOT_FOUND = -1;

export class KroghIInterpolation implements Interpolation<number> {
  private scratch: Array<number> = [];

  constructor(private arr: Array<[number, number]>) {
    this.arr.sort(([a, _x], [b, _y]) => a - b);
  }

  point(t: number): { x: number; y: number } {
    return { x: t, y: this.f(t) };
  }

  // eslint-disable-next-line max-statements
  f(x: number): number {
    const n = this.arr.length;

    this.scratch[0] = this.arr[0][1];
    let r = 1;
    let p = this.scratch[0];

    for (let k = 1; k < n; k++) {
      this.scratch[k] = this.arr[k][1];
      for (let i = 0; i < k; i++) {
        this.scratch[k] =
          (this.scratch[i] - this.scratch[k]) /
          (this.arr[i][0] - this.arr[k][0]);
      }
      r *= x - this.arr[k - 1][0];
      p += r * this.scratch[k];
    }
    return p;
  }

  fEvenGrid(x: number): number {
    throw new Error("Method not implemented.");
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
