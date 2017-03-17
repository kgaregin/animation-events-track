class AnimationTracker {
  constructor(options = {}) {
    this.__debug = options.debug || false; // if debug mode is true.
    if ((options.element instanceof Node)) { // brackets are mandatory here. Otherwise "!element" evaluates first.
      this.__element = options.element; // required element that animation runs on    
    } else {
      throw 'error: given element must be node!';
    }
    this.__animationName = options.name || false; // animation name (additional condition)
    // ----------------> handlers:
    this.__start = (ev) => {
      this.__debug && console.log(ev.animationName + ' : start on element :', this.__element);
      this.__animationName || options.start && options.start(); // if animation name is not given
      this.__animationName && ev.animationName === this.__animationName && options.start && options.start();
      // if name is given check if it matches with current animation event name
    }
    this.__iteration = (ev) => {
      this.__debug && console.log(ev.animationName + ' : iteration on element :', this.__element);
      this.__animationName || options.iteration && options.iteration(); // if animation name is not given
      this.__animationName && ev.animationName === this.__animationName && options.iteration && options.iteration();
      // if name is given check if it matches with current animation event name
    }
    this.__end = (ev) => {
      this.__debug && console.log(ev.animationName + ' : end on element :', this.__element);
      this.__animationName || options.end && options.end(); // if animation name is not given
      this.__animationName && ev.animationName === this.__animationName && options.end && options.end();
      // if name is given check if it matches with current animation event name
    }
    this.__evHandlers = {
      'AnimationStart': this.__start, // the animationstart event is fired when the animation starts for the first time.
      'AnimationIteration': this.__iteration, // the animationiteration event is fired at the start of every
      // new animation iteration, i.e. every iteration except the first.
      'AnimationEnd': this.__end // the animationend event is fired when the animation ends.
    };
    this.__vendors = options.vendors || ['webkit', 'moz', 'MS', 'o', '']; // array of supporting browser vendor prefixes.
    // Supporting all by default.
    if (this.__debug) {
      console.log('-------------------------------------------------------');
      console.log('Animation track on element:');
      console.log(this.__element);
      console.log('with following options:');
      console.log(options);
      console.log('-------------------------------------------------------');
    }
    this.addEvents();
  }

  prefixedEventAdd(element, type, callback) {
    this.__vendors.forEach((vendor) => {
      let curType = vendor ? type : type.toLowerCase();
      element.addEventListener(vendor + curType, callback, false);
    });
  }

  prefixedEventRemove(element, type, callback) {
    this.__vendors.forEach((vendor) => {
      let curType = vendor ? type : type.toLowerCase();
      element.removeEventListener(vendor + curType, callback);
    });
  }

  addEvents() {
    for (let evName in this.__evHandlers){
      this.prefixedEventAdd(this.__element, evName, this.__evHandlers[evName]);
    }
  }

  removeEvents() {
    for (let evName in this.__evHandlers){
      this.prefixedEventRemove(this.__element, evName, this.__evHandlers[evName]);
    }    
  }
}
