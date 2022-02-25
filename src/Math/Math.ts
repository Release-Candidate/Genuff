// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Math.ts
// Date:     25.Feb.2022
//
// ==============================================================================

/**
 * Epsilon to use for float comparisons.
 *
 * Do not use `Number.EPSILON`, as errors in floating point calculations are
 * bigger than `Number.EPSILON`, which is the smallest difference between two
 * floating point numbers of type `number`.
 */
export const EPSILON = 10e-10;
