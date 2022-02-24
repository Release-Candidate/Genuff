/* eslint-disable init-declarations */
// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     app.ts
// Date:     20.Feb.2022
//
// ==============================================================================

export { testApp };

import { object } from "fast-check";
import i18next from "i18next";

i18next.init({
  // eslint-disable-next-line i18next/no-literal-string
  lng: "en",
  debug: true,
});

function testApp() {
  // eslint-disable-next-line no-console
  console.log(i18next.t("halloText"));
}

testApp();

const Test = {
  A: "A",
  b: "B",
} as const;

type Values<T> = T[keyof T];

function f(t: Values<typeof Test>) {
  switch (t) {
    case Test.b:
      break;

    case Test.A:
      break;

    default: {
      const exhaustiveCheck: never = t;
      return exhaustiveCheck;
    }
  }
  return t;
}

f(Test.A);

type HasNumber = {
  [key in string]: number;
};

type NotEmpty<T> = keyof T extends never ? "Object can't be empty" : {};

function add<T extends Record<string, number> & NotEmpty<T>>(a: T, b: T): T {
  let c: T = {} as T;
  for (const i in a) {
    c[i] = (a[i] + b[i]) as T[Extract<keyof T, string>];
  }

  return c;
}

type vec2 = { x: number; y: number };
type vec3 = { x: number; y: number; z: number };

const a: vec3 = { x: 6, y: 2, z: 6 };
const b: vec2 = { x: 5, y: 5 };

console.log(add(b, a));
console.log(a);
console.log(b);
