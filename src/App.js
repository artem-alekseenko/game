import Slider from './components/Slider'
import PicturePuzzle from './components/PicturePuzzle'
import stateLoader from './utils/stateLoader'
import EventEmiiter from './components/EventEmitter'
import config from '../config'

export default class App {
    constructor() {
        this.eventEmitter = new EventEmiiter();
        this.slider = null;
        this.puzzle = null;
    }


    getMaxWidth() {
        const mainElement = document.querySelector('.main');
        const computedStyle = getComputedStyle(mainElement);
        const mainElementWidth = computedStyle.width;
        return +mainElementWidth.slice(0, -2);
    }

    render(puzzleElement, sliderElement) {
        const state = stateLoader.getState(config.dimension);

        this.slider = this.renderSlider(sliderElement, state.dimension);
        this.puzzle = this.renderPuzzle(puzzleElement, state);

        stateLoader.onBackHistory((state) => this.setState(state));
        this.eventEmitter.onChangeState(() => this.saveCurrentState());
    }

    renderPuzzle(puzzleElement, state) {
        return new PicturePuzzle(puzzleElement, this.eventEmitter, this.getMaxWidth(), state);
    }

    renderSlider(sliderElement, dimension) {
        return new Slider(sliderElement, this.eventEmitter, dimension);
    }

    saveCurrentState () {
        if (!this.puzzle) {
            return;
        }
        const state = this.puzzle.getState();
        stateLoader.saveToLocalStorage(state);
        stateLoader.saveToHistory(state);
    }

    setState(state) {
        if (state.dimension == undefined) {
            return;
        }
        this.slider.setDimension(state.dimension);
        this.puzzle.setState(state);
    }

}