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
	__webpack_require__(2);
	__webpack_require__(3);


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


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* global AFRAME, THREE */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Target Indicator
	 */
	AFRAME.registerComponent('target-indicator', {
	  schema: {
	    target: { default: null }
	  },

	  multiple: false,

	  init: function() {
	    const targetSelector = this.data.target;
	    const target = document.querySelector(targetSelector);

	    if (!targetSelector || !target) {
	      console.warn('The target-indicator component requires a valid target.');
	      return;
	    }

	    const camera = this.el;
	    const frustum = new THREE.Frustum();
	    const arrow = document.createElement('a-image');

	    arrow.setAttribute('src', 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M256.333%20428q9%200%2015-6L392%20301.333%20422.333%20271q6-6%206-15t-6-15L392%20210.667%20271.333%2090q-6-6-15-6t-15%206L211%20120.333q-6%206-6%2015t6%2015l63%2063H106.667q-8.667%200-15%206.334-6.334%206.333-6.334%2015v42.666q0%208.667%206.334%2015%206.333%206.334%2015%206.334H274l-63%2063q-6.333%206.333-6.333%2015%200%208.666%206.333%2015L241.333%20422q6%206%2015%206zM256%20512q-69.667%200-128.5-34.333-58.833-34.334-93.167-93.167Q0%20325.667%200%20256t34.333-128.5Q68.667%2068.667%20127.5%2034.333%20186.333%200%20256%200t128.5%2034.333q58.833%2034.334%2093.167%2093.167Q512%20186.333%20512%20256t-34.333%20128.5q-34.334%2058.833-93.167%2093.167Q325.667%20512%20256%20512z%22%2F%3E%3C%2Fsvg%3E');
	    arrow.setAttribute('opacity', 0.5);
	    arrow.setAttribute('width', 0.5);
	    arrow.setAttribute('height', 0.5);
	    arrow.setAttribute('position', '0 0 -3');

	    camera.appendChild(arrow);

	    this.camera = camera;
	    this.frustum = frustum;
	    this.arrow = arrow;
	    this.target = target;
	  },

	  remove: function() {
	    this.camera.removeChild(this.arrow);
	  },

	  tick: function() {
	    const cameraThreeJS = this.camera.components.camera.camera;

	    // This is required by Chrome for Android in VR mode.
	    cameraThreeJS.updateMatrix();
	    cameraThreeJS.updateMatrixWorld();
	    cameraThreeJS.matrixWorldInverse.getInverse(cameraThreeJS.matrixWorld);

	    this.frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(
	      cameraThreeJS.projectionMatrix,
	      cameraThreeJS.matrixWorldInverse));

	    const pos = this.target.getAttribute('position');
	    const isInView = this.frustum.containsPoint(new THREE.Vector3(
	      pos.x,
	      pos.y,
	      pos.z
	    ));

	    if (isInView) {
	      this.arrow.setAttribute('visible', 'false');
	      return;
	    }

	    this.arrow.setAttribute('visible', 'true');

	    const targetV4 = new THREE.Vector4(
	      pos.x,
	      pos.y,
	      pos.z,
	      1
	    );
	    targetV4.applyMatrix4(cameraThreeJS.matrixWorldInverse);

	    var angle = Math.atan(targetV4.y / targetV4.x);

	    if (targetV4.x < 0) {
	      angle += Math.PI;
	    }

	    this.arrow.setAttribute('rotation', AFRAME.utils.coordinates.stringify({
	      x: 0,
	      y: 0,
	      z: THREE.Math.radToDeg(angle)
	    }));
	  },
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* global AFRAME, THREE */

	const propertyToThreeMapping = {
	  number: 'f',
	  time: 'f',
	  vec4: 'v4',
	  vec3: 'v3',
	  vec2: 'v2',
	  color: 'v3'
	};

	AFRAME.registerShader('volumetric-light', {
	  schema: {
	    attenuation: { type: 'number', default: 5.0, is: 'uniform' },
	    anglePower: { type: 'number', default: 1.2, is: 'uniform' },
	    spotPosition: { type: 'vec3', default: '0 0 0', is: 'uniform' },
	    lightColor: { type: 'vec3', default: '1 1 1', is: 'uniform' }
	  },

	  init: function(data) {
	    this.uniforms = this.initVariables(data, 'uniform');

	    this.material = new THREE.ShaderMaterial({
	      uniforms: this.uniforms,
	      vertexShader: this.vertexShader,
	      fragmentShader: this.fragmentShader,
	      transparent: true,
	      depthWrite: false,
	    });
	  },

	  initVariables: function(data, type) {
	    var self = this;
	    var variables = {};
	    var schema = this.schema;
	    var schemaKeys = Object.keys(schema);
	    schemaKeys.forEach(processSchema);
	    function processSchema(key) {
	      if (schema[key].is !== type) {
	        return;
	      }
	      var varType = propertyToThreeMapping[schema[key].type];
	      var varValue = schema[key].parse(data[key] || schema[key].default);
	      variables[key] = {
	        type: varType,
	        value: self.parseValue(schema[key].type, varValue)
	      };
	    }

	    return variables;
	  },

	  // Adapted from https://github.com/jeromeetienne/threex.volumetricspotlight.
	  vertexShader: [
	    'varying vec3 vNormal;',
	    'varying vec3 vWorldPosition;',

	    'void main(){',
	    // compute intensity
	    'vNormal		= normalize( normalMatrix * normal );',

	    'vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );',
	    'vWorldPosition		= worldPosition.xyz;',

	    // set gl_Position
	    'gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
	    '}',
	  ].join('\n'),

	  fragmentShader: [
	    'varying vec3		vNormal;',
	    'varying vec3		vWorldPosition;',

	    'uniform vec3		lightColor;',

	    'uniform vec3		spotPosition;',

	    'uniform float		attenuation;',
	    'uniform float		anglePower;',

	    'void main(){',
	    'float intensity;',

	    // distance attenuation
	    'intensity	= distance(vWorldPosition, spotPosition)/attenuation;',
	    'intensity	= 1.0 - clamp(intensity, 0.0, 1.0);',

	    // intensity on angle
	    'vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));',
	    'float angleIntensity	= pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );',
	    'intensity	= intensity * angleIntensity;',

	    // set the final color
	    'gl_FragColor	= vec4( lightColor, intensity );',
	    '}',
	  ].join('\n')
	});


/***/ }
/******/ ]);