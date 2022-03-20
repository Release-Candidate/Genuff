// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     GLArrayObject.ts
// Date:     20.Mar.2022
//
// ==============================================================================

import { fetchAndCompile } from "../WebGL/Browser";

export type GLArrayObject = {
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
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

  return { program: compiledProgram, vao: arrayObject };
}

export function bindGLArrayObject(
  glAO: GLArrayObject,
  gl: WebGL2RenderingContext
) {
  gl.useProgram(glAO.program);
  gl.bindVertexArray(glAO.vao);
}
