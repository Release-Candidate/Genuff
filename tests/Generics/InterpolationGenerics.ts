// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     InterpolationGenerics.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */
/* eslint-disable mocha/no-exports */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */

import { assert } from "chai";
import * as fc from "fast-check";
import { eq, Field, minus, mult, plus } from "Generics/Types";
import { Interpolation } from "../../src/Math/Interpolation";

const interpolXArray = fc.set(fc.double(), {
  minLength: 2,
  maxLength: 10,
  compare: (a, b) => Math.abs(a - b) < 0.5,
});
const interpolXYArray = fc.set(fc.tuple(fc.double(), fc.double()), {
  minLength: 2,
  maxLength: 50,
  compare: (a, b) => Math.abs(a[0] - b[0]) < 0.5,
});

export function polynomialInterpolationTests<T extends Field>(
  name: string,
  interpolation: (arr: Array<[T, T]>) => Interpolation<T>,
  fromNumber: (a: number) => T,
  epsilon: number
) {
  describe(`Testing ${name} Polynomial Interpolation`, () => {
    describe(`${name} Interpolation: comparing against known polynomials`, () => {
      it(`${name} interpolation equals to 8t^2 - 2t + 3`, () => {
        function func(t: T) {
          return t[mult](t)
            [mult](fromNumber(8))
            [minus](t[mult](fromNumber(2)))
            [plus](fromNumber(3));
        }
        const xyArr: Array<[T, T]> = [
          [fromNumber(0), func(fromNumber(0))],
          [fromNumber(4), func(fromNumber(4))],
          [fromNumber(8), func(fromNumber(8))],
        ];
        fc.assert(
          fc.property(fc.double(), (a) => {
            const x = fromNumber(a);
            const y = func(x);

            const interpolF = interpolation(xyArr);
            assert.isTrue(
              interpolF.f(x)[eq](y, epsilon),
              `x: ${x} f(x):${interpolF.f(x)} y: ${y}`
            );
            assert.isTrue(
              interpolF.fEvenlyGrid(x)[eq](y, epsilon),
              `x: ${x} f(x):${interpolF.fEvenlyGrid(x)} y: ${y}`
            );
          }),
          { verbose: true }
        );
      });
      it(`${name} interpolation equals to random 2nd degree polynomial`, () => {
        fc.assert(
          fc.property(
            interpolXArray,
            fc.double({ min: 1 }),
            fc.double(),
            fc.double(),
            (arr, a, b, c) => {
              function func(t: T) {
                return t[mult](t)
                  [mult](fromNumber(a))
                  [plus](t[mult](fromNumber(b)))
                  [plus](fromNumber(c));
              }
              const xyArr: Array<[T, T]> = [
                [fromNumber(1), func(fromNumber(1))],
                [fromNumber(5), func(fromNumber(5))],
                [fromNumber(9), func(fromNumber(9))],
              ];
              const interpolF = interpolation(xyArr);

              arr.forEach((e) => {
                const x = fromNumber(e);
                const y = func(x);
                assert.isTrue(
                  interpolF.f(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.f(x)} y: ${y}`
                );
                assert.isTrue(
                  interpolF.fEvenlyGrid(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.fEvenlyGrid(x)} y: ${y}`
                );
              });
            }
          ),
          { verbose: true }
        );
      });
      it(`${name} interpolation equals to random 3rd degree polynomial`, () => {
        fc.assert(
          fc.property(
            interpolXArray,
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double({ min: 1 }),
            (arr, a, b, c, d) => {
              function func(t: T) {
                return t[mult](t)
                  [mult](t)
                  [mult](fromNumber(d))
                  [plus](t[mult](t)[mult](fromNumber(a)))
                  [plus](t[mult](fromNumber(b)))
                  [plus](fromNumber(c));
              }
              const xyArr: Array<[T, T]> = [
                [fromNumber(0), func(fromNumber(0))],
                [fromNumber(-2), func(fromNumber(-2))],
                [fromNumber(-4), func(fromNumber(-4))],
                [fromNumber(-6), func(fromNumber(-6))],
              ];
              const interpolF = interpolation(xyArr);

              arr.forEach((e) => {
                const x = fromNumber(e);
                const y = func(x);
                assert.isTrue(
                  interpolF.f(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.f(x)} y: ${y}`
                );
                assert.isTrue(
                  interpolF.fEvenlyGrid(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.fEvenlyGrid(x)} y: ${y}`
                );
              });
            }
          ),
          { verbose: true }
        );
      });
      it(`${name} interpolation equals to random 4rd degree polynomial`, () => {
        fc.assert(
          fc.property(
            interpolXArray,
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double({ min: 1 }),
            (arr, a, b, c, d, e) => {
              function func(t: T) {
                return t[mult](t)
                  [mult](t)
                  [mult](t)
                  [mult](fromNumber(e))
                  [plus](t[mult](t)[mult](t)[mult](fromNumber(d)))
                  [plus](t[mult](t)[mult](fromNumber(a)))
                  [plus](t[mult](fromNumber(b)))
                  [plus](fromNumber(c));
              }
              const xyArr: Array<[T, T]> = [
                [fromNumber(4), func(fromNumber(4))],
                [fromNumber(5), func(fromNumber(5))],
                [fromNumber(6), func(fromNumber(6))],
                [fromNumber(7), func(fromNumber(7))],
                [fromNumber(8), func(fromNumber(8))],
              ];
              const interpolF = interpolation(xyArr);

              arr.forEach((t) => {
                const x = fromNumber(t);
                const y = func(x);
                assert.isTrue(
                  interpolF.f(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.f(x)} y: ${y}`
                );
                assert.isTrue(
                  interpolF.fEvenlyGrid(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.fEvenlyGrid(x)} y: ${y}`
                );
              });
            }
          ),
          { verbose: true }
        );
      });
      it(`${name} interpolation equals to random 5th degree polynomial`, () => {
        fc.assert(
          fc.property(
            interpolXArray,
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double(),
            fc.double({ min: 1 }),
            (arr, a, b, c, d, e, f) => {
              function func(t: T) {
                return t[mult](t)
                  [mult](t)
                  [mult](t)
                  [mult](t)
                  [mult](fromNumber(f))
                  [plus](t[mult](t)[mult](t)[mult](t)[mult](fromNumber(e)))
                  [plus](t[mult](t)[mult](t)[mult](fromNumber(d)))
                  [plus](t[mult](t)[mult](fromNumber(a)))
                  [plus](t[mult](fromNumber(b)))
                  [plus](fromNumber(c));
              }
              const xyArr: Array<[T, T]> = [
                [fromNumber(0), func(fromNumber(0))],
                [fromNumber(1), func(fromNumber(1))],
                [fromNumber(2), func(fromNumber(2))],
                [fromNumber(3), func(fromNumber(3))],
                [fromNumber(4), func(fromNumber(4))],
                [fromNumber(5), func(fromNumber(5))],
              ];
              const interpolF = interpolation(xyArr);

              arr.forEach((t) => {
                const x = fromNumber(t);
                const y = func(x);
                assert.isTrue(
                  interpolF.f(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.f(x)} y: ${y}`
                );
                assert.isTrue(
                  interpolF.fEvenlyGrid(x)[eq](y, epsilon),
                  `x: ${x} f(x):${interpolF.fEvenlyGrid(x)} y: ${y}`
                );
              });
            }
          ),
          { verbose: true }
        );
      });
    });
  });
}

export function interpolationTests<T extends Field>(
  name: string,
  interpolation: (arr: Array<[T, T]>) => Interpolation<T>,
  fromNumber: (a: number) => T,
  epsilon: number
) {
  describe(`Testing ${name} Interpolation`, () => {
    describe(`${name} Interpolation: given points are interpolated`, () => {
      it(`${name} interpolation includes given random points`, () => {
        fc.assert(
          fc.property(interpolXYArray, (arr) => {
            const xyArr: Array<[T, T]> = arr.map((e) => [
              fromNumber(e[0]),
              fromNumber(e[1]),
            ]);

            const interpolF = interpolation(xyArr);
            xyArr.forEach(([x, y]) =>
              assert.isTrue(
                interpolF.f(x)[eq](y, epsilon),
                `x: ${x} f(x): ${interpolF.f(x)} y: ${y}`
              )
            );
          }),
          { verbose: true }
        );
      });
      it(`${name} interpolation includes given random, evenly spaced, points`, () => {
        fc.assert(
          fc.property(interpolXYArray, (arr) => {
            const xyArr: Array<[T, T]> = arr.map((e, i) => [
              fromNumber(e[0] * i),
              fromNumber(e[1]),
            ]);

            const interpolF = interpolation(xyArr);
            xyArr.forEach(([x, y]) => {
              assert.isTrue(
                interpolF.f(x)[eq](y, epsilon),
                `x: ${x} f(x): ${interpolF.f(x)} y: ${y}`
              );
              assert.isTrue(
                interpolF.fEvenlyGrid(x)[eq](y, epsilon),
                `x: ${x} f(x): ${interpolF.fEvenlyGrid(x)} y: ${y}`
              );
            });
          }),
          { verbose: true }
        );
      });
    });
  });
}
