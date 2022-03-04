// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Vector_test.ts
// Date:     24.Feb.2022
//
// ==============================================================================
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */
/* eslint-disable i18next/no-literal-string */

import { assert } from "chai";
import Decimal from "decimal.js";
import * as fc from "fast-check";
import {
  cross,
  dot,
  eq,
  id,
  multScalar,
  plus,
  plusScalar,
} from "Generics/Types";
import { EPSILON } from "Math/Math";
import { Vec2Generic } from "Math/Vec2Generic";
import { Vec3Generic } from "Math/Vec3Generic";
import { Vec4Generic } from "Math/Vec4Generic";
import { VectorGeneric } from "Math/VectorGeneric";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { foldableTests } from "../../tests/Generics/FoldableGenerics";
import { functorTests } from "../../tests/Generics/FunctorGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorSpaceGenerics";

type Vec2Arb = { x: number; y: number };
const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
function vec2Decimal(v: Vec2Arb) {
  return new Vec2Generic<Decimal>({ x: new Decimal(v.x), y: new Decimal(v.y) });
}
type Vec3Arb = { x: number; y: number; z: number };
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
function vec3Decimal(v: Vec3Arb) {
  return new Vec3Generic<Decimal>({
    x: new Decimal(v.x),
    y: new Decimal(v.y),
    z: new Decimal(v.z),
  });
}
type Vec4Arb = { x: number; y: number; z: number; w: number };
const arbVec4 = fc.record({
  x: fc.double(),
  y: fc.double(),
  z: fc.double(),
  w: fc.double(),
});
function vec4Decimal(v: Vec4Arb) {
  return new Vec4Generic<Decimal>({
    x: new Decimal(v.x),
    y: new Decimal(v.y),
    z: new Decimal(v.z),
    w: new Decimal(v.w),
  });
}
type Vec10Arb = {
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
type Vec10ArbDec = {
  x1: Decimal;
  x2: Decimal;
  x3: Decimal;
  x4: Decimal;
  x5: Decimal;
  x6: Decimal;
  x7: Decimal;
  x8: Decimal;
  x9: Decimal;
  x10: Decimal;
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
function vec10Decimal(v: Vec10Arb) {
  return new VectorGeneric<Decimal, Vec10ArbDec>(
    {
      x1: new Decimal(v.x1),
      x2: new Decimal(v.x2),
      x3: new Decimal(v.x3),
      x4: new Decimal(v.x4),
      x5: new Decimal(v.x5),
      x6: new Decimal(v.x6),
      x7: new Decimal(v.x7),
      x8: new Decimal(v.x8),
      x9: new Decimal(v.x9),
      x10: new Decimal(v.x10),
    },
    new Decimal(1),
    new Decimal(0)
  );
}

describe("Testing Math/Vector", () => {
  describe("Testing generic number vectors", () => {
    describe("Testing Vec2Generic", () => {
      equalityTests<Vec2Arb, Vec2Generic<Number>>(
        "Vec2Generic",
        arbVec2,
        (v) => new Vec2Generic<Number>(v),
        (a, eps) => new Vec2Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      ordTests<Vec2Arb, Vec2Generic<Number>>(
        "Vec2Generic",
        arbVec2,
        (v) => new Vec2Generic<Number>(v),
        (a, eps) => new Vec2Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      functorTests<Number, Vec2Arb, Vec2Generic<Number>>(
        "Vec2Generic",
        arbVec2,
        (v) => new Vec2Generic<Number>(v)
      );
      foldableTests<
        Number,
        Vec2Arb,
        { value: Number; name: string },
        Vec2Generic<Number>
      >("Vec2Generic", arbVec2, (v) => new Vec2Generic<Number>(v));
      vectorTests<Vec2Arb, Number, Vec2Generic<Number>>(
        "Vec2Generic",
        arbVec2,
        (v) => new Vec2Generic<Number>(v),
        id
      );
      describe("Vec2Generic: testing dimension", () => {
        it(`Vec2Generic: dimension is 2`, () => {
          const v = new Vec2Generic({ x: 0, y: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 2);
        });
      });
      describe("Vec2Generic: testing dot with orthogonal vectors", () => {
        it(`Vec2Generic: dot of orthogonal vectors is 0`, () => {
          const v = new Vec2Generic({ x: 1, y: 0 });
          const w = new Vec2Generic({ x: 0, y: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](w), 0);
        });
      });
    });
    describe("Testing Vec3Generic", () => {
      equalityTests<Vec3Arb, Vec3Generic<Number>>(
        "Vec3Generic",
        arbVec3,
        (v) => new Vec3Generic<Number>(v),
        (a, eps) => new Vec3Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      ordTests<Vec3Arb, Vec3Generic<Number>>(
        "Vec3Generic",
        arbVec3,
        (v) => new Vec3Generic<Number>(v),
        (a, eps) => new Vec3Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      functorTests<Number, Vec3Arb, Vec3Generic<Number>>(
        "Vec3Generic",
        arbVec3,
        (v) => new Vec3Generic<Number>(v)
      );
      foldableTests<
        Number,
        Vec3Arb,
        { value: Number; name: string },
        Vec3Generic<Number>
      >("Vec3Generic", arbVec3, (v) => new Vec3Generic<Number>(v));
      vectorTests<Vec3Arb, Number, Vec3Generic<Number>>(
        "Vec3",
        arbVec3,
        (v) => new Vec3Generic<Number>(v),
        id
      );
      describe("Vec3Generic: testing dimension", () => {
        it(`Vec3Generic: dimension is 3`, () => {
          const v = new Vec3Generic({ x: 0, y: 0, z: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 3);
        });
      });
      describe("Vec3Generic: testing dot with orthogonal vectors", () => {
        it(`Vec3Generic: dot of orthogonal vectors is 0`, () => {
          const v = new Vec3Generic({ x: 1, y: 0, z: 0 });
          const w = new Vec3Generic({ x: 0, y: 1, z: 0 });
          const u = new Vec3Generic({ x: 0, y: 0, z: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](w), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](u), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(u[dot](w), 0);
        });
      });
      describe("Vec3Generic: testing cross (product)", () => {
        it(`Vec3Generic: cross of orthogonal vectors is known`, () => {
          const v = new Vec3Generic({ x: 1, y: 0, z: 0 });
          const w = new Vec3Generic({ x: 0, y: 1, z: 0 });
          const u = new Vec3Generic({ x: 0, y: 0, z: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[cross](w)[eq](u));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[cross](v)[eq](w));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[cross](u)[eq](v));
        });
        it("Vec3Generic: cross product of vector with itself is null vector", () => {
          fc.assert(
            fc.property(arbVec3, (a) => {
              const v = new Vec3Generic(a);
              assert.isTrue(v[cross](v)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
        it("Vec3Generic: cross product is anti commutative", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, (a, b) => {
              const v = new Vec3Generic(a);
              const w = new Vec3Generic(b);
              // eslint-disable-next-line no-magic-numbers
              assert.isTrue(v[cross](w)[eq](w[cross](v[multScalar](-1))));
            }),
            { verbose: true }
          );
        });
        it("Vec3Generic: cross product is compatible with scalar mult", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, fc.double(), (a, b, t) => {
              const v = new Vec3Generic(a);
              const w = new Vec3Generic(b);
              assert.isTrue(
                v[multScalar](t)[cross](w)[eq](v[cross](w)[multScalar](t))
              );
            }),
            { verbose: true }
          );
        });
        it("Vec3Generic: cross product is distributive (add)", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
              const v = new Vec3Generic(a);
              const w = new Vec3Generic(b);
              const u = new Vec3Generic(c);
              assert.isTrue(
                v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
              );
            }),
            { verbose: true }
          );
        });
        it("Vec3Generic: Jacobi identity holds for cross product", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
              const v = new Vec3Generic(a);
              const w = new Vec3Generic(b);
              const u = new Vec3Generic(c);
              const p1 = v[cross](w[cross](u));
              const p2 = w[cross](u[cross](v));
              const p3 = u[cross](v[cross](w));

              assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
      });
    });
    describe("Testing Vec4Generic", () => {
      equalityTests<Vec4Arb, Vec4Generic<Number>>(
        "Vec4Generic",
        arbVec4,
        (v) => new Vec4Generic<Number>(v),
        (a, eps) => new Vec4Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      ordTests<Vec4Arb, Vec4Generic<Number>>(
        "Vec4Generic",
        arbVec4,
        (v) => new Vec4Generic<Number>(v),
        (a, eps) => new Vec4Generic<Number>(a)[plusScalar](eps),
        EPSILON
      );
      functorTests<Number, Vec4Arb, Vec4Generic<Number>>(
        "Vec4Generic",
        arbVec4,
        (v) => new Vec4Generic<Number>(v)
      );
      foldableTests<
        Number,
        Vec4Arb,
        { value: Number; name: string },
        Vec4Generic<Number>
      >("Vec4Generic", arbVec4, (v) => new Vec4Generic<Number>(v));
      vectorTests<Vec4Arb, Number, Vec4Generic<Number>>(
        "Vec4Generic",
        arbVec4,
        (v) => new Vec4Generic<Number>(v),
        id
      );
      describe("Vec4Generic: testing dimension", () => {
        it(`Vec4Generic: dimension is 4`, () => {
          const v = new Vec4Generic({ x: 0, y: 0, z: 0, w: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 4);
        });
      });
      describe("Vec4Generic: testing dot with orthogonal vectors", () => {
        it(`Vec4Generic: dot of orthogonal vectors is 0`, () => {
          const v = new Vec4Generic({ x: 1, y: 0, z: 0, w: 0 });
          const w = new Vec4Generic({ x: 0, y: 1, z: 0, w: 0 });
          const u = new Vec4Generic({ x: 0, y: 0, z: 1, w: 0 });
          const x = new Vec4Generic({ x: 0, y: 0, z: 0, w: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](w), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](u), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(u[dot](w), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](x), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(w[dot](x), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(u[dot](x), 0);
        });
      });
      describe("Vec4Generic: testing cross (product)", () => {
        it(`Vec4Generic: cross of orthogonal vectors is known`, () => {
          const v = new Vec4Generic({ x: 1, y: 0, z: 0, w: 0 });
          const w = new Vec4Generic({ x: 0, y: 1, z: 0, w: 0 });
          const u = new Vec4Generic({ x: 0, y: 0, z: 1, w: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[cross](w)[eq](u));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[cross](v)[eq](w));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[cross](u)[eq](v));
        });
        it("Vec4Generic: cross product of vector with itself is null vector", () => {
          fc.assert(
            fc.property(arbVec4, (a) => {
              const v = new Vec4Generic(a);
              assert.isTrue(v[cross](v)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
        it("Vec4Generic: cross product is anti commutative", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, (a, b) => {
              const v = new Vec4Generic(a);
              const w = new Vec4Generic(b);
              // eslint-disable-next-line no-magic-numbers
              assert.isTrue(v[cross](w)[eq](w[cross](v[multScalar](-1))));
            }),
            { verbose: true }
          );
        });
        it("Vec4Generic: cross product is compatible with scalar mult", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, fc.double(), (a, b, t) => {
              const v = new Vec4Generic(a);
              const w = new Vec4Generic(b);
              assert.isTrue(
                v[multScalar](t)[cross](w)[eq](v[cross](w)[multScalar](t))
              );
            }),
            { verbose: true }
          );
        });
        it("Vec4Generic: cross product is distributive (add)", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
              const v = new Vec4Generic(a);
              const w = new Vec4Generic(b);
              const u = new Vec4Generic(c);
              assert.isTrue(
                v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
              );
            }),
            { verbose: true }
          );
        });
        it("Vec4Generic: Jacobi identity holds for cross product", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
              const v = new Vec4Generic(a);
              const w = new Vec4Generic(b);
              const u = new Vec4Generic(c);
              const p1 = v[cross](w[cross](u));
              const p2 = w[cross](u[cross](v));
              const p3 = u[cross](v[cross](w));

              assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
      });
    });
    describe("Testing VectorGeneric, with 10 components", () => {
      equalityTests<Vec10Arb, VectorGeneric<Number, Vec10Arb>>(
        "VectorGeneric, 10",
        arbVec10,
        (v) => new VectorGeneric<Number, Vec10Arb>(v, 1, 0),
        (a, eps) =>
          new VectorGeneric<Number, Vec10Arb>(a, 1, 0)[plusScalar](eps),
        EPSILON
      );
      ordTests<Vec10Arb, VectorGeneric<Number, Vec10Arb>>(
        "VectorGeneric, 10",
        arbVec10,
        (v) => new VectorGeneric<Number, Vec10Arb>(v, 1, 0),
        (a, eps) =>
          new VectorGeneric<Number, Vec10Arb>(a, 1, 0)[plusScalar](eps),
        EPSILON
      );
      functorTests<Number, Vec10Arb, VectorGeneric<Number, Vec10Arb>>(
        "VectorGeneric, 10",
        arbVec10,
        (v) => new VectorGeneric<Number, Vec10Arb>(v, 1, 0)
      );
      foldableTests<
        Number,
        Vec10Arb,
        { value: Number; name: string },
        VectorGeneric<Number, Vec10Arb>
      >(
        "VectorGeneric, 10",
        arbVec10,
        (v) => new VectorGeneric<Number, Vec10Arb>(v, 1, 0)
      );
      vectorTests<Vec10Arb, Number, VectorGeneric<Number, Vec10Arb>>(
        "VectorGeneric, 10",
        arbVec10,
        (v) => new VectorGeneric<Number, Vec10Arb>(v, 1, 0),
        id
      );
      describe("VectorGeneric: testing dimension", () => {
        it(`VectorGeneric: dimension is 10`, () => {
          const v = new VectorGeneric(
            {
              x1: 0,
              x2: 0,
              x3: 0,
              x4: 0,
              x5: 0,
              x6: 0,
              x7: 0,
              x8: 0,
              x9: 0,
              x10: 0,
            },
            1,
            0
          );
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 10);
        });
      });
      describe("VectorGeneric 10: testing dot with orthogonal vectors", () => {
        it(`VectorGeneric 10: dot of orthogonal vectors is 0`, () => {
          const v = new VectorGeneric(
            {
              x1: 1,
              x2: 0,
              x3: 0,
              x4: 0,
              x5: 0,
              x6: 0,
              x7: 0,
              x8: 0,
              x9: 0,
              x10: 0,
            },
            1,
            0
          );
          const w = new VectorGeneric(
            {
              x1: 0,
              x2: 0,
              x3: 0,
              x4: 0,
              x5: 1,
              x6: 0,
              x7: 0,
              x8: 0,
              x9: 0,
              x10: 0,
            },
            1,
            0
          );
          const u = new VectorGeneric(
            {
              x1: 0,
              x2: 0,
              x3: 0,
              x4: 0,
              x5: 0,
              x6: 0,
              x7: 1,
              x8: 0,
              x9: 0,
              x10: 0,
            },
            1,
            0
          );
          const x = new VectorGeneric(
            {
              x1: 0,
              x2: 0,
              x3: 0,
              x4: 0,
              x5: 0,
              x6: 0,
              x7: 0,
              x8: 0,
              x9: 0,
              x10: 1,
            },
            1,
            0
          );
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](w), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](u), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(u[dot](w), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v[dot](x), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(w[dot](x), 0);
          // eslint-disable-next-line no-magic-numbers
          assert.equal(u[dot](x), 0);
        });
      });
    });
  });
  describe("Testing generic Decimal vectors", () => {
    describe("Testing Decimal Vec2Generic", () => {
      equalityTests<Vec2Arb, Vec2Generic<Decimal>>(
        "Decimal Vec2Generic",
        arbVec2,
        (v) => vec2Decimal(v),
        (a, eps) => vec2Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      ordTests<Vec2Arb, Vec2Generic<Decimal>>(
        "Decimal Vec2Generic",
        arbVec2,
        (v) => vec2Decimal(v),
        (a, eps) => vec2Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      functorTests<Decimal, Vec2Arb, Vec2Generic<Decimal>>(
        "Decimal Vec2Generic",
        arbVec2,
        (v) => vec2Decimal(v)
      );
      foldableTests<
        Decimal,
        Vec2Arb,
        { value: Decimal; name: string },
        Vec2Generic<Decimal>
      >("Decimal Vec2Generic", arbVec2, (v) => vec2Decimal(v));
      vectorTests<Vec2Arb, Decimal, Vec2Generic<Decimal>>(
        "Decimal Vec2Generic",
        arbVec2,
        (v) => vec2Decimal(v),
        (t) => new Decimal(t)
      );
      describe("Decimal Vec2Generic: testing dimension", () => {
        it(`Decimal Vec2Generic: dimension is 2`, () => {
          // eslint-disable-next-line no-magic-numbers
          const v = new Vec2Generic({ x: new Decimal(0), y: new Decimal(0) });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 2);
        });
      });
      describe("Decimal Vec2Generic: testing dot with orthogonal vectors", () => {
        it(`Decimal Vec2Generic: dot of orthogonal vectors is 0`, () => {
          const v = vec2Decimal({ x: 1, y: 0 });
          const w = vec2Decimal({ x: 0, y: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](w)[eq](new Decimal(0)));
        });
      });
    });
    describe("Testing Decimal Vec3Generic", () => {
      equalityTests<Vec3Arb, Vec3Generic<Decimal>>(
        "Decimal Vec3Generic",
        arbVec3,
        (v) => vec3Decimal(v),
        (a, eps) => vec3Decimal(a)[plusScalar](new Decimal(eps)),
        // eslint-disable-next-line no-magic-numbers
        0
      );
      ordTests<Vec3Arb, Vec3Generic<Decimal>>(
        "Decimal Vec3Generic",
        arbVec3,
        (v) => vec3Decimal(v),
        (a, eps) => vec3Decimal(a)[plusScalar](new Decimal(eps)),
        // eslint-disable-next-line no-magic-numbers
        0
      );
      functorTests<Decimal, Vec3Arb, Vec3Generic<Decimal>>(
        "Decimal Vec3Generic",
        arbVec3,
        (v) => vec3Decimal(v)
      );
      foldableTests<
        Decimal,
        Vec3Arb,
        { value: Decimal; name: string },
        Vec3Generic<Decimal>
      >("Decimal Vec3Generic", arbVec3, (v) => vec3Decimal(v));
      vectorTests<Vec3Arb, Decimal, Vec3Generic<Decimal>>(
        "Decimal Vec3Generic",
        arbVec3,
        (v) => vec3Decimal(v),
        (a) => new Decimal(a)
      );
      describe("Decimal Vec3Generic: testing dimension", () => {
        it(`Decimal Vec3Generic: dimension is 3`, () => {
          const v = vec3Decimal({ x: 0, y: 0, z: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 3);
        });
      });
      describe("Decimal Vec3Generic: testing dot with orthogonal vectors", () => {
        it(`Decimal Vec3Generic: dot of orthogonal vectors is 0`, () => {
          const v = vec3Decimal({ x: 1, y: 0, z: 0 });
          const w = vec3Decimal({ x: 0, y: 1, z: 0 });
          const u = vec3Decimal({ x: 0, y: 0, z: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](w)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](u)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[dot](w)[eq](new Decimal(0)));
        });
      });
      describe("Decimal Vec3Generic: testing cross (product)", () => {
        it(`Decimal Vec3Generic: cross of orthogonal vectors is known`, () => {
          const v = vec3Decimal({ x: 1, y: 0, z: 0 });
          const w = vec3Decimal({ x: 0, y: 1, z: 0 });
          const u = vec3Decimal({ x: 0, y: 0, z: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[cross](w)[eq](u));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[cross](v)[eq](w));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[cross](u)[eq](v));
        });
        it("Decimal Vec3Generic: cross product of vector with itself is null vector", () => {
          fc.assert(
            fc.property(arbVec3, (a) => {
              const v = vec3Decimal(a);
              assert.isTrue(v[cross](v)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec3Generic: cross product is anti commutative", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, (a, b) => {
              const v = vec3Decimal(a);
              const w = vec3Decimal(b);
              assert.isTrue(
                // eslint-disable-next-line no-magic-numbers
                v[cross](w)[eq](w[cross](v[multScalar](new Decimal(-1))))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec3Generic: cross product is compatible with scalar mult", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, fc.double(), (a, b, t) => {
              const v = vec3Decimal(a);
              const w = vec3Decimal(b);
              assert.isTrue(
                v[multScalar](new Decimal(t))
                  [cross](w)
                  [eq](v[cross](w)[multScalar](new Decimal(t)))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec3Generic: cross product is distributive (add)", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
              const v = vec3Decimal(a);
              const w = vec3Decimal(b);
              const u = vec3Decimal(c);
              assert.isTrue(
                v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec3Generic: Jacobi identity holds for cross product", () => {
          fc.assert(
            fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
              const v = vec3Decimal(a);
              const w = vec3Decimal(b);
              const u = vec3Decimal(c);
              const p1 = v[cross](w[cross](u));
              const p2 = w[cross](u[cross](v));
              const p3 = u[cross](v[cross](w));

              assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
      });
    });
    describe("Testing Decimal Vec4Generic", () => {
      equalityTests<Vec4Arb, Vec4Generic<Decimal>>(
        "Decimal Vec4Generic",
        arbVec4,
        (v) => vec4Decimal(v),
        (a, eps) => vec4Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      ordTests<Vec4Arb, Vec4Generic<Decimal>>(
        "Decimal Vec4Generic",
        arbVec4,
        (v) => vec4Decimal(v),
        (a, eps) => vec4Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      functorTests<Decimal, Vec4Arb, Vec4Generic<Decimal>>(
        "Decimal Vec4Generic",
        arbVec4,
        (v) => vec4Decimal(v)
      );
      foldableTests<
        Decimal,
        Vec4Arb,
        { value: Decimal; name: string },
        Vec4Generic<Decimal>
      >("Decimal Vec4Generic", arbVec4, (v) => vec4Decimal(v));
      vectorTests<Vec4Arb, Decimal, Vec4Generic<Decimal>>(
        "Decimal Vec4Generic",
        arbVec4,
        (v) => vec4Decimal(v),
        (a) => new Decimal(a)
      );
      describe("Decimal Vec4Generic: testing dimension", () => {
        it(`Decimal Vec4Generic: dimension is 4`, () => {
          const v = vec4Decimal({ x: 0, y: 0, z: 0, w: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 4);
        });
      });
      describe("Decimal Vec4Generic: testing dot with orthogonal vectors", () => {
        it(`Decimal Vec4Generic: dot of orthogonal vectors is 0`, () => {
          const v = vec4Decimal({ x: 1, y: 0, z: 0, w: 0 });
          const w = vec4Decimal({ x: 0, y: 1, z: 0, w: 0 });
          const u = vec4Decimal({ x: 0, y: 0, z: 1, w: 0 });
          const x = vec4Decimal({ x: 0, y: 0, z: 0, w: 1 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](w)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](u)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[dot](w)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](x)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[dot](x)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[dot](x)[eq](new Decimal(0)));
        });
      });
      describe("Decimal Vec4Generic: testing cross (product)", () => {
        it(`Decimal Vec4Generic: cross of orthogonal vectors is known`, () => {
          const v = vec4Decimal({ x: 1, y: 0, z: 0, w: 0 });
          const w = vec4Decimal({ x: 0, y: 1, z: 0, w: 0 });
          const u = vec4Decimal({ x: 0, y: 0, z: 1, w: 0 });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[cross](w)[eq](u));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[cross](v)[eq](w));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[cross](u)[eq](v));
        });
        it("Decimal Vec4Generic: cross product of vector with itself is null vector", () => {
          fc.assert(
            fc.property(arbVec4, (a) => {
              const v = vec4Decimal(a);
              assert.isTrue(v[cross](v)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec4Generic: cross product is anti commutative", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, (a, b) => {
              const v = vec4Decimal(a);
              const w = vec4Decimal(b);
              assert.isTrue(
                // eslint-disable-next-line no-magic-numbers
                v[cross](w)[eq](w[cross](v[multScalar](new Decimal(-1))))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec4Generic: cross product is compatible with scalar mult", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, fc.double(), (a, b, t) => {
              const v = vec4Decimal(a);
              const w = vec4Decimal(b);
              assert.isTrue(
                v[multScalar](new Decimal(t))
                  [cross](w)
                  [eq](v[cross](w)[multScalar](new Decimal(t)))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec4Generic: cross product is distributive (add)", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
              const v = vec4Decimal(a);
              const w = vec4Decimal(b);
              const u = vec4Decimal(c);
              assert.isTrue(
                v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
              );
            }),
            { verbose: true }
          );
        });
        it("Decimal Vec4Generic: Jacobi identity holds for cross product", () => {
          fc.assert(
            fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
              const v = vec4Decimal(a);
              const w = vec4Decimal(b);
              const u = vec4Decimal(c);
              const p1 = v[cross](w[cross](u));
              const p2 = w[cross](u[cross](v));
              const p3 = u[cross](v[cross](w));

              assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
            }),
            { verbose: true }
          );
        });
      });
    });
    describe("Testing Decimal VectorGeneric, with 10 components", () => {
      equalityTests<Vec10Arb, VectorGeneric<Decimal, Vec10ArbDec>>(
        "Decimal VectorGeneric, 10",
        arbVec10,
        (v) => vec10Decimal(v),
        (a, eps) => vec10Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      ordTests<Vec10Arb, VectorGeneric<Decimal, Vec10ArbDec>>(
        "Decimal VectorGeneric, 10",
        arbVec10,
        (v) => vec10Decimal(v),
        (a, eps) => vec10Decimal(a)[plusScalar](new Decimal(eps)),
        EPSILON
      );
      functorTests<Decimal, Vec10Arb, VectorGeneric<Decimal, Vec10ArbDec>>(
        "Decimal VectorGeneric, 10",
        arbVec10,
        (v) => vec10Decimal(v)
      );
      foldableTests<
        Decimal,
        Vec10Arb,
        { value: Decimal; name: string },
        VectorGeneric<Decimal, Vec10ArbDec>
      >("Decimal VectorGeneric, 10", arbVec10, (v) => vec10Decimal(v));
      vectorTests<Vec10Arb, Decimal, VectorGeneric<Decimal, Vec10ArbDec>>(
        "Decimal VectorGeneric, 10",
        arbVec10,
        (v) => vec10Decimal(v),
        (a) => new Decimal(a)
      );
      describe("Decimal VectorGeneric 10: testing dimension", () => {
        it(`Decimal VectorGeneric 10 dimension is 10`, () => {
          const v = vec10Decimal({
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
            x6: 0,
            x7: 0,
            x8: 0,
            x9: 0,
            x10: 0,
          });
          // eslint-disable-next-line no-magic-numbers
          assert.equal(v.dimension(), 10);
        });
      });
      describe("Decimal VectorGeneric 10: testing dot with orthogonal vectors", () => {
        it(`Decimal VectorGeneric 10: dot of orthogonal vectors is 0`, () => {
          const v = vec10Decimal({
            x1: 1,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
            x6: 0,
            x7: 0,
            x8: 0,
            x9: 0,
            x10: 0,
          });
          const w = vec10Decimal({
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 1,
            x6: 0,
            x7: 0,
            x8: 0,
            x9: 0,
            x10: 0,
          });
          const u = vec10Decimal({
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
            x6: 0,
            x7: 1,
            x8: 0,
            x9: 0,
            x10: 0,
          });
          const x = vec10Decimal({
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0,
            x5: 0,
            x6: 0,
            x7: 0,
            x8: 0,
            x9: 0,
            x10: 1,
          });
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](w)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](u)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[dot](w)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(v[dot](x)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(w[dot](x)[eq](new Decimal(0)));
          // eslint-disable-next-line no-magic-numbers
          assert.isTrue(u[dot](x)[eq](new Decimal(0)));
        });
      });
    });
  });
});
