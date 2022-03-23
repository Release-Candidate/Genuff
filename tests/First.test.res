// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  ReScript-PWA-Template
// File:     First.test.res
// Date:     20.Feb.2022
//
// ==============================================================================

open Zora
open FastCheck
open Arbitrary
open Property.Sync
open Property

let checkProperty = (t, property, params, message) => {
  try {
    assertParams(property, params)
    t->ok(true, message)
  } catch {
  | Js.Exn.Error(obj) =>
    switch Js.Exn.message(obj) {
    | Some(m) => t->ok(false, m)
    | None => t->fail("Unknown exception")
    }
  }
}

zoraBlock("testing_works", t => {
  t->test("testing works", t => {
    t->ok(true, "I told you it works")
    done()
  })
  t->test("testing still works", param => {
    let x = 45
    let y = 42
    param->ok(true, "I told you it works")
    param->equal(x, y, "Should fail!")
    param->equal(465 + 40, 64 * 9, "NOt THe same!")
    done()
  })
  t->test("Properties", param => {
    checkProperty(
      param,
      property1(integer(), i => {i < 5}),
      Parameters.t(~verbose=true, ()),
      "Properties hold",
    )
    done()
  })
})
