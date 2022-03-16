#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_normal;

uniform float u_thickness;
uniform float u_aspectRatio;

// all shaders have a main function
void main() {

  vec2 normal = normalize(a_normal);
  vec2 pos = vec2((a_position.x + u_thickness * normal.x)*u_aspectRatio, a_position.y + u_thickness * normal.y);
  gl_Position = vec4(pos, 0, 1);
}
