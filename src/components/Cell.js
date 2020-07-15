import config from '../../config';
export default class Cell {
    constructor(puzzle, index) {

        this.isEmpty = false;
        this.index = index;
        this.puzzle = puzzle;
        this.width = this.puzzle.maxWidth / this.puzzle.dimension;
        this.height = this.width;

        this.el = this.createDiv();

        puzzle.el.appendChild(this.el);

        if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
            this.isEmpty = true;
            return;
        }
        this.setImage();
        this.setPosition(this.index);
    }

    createDiv() {
        const div = document.createElement('div');
        div.classList.add('cell');
        // div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.backgroundSize = `${this.puzzle.maxWidth}px ${this.puzzle.maxWidth}px`;;
        div.onclick = () => {

            const currentCellIndex = this.puzzle.findPosition(this.index);
            const emptyCellIndex = this.puzzle.findEmpty();
            const { x, y } = this.getXY(currentCellIndex);
            const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

            if ((x === emptyX || y === emptyY) &&
                (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {

                // this.puzzle.numberOfMovements++;
                // if (this.puzzle.onmove && typeof this.puzzle.onmove === 'function') {
                //     this.puzzle.onmove(this.puzzle.numberOfMovements);
                // }
                this.puzzle.moveCells(currentCellIndex, emptyCellIndex, true);

            } else {
                this.el.classList.add('shake');
                setTimeout(() => {
                    this.el.classList.remove('shake')
                }, config.animation.errorDuration);
            }
        };

        return div;
    }

    setImage() {
        const { x, y } = this.getXY(this.index);
        const left = this.width * x;
        const top = this.height * y;

        this.el.style.width = `${this.width}px`;
        this.el.style.height = `${this.height}px`;

        this.el.style.backgroundImage = `url(${config.urlImage})`;
        this.el.style.backgroundPosition = `-${left}px -${top}px`;
    }

    setPosition(destinationIndex, animate, currentIndex) {
        const { left, top } = this.getPositionFromIndex(destinationIndex);
        const { left: currentLeft, top: currentTop } = this.getPositionFromIndex(currentIndex);

        if (animate) {
            if (left !== currentLeft) {
                this.animate('left', currentLeft, left);
            } else if (top !== currentTop) {
                this.animate('top', currentTop, top);
            }
        } else {
            this.el.style.left = `${left}px`;
            this.el.style.top = `${top}px`;
        }
    }

    animate(position, currentPosition, destination) {
        const animationDuration = config.animation.movementDuration;
        const frameRate = 10;
        let step = frameRate * Math.abs((destination - currentPosition)) / animationDuration;

        let id = setInterval(() => {
            if (currentPosition < destination) {
                currentPosition = Math.min(destination, currentPosition + step);
                if (currentPosition >= destination) {
                    clearInterval(id)
                }
            } else {
                currentPosition = Math.max(destination, currentPosition - step);
                if (currentPosition <= destination) {
                    clearInterval(id)
                }
            }
            this.el.style[position] = currentPosition + 'px';
        }, frameRate)
    }

    getPositionFromIndex(index) {
        const { x, y } = this.getXY(index);
        return {
            left: this.width * x,
            top: this.height * y
        }
    }

    getXY(index) {
        return {
            x: index % this.puzzle.dimension,
            y: Math.floor(index / this.puzzle.dimension)
        }
    }
}