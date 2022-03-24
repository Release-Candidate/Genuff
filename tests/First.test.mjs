// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Zora from "./../node_modules/@dusty-phillips/rescript-zora/src/Zora.mjs";
import * as Zora$1 from "zora";
import * as Js_exn from "./../node_modules/rescript/lib/es6/js_exn.js";
import * as FastCheck from "fast-check";
import * as Caml_js_exceptions from "./../node_modules/rescript/lib/es6/caml_js_exceptions.js";

function checkProperty(t, property, params, message) {
  try {
    FastCheck.assert(property, params);
    t.ok(true, message);
    return ;
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      var m = obj._1.message;
      if (m !== undefined) {
        t.ok(false, m);
      } else {
        t.fail("Unknown exception");
      }
      return ;
    }
    throw obj;
  }
}

Zora$1.test("testing_works", (function (t) {
        t.test("testing works", (function (t) {
                t.ok(true, "I told you it works");
                return Zora.done(undefined);
              }));
        t.test("testing still works", (function (param) {
                param.ok(true, "I told you it works");
                param.equal(45, 42, "Should fail!");
                param.equal(505, 576, "NOt THe same!");
                return Zora.done(undefined);
              }));
        t.test("Properties", (function (param) {
                checkProperty(param, FastCheck.property(FastCheck.integer(), (function (i) {
                            return i < 5;
                          })), {
                      verbose: true
                    }, "Properties hold");
                return Zora.done(undefined);
              }));
        return Zora.done(undefined);
      }));

export {
  checkProperty ,
  
}
/*  Not a pure module */
