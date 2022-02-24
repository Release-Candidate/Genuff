// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Types.ts
// Date:     24.Feb.2022
//
// ==============================================================================

/**
 * Type constraint of objects containing only `number` properties - or none at
 * all.
 * The same as `Record<string, number>`.
 */
export type OnlyNumbers = {
  [key in string]: number;
};

/**
 * Type constraint for non-empty objects.
 */
export type NotEmpty<T> = keyof T extends never ? "Object can't be empty" : {};
