"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainApp = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainApp =
/*#__PURE__*/
function () {
  function MainApp() {
    _classCallCheck(this, MainApp);
  }

  _createClass(MainApp, [{
    key: "test",
    value: function test() {
      function Test() {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve("ini aja deh");
          }, 1000);
        });
      }

      function TestAsync() {
        return _TestAsync.apply(this, arguments);
      }

      function _TestAsync() {
        _TestAsync = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var text;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Test();

                case 2:
                  text = _context.sent;
                  console.log(text);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _TestAsync.apply(this, arguments);
      }

      TestAsync();
    }
  }]);

  return MainApp;
}();

exports.MainApp = MainApp;
;
