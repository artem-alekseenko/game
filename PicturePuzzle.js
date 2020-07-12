class PicturePuzzle {
    constructor(el, imageSrc, width, dimension) {
        this.parentEl = el;
        this.dimension = dimension;
        this.imageSrc = imageSrc;
        this.width = width;
        this.cells = [];
        this.shuffling = false;
        // this.numberOfMovements = 0;

        this.onFinished = () => { };
        this.onmove = () => { };

        this.init();

        const img = new Image();

        img.onload = () => {
            debugger;
            // this.height = img.height * this.width / img.width;
            // this.el.style.width = `${this.width}px`;
            // this.el.style.height = `${this.height}px`;
            this.height = maxWidthPuzzle;
            this.width = maxWidthPuzzle;
            this.el.style.width = `${maxWidthPuzzle}px`;
            this.el.style.height = `${maxWidthPuzzle}px`;

            this.setup();
        };
        img.src = this.imageSrc;
    }

    init() {

        this.el = this.createWrapper();

        this.parentEl.appendChild(this.el);
    }

    createWrapper() {
        const div = document.createElement('div');

        div.style.position = 'relative';
        div.style.maxWidth = `${maxWidthPuzzle}`;
        //div.style.height = `${maxWidthPuzzle}`;
        div.style.margin = '0 auto';
        div.classList.add('cell');

        return div;
    }

    setup() {
        for (let i = 0; i < this.dimension * this.dimension; i++) {
            this.cells.push(new Cell(this, i));
        }
        this.shuffle();
    }

    shuffle() {
        this.shuffling = true;
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.moveCells(i, j);
        }
        this.shuffling = false;
    }

    moveCells(i, j, animate) {

        this.cells[i].setPosition(j, animate, i);
        this.cells[j].setPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

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