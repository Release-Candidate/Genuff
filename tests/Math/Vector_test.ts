// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vector_test.ts
// Date:     24.Feb.2022
//
// ==============================================================================
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */
/* eslint-disable i18next/no-literal-string */

import * as fc from "fast-check";
import { Vec2 } from "Math/Vec2";
import { Vec3 } from "Math/Vec3";
import { Vec4 } from "Math/Vec4";
import { Vector } from "Math/Vector";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorFieldGenerics";

type vec2Arb = { x: number; y: number };
const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
type vec3Arb = { x: number; y: number; z: number };
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
type vec4Arb = { x: number; y: number; z: number; w: number };
const arbVec4 = fc.record({
  x: fc.double(),
  y: fc.double(),
  z: fc.double(),
  w: fc.double(),
});
type vec10Arb = {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x6: number;
  x7: number;
  x8: number;
  x9: number;
  x10: number;
};
const arbVec10 = fc.record({
  x1: fc.double(),
  x2: fc.double(),
  x3: fc.double(),
  x4: fc.double(),
  x5: fc.double(),
  x6: fc.double(),
  x7: fc.double(),
  x8: fc.double(),
  x9: fc.double(),
  x10: fc.double(),
});

describe("Testing Math/Vector", () => {
  describe("Testing Vec2", () => {
    equalityTests<vec2Arb, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v),
      (a, eps) => new Vec2(a).addScalar(eps)
    );

    ordTests<vec2Arb, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v),
      (a, eps) => new Vec2(a).addScalar(eps)
    );
    vectorTests<vec2Arb, Vec2>("Vec2", arbVec2, (v) => new Vec2(v));
  });
  describe("Testing Vec3", () => {
    equalityTests<vec3Arb, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v),
      (a, eps) => new Vec3(a).addScalar(eps)
    );

    ordTests<vec3Arb, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v),
      (a, eps) => new Vec3(a).addScalar(eps)
    );
    vectorTests<vec3Arb, Vec3>("Vec3", arbVec3, (v) => new Vec3(v));
  });
  describe("Testing Vec4", () => {
    equalityTests<vec4Arb, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v),
      (a, eps) => new Vec4(a).addScalar(eps)
    );

    ordTests<vec4Arb, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v),
      (a, eps) => new Vec4(a).addScalar(eps)
    );
    vectorTests<vec4Arb, Vec4>("Vec4", arbVec4, (v) => new Vec4(v));
  });
  describe("Testing Vector, with 10 components", () => {
    equalityTests<vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a).addScalar(eps)
    );

    ordTests<vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a).addScalar(eps)
    );
    vectorTests<vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v)
    );
  });
});
