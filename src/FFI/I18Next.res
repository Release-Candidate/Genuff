// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     I18Next.res
// Date:     24.Mar.2022
//
// ==============================================================================

type backendOptions = {loadPath: string, addPath: string}

type initOptions = {
  debug: bool,
  backend: backendOptions,
  fallbackLng: string,
}

type t
type useType

@module("../../node_modules/i18next-http-backend")
external httpApi: useType = "default"

@module("../../node_modules/i18next")
external text: string => string = "t"
@send
external init: (t, initOptions, ('a, 'b) => unit) => unit = "init"
@module("../../node_modules/i18next")
external use: useType => t = "use"
