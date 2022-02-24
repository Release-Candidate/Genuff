// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     main_bench.mjs
// Date:     21.Feb.2022
//
// ==============================================================================
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable chai-friendly/no-unused-expressions */
/* eslint-disable i18next/no-literal-string */

import * as b from "benny";

function random1000() {
  return Math.random() * 2000 - 1000;
}

b.suite(
  `Test Benchmarks`,
  b.add("Multiply two arrays", () => {
    const a = [random1000(), random1000(), random1000()];
    const d = [random1000(), random1000(), random1000()];
    let c = [a[0] + d[0] * a[0], d[1] + a[1] * d[1], d[2] - a[2] * d[2]];
  }),
  b.add("Multiply two records", () => {
    const a = { x: random1000(), y: random1000(), z: random1000() };
    const d = { x: random1000(), y: random1000(), z: random1000() };
    let c = { x: a.x + d.x * a.x, y: d.y + a.y * d.y, z: d.z - a.z * d.z };
  }),
  b.add("Multiply two records 2", () => {
    const a = { x: random1000(), y: random1000(), z: random1000() };
    const d = { x: random1000(), y: random1000(), z: random1000() };
    let c = {
      x: 45 * a.x + d.x * a.x,
      y: -46 * d.y + a.y * d.y,
      z: 5.46 * d.z - a.z * d.z,
    };
  }),
  b.add("Multiply two arrays 2", () => {
    const a = [random1000(), random1000(), random1000()];
    const d = [random1000(), random1000(), random1000()];
    let c = [
      45 * a[0] + d[0] * a[0],
      -46 * d[1] + a[1] * d[1],
      5.46 * d[2] - a[2] * d[2],
    ];
  }),
  b.cycle(),
  b.complete()
);
