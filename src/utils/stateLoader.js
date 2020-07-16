const STORAGE_KEY = 'puzzle';
import AppState from '../models/AppState';

export default class StateLoader {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        window.onpopstate = (event) => this.onBackHistory(event);
    }

    getDefaultState(defaultDimension) {
        return new AppState(defaultDimension);
    }

    loadFromLocalStorage() {
        const stored = window.localStorage[STORAGE_KEY];
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    }

    saveToLocalStorage(state) {
        window.localStorage[STORAGE_KEY] = JSON.stringify(state);
    }

    clearLocalStorage() {
        delete window.localStorage[STORAGE_KEY];
    }

    saveToHistory(state) {
        history.pushState(state, 'history', '#hash' + state.dimension + Date.now() +
            Math.floor(Math.random() * 1000));
    }

    onBackHistory(event) {
        if (!event.state) {
            return;
        }
        this.eventEmitter.emitPreviousState(event.state);
    }

    getState(defaultDimension) {
        const state = this.loadFromLocalStorage();
        if (state && state.dimension && state.cells) {
            return state;
        }
        return this.getDefaultState(defaultDimension);
    }
}