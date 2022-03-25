// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Field.res
// Date:     24.Mar.2022
//
// ==============================================================================
// Mathematical fields.

@ocaml.doc("Epsilon suitable for floating point values.")
let _EPSILON = 1e-10

//==============================================================================

@ocaml.doc("Generic mathematical field including often needed functions.")
module type Field = {
  @ocaml.doc("The field's underlying type.")
  type t

  @ocaml.doc("Convert the number to a string.")
  let toString: t => string

  @ocaml.doc("Convert a string to a number.")
  let fromString: string => option<t>

  @ocaml.doc("Convert the number to a float.")
  let toFloat: t => float

  @ocaml.doc("Convert a float to this type.")
  let fromFloat: float => t

  @ocaml.doc("Convert the number to an int, round, not truncate.")
  let toInt: t => int

  @ocaml.doc("Convert an int to this type.")
  let fromInt: int => t

  @ocaml.doc("Add two field elements.")
  let add: (t, t) => t

  @ocaml.doc("Subtract two field elements.")
  let sub: (t, t) => t

  @ocaml.doc("Multiply two field elements.")
  let mult: (t, t) => t

  @ocaml.doc("Divide the first argument by the second.")
  let div: (t, t) => t

  @ocaml.doc("Return the modulo n of the decimal.")
  let mod: (t, t) => t

  @ocaml.doc("Raise the first element to the second.")
  let pow: (~base: t, ~exp: t) => t

  @ocaml.doc("Raise the first element to the second, an int.")
  let powI: (~base: t, ~exp: int) => t

  @ocaml.doc("Return the square root of the element.")
  let sqrt: t => t

  @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot: (t, t) => t

  @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot3: (t, t, t) => t

  @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot4: (t, t, t, t) => t

  @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypotArr: array<t> => t

  @ocaml.doc("Return the cube root of the element.")
  let cbrt: t => t

  @ocaml.doc("Return the sine of the element as radians.")
  let sin: t => t

  @ocaml.doc("Return the cosine of the element as radians.")
  let cos: t => t

  @ocaml.doc("Return the tangent of the element as radians.")
  let tan: t => t

  @ocaml.doc("Return the inverse sine of the element as radians.")
  let asin: t => t

  @ocaml.doc("Return the inverse cosine of the element as radians.")
  let acos: t => t

  @ocaml.doc("Return the inverse tangent of the element as radians.")
  let atan: t => t

  @ocaml.doc("Return the natural exponential (e) to the power of the element.")
  let exp: t => t

  @ocaml.doc("Return the natural logarithm of the element.")
  let ln: t => t

  @ocaml.doc("Return the base 10 logarithm of the element.")
  let log10: t => t

  @ocaml.doc("Return the absolute value of the element.")
  let abs: t => t

  @ocaml.doc("Return the biggest of the given elements.")
  let max: (t, t) => t

  @ocaml.doc("Return the biggest of the given elements.")
  let max3: (t, t, t) => t

  @ocaml.doc("Return the biggest of the given elements.")
  let max4: (t, t, t, t) => t

  @ocaml.doc("Return the biggest of the given elements.")
  let maxArr: array<t> => t

  @ocaml.doc("Return the smallest of the given elements.")
  let min: (t, t) => t

  @ocaml.doc("Return the smallest of the given elements.")
  let min3: (t, t, t) => t

  @ocaml.doc("Return the smallest of the given elements.")
  let min4: (t, t, t, t) => t

  @ocaml.doc("Return the smallest of the given elements.")
  let minArr: array<t> => t

  @ocaml.doc("Round the element to the nearest integer.")
  let round: t => t

  @ocaml.doc("Return the smallest integer greater than or equal to the element.")
  let ceil: t => t

  @ocaml.doc("Return the largest integer less than or equal to the element.")
  let floor: t => t

  @ocaml.doc("Return true if both elements are equal or differ by epsilon.")
  let eq: (t, t, ~epsilon: t=?, unit) => bool

  @ocaml.doc("Return true if both elements are not equal or differ by more than epsilon.")
  let neq: (t, t, ~epsilon: t=?, unit) => bool

  @ocaml.doc("Return true if the element is less than the given one.")
  let lt: (t, t) => bool

  @ocaml.doc("Return true if the element is greater than the given one.")
  let gt: (t, t) => bool

  @ocaml.doc("Return true if the element is less than or equal to the given one.")
  let lte: (t, t, ~epsilon: t=?, unit) => bool

  @ocaml.doc("Return true if the element is greater than or equal the given one.")
  let gte: (t, t, ~epsilon: t=?, unit) => bool

