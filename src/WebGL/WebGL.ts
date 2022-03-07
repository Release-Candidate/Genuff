// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     WebGL.ts
// Date:     07.Mar.2022
//
// ==============================================================================

/**
 * Compile and link the vertex and fragment shader to a program.
 *
 * @param gl The WebGL 2 context.
 * @param vertexSource The source of the vertex shader, as a string.
 * @param fragmentSource The source of the fragment shader, as a string.
 *
 * @returns The linked program on success, `null` on errors.
 */
export function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (vertexShader != null && fragmentShader != null) {
    return linkProgram(gl, vertexShader, fragmentShader);
  } else {
    return null;
  }
}

/**
 * Compile a vertex or fragment shader program.
 *
 * @param gl The WebGL 2 context.
 * @param type The type of the shader, `gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`.
 * @param source The shader source as a string.
 *
 * @returns The compiled shader on success, `null` on errors.
 */
// eslint-disable-next-line max-statements
export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (shader == null) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/**
 * Link a vertex shader with a fragment shader to a program.
 *
 * @param gl The WebGL 2 context.
 * @param vertexShader The compiled vertex shader.
 * @param fragmentShader The compiled fragment shader.
 *
 * @returns The linked program on success, `null` on errors.
 */
// eslint-disable-next-line max-statements
export function linkProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (program == null) {
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success: boolean = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.error(`ERROR linking program: ${gl.getProgramInfoLog(program)}`);
    console.error(
      `Vertex shader compile: ${gl.getShaderInfoLog(vertexShader)}`
    );
    console.error(
      `Fragment shader compile: ${gl.getShaderInfoLog(fragmentShader)}`
    );
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    return null;
  }
  return program;
}
