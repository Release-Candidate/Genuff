// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Browser.ts
// Date:     07.Mar.2022
//
// ==============================================================================

import { GOLDEN_RATIO } from "../Math/Math";
import { createProgram } from "./WebGL";

/**
 * Resize the canvas to it's current size, if it has been changed.
 *
 * @param canvas The canvas to scale if it's size has changed.
 */
export function resizeCanvasIfChanged(canvas: HTMLCanvasElement) {
  const canvasRealW = canvas.clientWidth;
  const canvasRealH = canvas.clientHeight;
  if (canvasRealW !== canvas.width || canvasRealH !== canvas.height) {
    canvas.width = canvasRealW;
    canvas.height = canvasRealH;
  }
}

/**
 * Generate the canvas to use for the WebGL 2 context and the context.
 *
 * @param appDiv The div element containing the app's content.
 * @param aspect The aspect ration of the canvas.
 *
 * @returns The canvas element and the WebGL 2 context as object { canvas, gl }.
 * THe object `gl` may be `null`, if an error occurred.
 */
export function makeWebGL2Canvas(
  appDiv: Element,
  aspect: string
): {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext | null;
} {
  // eslint-disable-next-line i18next/no-literal-string
  const canvasDiv = document.createElement("div");
  [
    "flex",
    "flex-col",
    "mt-8",
    "justify-center",
    "items-center",
    "px-4",
  ].forEach((c) => canvasDiv.classList.add(c));
  appDiv.appendChild(canvasDiv);
  // eslint-disable-next-line i18next/no-literal-string
  const canvasNode = document.createElement("canvas");
  canvasNode.height = 300;
  canvasNode.width = Math.floor(canvasNode.height * GOLDEN_RATIO);
  ["w-full", `aspect-[${aspect}]`].forEach((c) => canvasNode.classList.add(c));
  const canvas = canvasDiv.appendChild(canvasNode);
  // eslint-disable-next-line i18next/no-literal-string
  const gl = canvas.getContext("webgl2");

  return { canvas, gl };
}

/**
 * Fetch, compile and link a vertex and fragment shader.
 *
 * @param gl The WebGL 2 context.
 * @param vertexShaderURL URL of the vertex shader to compile and link.
 * @param fragmentShaderUrl URL of the fragment shader to compile and link.
 *
 * @returns The compiled and linked program on success, `null` on errors.
 */
export async function fetchAndCompile(
  gl: WebGL2RenderingContext,
  vertexShaderURL: string,
  fragmentShaderUrl: string
) {
  const vertResponse = await fetch(vertexShaderURL);
  const vertexSource = await vertResponse.text();
  const fragmentResponse = await fetch(fragmentShaderUrl);
  const fragmentSource = await fragmentResponse.text();
  return createProgram(gl, vertexSource, fragmentSource);
}
