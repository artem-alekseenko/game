import AppState from '../models/AppState';
import Cell from './Cell';
import config from '../../config';

export default class PicturePuzzle {
    constructor(puzzleElement, eventEmitter, maxWidth, state) {
        if (state.dimension === undefined) {
            throw new Error('Dimension undefined in state');
        }
        this.dimension = state.dimension;
        this.maxWidth = maxWidth;
        this.el = this.changeWidth(puzzleElement);
        this.eventEmitter = eventEmitter;
        this.eventEmitter.onChangeDimension(({ dimension }) => this.resetPuzzle(dimension));
        this.isInStartedPosition = false;

        this.initCells(state.cells);
    }

    changeWidth(el) {
        el.style.maxWidth = `${this.maxWidth}`;
        el.style.width = `${this.maxWidth}px`;
        el.style.height = `${this.maxWidth}px`;
        return el;
    }

    resetPuzzle(inputDimension) {
        const newDimension = inputDimension || this.dimension;
        this.setState(new AppState(newDimension));
    }

    removeCells() {
        this.cells.forEach(cell => cell.el.remove());;
        this.cells = [];
    }

    getState() {
        return new AppState(this.dimension, this.getCellsForSave());
    }

    setState(state) {
        this.removeCells();
        this.isInStartedPosition = false;
        this.dimension = state.dimension;
        this.initCells(state.cells);
    }

    onManualChangePuzzle() {
        this.eventEmitter.emitChangeState(this.getState());
    }

    getCellsForSave() {
        return this.cells.map((cell, position) => ({
            position,
            index: cell.getTruePosition()
        }));
    }

    initCells(stateCells) {
        if (!stateCells || stateCells == undefined || stateCells.length == 0) {
            return this.createCells();
        }
        this.restoreCells(stateCells);
    }

    restoreCells(stateCells) {
        this.cells = [];
        stateCells.forEach(({ position, index }) => {
            this.cells[position] = new Cell(this, index);
        });
        stateCells.forEach(({ position, index }) => {
            this.cells[position].setPosition(position);
        });
    }

    createCells() {
        this.cells = [];
        for (let position = 0; position < this.dimension * this.dimension; position++) {
            this.cells.push(new Cell(this, position));
        };
        setTimeout(() => this.shuffle(true), config.showFullPuzzleOnStartTime);
    }

    getRandomNumber(maxNumber, deniedNumber) {
        return Math.floor(Math.random() * (maxNumber));
    }

    shuffle(useAnimate = false) {
        const frameTime = config.shuffleTime / (this.cells.length - 1);

        for (let firstCellPosition = this.cells.length - 1; firstCellPosition > 0; firstCellPosition--) {
            const secondCellPosition = this.getRandomNumber(firstCellPosition + 1);
            setTimeout(
                () => this.moveCells(firstCellPosition, secondCellPosition),
                frameTime * firstCellPosition
            );
        }
        while (this.isFinished()) {
            this.swapRandomCells();
        }
    }

    swapRandomCells() {
        const firstCellPosition = this.getRandomNumber(this.cells.length - 1);
        const secondCellPosition = this.getRandomNumber(this.cells.length - 1);
        this.moveCells(firstCellPosition, secondCellPosition);
    }

    moveCells(i, j, useAnimate = false, isManualShift = false) {
        if (isManualShift && this.isInStartedPosition) {
            this.isInStartedPosition = false;
            this.onManualChangePuzzle();
        }

        this.cells[i].setPosition(j, useAnimate, i);
        this.cells[j].setPosition(i);

        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        if (isManualShift) {
            this.onManualChangePuzzle();
        }
        if (!this.isInStartedPosition && this.isFinished()) {
            this.eventEmitter.emitSucccesPuzzle();
        }
    }

    isFinished() {
        return !this.cells.some((cell, position) => {
            return cell.getTruePosition() != position;
        });
    }

    findPosition(index) {
        return this.cells.findIndex(cell => cell.getTruePosition() === index);
    }

    findEmpty() {
        return this.cells.findIndex(cell => cell.isEmpty);
    }
}