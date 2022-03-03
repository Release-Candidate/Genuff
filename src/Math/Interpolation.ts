// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Interpolation.ts
// Date:     03.Mar.2022
//
// ==============================================================================

import { Field } from "Generics/Types";
import { Vec2 } from "Math/Vec2";

export interface Interpolation<T extends Field> {
  point(t: T): Vec2;
  f(x: T): T;
  f1(x: T): T;
  tangent(x: T): Vec2;
  curvature(x: T): T;
  radius(x: T): T;
  getPoints(): Array<T[]>;
}