  @ocaml.doc("The neutral element of the addition, 0.")
  let _NULL: t

  @ocaml.doc("The neutral element of the multiplication, 1.")
  let _ONE: t

  @ocaml.doc("The constant pi.")
  let _PI: t
}

//==============================================================================

@ocaml.doc("A mathematical field of floating point numbers, of the type float.")
module FloatField: Field with type t = float = {
  @ocaml.doc("The field's underlying type: float.")
  type t = float

  @ocaml.doc("Convert the number to a string.")
  let toString = a => a->Belt.Float.toString

  @ocaml.doc("Convert a string to a float.")
  let fromString = a => a->Belt.Float.fromString

  @ocaml.doc("Convert the number to a float.")
  let toFloat = a => a

  @ocaml.doc("Convert a float to this type.")
  let fromFloat = a => a

  @ocaml.doc("Convert the number to an int, round, not truncate.")
  let toInt = a => Js.Math.round(a)->Belt.Float.toInt

  @ocaml.doc("Convert an int to this type.")
  let fromInt = a => a->Belt.Float.fromInt

  @inline @ocaml.doc("Add two field elements.")
  let add = (a, b) => a +. b

  @inline @ocaml.doc("Subtract two field elements.")
  let sub = (a, b) => a -. b

  @inline @ocaml.doc("Multiply two field elements.")
  let mult = (a, b) => a *. b

  @inline @ocaml.doc("Divide the first argument by the second.")
  let div = (a, b) => a /. b

  @inline @ocaml.doc("Return the modulo n of the decimal.")
  let mod = (a, n) =>
    Belt.Int.toFloat(mod(Belt.Float.toInt(Js.Math.round(a)), Belt.Float.toInt(Js.Math.round(n))))

  @inline @ocaml.doc("Return the absolute value of the element.")
  let abs = a => Js.Math.abs_float(a)

  @inline @ocaml.doc("Return the smallest integer greater than or equal to the element.")
  let ceil = a => Js.Math.ceil_float(a)

  @inline @ocaml.doc("Return the largest integer less than or equal to the element.")
  let floor = a => Js.Math.floor_float(a)

  @inline @ocaml.doc("Round the element to the nearest integer.")
  let round = a => Js.Math.round(a)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min = (a, b) => Js.Math.min_float(a, b)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min3 = (a, b, c) => Js.Math.minMany_float([a, b, c])

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min4 = (a, b, c, d) => Js.Math.minMany_float([a, b, c, d])

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let minArr = arr => Js.Math.minMany_float(arr)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max = (a, b) => Js.Math.max_float(a, b)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max3 = (a, b, c) => Js.Math.maxMany_float([a, b, c])

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max4 = (a, b, c, d) => Js.Math.maxMany_float([a, b, c, d])

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let maxArr = arr => Js.Math.maxMany_float(arr)

  @inline @ocaml.doc("Return true if both elements are equal or differ by epsilon.")
  let eq = (a, b, ~epsilon=_EPSILON, ()) => Js.Math.abs_float(a -. b) <= epsilon

  @inline @ocaml.doc("Return true if both elements are not equal or differ by more than epsilon.")
  let neq = (a, b, ~epsilon=_EPSILON, ()) => Js.Math.abs_float(a -. b) > epsilon

  @inline @ocaml.doc("Return true if the element is less than the given one.")
  let lt = (a, b) => a < b

  @inline @ocaml.doc("Return true if the element is greater than the given one.")
  let gt = (a, b) => a > b

  @inline @ocaml.doc("Return true if the element is less than or equal to the given one.")
  let lte = (a, b, ~epsilon=_EPSILON, ()) => a < b || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return true if the element is greater than or equal the given one.")
  let gte = (a, b, ~epsilon=_EPSILON, ()) => a > b || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return the square root of the element.")
  let sqrt = a => Js.Math.sqrt(a)

  @inline @ocaml.doc("Return the cube root of the element.")
  let cbrt = a => Js.Math.cbrt(a)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot = (a, b) => Js.Math.hypot(a, b)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot3 = (a, b, c) => Js.Math.hypotMany([a, b, c])

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot4 = (a, b, c, d) => Js.Math.hypotMany([a, b, c, d])

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypotArr = arr => Js.Math.hypotMany(arr)

  @inline @ocaml.doc("Raise the first element be the second.")
  let pow = (~base, ~exp) => Js.Math.pow_float(~base, ~exp)

  @inline @ocaml.doc("Raise the first element to the second, an int.")
  let powI = (~base, ~exp) => Js.Math.pow_float(~base, ~exp=Belt.Int.toFloat(exp))

