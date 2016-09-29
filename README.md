# aframe-ui-components

> UI components for A-Frame.

## Components

* [Cursor Feedback](#cursor-feedback)
* [Target Indicator](#target-indicator)
* [Volumetric Light](#volumetric-light)

## Demo

[gmarty.github.io/aframe-ui-components](https://gmarty.github.io/aframe-ui-components)

## cursor-feedback

Add visual feedback to a cursor when hovering a clickable object.

### API

| Property | Description                            | Default Value |
| -------- | -------------------------------------- | ------------- |
| property | The property of the cursor to animate. | `scale`       |
| dur      | The duration of the animation in ms.   | 300           |
| to       | Ending value of the property.          | `2 2 2`       |

### Browser Installation

This component requires [`aframe-animation-component`](https://github.com/ngokevin/aframe-animation-component).

Install and use by directly including the [browser files](dist).

Create a cursor with a `cursor-feedback` attribute and tag all your interactive 
entities with `data-interactive="true"`:

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-animation-component/master/dist/aframe-animation-component.min.js"></script>
  <script src="https://rawgit.com/gmarty/aframe-ui-components/master/dist/aframe-ui-components.min.js"></script>
</head>

<body>
  <a-scene>
    <a-box position="0 2.5 -8"
           data-interactive="true"></a-box>
  
    <a-camera>
      <a-cursor fuse="false"
                cursor-feedback></a-cursor>
    </a-camera>
  </a-scene>
</body>
```

It's recommended to deactivate fuse mode when using this component.

If all your interactive objects have a `data-interactive` attribute, you can 
optimise the cursor raycasting this way:
```html
<a-cursor fuse="false"
          objects="[data-interactive='true']"
          cursor-feedback></a-cursor>
```

## target-indicator

Displays an arrow pointing at an object when it is out of sight.

### API

| Property | Description                            | Default Value |
| -------- | -------------------------------------- | ------------- |
| target   | A reference to the entity to target.   |               |

### Browser Installation

Install and use by directly including the [browser files](dist).

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-animation-component/master/dist/aframe-animation-component.min.js"></script>
  <script src="https://rawgit.com/gmarty/aframe-ui-components/master/dist/aframe-ui-components.min.js"></script>
</head>

<body>
  <a-scene>
    <a-box id="box"
           position="2 3 -10"></a-box>
  
    <a-camera target-indicator="target: #box;"></a-camera>
  </a-scene>
</body>
```

## Volumetric Light

Material for spotlight, ideal to attract the user attention to an object.

### API

| Property     | Description                            | Default Value |
| ------------ | -------------------------------------- | ------------- |
| attenuation  | The property of the cursor to animate. | 5             |
| anglePower   | The duration of the animation in ms.   | 1.2           |
| spotPosition | Ending value of the property.          | `0 0 0`       |
| lightColor   | Ending value of the property.          | `1 1 1`       |

### Browser Installation

Install and use by directly including the [browser files](dist).

Create an `<a-cone>` with a `material="shader: volumetric-light;` attribute:

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/gmarty/aframe-ui-components/master/dist/aframe-ui-components.min.js"></script>
</head>

<body>
  <a-scene>
    <a-cone height="5"
            radius-top="0.5"
            radius-bottom="1.5"
            open-ended="true"
            position="0 2.5 -5"
            material="shader: volumetric-light;"></a-cone>
  </a-scene>
</body>
```

Ideally set the `spotPosition` to the position of the entity.

The `lightColor` attribute requires a Vector3 notation. For example white is
 '1 1 1'.
 
You'll also probably want to use a `<a-light type="spot"/>` for an improved
effect.

The original code for this shader can be found at [github.com/jeromeetienne/threex.volumetricspotlight](https://github.com/jeromeetienne/threex.volumetricspotlight).

## npm Installation

Install via npm:

```bash
npm install aframe-ui-components
```

Then register and use.

```js
require('aframe');
require('aframe-ui-components');
```
