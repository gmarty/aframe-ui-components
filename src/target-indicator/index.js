/* global AFRAME */

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
    const frustum = new THREE.Frustum;
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
