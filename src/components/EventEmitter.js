const CHANGE_DIMENSION = 'changeDimension';
const CHANGE_STATE = 'changeState';

export default class EventEmitter {

    constructor() {
        this.events = {};
    }

    emitChangeState(state) {
        this.emit(CHANGE_STATE, state);
    }

    onChangeState(callback) {
        this.subscribe(CHANGE_STATE, callback);
    }

    emitChangeDimension(dimension) {
        this.emit(CHANGE_DIMENSION, {dimension});
    }

    onChangeDimension(callback) {
        this.subscribe(CHANGE_DIMENSION, callback);
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }

}