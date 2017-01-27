class AnimationTrack {
  constructor(options = {}) {
    this.__debug = options.debug || false; // if debug mode is true all logs be outputed.
    this.__element = options.element; // !required. element that animation runs on
    this.__evName = options.name || false; // animation name. additional condition
    // ----------------> handlers:
    this.__start = options.start || false; // The animationstart event is fired when the animation starts for the first time.
    this.__iteration = options.iteration || false; // The animationiteration event is fired at the start of every new animation iteration, i.e. every iteration except the first.
    this.__end = options.end || false; // The animationend event is fired when the animation ends.
    this.__vendors = options.vendors || ['webkit', 'moz', 'MS', 'o', '']; // array of supporting browser vendor prefixes. Supporting all by default.
    this.addEvents();
  }

  prefixedEventAdd(element, type, callback) {
    if (!(element instanceof Node)) { // brackets are mandatory here. Otherwise "!element" evaluates first.
      if (this.__debug) console.log('element must be Node!');
      return;
    }
    for (var v = 0; v < this.__vendors.length; v++) {
      if (!this.__vendors[v]) type = type.toLowerCase();
      element.addEventListener(this.__vendors[v] + type, callback, false);
    }
  }

  prefixedEventRemove(element, type, callback) {
    for (var v = 0; v < this.__vendors.length; v++) {
      if (!this.__vendors[v]) type = type.toLowerCase();
      element.removeEventListener(this.__vendors[v] + type, callback);
    }
  }

  handleStart(ev) {
    let name = ev.animationName;
    if (this.__evName && this.__evName != evName) return;
    if (this.__debug) console.log('animation: start');
    if (this.__start) this.__start(ev);
  }
  handleIteration(ev) {
    let name = ev.animationName;
    if (this.__evName && this.__evName != evName) return;
    if (this.__debug) console.log('animation: iteration');
    if (this.__iteration) this.__iteration(ev);
  }
  handleEnd(ev) {
    let name = ev.animationName;
    if (this.__evName && this.__evName != evName) return;
    if (this.__debug) console.log('animation: end');
    if (this.__end) this.__end(ev);
  }

  addEvents() {
    this.prefixedEventAdd(this.__element, 'AnimationStart', this.handleStart.bind(this));
    this.prefixedEventAdd(this.__element, 'AnimationIteration', this.handleIteration.bind(this));
    this.prefixedEventAdd(this.__element, 'AnimationEnd', this.handleEnd.bind(this));
  }

  removeEvents() {
    this.prefixedEventRemove(this.__element, 'AnimationStart', this.handleStart.bind(this));
    this.prefixedEventRemove(this.__element, 'AnimationIteration', this.handleIteration.bind(this));
    this.prefixedEventRemove(this.__element, 'AnimationEnd', this.handleEnd.bind(this));
  }
}
