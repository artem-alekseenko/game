export default class Slider {
    constructor(el, eventEmitter, dimension) {
        this.el = el;
        this.eventEmitter = eventEmitter;
        this.setDimension(dimension);

        this.init();
    }

    init() {
        this.el.onmouseup = this.onMouseUp.bind(this);
    }

    onMouseUp() {
        this.eventEmitter.emitChangeDimension(this.el.value);
    }

    setDimension(value) {
        this.el.value = value;
    }

    getDimension() {
        return this.el.value;
    }
}