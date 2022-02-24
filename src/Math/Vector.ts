// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  GenuffY
// File:     LinAlg.ts
// Date:     24.Feb.2022
//
// ==============================================================================

import { NotEmpty, OnlyNumbers } from "Generics/Types";

export function add<T extends OnlyNumbers & NotEmpty<T>>(a: T, b: T): T {
  // eslint-disable-next-line no-param-reassign
  let c = {} as T;

  for (const i in a) {
    c[i] = (a[i] + b[i]) as T[Extract<keyof T, string>];
  }

  return c;
}

export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };
export type Vec4 = { x: number; y: number; z: number; w: number };

export type VecN = OnlyNumbers;
