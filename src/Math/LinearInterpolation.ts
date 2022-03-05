// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     LinearInterpolation.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable no-magic-numbers */

import { Interpolation } from "./Interpolation";

const INDEX_NOT_FOUND = -1;

export class LinearInterpolation implements Interpolation<number> {
  constructor(private arr: Array<[number, number]>) {
    this.arr.sort(([a, _x], [b, _y]) => a - b);
  }

  findInterval(x: number): [[number, number], [number, number]] {
    const found = this.arr.findIndex(([xS, _f]) => xS >= x);
    if (found === INDEX_NOT_FOUND) {
      return [this.arr[this.arr.length - 2], this.arr[this.arr.length - 1]];
    } else {
      if (found === 0) {
        return [this.arr[found], this.arr[found + 1]];
      }
      return [this.arr[found - 1], this.arr[found]];
    }
  }

  point(t: number): { x: number; y: number } {
    return { x: t, y: this.f(t) };
  }

  f(x: number): number {
    const [[x0, f0], [x1, f1]] = this.findInterval(x);

    // eslint-disable-next-line no-extra-parens
    return f0 + ((f0 - f1) * (x0 - x)) / (x1 - x0);
  }

  f1(x: number): number {
    const fixPoints = this.findInterval(x);
    return (
      (fixPoints[1][1] - fixPoints[0][1]) / (fixPoints[1][0] - fixPoints[0][0])
    );
  }

  tangent(x: number): { x: number; y: number } {
    const fixPoints = this.findInterval(x);
    return {
      y: fixPoints[1][1] - fixPoints[0][1],
      x: fixPoints[1][0] - fixPoints[0][0],
    };
  }

  curvature(x: number): number {
    return 0;
  }

  radius(x: number): number {
    return NaN;
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
