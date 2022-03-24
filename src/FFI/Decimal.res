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

@ocaml.doc("The global options record for the arbitrary-precision decimals.")
type options = {precision: int, defaults: bool}

//==============================================================================
// Static methods.

@module("../../node_modules/decimal.js")
@scope("Decimal")
@ocaml.doc(
  "Set the global options for the arbitrary-precision decimals. ATTENTION: throws an exception on invalid values!"
)
external setOptions: options => unit = "set"

//==============================================================================
// Constructors.

@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from a float.")
external createDecimal: float => t = "Decimal"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from an int.")
external createDecimalI: int => t = "Decimal"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from a string.")
external createDecimalSt: string => t = "Decimal"
@new
@module("../../node_modules/decimal.js")
@ocaml.doc("Create an arbitrary-precision decimal from another decimal.")
external copyDecimal: t => t = "Decimal"

//==============================================================================
// Object methods.

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
@send @ocaml.doc("Return true if the decimal is greater than the given one.")
external gt: (t, t) => bool = "gt"
@send @ocaml.doc("Return true if the decimal is greater than or equal to the given one")
external gte: (t, t) => bool = "gte"
@send @ocaml.doc("Hyperbolic cosine of the decimal as radians.")
external cosh: t => t = "cosh"
@send @ocaml.doc("Hyperbolic sine of the decimal as radians.")
external sinh: t => t = "sinh"
@send @ocaml.doc("Hyperbolic tangent of the decimal as radians.")
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
@send @ocaml.doc("Return true if the decimal is finite. Infinite are Nan, and +/-Infinity")
external isFinite: t => bool = "isFinite"
@send @ocaml.doc("Return true if the decimal is an integer, without a fractional component.")
external isInt: t => bool = "isInt"
@send @ocaml.doc("Return true if the decimal is NaN.")
external isNaN: t => bool = "isNaN"
@send @ocaml.doc("Return true if the decimal is negative.")
external isNeg: t => bool = "isNeg"
@send @ocaml.doc("Return true if the decimal is positive.")
external isPos: t => bool = "isPos"
@send @ocaml.doc("Return true if the decimal is zero (or minus zero).")
external isZero: t => bool = "isZero"
@send @ocaml.doc("Return true if the decimal is less than the given one.")
external lt: (t, t) => bool = "lt"
@send @ocaml.doc("Return true if the decimal is less than or equal to the given one.")
external lte: (t, t) => bool = "lte"
@send @ocaml.doc("Return the logarithm base 10 of the decimal.")
external log: t => t = "log"
@send @ocaml.doc("Return the logarithm base n of the decimal.")
external logN: (t, int) => t = "log"
@send @ocaml.doc("Return the logarithm base n of the decimal.")
external logF: (t, float) => t = "log"
@send @ocaml.doc("Return the logarithm base n of the decimal.")
external logD: (t, t) => t = "log"
@send @ocaml.doc("Subtract the given decimal from the decimal.")
external sub: (t, t) => t = "sub"
@send @ocaml.doc("Return the modulo n of the decimal.")
external mod: (t, t) => t = "mod"
@send @ocaml.doc("Return the modulo n of the decimal.")
external modI: (t, int) => t = "mod"
@send @ocaml.doc("Raise e to the value of the decimal.")
external exp: t => t = "exp"
@send @ocaml.doc("Return the natural logarithm of the decimal.")
external ln: t => t = "ln"
@send @ocaml.doc("Multiply the decimal by minus one (-1).")
external neg: t => t = "neg"
@send @ocaml.doc("Add the given decimal to the decimal.")
external add: (t, t) => t = "add"
@send @ocaml.doc("Return the number of significant digits of the decimal.")
external precision: t => t = "precision"
@send @ocaml.doc("Round the decimal to an integer")
external round: t => t = "round"
@send @ocaml.doc("Sine of the decimal as radians.")
external sin: t => t = "sin"
@send @ocaml.doc("Return the square root of the decimal")
external sqrt: t => t = "sqrt"
@send @ocaml.doc("Tangent of the decimal in radians.")
external tan: t => t = "tan"
@send @ocaml.doc("Multiply the decimal by the given one.")
external mul: (t, t) => t = "mul"
@send @ocaml.doc("Return a binary representation of the decimal.")
external toBinary: t => string = "toBinary"
@send @ocaml.doc("Return the decimal rounded to n decimal places.")
external toDecimalPlaces: (t, int) => t = "toDecimalPlaces"
@send @ocaml.doc("Convert the decimal to exponential notation as a string.")
external toExponential: (t, int) => string = "toExponential"
@send @ocaml.doc("Convert the decimal to a string.")
external toFixed: t => string = "toFixed"
@send @ocaml.doc("Convert the decimal to a fraction of two integers, nominator / denominator")
external toFraction: t => array<t> = "toFraction"
@send @ocaml.doc("Convert the decimal to a hexadecimal string.")
external toHex: t => string = "toHex"
@send @ocaml.doc("Convert the decimal to a string.")
external toJSON: t => string = "toJSON"
@send @ocaml.doc("Convert the decimal to the nearest multiple of the given decimal.")
external toNearest: (t, t) => t = "toNearest"
@send @ocaml.doc("Convert the decimal to a float (JS number).")
external toNumber: t => float = "toNumber"
@send @ocaml.doc("Convert the decimal to an octal string.")
external toOctal: t => string = "toOctal"
@send @ocaml.doc("Raise the decimal to the power of the given decimal.")
external pow: (t, t) => t = "pow"
@send @ocaml.doc("Raise the decimal to the power of the given int.")
external powI: (t, int) => t = "pow"
@send @ocaml.doc("Convert the decimal to a string with the given number of digits.")
external toPrecision: (t, int) => string = "toPrecision"
@send
@ocaml.doc("Round the decimal to the precision set in the options number of significant digits.")
external toSD: t => t = "toSD"
@send @ocaml.doc("Truncate the decimal to an integer.")
external trunc: t => t = "trunc"
@send @ocaml.doc("Convert the decimal to a string. Same as toString, but the zero has a sign.")
external valueOf: t => string = "valueOf"
