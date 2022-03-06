// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     AitkenInterpolation.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import { Vec2Record } from "Math/Vec2";
import { Interpolation } from "./Interpolation";

const INDEX_NOT_FOUND = -1;

export class AitkenInterpolation implements Interpolation<number> {
  private scratch: Array<number> = [];

  private gridStep: number = 0;

  constructor(private arr: Array<[number, number]>) {
    this.arr.sort(([a, _x], [b, _y]) => a - b);

    this.gridStep = this.arr[1][0] - this.arr[0][0];
  }

  point(t: number): { x: number; y: number } {
    return { x: t, y: this.f(t) };
  }

  f(x: number): number {
    const n = this.arr.length;

    for (let i = 0; i < n; i++) {
      this.scratch[i] = this.arr[i][1];
    }

    for (let i = 0; i < n; i++) {
      for (let k = i + 1; k < n; k++) {
        const newV =
          this.scratch[i] +
          // eslint-disable-next-line no-extra-parens
          ((this.arr[i][0] - x) * (this.scratch[i] - this.scratch[k])) /
            (this.arr[k][0] - this.arr[i][0]);
        this.scratch[k] = newV;
      }
    }

    return this.scratch[n - 1];
  }

  fEvenGrid(x: number): number {
    const n = this.arr.length;

    for (let i = 0; i < n; i++) {
      this.scratch[i] = this.arr[i][1];
    }

    for (let i = 0; i < n; i++) {
      for (let k = i + 1; k < n; k++) {
        const gridFac = this.gridStep * (k - i);
        const newV =
          this.scratch[i] +
          // eslint-disable-next-line no-extra-parens
          ((this.arr[i][0] - x) * (this.scratch[i] - this.scratch[k])) /
            gridFac;
        this.scratch[k] = newV;
      }
    }

    return this.scratch[n - 1];
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
