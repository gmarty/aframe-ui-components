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
