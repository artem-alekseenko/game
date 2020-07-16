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

/***/ "./config/index.js":
/*!*************************!*\
  !*** ./config/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    animation: {\r\n        movementDuration: 600,\r\n        errorDuration: 400\r\n    },\r\n    dimension: 7,\r\n    showFullPuzzleOnStartTime: 1000,\r\n    shuffleTime: 600,\r\n    urlImage: 'https://cs.pikabu.ru/images/jobseeker/logo2.png'\r\n});\n\n//# sourceURL=webpack:///./config/index.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var _components_Slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Slider */ \"./src/components/Slider.js\");\n/* harmony import */ var _components_PicturePuzzle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PicturePuzzle */ \"./src/components/PicturePuzzle.js\");\n/* harmony import */ var _utils_EventEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/EventEmitter */ \"./src/utils/EventEmitter.js\");\n/* harmony import */ var _utils_StateLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/StateLoader */ \"./src/utils/StateLoader.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ \"./config/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass App {\r\n    constructor() {\r\n        this.slider = null;\r\n        this.puzzle = null;\r\n\r\n        this.eventEmitter = new _utils_EventEmitter__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n        this.stateLoader = new _utils_StateLoader__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.eventEmitter);\r\n  \r\n        this.eventEmitter.onChangeState(() => this.saveCurrentState());\r\n        this.eventEmitter.onSuccessPuzzle(() => this.onSuccessPuzzle());\r\n        this.eventEmitter.onPreviousState((state) => this.onBackHistory(state));\r\n    }\r\n\r\n    onSuccessPuzzle() {\r\n        if (!this.puzzle) {\r\n            return;\r\n        }\r\n        this.puzzle.resetPuzzle();\r\n    }\r\n\r\n    clearPuzzle() {\r\n        this.puzzle.clearState();\r\n        this.stateLoader.clearLocalStorage();\r\n    }\r\n\r\n\r\n    getMaxWidth() {\r\n        const mainElement = document.querySelector('.main');\r\n        const computedStyle = getComputedStyle(mainElement);\r\n        const mainElementWidth = computedStyle.width;\r\n        return +mainElementWidth.slice(0, -2);\r\n    }\r\n\r\n    render(puzzleElement, sliderElement) {\r\n        const state = this.stateLoader.getState(_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].dimension);\r\n\r\n        this.slider = this.renderSlider(sliderElement, state.dimension);\r\n        this.puzzle = this.renderPuzzle(puzzleElement, state);\r\n    }\r\n\r\n    renderPuzzle(puzzleElement, state) {\r\n        return new _components_PicturePuzzle__WEBPACK_IMPORTED_MODULE_1__[\"default\"](puzzleElement, this.eventEmitter, this.getMaxWidth(), state);\r\n    }\r\n\r\n    renderSlider(sliderElement, dimension) {\r\n        return new _components_Slider__WEBPACK_IMPORTED_MODULE_0__[\"default\"](sliderElement, this.eventEmitter, dimension);\r\n    }\r\n\r\n    saveCurrentState () {\r\n        if (!this.puzzle) {\r\n            return;\r\n        }\r\n        const state = this.puzzle.getState();\r\n        this.stateLoader.saveToLocalStorage(state);\r\n        this.stateLoader.saveToHistory(state);\r\n    }\r\n\r\n    onBackHistory(state) {\r\n        if (state.dimension == undefined) {\r\n            return;\r\n        }\r\n        this.slider.setDimension(state.dimension);\r\n        this.puzzle.setState(state);\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/components/Cell.js":
