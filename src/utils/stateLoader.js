const STORAGE_KEY = 'puzzle';
import AppState from '../models/AppState';

export default {
    getDefaultState(defaultDimension) {
        return new AppState(defaultDimension);
    },

    loadFromLocalStorage() {
        const stored = window.localStorage[STORAGE_KEY];
        if (stored) {
            return JSON.parse(stored);
        }
        return null;
    },

    saveToLocalStorage (state) {
        window.localStorage[STORAGE_KEY] = JSON.stringify(state);
    },

  
    saveToHistory (state) {
        history.pushState(state, 'history', '#hash' + state.dimension + Date.now() +
            Math.floor(Math.random() * 1000));
    },

    onBackHistory(callback) {
        window.onpopstate = function (event) {
            if (!event.state) {
                return;
            }
            callback(event.state);
        };
    },


    getState(defaultDimension) {
        const state = this.loadFromLocalStorage();
        if (state && state.dimension && state.cells) {
           
           return state;
        }
        return this.getDefaultState(defaultDimension);
    },
}