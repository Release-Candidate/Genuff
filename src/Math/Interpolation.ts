// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Interpolation.ts
// Date:     03.Mar.2022
//
// ==============================================================================
/* eslint-disable no-magic-numbers */
/* eslint-disable i18next/no-literal-string */

import { Field } from "Generics/Types";
import { Vec2RecordGen } from "Math/Vec2Generic";

/**
 * Constraints for interpolation functions.
 */
export interface Interpolation<T extends Field> {
  point(t: T): Vec2RecordGen<T>;
  f(x: T): T;
  fEvenGrid(x: T): T;
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