/*!********************************!*\
  !*** ./src/components/Cell.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cell; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n\r\nclass Cell {\r\n    constructor(puzzle, index) {\r\n\r\n        this.isEmpty = false;\r\n        this._index = index;\r\n        this.puzzle = puzzle;\r\n        this.width = this.puzzle.maxWidth / this.puzzle.dimension;\r\n        this.height = this.width;\r\n\r\n        this.el = this.createDiv();\r\n\r\n        puzzle.el.appendChild(this.el);\r\n\r\n        if (this._index === this.puzzle.dimension * this.puzzle.dimension - 1) {\r\n            this.isEmpty = true;\r\n            return;\r\n        }\r\n        this.setImage();\r\n        this.setPosition(this._index);\r\n    }\r\n\r\n    getTruePosition() {\r\n        return this._index;\r\n    }\r\n\r\n    onClickCell() {\r\n        const currentCellIndex = this.puzzle.findPosition(this.getTruePosition());\r\n        const emptyCellIndex = this.puzzle.findEmpty();\r\n        const { x, y } = this.getCoords(currentCellIndex);\r\n        const { x: emptyX, y: emptyY } = this.getCoords(emptyCellIndex);\r\n\r\n        if ((x === emptyX || y === emptyY) &&\r\n            (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {\r\n            this.puzzle.moveCells(currentCellIndex, emptyCellIndex, true, true);\r\n\r\n        } else {\r\n            this.el.classList.add('shake');\r\n            setTimeout(() => {\r\n                this.el.classList.remove('shake')\r\n            }, _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].animation.errorDuration);\r\n        }\r\n    }\r\n\r\n    createDiv() {\r\n        const div = document.createElement('div');\r\n        div.classList.add('cell');\r\n        div.style.backgroundSize = `${this.puzzle.maxWidth}px ${this.puzzle.maxWidth}px`;;\r\n        div.onclick = () => this.onClickCell();\r\n        return div;\r\n    }\r\n\r\n    setImage() {\r\n        const { x, y } = this.getCoords(this.getTruePosition());\r\n        const left = this.width * x;\r\n        const top = this.height * y;\r\n\r\n        this.el.style.width = `${this.width}px`;\r\n        this.el.style.height = `${this.height}px`;\r\n\r\n        this.el.style.backgroundImage = `url(${_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].urlImage})`;\r\n        this.el.style.backgroundPosition = `-${left}px -${top}px`;\r\n    }\r\n\r\n    setPosition(destinationIndex, animate, currentIndex) {\r\n        const { left, top } = this.getPositionFromIndex(destinationIndex);\r\n        if (animate) {\r\n            this.shiftWithAnimation(currentIndex, left, top);\r\n        } else {\r\n            this.el.style.left = `${left}px`;\r\n            this.el.style.top = `${top}px`;\r\n        }\r\n    }\r\n\r\n    shiftWithAnimation(currentIndex, left, top) {\r\n        const { left: currentLeft, top: currentTop } = this.getPositionFromIndex(currentIndex);\r\n        if (left !== currentLeft) {\r\n            this.startShiftAnimation('left', currentLeft, left);\r\n        } else if (top !== currentTop) {\r\n            this.startShiftAnimation('top', currentTop, top);\r\n        }\r\n    }\r\n\r\n    startShiftAnimation(position, currentPosition, destination) {\r\n        const animationDuration = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].animation.movementDuration;\r\n        const frameRate = 10;\r\n        let step = frameRate * Math.abs((destination - currentPosition)) / animationDuration;\r\n\r\n        let id = setInterval(() => {\r\n            if (currentPosition < destination) {\r\n                currentPosition = Math.min(destination, currentPosition + step);\r\n                if (currentPosition >= destination) {\r\n                    clearInterval(id)\r\n                }\r\n            } else {\r\n                currentPosition = Math.max(destination, currentPosition - step);\r\n                if (currentPosition <= destination) {\r\n                    clearInterval(id)\r\n                }\r\n            }\r\n            this.el.style[position] = currentPosition + 'px';\r\n        }, frameRate)\r\n    }\r\n\r\n    getPositionFromIndex(index) {\r\n        const { x, y } = this.getCoords(index);\r\n        return {\r\n            left: this.width * x,\r\n            top: this.height * y\r\n        }\r\n    }\r\n\r\n    getCoords(index) {\r\n        return {\r\n            x: index % this.puzzle.dimension,\r\n            y: Math.floor(index / this.puzzle.dimension)\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/components/Cell.js?");

/***/ }),

