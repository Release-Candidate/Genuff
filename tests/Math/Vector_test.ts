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
import { Vec2, Vec2Record } from "Math/Vec2";
import { Vec3, Vec3Record } from "Math/Vec3";
import { Vec4, Vec4Record } from "Math/Vec4";
import { Vector } from "Math/Vector";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { foldableTests } from "../../tests/Generics/FoldableGenerics";
import { functorTests } from "../../tests/Generics/FunctorGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";
import { vectorTests } from "../../tests/Generics/VectorSpaceGenerics";

const arbVec2 = fc.record({ x: fc.double(), y: fc.double() });
const arbVec3 = fc.record({ x: fc.double(), y: fc.double(), z: fc.double() });
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
    equalityTests<Vec2Record, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v),
      (a, eps) => new Vec2(a)[plusScalar](eps),
      EPSILON
    );
    ordTests<Vec2Record, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v),
      (a, eps) => new Vec2(a)[plusScalar](eps),
      EPSILON
    );
    functorTests<number, Vec2Record, Vec2>("Vec2", arbVec2, (v) => new Vec2(v));
    foldableTests<Number, Vec2Record, { value: number; name: string }, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v)
    );
    vectorTests<Vec2Record, Number, Vec2>(
      "Vec2",
      arbVec2,
      (v) => new Vec2(v),
      id
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
    equalityTests<Vec3Record, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v),
      (a, eps) => new Vec3(a)[plusScalar](eps),
      EPSILON
    );
    ordTests<Vec3Record, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v),
      (a, eps) => new Vec3(a)[plusScalar](eps),
      EPSILON
    );
    functorTests<number, Vec3Record, Vec3>("Vec3", arbVec3, (v) => new Vec3(v));
    foldableTests<Number, Vec3Record, { value: number; name: string }, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v)
    );
    vectorTests<Vec3Record, Number, Vec3>(
      "Vec3",
      arbVec3,
      (v) => new Vec3(v),
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
    equalityTests<Vec4Record, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v),
      (a, eps) => new Vec4(a)[plusScalar](eps),
      EPSILON
    );
    ordTests<Vec4Record, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v),
      (a, eps) => new Vec4(a)[plusScalar](eps),
      EPSILON
    );
    functorTests<number, Vec4Record, Vec4>("Vec4", arbVec4, (v) => new Vec4(v));
    foldableTests<Number, Vec4Record, { value: number; name: string }, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v)
    );
    vectorTests<Vec4Record, Number, Vec4>(
      "Vec4",
      arbVec4,
      (v) => new Vec4(v),
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
    equalityTests<vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a)[plusScalar](eps),
      EPSILON
    );
    ordTests<vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v),
      (a, eps) => new Vector(a)[plusScalar](eps),
      EPSILON
    );
    functorTests<number, vec10Arb, Vector<vec10Arb>>(
      "Vector, 10",
      arbVec10,
      (v) => new Vector(v)
    );
    foldableTests<
      Number,
      vec10Arb,
      { value: number; name: string },
      Vector<vec10Arb>
    >("Vector, 10", arbVec10, (v) => new Vector(v));
    vectorTests<vec10Arb, Number, Vector<vec10Arb>>(
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
