// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Decimal.res
// Date:     24.Mar.2022
//
// ==============================================================================
// FFI to decimal.js.

@ocaml.doc("A decimal.js arbitrary-precision decimal type")
type t

@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from a float.")
external createDecimal: float => t = "default"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from an int.")
external createDecimalI: int => t = "default"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from a string.")
external createDecimalSt: string => t = "default"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from another decimal.")
external copyDecimal: t => t = "default"

@send @ocaml.doc("Convert the decimal to a string.")
external toString: (t, unit) => string = "toString"
@send @ocaml.doc("Return the absolute value of the decimal.")
external abs: t => t = "abs"
@send @ocaml.doc("Round to positive infinity, return integer.")
external ceil: t => t = "ceil"
@send @ocaml.doc("Compare two decimals. Returns -1, 0, 1 or NaN if one of the decimals is NaN. ")
external cmp: (t, t) => float = "cmp"
@send @ocaml.doc("Clamp the decimal to [min, max].")
external clamp: (t, t, t) => t = "clamp"
@send @ocaml.doc("Clamp the decimal to [min, max].")
external clampI: (t, int, int) => t = "clamp"
@send @ocaml.doc("Clamp the decimal to [min, max].")
external clampF: (t, float, float) => t = "clamp"
@send @ocaml.doc("Cosine of the decimal as radians.")
external cos: t => t = "cos"
@send @ocaml.doc("Cube root.")
external cbrt: t => t = "cbrt"
@send @ocaml.doc("Return the number of decimal places.")
external decimalPlaces: t => t = "decimalPlaces"
@send @ocaml.doc("Divide the decimal by the given decimal.")
external div: (t, t) => t = "div"
@send @ocaml.doc("Return the integer part of the division.")
external divToInt: (t, t) => t = "divToInt"
@send @ocaml.doc("Return true if the decimals are equal, false else.")
external eq: (t, t) => bool = "eq"
@send @ocaml.doc("Round to negative infinity, return integer.")
external floor: t => t = "floor"
@send @ocaml.doc("Return true if the given decimal is greater than this.")
external gt: (t, t) => bool = "gt"
@send @ocaml.doc("Return true if the given decimal is greater than or equal to this.")
external gte: (t, t) => bool = "gte"
@send @ocaml.doc("Hyperbolic cosine of the decimal as radians.")
external cosh: t => t = "cosh"
@send @ocaml.doc("Hyperbolic sine of the decimal as radians.")
external sinh: t => t = "sinh"
@send @ocaml.doc("Hyperbolic tangent of the decimal as radians..")
external tanh: t => t = "tanh"
@send @ocaml.doc("Inverse cosine of the decimal as radians.")
external acos: t => t = "acos"
@send @ocaml.doc("Inverse hyperbolic cosine of the decimal as radians.")
external acosh: t => t = "acosh"
@send @ocaml.doc("Inverse hyperbolic sine of the decimal as radians.")
external asinh: t => t = "asinh"
@send @ocaml.doc("Inverse hyperbolic tangent of the decimal as radians.")
external atanh: t => t = "atanh"
@send @ocaml.doc("Inverse sine of the decimal as radians.")
external asin: t => t = "asin"
@send @ocaml.doc("Inverse tangent of the decimal as radians.")
external atan: t => t = "atan"
@send @ocaml.doc("Convert the decimal to a string.")
external isFinite: t => bool = "isFinite"
@send @ocaml.doc("Convert the decimal to a string.")
external isInt: t => bool = "isInt"
@send @ocaml.doc("Convert the decimal to a string.")
external isNaN: t => bool = "isNaN"
@send @ocaml.doc("Convert the decimal to a string.")
external isNeg: t => bool = "isNeg"
@send @ocaml.doc("Convert the decimal to a string.")
external isPos: t => bool = "isPos"
@send @ocaml.doc("Convert the decimal to a string.")
external isZero: t => bool = "isZero"
@send @ocaml.doc("Convert the decimal to a string.")
external lt: (t, t) => bool = "lt"
@send @ocaml.doc("Convert the decimal to a string.")
external lte: (t, t) => bool = "lte"
@send @ocaml.doc("Convert the decimal to a string.")
external log: t => t = "log"
@send @ocaml.doc("Convert the decimal to a string.")
external logN: (t, int) => t = "log"
@send @ocaml.doc("Convert the decimal to a string.")
external logF: (t, float) => t = "log"
@send @ocaml.doc("Convert the decimal to a string.")
external logD: (t, t) => t = "log"
@send @ocaml.doc("Convert the decimal to a string.")
external minus: (t, t) => t = "minus"
@send @ocaml.doc("Convert the decimal to a string.")
external mod: t => t = "mod"
@send @ocaml.doc("Convert the decimal to a string.")
external exp: t => t = "exp"
@send @ocaml.doc("Convert the decimal to a string.")
external ln: t => t = "ln"
@send @ocaml.doc("Convert the decimal to a string.")
external neg: t => t = "neg"
@send @ocaml.doc("Convert the decimal to a string.")
external add: t => t = "add"
@send @ocaml.doc("Convert the decimal to a string.")
external precision: t => t = "precision"
@send @ocaml.doc("Convert the decimal to a string.")
external round: t => t = "round"
@send @ocaml.doc("Convert the decimal to a string.")
external sin: t => t = "sin"
@send @ocaml.doc("Convert the decimal to a string.")
external sqrt: t => t = "sqrt"
@send @ocaml.doc("Convert the decimal to a string.")
external tan: t => t = "tan"
@send @ocaml.doc("Convert the decimal to a string.")
external mul: t => t = "mul"
@send @ocaml.doc("Convert the decimal to a string.")
external toBinary: t => t = "toBinary"
@send @ocaml.doc("Convert the decimal to a string.")
external toDecimalPlaces: t => t = "toDecimalPlaces"
@send @ocaml.doc("Convert the decimal to a string.")
external toExponential: t => t = "toExponential"
@send @ocaml.doc("Convert the decimal to a string.")
external toFixed: t => t = "toFixed"
@send @ocaml.doc("Convert the decimal to a string.")
external toFraction: t => t = "toFraction"
@send @ocaml.doc("Convert the decimal to a string.")
external toHex: t => t = "toHex"
@send @ocaml.doc("Convert the decimal to a string.")
external toJSON: t => t = "toJSON"
@send @ocaml.doc("Convert the decimal to a string.")
external toNearest: t => t = "toNearest"
@send @ocaml.doc("Convert the decimal to a string.")
external toNumber: t => t = "toNumber"
@send @ocaml.doc("Convert the decimal to a string.")
external toOctal: t => t = "toOctal"
@send @ocaml.doc("Convert the decimal to a string.")
external pow: t => t = "pow"
@send @ocaml.doc("Convert the decimal to a string.")
external toPrecision: t => t = "toPrecision"
@send @ocaml.doc("Convert the decimal to a string.")
external toSD: t => t = "toSD"
@send @ocaml.doc("Convert the decimal to a string.")
external trunc: t => t = "trunc"
@send @ocaml.doc("Convert the decimal to a string.")
external valueOf: t => t = "valueOf"
