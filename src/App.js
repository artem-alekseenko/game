import Slider from './components/Slider'
import PicturePuzzle from './components/PicturePuzzle'
import EventEmiiter from './utils/EventEmitter'
import StateLoader from './utils/StateLoader'
import config from '../config'

export default class App {
    constructor() {
        this.slider = null;
        this.puzzle = null;

        this.eventEmitter = new EventEmiiter();
        this.stateLoader = new StateLoader(this.eventEmitter);
  
        this.eventEmitter.onChangeState(() => this.saveCurrentState());
        this.eventEmitter.onSuccessPuzzle(() => this.onSuccessPuzzle());
        this.eventEmitter.onPreviousState((state) => this.onBackHistory(state));
    }

    onSuccessPuzzle() {
        if (!this.puzzle) {
            return;
        }
        this.puzzle.resetPuzzle();
    }

    clearPuzzle() {
        this.puzzle.clearState();
        this.stateLoader.clearLocalStorage();
    }


    getMaxWidth() {
        const mainElement = document.querySelector('.main');
        const computedStyle = getComputedStyle(mainElement);
        const mainElementWidth = computedStyle.width;
        return +mainElementWidth.slice(0, -2);
    }

    render(puzzleElement, sliderElement) {
        const state = this.stateLoader.getState(config.dimension);

        this.slider = this.renderSlider(sliderElement, state.dimension);
        this.puzzle = this.renderPuzzle(puzzleElement, state);
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
        this.stateLoader.saveToLocalStorage(state);
        this.stateLoader.saveToHistory(state);
    }

    onBackHistory(state) {
        if (state.dimension == undefined) {
            return;
        }
        this.slider.setDimension(state.dimension);
        this.puzzle.setState(state);
    }

}