// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "./../node_modules/rescript/lib/es6/curry.js";
import * as I18Next from "./FFI/I18Next.mjs";

var i18Opts = {
  debug: true,
  backend: {
    loadPath: "/locales/{{lng}}_{{ns}}.json",
    addPath: "/locales/{{lng}}_{{ns}}.json"
  },
  fallbackLng: "en"
};

function add(a, b) {
  return a + b;
}

function mult(a, b) {
  return a * b;
}

var FloatField = {
  add: add,
  mult: mult
};

function testAdd(T, a, b) {
  return Curry._2(T.add, a, b);
}

function testAddF(a, b) {
  return a + b;
}

var c = 5.0 + 6.0;

var d = 6.0 + 7.0;

function MakeVec3(InField) {
  var addS = function (s, b) {
    return {
            x: Curry._2(InField.add, s, b.x),
            y: Curry._2(InField.add, s, b.y),
            z: Curry._2(InField.add, s, b.z)
          };
  };
  return {
          addS: addS
        };
}

function addS(s, b) {
  return {
          x: s + b.x,
          y: s + b.y,
          z: s + b.z
        };
}

var Vec3F = {
  addS: addS
};

function testVadd(T, s, b) {
  return Curry._2(T.addS, s, b);
}

function testVaddF(s, b) {
  return {
          x: s + b.x,
          y: s + b.y,
          z: s + b.z
        };
}

var e_x = 2 + 1;

var e_y = 2 + 2;

var e_z = 2 + 3;

var e = {
  x: e_x,
  y: e_y,
  z: e_z
};

function main(param) {
  console.log(I18Next.text("HelloText"));
  console.log(e);
  
}

I18Next.use(I18Next.httpApi).init(i18Opts, (function (e, t) {
        return main(undefined);
      }));

var v = {
  x: 1,
  y: 2,
  z: 3
};

export {
  i18Opts ,
  FloatField ,
  testAdd ,
  testAddF ,
  c ,
  d ,
  MakeVec3 ,
  Vec3F ,
  testVadd ,
  testVaddF ,
  v ,
  e ,
  main ,
  
}
/*  Not a pure module */
