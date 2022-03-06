// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     LagrangeInterpolation.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import { Vec2Record } from "Math/Vec2";
import { Interpolation } from "./Interpolation";

const INDEX_NOT_FOUND = -1;

export class LagrangeInterpolation implements Interpolation<number> {
  private scratch: Array<number> = [];

  constructor(private arr: Array<[number, number]>) {
    this.arr.sort(([a, _x], [b, _y]) => a - b);

    for (let i = 0; i < this.arr.length; i++) {
      this.scratch[i] = 1;
      for (let j = 0; j < this.arr.length; j++) {
        if (j !== i) {
          this.scratch[i] /= this.arr[i][0] - this.arr[j][0];
        }
      }
    }
  }

  point(t: number): { x: number; y: number } {
    return { x: t, y: this.f(t) };
  }

  f(x: number): number {
    const n = this.arr.length;

    let p = 0;
    for (let i = 0; i < n; i++) {
      let prod = 1;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          prod *= x - this.arr[j][0];
        }
      }
      p += this.scratch[i] * this.arr[i][1] * prod;
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