  @inline @ocaml.doc("Return the natural exponential (e) to the power of the element.")
  let exp = a => Js.Math.exp(a)

  @inline @ocaml.doc("Return the natural logarithm of the element.")
  let ln = a => Js.Math.log(a)

  @inline @ocaml.doc("Return the base 10 logarithm of the element.")
  let log10 = a => Js.Math.log10(a)

  @inline @ocaml.doc("Return the sine of the element as radians.")
  let sin = a => Js.Math.sin(a)

  @inline @ocaml.doc("Return the cosine of the element as radians.")
  let cos = a => Js.Math.cos(a)

  @inline @ocaml.doc("Return the tangent of the element as radians.")
  let tan = a => Js.Math.tan(a)

  @inline @ocaml.doc("Return the inverse sine of the element as radians.")
  let asin = a => Js.Math.asin(a)

  @inline @ocaml.doc("Return the inverse cosine of the element as radians.")
  let acos = a => Js.Math.acos(a)

  @inline @ocaml.doc("Return the inverse tangent of the element as radians.")
  let atan = a => Js.Math.atan(a)

  @inline @ocaml.doc("The neutral element of the addition, 0.")
  let _NULL = 0.

  @inline @ocaml.doc("The neutral element of the multiplication, 1.")
  let _ONE = 1.

  @ocaml.doc("The constant pi.")
  let _PI = Js.Math._PI
}

//==============================================================================

@ocaml.doc(
  "A mathematical field of integer numbers, of the type int - this isn't actually a mathematical field, but let's ignore this ;)."
)
module IntegerField: Field with type t = int = {
  @ocaml.doc("The field's underlying type: int.")
  type t = int

  @ocaml.doc("Convert the number to a string.")
  let toString = a => a->Belt.Int.toString

  @ocaml.doc("Convert a string to a number.")
  let fromString = a => a->Belt.Int.fromString

  @ocaml.doc("Convert the number to a float.")
  let toFloat = a => a->Belt.Int.toFloat

  @ocaml.doc("Convert a float to this type.")
  let fromFloat = a => a->Js.Math.round->Belt.Float.toInt

  @ocaml.doc("Convert the number to an int, round, not truncate.")
  let toInt = a => a

  @ocaml.doc("Convert an int to this type.")
  let fromInt = a => a

  @inline @ocaml.doc("Add two field elements.")
  let add = (a, b) => a + b

  @inline @ocaml.doc("Subtract two field elements.")
  let sub = (a, b) => a - b

  @inline @ocaml.doc("Multiply two field elements.")
  let mult = (a, b) => a * b

  @inline @ocaml.doc("Divide the first argument by the second.")
  let div = (a, b) => a / b

  @inline @ocaml.doc("Return the modulo n of the decimal.")
  let mod = (a, n) => mod(a, n)

  @inline @ocaml.doc("Return the absolute value of the element.")
  let abs = a => Js.Math.abs_int(a)

  @inline @ocaml.doc("Return the integer.")
  let ceil = a => a

  @inline @ocaml.doc("Return the integer.")
  let floor = a => a

  @inline @ocaml.doc("Return the integer.")
  let round = a => a

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min = (a, b) => Js.Math.min_int(a, b)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min3 = (a, b, c) => Js.Math.minMany_int([a, b, c])

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min4 = (a, b, c, d) => Js.Math.minMany_int([a, b, c, d])

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let minArr = arr => Js.Math.minMany_int(arr)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max = (a, b) => Js.Math.max_int(a, b)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max3 = (a, b, c) => Js.Math.maxMany_int([a, b, c])

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max4 = (a, b, c, d) => Js.Math.maxMany_int([a, b, c, d])

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let maxArr = arr => Js.Math.maxMany_int(arr)

  @inline @ocaml.doc("Return true if both elements are equal or differ by epsilon.")
  let eq = (a, b, ~epsilon=0, ()) => Js.Math.abs_int(a - b) <= epsilon

  @inline @ocaml.doc("Return true if both elements are not equal or differ by more than epsilon.")
  let neq = (a, b, ~epsilon=0, ()) => Js.Math.abs_int(a - b) > epsilon

  @inline @ocaml.doc("Return true if the element is less than the given one.")
  let lt = (a, b) => a < b

  @inline @ocaml.doc("Return true if the element is greater than the given one.")
  let gt = (a, b) => a > b

