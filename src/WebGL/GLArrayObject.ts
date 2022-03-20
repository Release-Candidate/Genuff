// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     GLArrayObject.ts
// Date:     20.Mar.2022
//
// ==============================================================================

import { fetchAndCompile } from "./Browser";

export type GLArrayObject = {
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  buffer: WebGLBuffer;
};

export async function makeGLArrayObject(
  gl: WebGL2RenderingContext,
  vertexShaderURL: string,
  fragmentShaderUrl: string
): Promise<GLArrayObject | null> {
  const compiledProgram = await fetchAndCompile(
    gl,
    vertexShaderURL,
    fragmentShaderUrl
  );
  if (compiledProgram == null) {
    return null;
  }

  const arrayObject = gl.createVertexArray();
  if (arrayObject == null) {
    return null;
  }

  const posBuffer = gl.createBuffer();
  if (posBuffer == null) {
    return null;
  }

  return { program: compiledProgram, vao: arrayObject, buffer: posBuffer };
}

export function bindGLArrayObject(
  glAO: GLArrayObject,
  gl: WebGL2RenderingContext
) {
  gl.bindVertexArray(glAO.vao);
}

export function useGLArrayObject(
  glAO: GLArrayObject,
  gl: WebGL2RenderingContext
) {
  gl.useProgram(glAO.program);
  gl.bindVertexArray(glAO.vao);
}
