// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     app.ts
// Date:     20.Feb.2022
//
// ==============================================================================

export { testApp };

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