  @inline @ocaml.doc("Return true if the element is less than or equal to the given one.")
  let lte = (a, b, ~epsilon=0, ()) => a < b || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return true if the element is greater than or equal the given one.")
  let gte = (a, b, ~epsilon=0, ()) => a > b || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return the square root of the element.")
  let sqrt = a => Js.Math.sqrt(Belt.Float.fromInt(a))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return the cube root of the element.")
  let cbrt = a => Js.Math.cbrt(Belt.Float.fromInt(a))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot = (a, b) =>
    Js.Math.hypot(Belt.Float.fromInt(a), Belt.Float.fromInt(b))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot3 = (a, b, c) =>
    Js.Math.hypotMany([Belt.Float.fromInt(a), Belt.Float.fromInt(b), Belt.Float.fromInt(c)])
    ->Js.Math.round
    ->Belt.Float.toInt

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot4 = (a, b, c, d) =>
    Js.Math.hypotMany([
      Belt.Float.fromInt(a),
      Belt.Float.fromInt(b),
      Belt.Float.fromInt(c),
      Belt.Float.fromInt(d),
    ])
    ->Js.Math.round
    ->Belt.Float.toInt

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypotArr = arr =>
    arr
    ->Js.Array2.map(e => Belt.Float.fromInt(e))
    ->Js.Math.hypotMany
    ->Js.Math.round
    ->Belt.Float.toInt

  @inline @ocaml.doc("Raise the first element be the second.")
  let pow = (~base, ~exp) =>
    Js.Math.pow_float(~base=Belt.Int.toFloat(base), ~exp=Belt.Int.toFloat(exp))
    ->Js.Math.round
    ->Belt.Float.toInt

  @inline @ocaml.doc("Raise the first element to the second, an int.")
  let powI = (~base, ~exp) =>
    Js.Math.pow_float(~base=Belt.Int.toFloat(base), ~exp=Belt.Int.toFloat(exp))
    ->Js.Math.round
    ->Belt.Float.toInt

  @inline @ocaml.doc("Return the natural exponential (e) to the power of the element.")
  let exp = a => Js.Math.exp(Belt.Int.toFloat(a))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return the natural logarithm of the element.")
  let ln = a => Js.Math.log(Belt.Int.toFloat(a))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return the base 10 logarithm of the element.")
  let log10 = a => Js.Math.log10(Belt.Int.toFloat(a))->Js.Math.round->Belt.Float.toInt

  @inline @ocaml.doc("Return 1.")
  let sin = _ => 1

  @inline @ocaml.doc("Return 1")
  let cos = _ => 1

  @inline @ocaml.doc("Return 1")
  let tan = _ => 1

  @inline @ocaml.doc("Return 0")
  let asin = _ => 0

  @inline @ocaml.doc("Return 0")
  let acos = _ => 0

  @inline @ocaml.doc("Return 0.")
  let atan = _ => 0

  @inline @ocaml.doc("The neutral element of the addition, 0.")
  let _NULL = 0

  @inline @ocaml.doc("The neutral element of the multiplication, 1.")
  let _ONE = 1

  @ocaml.doc("The constant pi as integer, 3.")
  let _PI = 3
}

//==============================================================================

@ocaml.doc("A mathematical field of arbitrary precision decimal numbers, of the type Decimal.")
module DecimalField: Field with type t = Decimal.t = {
  @ocaml.doc("The field's underlying type: Decimal.")
  type t = Decimal.t

  @ocaml.doc("Convert the number to a string.")
  let toString = a => a->Decimal.toString

  @ocaml.doc("Convert a string to a number.")
  let fromString = a => Some(a->Decimal.createDecimalSt)

  @ocaml.doc("Convert the number to a float.")
  let toFloat = a => a->Decimal.round->Decimal.toNumber

  @ocaml.doc("Convert a float to this type.")
  let fromFloat = a => a->Decimal.createDecimal

  @ocaml.doc("Convert the number to an int, round, not truncate.")
  let toInt = a => a->Decimal.toInt

  @ocaml.doc("Convert an int to this type.")
  let fromInt = a => a->Decimal.createDecimalI

  @ocaml.doc("The neutral element of the addition, 0.")
  let _NULL = Decimal.createDecimalI(0)

  @ocaml.doc("The neutral element of the multiplication, 1.")
  let _ONE = Decimal.createDecimalI(1)

  @ocaml.doc("The constant pi.")
  let _PI = Decimal._PI

  @inline @ocaml.doc("Add two field elements.")
  let add = (a, b) => a->Decimal.add(b)

  @inline @ocaml.doc("Subtract two field elements.")
  let sub = (a, b) => a->Decimal.sub(b)

