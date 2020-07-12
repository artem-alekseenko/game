class SliderView {

    constructor(el, eventEmitter) {
        this.el = el;
        this.eventEmitter = eventEmitter;

        this.init();
    }

    init() {
        this.el.onmouseup = this.onMouseUp.bind(this);
    }

    onMouseUp() {
        console.log(this.el.value);
        this.eventEmitter.emitChangeDimension(this.el.value);
    }

    getDimension() {
        return this.el.value;
    }
}