/***/ "./src/components/PicturePuzzle.js":
/*!*****************************************!*\
  !*** ./src/components/PicturePuzzle.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PicturePuzzle; });\n/* harmony import */ var _models_AppState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/AppState */ \"./src/models/AppState.js\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./src/components/Cell.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config */ \"./config/index.js\");\n\r\n\r\n\r\n\r\nclass PicturePuzzle {\r\n    constructor(puzzleElement, eventEmitter, maxWidth, state) {\r\n        if (state.dimension === undefined) {\r\n            throw new Error('Dimension undefined in state');\r\n        }\r\n        this.dimension = state.dimension;\r\n        this.maxWidth = maxWidth;\r\n        this.el = this.changeWidth(puzzleElement);\r\n        this.eventEmitter = eventEmitter;\r\n        this.eventEmitter.onChangeDimension(({ dimension }) => this.resetPuzzle(dimension));\r\n        this.isInStartedPosition = false;\r\n\r\n        this.initCells(state.cells);\r\n    }\r\n\r\n    changeWidth(el) {\r\n        el.style.maxWidth = `${this.maxWidth}`;\r\n        el.style.width = `${this.maxWidth}px`;\r\n        el.style.height = `${this.maxWidth}px`;\r\n        return el;\r\n    }\r\n\r\n    resetPuzzle(inputDimension) {\r\n        const newDimension = inputDimension || this.dimension;\r\n        this.setState(new _models_AppState__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newDimension));\r\n    }\r\n\r\n    removeCells() {\r\n        this.cells.forEach(cell => cell.el.remove());;\r\n        this.cells = [];\r\n    }\r\n\r\n    getState() {\r\n        return new _models_AppState__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimension, this.getCellsForSave());\r\n    }\r\n\r\n    setState(state) {\r\n        this.removeCells();\r\n        this.isInStartedPosition = false;\r\n        this.dimension = state.dimension;\r\n        this.initCells(state.cells);\r\n    }\r\n\r\n    onManualChangePuzzle() {\r\n        this.eventEmitter.emitChangeState(this.getState());\r\n    }\r\n\r\n    getCellsForSave() {\r\n        return this.cells.map((cell, position) => ({\r\n            position,\r\n            index: cell.getTruePosition()\r\n        }));\r\n    }\r\n\r\n    initCells(stateCells) {\r\n        if (!stateCells || stateCells == undefined || stateCells.length == 0) {\r\n            return this.createCells();\r\n        }\r\n        this.restoreCells(stateCells);\r\n    }\r\n\r\n    restoreCells(stateCells) {\r\n        this.cells = [];\r\n        stateCells.forEach(({ position, index }) => {\r\n            this.cells[position] = new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, index);\r\n        });\r\n        stateCells.forEach(({ position, index }) => {\r\n            this.cells[position].setPosition(position);\r\n        });\r\n    }\r\n\r\n    createCells() {\r\n        this.cells = [];\r\n        for (let position = 0; position < this.dimension * this.dimension; position++) {\r\n            this.cells.push(new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, position));\r\n        };\r\n        setTimeout(() => this.shuffle(true), _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showFullPuzzleOnStartTime);\r\n    }\r\n\r\n    getRandomNumber(maxNumber, deniedNumber) {\r\n        return Math.floor(Math.random() * (maxNumber));\r\n    }\r\n\r\n    shuffle(useAnimate = false) {\r\n        const frameTime = _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].shuffleTime / (this.cells.length - 1);\r\n\r\n        for (let firstCellPosition = this.cells.length - 1; firstCellPosition > 0; firstCellPosition--) {\r\n            const secondCellPosition = this.getRandomNumber(firstCellPosition + 1);\r\n            setTimeout(\r\n                () => this.moveCells(firstCellPosition, secondCellPosition),\r\n                frameTime * firstCellPosition\r\n            );\r\n        }\r\n        while (this.isFinished()) {\r\n            this.swapRandomCells();\r\n        }\r\n    }\r\n\r\n    swapRandomCells() {\r\n        const firstCellPosition = this.getRandomNumber(this.cells.length - 1);\r\n        const secondCellPosition = this.getRandomNumber(this.cells.length - 1);\r\n        this.moveCells(firstCellPosition, secondCellPosition);\r\n    }\r\n\r\n    moveCells(i, j, useAnimate = false, isManualShift = false) {\r\n        if (isManualShift && this.isInStartedPosition) {\r\n            this.isInStartedPosition = false;\r\n            this.onManualChangePuzzle();\r\n        }\r\n\r\n        this.cells[i].setPosition(j, useAnimate, i);\r\n        this.cells[j].setPosition(i);\r\n\r\n        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];\r\n        if (isManualShift) {\r\n            this.onManualChangePuzzle();\r\n        }\r\n        if (!this.isInStartedPosition && this.isFinished()) {\r\n            this.eventEmitter.emitSucccesPuzzle();\r\n        }\r\n    }\r\n\r\n    isFinished() {\r\n        return !this.cells.some((cell, position) => {\r\n            return cell.getTruePosition() != position;\r\n        });\r\n    }\r\n\r\n    findPosition(index) {\r\n        return this.cells.findIndex(cell => cell.getTruePosition() === index);\r\n    }\r\n\r\n    findEmpty() {\r\n        return this.cells.findIndex(cell => cell.isEmpty);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/components/PicturePuzzle.js?");

/***/ }),

