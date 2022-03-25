// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     App.res
// Date:     20.Feb.2022
//
// ==============================================================================

let i18Opts: I18Next.initOptions = {
  debug: true,
  fallbackLng: ["en"],
  backend: {
    loadPath: "/locales/{{lng}}_{{ns}}.json",
    addPath: "/locales/{{lng}}_{{ns}}.json",
  },
}

@inline
let testAdd = (type f, module(T: Field.Field with type t = f), a: f, b: f) => T.add(a, b)

let testAddF = (a, b) => testAdd(module(Field.FloatField), a, b)

let c = testAdd(module(Field.FloatField), 5.0, 6.0)

let d = testAddF(6.0, 7.0)

module type Vector = {
  type scalar
  type t
  let addS: (scalar, t) => t
}

type vec3<'a> = {x: 'a, y: 'a, z: 'a}

module MakeVec3 = (InField: Field.Field) => {
  type scalar = InField.t
  type t = vec3<scalar>
  @inline
  let addS = (s, b) => {x: InField.add(s, b.x), y: InField.add(s, b.y), z: InField.add(s, b.z)}
}

module Vec3F = MakeVec3(Field.FloatField)

@inline
let testVadd = (type s f, module(T: Vector with type t = f and type scalar = s), s: s, b: f) =>
  T.addS(s, b)

@ocaml.doc("My docstring")
let testVaddF = (s, b) => testVadd(module(Vec3F), s, b)

let v = {x: 1., y: 2., z: 3.}

let e = testVaddF(2., v)

//==============================================================================
@ocaml.doc(`Main entry of the app`)
let main = () => {
  Js.log(I18Next.text("HelloText"))
  Js.log(e)

  Decimal.setOptions({Decimal.precision: 10, Decimal.defaults: true})
  let test = Decimal.createDecimal(1.)
  let test2 = Decimal.createDecimalSt("6")
  let test3 = Decimal.hypotArr([test, test2])
  Js.log(test->Decimal.div(test2)->Decimal.toString)
  Js.log(test->Decimal.div(test3)->Decimal.toString)
}

I18Next.use(I18Next.httpApi)
->I18Next.useChain(I18Next.languageDetector)
->I18Next.init(i18Opts, (_, _) => main())
