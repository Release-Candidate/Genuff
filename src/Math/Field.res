// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Field.res
// Date:     24.Mar.2022
//
// ==============================================================================
// Mathematical fields.

@ocaml.doc("Generic mathematical field including often needed functions.")
module type Field = {
  @ocaml.doc("The field's underlying type.")
  type t

  @ocaml.doc("Add two field elements.")
  let add: (t, t) => t

  @ocaml.doc("Subtract two field elements.")
  let sub: (t, t) => t

  @ocaml.doc("Multiply two field elements.")
  let mult: (t, t) => t

  @ocaml.doc("Divide the first argument by the second.")
  let div: (t, t) => t

  @ocaml.doc("Raise the first element be the second.")
  let pow: (t, t) => t

  @ocaml.doc("Raise the first element be the second, an int.")
  let powI: (t, int) => t

  @ocaml.doc("Return the square root of the element.")
  let sqrt: t => t

  @ocaml.doc("Return the cube root of the element.")
  let cbrt: t => t

  @ocaml.doc("Return the absolute value of the element.")
  let abs: t => t

  @ocaml.doc("Return ")
  let eq: (t, t, t, unit) => bool

  let neq: (t, t, t, unit) => bool

  @ocaml.doc("The neutral element of the addition, 0.")
  let null: t

  @ocaml.doc("The neutral element of the multiplication, 1.")
  let one: t
}

module FloatField: Field with type t = float = {
  type t = float

  @inline
  let add = (a, b) => a +. b

  @inline
  let sub = (a, b) => a -. b

  @inline
  let mult = (a, b) => a *. b

  @inline
  let div = (a, b) => a /. b

  let eq = (a, b, ~eps=?, ()) => false

  @inline
  let null = 0.

  @inline
  let one = 1.
}
