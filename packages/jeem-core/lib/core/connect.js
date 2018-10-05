"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var connect = function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return {};
  };
  var mapDisPatchToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return {};
  };
  return function (Component) {
    var Connected =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(Connected, _React$Component);

      function Connected() {
        _classCallCheck(this, Connected);

        return _possibleConstructorReturn(this, _getPrototypeOf(Connected).apply(this, arguments));
      }

      _createClass(Connected, [{
        key: "onStoreOrPropsChange",
        value: function onStoreOrPropsChange(props) {
          var store = this.context.store;
          var state = store.getState();
          var stateProps = mapStateToProps(state, props);
          var dispatchProps = mapDisPatchToProps(store.dispatch, props);
          this.setState(_objectSpread({}, stateProps, dispatchProps));
        }
      }, {
        key: "componentWillMount",
        value: function componentWillMount() {
          var _this = this;

          var store = this.context.store;
          this.onStoreOrPropsChange(this.props);
          this.unsubscribe = store.subscribe(function () {
            return _this.onStoreOrPropsChange(_this.props);
          });
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          this.onStoreOrPropsChange(nextProps);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.unsubscribe();
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(Component, _extends({}, this.props, this.state));
        }
      }]);

      return Connected;
    }(_react.default.Component);

    Connected.contextTypes = {
      store: _propTypes.default.object
    };
    return Connected;
  };
};

var _default = connect;
exports.default = _default;