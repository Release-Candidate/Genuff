// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     I18Next.res
// Date:     24.Mar.2022
//
// ==============================================================================
// FFI to I18-Next.

@ocaml.doc("Options for the I18Next HTTP Backend.")
type backendOptions = {loadPath: string, addPath: string}

@ocaml.doc("Options for the init function.")
type initOptions = {
  debug: bool,
  backend: backendOptions,
  fallbackLng: string,
}

@ocaml.doc("The type of the I18Next module.")
type t

@ocaml.doc("Type to pass to the use* functions.")
type useType

@module("../../node_modules/i18next-http-backend")
@ocaml.doc("The I18Next HTTP-Backend, argument for 'use'.")
external httpApi: useType = "default"

@module("../../node_modules/i18next-browser-languagedetector")
@ocaml.doc("The I18Next browser language detector, argument for 'use'.")
external languageDetector: useType = "default"

@module("../../node_modules/i18next")
external text: string => string = "t"
@send
@ocaml.doc(
  "Initialize I18Next. First argument are the initOptions, the second argument is the callback to call when the initialization has finished."
)
external init: (t, initOptions, ('a, 'b) => unit) => unit = "init"
@module("../../node_modules/i18next")
@ocaml.doc("Use a I18Next Plugin or backend. Use this for the first use.")
external use: useType => t = "use"
@send @ocaml.doc("Use a I18Next Plugin or backend. Use this to chain calls of use.")
external useChain: (t, useType) => t = "use"