/***/ "./src/components/Slider.js":
/*!**********************************!*\
  !*** ./src/components/Slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Slider; });\nclass Slider {\r\n    constructor(el, eventEmitter, dimension) {\r\n        this.el = el;\r\n        this.eventEmitter = eventEmitter;\r\n        this.setDimension(dimension);\r\n        this.prevValue = this.el.value;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.el.onmouseup = () => this.onMouseUp();\r\n    }\r\n\r\n    onMouseUp() {\r\n        if (this.el.value !== this.prevValue) {\r\n            this.eventEmitter.emitChangeDimension(this.el.value);\r\n        }\r\n        this.prevValue = this.el.value;\r\n    }\r\n\r\n    setDimension(value) {\r\n        this.el.value = value;\r\n    }\r\n\r\n    getDimension() {\r\n        return this.el.value;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/components/Slider.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ \"./src/App.js\");\n\r\n\r\nconst app = new _App__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\napp.render(document.querySelector('#puzzle'), document.querySelector('#slider'));\n\n//# sourceURL=webpack:///./src/main.js?");

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

/***/ "./src/utils/EventEmitter.js":
/*!***********************************!*\
  !*** ./src/utils/EventEmitter.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EventEmitter; });\nconst CHANGE_DIMENSION = 'changeDimension';\r\nconst CHANGE_STATE = 'changeState';\r\nconst SUCCESS_PUZZLE = 'successPuzzle';\r\nconst PREVIOUS_STATE = 'previousState';\r\n\r\nclass EventEmitter {\r\n\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n\r\n    emitPreviousState(state) {\r\n        this.emit(PREVIOUS_STATE, state);\r\n    }\r\n\r\n    onPreviousState(callback) {\r\n        this.subscribe(PREVIOUS_STATE, callback);\r\n    }\r\n\r\n    emitSucccesPuzzle(state) {\r\n        this.emit(SUCCESS_PUZZLE, state);\r\n    }\r\n\r\n    onSuccessPuzzle(callback) {\r\n        this.subscribe(SUCCESS_PUZZLE, callback);\r\n    }\r\n\r\n    emitChangeState(state) {\r\n        this.emit(CHANGE_STATE, state);\r\n    }\r\n\r\n    onChangeState(callback) {\r\n        this.subscribe(CHANGE_STATE, callback);\r\n    }\r\n\r\n    emitChangeDimension(dimension) {\r\n        this.emit(CHANGE_DIMENSION, { dimension });\r\n    }\r\n\r\n    onChangeDimension(callback) {\r\n        this.subscribe(CHANGE_DIMENSION, callback);\r\n    }\r\n\r\n    emit(eventName, data) {\r\n        const event = this.events[eventName];\r\n        if (event) {\r\n            event.forEach(fn => {\r\n                fn.call(null, data);\r\n            });\r\n        }\r\n    }\r\n\r\n    subscribe(eventName, fn) {\r\n        if (!this.events[eventName]) {\r\n            this.events[eventName] = [];\r\n        }\r\n\r\n        this.events[eventName].push(fn);\r\n        return () => {\r\n            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/utils/EventEmitter.js?");

/***/ }),

/***/ "./src/utils/StateLoader.js":
/*!**********************************!*\
  !*** ./src/utils/StateLoader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StateLoader; });\n/* harmony import */ var _models_AppState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/AppState */ \"./src/models/AppState.js\");\nconst STORAGE_KEY = 'puzzle';\r\n\r\n\r\nclass StateLoader {\r\n    constructor(eventEmitter) {\r\n        this.eventEmitter = eventEmitter;\r\n        window.onpopstate = (event) => this.onBackHistory(event);\r\n    }\r\n\r\n    getDefaultState(defaultDimension) {\r\n        return new _models_AppState__WEBPACK_IMPORTED_MODULE_0__[\"default\"](defaultDimension);\r\n    }\r\n\r\n    loadFromLocalStorage() {\r\n        const stored = window.localStorage[STORAGE_KEY];\r\n        if (stored) {\r\n            return JSON.parse(stored);\r\n        }\r\n        return null;\r\n    }\r\n\r\n    saveToLocalStorage(state) {\r\n        window.localStorage[STORAGE_KEY] = JSON.stringify(state);\r\n    }\r\n\r\n    clearLocalStorage() {\r\n        delete window.localStorage[STORAGE_KEY];\r\n    }\r\n\r\n    saveToHistory(state) {\r\n        history.pushState(state, 'history', '#hash' + state.dimension + Date.now() +\r\n            Math.floor(Math.random() * 1000));\r\n    }\r\n\r\n    onBackHistory(event) {\r\n        if (!event.state) {\r\n            return;\r\n        }\r\n        this.eventEmitter.emitPreviousState(event.state);\r\n    }\r\n\r\n    getState(defaultDimension) {\r\n        const state = this.loadFromLocalStorage();\r\n        if (state && state.dimension && state.cells) {\r\n            return state;\r\n        }\r\n        return this.getDefaultState(defaultDimension);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/utils/StateLoader.js?");

/***/ })

/******/ });