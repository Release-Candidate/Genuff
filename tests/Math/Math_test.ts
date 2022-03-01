// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math_test.ts
// Date:     01.Mar.2022
//
// ==============================================================================
/* eslint-disable i18next/no-literal-string */
/* eslint-disable no-magic-numbers */

import * as fc from "fast-check";
import { equalityTests } from "../../tests/Generics/EqualGenerics";
import { ordTests } from "../../tests/Generics/OrdGenerics";

describe("Testing Math/Math", () => {
  /**
   * Tests of the constraint `Equal`.
   */
  equalityTests("number", fc.double(), (a, eps) => a + eps);
  ordTests("number", fc.double(), (a, eps) => a + eps);
});
