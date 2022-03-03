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
import { Vec2 } from "Math/Vec2";
import { Vec3 } from "Math/Vec3";
import { Vec4 } from "Math/Vec4";
import { Vector } from "Math/Vector";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { foldableTests } from "../../tests/Generics/FoldableGenerics";
import { functorTests } from "../../tests/Generics/FunctorGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorFieldGenerics";

type Vec2Arb = { x: number; y: number };
const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
type Vec3Arb = { x: number; y: number; z: number };
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
type vec4Arb = { x: number; y: number; z: number; w: number };
const arbVec4 = fc.record({
  x: fc.double(),
  y: fc.double(),
  z: fc.double(),
  w: fc.double(),
});
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
    equalityTests<Vec2Arb, Vec2<Number>>(
      "Vec2",
      arbVec2,
      (v) => new Vec2<Number>(v),
      (a, eps) => new Vec2<Number>(a)[plusScalar](eps)
    );
    ordTests<Vec2Arb, Vec2<Number>>(
      "Vec2",
      arbVec2,
      (v) => new Vec2<Number>(v),
      (a, eps) => new Vec2<Number>(a)[plusScalar](eps)
    );
    functorTests<Number, Vec2Arb, Vec2<Number>>(
      "Vec2",
      arbVec2,
      (v) => new Vec2<Number>(v)
    );
    foldableTests<Vec2Arb, { value: Number; name: string }, Vec2<Number>>(
      "Vec2",
      arbVec2,
      (v) => new Vec2<Number>(v)
    );
    vectorTests<Vec2Arb, Number, Vec2<Number>>(
      "Vec2",
      arbVec2,
      (v) => new Vec2<Number>(v),
      id
    );
    vectorTests<Vec2Arb, Decimal, Vec2<Decimal>>(
      "Vec2 Decimal",
      arbVec2,
      (v) => new Vec2<Decimal>({ x: new Decimal(v.x), y: new Decimal(v.y) }),
      (n) => new Decimal(n)
    );
    describe("Vec2: testing dimension", () => {
      it(`Vec2: dimension is 2`, () => {
        const v = new Vec2({ x: 0, y: 0 });
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v.dimension(), 2);
      });
    });
    describe("Vec2: testing dot with orthogonal vectors", () => {
      it(`Vec2: dot of orthogonal vectors is 0`, () => {
        const v = new Vec2({ x: 1, y: 0 });
        const w = new Vec2({ x: 0, y: 1 });
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v[dot](w), 0);
      });
    });
  });
  describe("Testing Vec3", () => {
    equalityTests<Vec3Arb, Vec3<Number>>(
      "Vec3",
      arbVec3,
      (v) => new Vec3<Number>(v),
      (a, eps) => new Vec3<Number>(a)[plusScalar](eps)
    );
    ordTests<Vec3Arb, Vec3<Number>>(
      "Vec3",
      arbVec3,
      (v) => new Vec3<Number>(v),
      (a, eps) => new Vec3<Number>(a)[plusScalar](eps)
    );
    functorTests<Number, Vec3Arb, Vec3<Number>>(
      "Vec3",
      arbVec3,
      (v) => new Vec3<Number>(v)
    );
    foldableTests<Vec3Arb, { value: Number; name: string }, Vec3<Number>>(
      "Vec3",
      arbVec3,
      (v) => new Vec3<Number>(v)
    );
    vectorTests<Vec3Arb, Number, Vec3<Number>>(
      "Vec3",
      arbVec3,
      (v) => new Vec3<Number>(v),
      id
    );
    describe("Vec3: testing dimension", () => {
      it(`Vec3: dimension is 3`, () => {
        const v = new Vec3({ x: 0, y: 0, z: 0 });
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v.dimension(), 3);
      });
    });
    describe("Vec3: testing dot with orthogonal vectors", () => {
      it(`Vec3: dot of orthogonal vectors is 0`, () => {
        const v = new Vec3({ x: 1, y: 0, z: 0 });
        const w = new Vec3({ x: 0, y: 1, z: 0 });
        const u = new Vec3({ x: 0, y: 0, z: 1 });
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v[dot](w), 0);
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v[dot](u), 0);
        // eslint-disable-next-line no-magic-numbers
        assert.equal(u[dot](w), 0);
      });
    });
    describe("Vec3: testing cross (product)", () => {
      it(`Vec3: cross of orthogonal vectors is known`, () => {
        const v = new Vec3({ x: 1, y: 0, z: 0 });
        const w = new Vec3({ x: 0, y: 1, z: 0 });
        const u = new Vec3({ x: 0, y: 0, z: 1 });
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(v[cross](w)[eq](u));
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(u[cross](v)[eq](w));
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(w[cross](u)[eq](v));
      });
      it("Vec4: cross product of vector with itself is null vector", () => {
        fc.assert(
          fc.property(arbVec3, (a) => {
            const v = new Vec3(a);
            assert.isTrue(v[cross](v)[eq](v.null()));
          }),
          { verbose: true }
        );
      });
      it("Vec3: cross product is anti commutative", () => {
        fc.assert(
          fc.property(arbVec3, arbVec3, (a, b) => {
            const v = new Vec3(a);
            const w = new Vec3(b);
            // eslint-disable-next-line no-magic-numbers
            assert.isTrue(v[cross](w)[eq](w[cross](v[multScalar](-1))));
          }),
          { verbose: true }
        );
      });
      it("Vec3: cross product is compatible with scalar mult", () => {
        fc.assert(
          fc.property(arbVec3, arbVec3, fc.double(), (a, b, t) => {
            const v = new Vec3(a);
            const w = new Vec3(b);
            assert.isTrue(
              // eslint-disable-next-line newline-per-chained-call
              v[multScalar](t)[cross](w)[eq](v[cross](w)[multScalar](t))
            );
          }),
          { verbose: true }
        );
      });
      it("Vec3: cross product is distributive (add)", () => {
        fc.assert(
          fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
            const v = new Vec3(a);
            const w = new Vec3(b);
            const u = new Vec3(c);
            assert.isTrue(
              v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
            );
          }),
          { verbose: true }
        );
      });
      it("Vec3: Jacobi identity holds for cross product", () => {
        fc.assert(
          fc.property(arbVec3, arbVec3, arbVec3, (a, b, c) => {
            const v = new Vec3(a);
            const w = new Vec3(b);
            const u = new Vec3(c);
            const p1 = v[cross](w[cross](u));
            const p2 = w[cross](u[cross](v));
            const p3 = u[cross](v[cross](w));
            // eslint-disable-next-line newline-per-chained-call
            assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
          }),
          { verbose: true }
        );
      });
    });
  });
  describe("Testing Vec4", () => {
    equalityTests<vec4Arb, Vec4<Number>>(
      "Vec4",
      arbVec4,
      (v) => new Vec4<Number>(v),
      (a, eps) => new Vec4<Number>(a)[plusScalar](eps)
    );
    ordTests<vec4Arb, Vec4<Number>>(
      "Vec4",
      arbVec4,
      (v) => new Vec4<Number>(v),
      (a, eps) => new Vec4<Number>(a)[plusScalar](eps)
    );
    functorTests<Number, vec4Arb, Vec4<Number>>(
      "Vec4",
      arbVec4,
      (v) => new Vec4<Number>(v)
    );
    foldableTests<vec4Arb, { value: Number; name: string }, Vec4<Number>>(
      "Vec4",
      arbVec4,
      (v) => new Vec4<Number>(v)
    );
    vectorTests<vec4Arb, Number, Vec4<Number>>(
      "Vec4",
      arbVec4,
      (v) => new Vec4<Number>(v),
      id
    );
    describe("Vec4: testing dimension", () => {
      it(`Vec4: dimension is 4`, () => {
        const v = new Vec4({ x: 0, y: 0, z: 0, w: 0 });
        // eslint-disable-next-line no-magic-numbers
        assert.equal(v.dimension(), 4);
      });
    });
    describe("Vec4: testing dot with orthogonal vectors", () => {
      it(`Vec4: dot of orthogonal vectors is 0`, () => {
        const v = new Vec4({ x: 1, y: 0, z: 0, w: 0 });
        const w = new Vec4({ x: 0, y: 1, z: 0, w: 0 });
        const u = new Vec4({ x: 0, y: 0, z: 1, w: 0 });
        const x = new Vec4({ x: 0, y: 0, z: 0, w: 1 });
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
    describe("Vec4: testing cross (product)", () => {
      it(`Vec4: cross of orthogonal vectors is known`, () => {
        const v = new Vec4({ x: 1, y: 0, z: 0, w: 0 });
        const w = new Vec4({ x: 0, y: 1, z: 0, w: 0 });
        const u = new Vec4({ x: 0, y: 0, z: 1, w: 0 });
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(v[cross](w)[eq](u));
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(u[cross](v)[eq](w));
        // eslint-disable-next-line no-magic-numbers
        assert.isTrue(w[cross](u)[eq](v));
      });
      it("Vec4: cross product of vector with itself is null vector", () => {
        fc.assert(
          fc.property(arbVec4, (a) => {
            const v = new Vec4(a);
            assert.isTrue(v[cross](v)[eq](v.null()));
          }),
          { verbose: true }
        );
      });
      it("Vec4: cross product is anti commutative", () => {
        fc.assert(
          fc.property(arbVec4, arbVec4, (a, b) => {
            const v = new Vec4(a);
            const w = new Vec4(b);
            // eslint-disable-next-line no-magic-numbers
            assert.isTrue(v[cross](w)[eq](w[cross](v[multScalar](-1))));
          }),
          { verbose: true }
        );
      });
      it("Vec4: cross product is compatible with scalar mult", () => {
        fc.assert(
          fc.property(arbVec4, arbVec4, fc.double(), (a, b, t) => {
            const v = new Vec4(a);
            const w = new Vec4(b);
            assert.isTrue(
              // eslint-disable-next-line newline-per-chained-call
              v[multScalar](t)[cross](w)[eq](v[cross](w)[multScalar](t))
            );
          }),
          { verbose: true }
        );
      });
      it("Vec4: cross product is distributive (add)", () => {
        fc.assert(
          fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
            const v = new Vec4(a);
            const w = new Vec4(b);
            const u = new Vec4(c);
            assert.isTrue(
              v[cross](w[plus](u))[eq](v[cross](w)[plus](v[cross](u)))
            );
          }),
          { verbose: true }
        );
      });
      it("Vec4: Jacobi identity holds for cross product", () => {
        fc.assert(
          fc.property(arbVec4, arbVec4, arbVec4, (a, b, c) => {
            const v = new Vec4(a);
            const w = new Vec4(b);
            const u = new Vec4(c);
            const p1 = v[cross](w[cross](u));
            const p2 = w[cross](u[cross](v));
            const p3 = u[cross](v[cross](w));
            // eslint-disable-next-line newline-per-chained-call
            assert.isTrue(p1[plus](p2)[plus](p3)[eq](v.null()));
          }),
          { verbose: true }
        );
      });
    });
  });
  describe("Testing Vector, with 10 components", () => {
    equalityTests<Vec10Arb, Vector<Vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a)[plusScalar](eps)
    );
    ordTests<Vec10Arb, Vector<Vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a)[plusScalar](eps)
    );
    functorTests<Number, Vec10Arb, Vector<Vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v)
    );
    foldableTests<Vec10Arb, { value: number; name: string }, Vector<Vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v)
    );
    vectorTests<Vec10Arb, Number, Vector<Vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      id
    );
    describe("Vec10: testing dimension", () => {
      it(`Vec10: dimension is 10`, () => {
        const v = new Vector({
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
    describe("Vector 10: testing dot with orthogonal vectors", () => {
      it(`Vector 10: dot of orthogonal vectors is 0`, () => {
        const v = new Vector({
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
        const w = new Vector({
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
        const u = new Vector({
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
        const x = new Vector({
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
