# aframe-ui-components

> UI components for A-Frame.

## Components

* [Cursor Feedback](#cursor-feedback)
* [Target Indicator](#target-indicator)

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
