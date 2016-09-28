/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* global AFRAME */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Cursor Feedback
	 */
	AFRAME.registerComponent('cursor-feedback', {
	  schema: {
	    property: { default: 'scale' },
	    dur: { default: '300' },
	    to: { default: '2 2 2' },
	  },

	  multiple: false,

	  init: function() {
	    this.mouseenter = this.mouseenter.bind(this);
	    this.mouseleave = this.mouseleave.bind(this);

	    this.el.addEventListener('mouseenter', this.mouseenter);
	    this.el.addEventListener('mouseleave', this.mouseleave);
	  },

	  mouseenter: function(evt) {
	    const data = this.data;

	    const states = evt.target.states;
	    const index = states.indexOf('interactive');
	    const target = evt.detail.intersectedEl;
	    const isInteractive = !!target.dataset.interactive;

	    if (index === -1 && isInteractive) {
	      states.push('interactive');
	      evt.target.removeAttribute('animation');
	      const animation = {
	        property: data.property,
	        dur: data.dur,
	        to: data.to,
	      };

	      evt.target.setAttribute('animation',
	        AFRAME.utils.styleParser.stringify(animation));
	    } else if (index >= 0 && !isInteractive) {
	      states.splice(index, 1);
	      evt.target.removeAttribute('animation');
	      const animation = {
	        property: data.property,
	        dur: data.dur,
	        to: '1 1 1',
	      };

	      evt.target.setAttribute('animation',
	        AFRAME.utils.styleParser.stringify(animation));
	    }
	  },

	  mouseleave: function(evt) {
	    const data = this.data;

	    const states = evt.target.states;
	    const index = states.indexOf('interactive');

	    if (index >= 0) {
	      states.splice(index, 1);
	      evt.target.removeAttribute('animation');
	      const animation = {
	        property: data.property,
	        dur: data.dur,
	        to: '1 1 1',
	      };
	      evt.target.setAttribute('animation',
	        AFRAME.utils.styleParser.stringify(animation));
	    }
	  },

	  remove: function() {
	    this.el.removeAttribute('animation');
	    this.el.removeEventListener('mouseenter', this.mouseenter);
	    this.el.removeEventListener('mouseleave', this.mouseleave);
	  },
	});


/***/ }
/******/ ]);