  @inline @ocaml.doc("Multiply two field elements.")
  let mult = (a, b) => a->Decimal.mul(b)

  @inline @ocaml.doc("Divide the first argument by the second.")
  let div = (a, b) => a->Decimal.div(b)

  @inline @ocaml.doc("Return the modulo n of the decimal.")
  let mod = (a, n) => a->Decimal.mod(n)

  @inline @ocaml.doc("Return the absolute value of the element.")
  let abs = a => Decimal.abs(a)

  @inline @ocaml.doc("Return the smallest integer greater than or equal to the element.")
  let ceil = a => Decimal.ceil(a)

  @inline @ocaml.doc("Return the largest integer less than or equal to the element.")
  let floor = a => Decimal.floor(a)

  @inline @ocaml.doc("Round the element to the nearest integer.")
  let round = a => Decimal.round(a)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min = (a, b) => Decimal.min(a, b)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min3 = (a, b, c) => Decimal.min3(a, b, c)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let min4 = (a, b, c, d) => Decimal.min4(a, b, c, d)

  @inline @ocaml.doc("Return the smallest of the given elements.")
  let minArr = arr => Decimal.minArr(arr)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max = (a, b) => Decimal.max(a, b)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max3 = (a, b, c) => Decimal.max3(a, b, c)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let max4 = (a, b, c, d) => Decimal.max4(a, b, c, d)

  @inline @ocaml.doc("Return the biggest of the given elements.")
  let maxArr = arr => Decimal.maxArr(arr)

  @inline @ocaml.doc("Return true if both elements are equal or differ by epsilon.")
  let eq = (a, b, ~epsilon=_NULL, ()) => Decimal.abs(a->Decimal.sub(b))->Decimal.lte(epsilon)

  @inline @ocaml.doc("Return true if both elements are not equal or differ by more than epsilon.")
  let neq = (a, b, ~epsilon=_NULL, ()) => Decimal.abs(a->Decimal.sub(b))->Decimal.gt(epsilon)

  @inline @ocaml.doc("Return true if the element is less than the given one.")
  let lt = (a, b) => a->Decimal.lt(b)

  @inline @ocaml.doc("Return true if the element is greater than the given one.")
  let gt = (a, b) => a->Decimal.gt(b)

  @inline @ocaml.doc("Return true if the element is less than or equal to the given one.")
  let lte = (a, b, ~epsilon=_NULL, ()) => a->Decimal.lt(b) || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return true if the element is greater than or equal the given one.")
  let gte = (a, b, ~epsilon=_NULL, ()) => a->Decimal.lt(b) || a->eq(b, ~epsilon, ())

  @inline @ocaml.doc("Return the square root of the element.")
  let sqrt = a => Decimal.sqrt(a)

  @inline @ocaml.doc("Return the cube root of the element.")
  let cbrt = a => Decimal.cbrt(a)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot = (a, b) => Decimal.hypot(a, b)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot3 = (a, b, c) => Decimal.hypot3(a, b, c)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypot4 = (a, b, c, d) => Decimal.hypot4(a, b, c, d)

  @inline @ocaml.doc("Return the square root of the sum of the squares of the arguments.")
  let hypotArr = arr => Decimal.hypotArr(arr)

  @inline @ocaml.doc("Raise the first element be the second.")
  let pow = (~base, ~exp) => base->Decimal.pow(exp)

  @inline @ocaml.doc("Raise the first element to the second, an int.")
  let powI = (~base, ~exp) => base->Decimal.powI(exp)

  @inline @ocaml.doc("Return the natural exponential (e) to the power of the element.")
  let exp = a => Decimal.exp(a)

  @inline @ocaml.doc("Return the natural logarithm of the element.")
  let ln = a => Decimal.log(a)

  @inline @ocaml.doc("Return the base 10 logarithm of the element.")
  let log10 = a => Decimal.log(a)

  @inline @ocaml.doc("Return the sine of the element as radians.")
  let sin = a => Decimal.sin(a)

  @inline @ocaml.doc("Return the cosine of the element as radians.")
  let cos = a => Decimal.cos(a)

  @inline @ocaml.doc("Return the tangent of the element as radians.")
  let tan = a => Decimal.tan(a)

  @inline @ocaml.doc("Return the inverse sine of the element as radians.")
  let asin = a => Decimal.asin(a)

  @inline @ocaml.doc("Return the inverse cosine of the element as radians.")
  let acos = a => Decimal.acos(a)

  @inline @ocaml.doc("Return the inverse tangent of the element as radians.")
  let atan = a => Decimal.atan(a)
}
