export default class Slider {
    constructor(el, eventEmitter, dimension) {
        this.el = el;
        this.eventEmitter = eventEmitter;
        this.setDimension(dimension);
        this.prevValue = this.el.value;
        this.init();
    }
    
    init() {
        this.el.onmouseup = () => this.onMouseUp();
    }

    onMouseUp() {
        if (this.el.value !== this.prevValue) {
            this.eventEmitter.emitChangeDimension(this.el.value);
        }
        this.prevValue = this.el.value;
    }

    setDimension(value) {
        this.el.value = value;
    }

    getDimension() {
        return this.el.value;
    }
}