/* eslint-disable init-declarations */
// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     app.ts
// Date:     20.Feb.2022
//
// ==============================================================================

import i18next from "i18next";
import { errorBox } from "./App/Browser";
import {
  appID,
  interpolFragmentShader,
  interpolVertexShader,
} from "./App/Constants";
import {
  fetchAndCompile,
  makeWebGL2Canvas,
  resizeCanvasIfChanged,
} from "./WebGL/Browser";
import { GOLDEN_RATIO_FRACTION_LANDSCAPE } from "./WebGL/Constants";

window.onload = main;

// eslint-disable-next-line max-lines-per-function, max-statements
async function main() {
  i18next.init({
    // eslint-disable-next-line i18next/no-literal-string
    lng: "en",
    debug: true,
  });

  const appDiv = document.querySelector(`#${appID}`);
  if (appDiv == null) {
    // eslint-disable-next-line i18next/no-literal-string
    throw new Error("ERROR: div with id 'app' not present!");
  }

  const { canvas, gl } = makeWebGL2Canvas(
    appDiv,
    GOLDEN_RATIO_FRACTION_LANDSCAPE
  );
  if (gl == null) {
    appDiv.removeChild(canvas);
    errorBox(
      appDiv,
      `Your browser does not support WebGL 2!<br>See <a href="https://caniuse.com/webgl2">https://caniuse.com/webgl2</a> for the list of supported browser versions.`
    );
    console.error("Error: cannot get WebGL 2 context for canvas!");
    // eslint-disable-next-line i18next/no-literal-string
    throw new Error("ERROR: cannot get WebGL 2 context for canvas!");
  }

  const program = await fetchAndCompile(
    gl,
    interpolVertexShader,
    interpolFragmentShader
  );
  if (program == null) {
    console.error("Error: cannot get WebGL 2 context for canvas!");
    throw new Error(
      // eslint-disable-next-line i18next/no-literal-string
      "ERROR: error compiling and linking vertex and fragment shader!"
    );
  }

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const vertices = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
  resizeCanvasIfChanged(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  console.log(`canvas w: ${gl.canvas.width} h: ${gl.canvas.height}`);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);
}
