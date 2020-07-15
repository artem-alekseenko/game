import AppState from '../models/AppState';
import Cell from './Cell';
export default class PicturePuzzle {
    constructor(parentEl, eventEmitter, maxWidth, state) {
        this.dimension = state.dimension;
        this.maxWidth = maxWidth;
        this.el = this.renderWrapper(parentEl);
        this.eventEmitter = eventEmitter;
        this.eventEmitter.onChangeDimension(({dimension}) => this.changeDimension(dimension));
        this.isDirty = false;

        this.initCells(state.cells);

    }

    renderWrapper(parentEl) {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.maxWidth = `${this.maxWidth}`;
        div.style.margin = '0 auto';
        div.classList.add('cell');
        div.style.width = `${this.maxWidth}px`;
        div.style.height = `${this.maxWidth}px`;
        parentEl.appendChild(div);
        return div;
    }

    changeDimension(dimension) {
        this.setState(new AppState(dimension));
    }

    setState(state) {
        this.isDirty = false;
        this.dimension = state.dimension;
        this.removeCells();
        this.initCells(state.cells);
    }

    removeCells() {
        this.cells.forEach(cell => cell.el.remove());
    }

    getCellsForSave() {
        return this.cells.map((cell, position) => ({
            position, 
            index: cell.index
        }));
    }

    saveState() {
        this.eventEmitter.emitChangeState(this.getState());
    }

    getState() {
        return new AppState(this.dimension, this.getCellsForSave());
    }

    initCells(stateCells) {
        if (!stateCells || stateCells == undefined) {
            return this.createCells();
        }
        this.restoreCells(stateCells);
    }

    restoreCells(stateCells) {
        this.cells = [];
        stateCells.forEach(({position, index}) => {
            this.cells[position] = new Cell(this, index);
        });
        stateCells.forEach(({position, index}) => {
            this.cells[position].setPosition(position);
        });
    }

    createCells() {
        this.cells = [];
        for (let position = 0; position < this.dimension * this.dimension; position++) {
            this.cells.push(new Cell(this, position));
        };
        this.shuffle();
    }


    shuffle() {
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.moveCells(i, j);
        }
    }

    moveCells(i, j, animate) {
        if (animate !== undefined && !this.isDirty) {
            this.saveState();
            this.isDirty =true;
        }
        this.cells[i].setPosition(j, animate, i);
        this.cells[j].setPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        if (animate !== undefined) {
            this.saveState();
        }
        if (this.isFinished()) {
            console.log('The end');
        }
        // if (!this.shuffling && this.isFinished()) {
        //     if (this.onFinished && typeof this.onFinished === 'function') {
        //         this.onFinished.call(this);
        //     }
        // }
    }

    isFinished() {
        for (let i = 0; i < this.cells.length; i++) {
            if (i !== this.cells[i].index) {
                return false;
            }
        }
        return true;
    }

    findPosition(index) {
        return this.cells.findIndex(cell => cell.index === index);
    }

    findEmpty() {
        return this.cells.findIndex(cell => cell.isEmpty);
    }
}