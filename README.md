# Animation event tracker
## a simple crossbrowser event tracker that helps attaching any callback functions on particular event(s). Can handle start, iteration and end of animation.

## usage example:
```js
let start = () => {
  console.log('Animation start: place your event handler code here!');
};
let iteration = () => {
  console.log('Animation iteration: place your event handler code here!');
};
let end = () => {
  console.log('Animation end: place your event handler code here!');
};
let tracker = new AnimationTracker({
  element: document.querySelector('.animation_element'),
  name: 'bounce',
  start,
  iteration,
  end
});
```

## AnimationTracker class receive an object with following parameters:
```js
let options = {
  debug: true/false, // [optional] console logs
  element: node, // [required] document node with corresponding animation
  name: 'animationName', // [optional] string with the name of particular animation (in case there are many of them for single element)
  start: callback function, // [optional] callback for event start
  iteration: callback function, // [optional] callback for event iteration
  end: callback function, // [optional] callback for event end
  vendors: ['webkit', 'moz', 'MS', 'o', ''] // [optional] array. in case you don't want supporting all browsers. 
}
```

### Inspired by this article https://www.sitepoint.com/css3-animation-javascript-event-handlers/
### Any feedback appreciated!
