/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\nconst Slider = __webpack_require__(/*! ./components/Slider */ \"./src/components/Slider.js\");\r\nconst stateLoader = __webpack_require__(/*! ./utils/stateLoader */ \"./src/utils/stateLoader.js\");\r\nconst EventEmiiter = __webpack_require__(/*! ./components/EventEmitter */ \"./src/components/EventEmitter.js\");\r\n\r\nclass App {\r\n    constructor() {\r\n        this.eventEmitter = new EventEmiiter();\r\n        this.slider = null;\r\n        this.puzzle = null;\r\n    }\r\n\r\n\r\n    getMaxWidth() {\r\n        const mainElement = document.querySelector('.main');\r\n        const computedStyle = getComputedStyle(mainElement);\r\n        const mainElementWidth = computedStyle.width;\r\n        return +mainElementWidth.slice(0, -2);\r\n    }\r\n\r\n    renderPuzzle(puzzleElement, sliderElement) {\r\n        const state = stateLoader.getState();\r\n        this.slider = this.renderSlider(sliderElement, state.dimension);\r\n        this.puzzle = this.renderPuzzle(puzzleElement, state);\r\n\r\n        stateLoader.onBackHistory((state) => this.setState(state));\r\n        this.eventEmitter.onChangeState(() => this.saveCurrentState());\r\n    }\r\n\r\n    renderPuzzle(puzzleElement, state) {\r\n        this.puzzle = new PicturePuzzle(puzzleElement, this.eventEmitter, this.getMaxWidth(), state);\r\n    }\r\n\r\n    renderSlider(sliderElement, dimension) {\r\n        return new Slider(sliderElement, this.eventEmitter, state.dimension);\r\n    }\r\n\r\n    saveCurrentState() {\r\n        const state = this.puzzle.getState();\r\n        stateLoader.saveToLocalStorage(state);\r\n        stateLoader.saveToHistory(state);\r\n    }\r\n\r\n    setState(state) {\r\n        if (state.dimension == undefined) {\r\n            return;\r\n        }\r\n        this.slider.setDimension(state.dimension);\r\n        this.puzzle.setState(state);\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/components/EventEmitter.js":
/*!****************************************!*\
  !*** ./src/components/EventEmitter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventEmitter; });\nconst CHANGE_DIMENSION = 'changeDimension';\r\n\r\nclass EventEmitter {\r\n\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n\r\n    emitChangeDimension(dimension) {\r\n        this.emit(CHANGE_DIMENSION, {dimension});\r\n    }\r\n\r\n    onChangeDimension(callback) {\r\n        this.subscribe(CHANGE_DIMENSION, callback);\r\n    }\r\n\r\n    emit(eventName, data) {\r\n        const event = this.events[eventName];\r\n        if (event) {\r\n            event.forEach(fn => {\r\n                fn.call(null, data);\r\n            });\r\n        }\r\n    }\r\n\r\n    subscribe(eventName, fn) {\r\n        if (!this.events[eventName]) {\r\n            this.events[eventName] = [];\r\n        }\r\n\r\n        this.events[eventName].push(fn);\r\n        return () => {\r\n            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/components/EventEmitter.js?");

/***/ }),

/***/ "./src/components/Slider.js":
/*!**********************************!*\
  !*** ./src/components/Slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Slider; });\nclass Slider {\r\n    constructor(el, eventEmitter) {\r\n        this.el = el;\r\n        this.eventEmitter = eventEmitter;\r\n\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.el.onmouseup = this.onMouseUp.bind(this);\r\n    }\r\n\r\n    onMouseUp() {\r\n        console.log(this.el.value);\r\n        this.eventEmitter.emitChangeDimension(this.el.value);\r\n    }\r\n\r\n    getDimension() {\r\n        return this.el.value;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/components/Slider.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const App = __webpack_require__(/*! ./App */ \"./src/App.js\");\r\n\r\nconst app = new App();\r\napp.renderPuzzle(document.querySelector('#puzzle-wrapper'));\r\napp.renderSlider(document.querySelector('#slider'));\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/models/AppState.js":
/*!********************************!*\
  !*** ./src/models/AppState.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AppState; });\nclass AppState {\r\n    constructor(dimension, cells) {\r\n        this.dimension = dimension;\r\n        this.cells = cells;\r\n    }\r\n};\n\n//# sourceURL=webpack:///./src/models/AppState.js?");

/***/ }),

/***/ "./src/utils/stateLoader.js":
/*!**********************************!*\
  !*** ./src/utils/stateLoader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst STORAGE_KEY = 'puzzle';\r\nconst AppState = __webpack_require__(/*! ../models/AppState */ \"./src/models/AppState.js\");\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    getDefaultState(defaultDimension) {\r\n        return new AppState(defaultDimension);\r\n    },\r\n\r\n    loadFromLocalStorage() {\r\n        const stored = window.localStorage[STORAGE_KEY];\r\n        if (stored) {\r\n            return JSON.parse(stored);\r\n        }\r\n        return null;\r\n    },\r\n\r\n    saveToLocalStorage (state) {\r\n        window.localStorage[STORAGE_KEY] = JSON.stringify(state);\r\n    },\r\n\r\n  \r\n    saveToHistory (state) {\r\n        history.pushState(state, 'history', '#hash' + dimension + Date.now() +\r\n            Math.floor(Math.random() * 1000));\r\n    },\r\n\r\n    onBackHistory(callback) {\r\n        window.onpopstate = function (event) {\r\n            if (!event.state) {\r\n                return;\r\n            }\r\n            callback(event.state);\r\n        };\r\n    },\r\n\r\n\r\n    getState(defaultDimension) {\r\n        const state = this.loadFromLocalStorage();\r\n        if (state) {\r\n            return state;\r\n        }\r\n        return this.getDefaultState(defaultDimension);\r\n    },\r\n});\n\n//# sourceURL=webpack:///./src/utils/stateLoader.js?");

/***/ })

/******/ });