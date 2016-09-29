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
