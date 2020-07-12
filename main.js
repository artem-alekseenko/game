

const eventEmitter = new EventEmitter();
const sliderView = new SliderView(document.querySelector('#slider'), eventEmitter);
const puzzleView = new PuzzleView(eventEmitter);

const initPuzzle = () => {
    const params = getPuzzleParamsFromUrl(); 
    puzzleView.createPuzzle(sliderView.getDimension(), utils.getPuzzleParamsFromUrl());
}


puzzleView
    onChangeDimension()
    onChangeManualParams() [3, 2, 1, 4]




// const picturePuzzle = new PicturePuzzle(
//     document.querySelector('#puzzle-wrapper'),
//     urlImage,
//     600,
//     dimension
// )

// class SliderSwitch {

//     constructor(parentEl) {
//         this.el = this.createSlider();
//         parentEl.prepend(this.el);
//     }

//     createSlider() {
//         const slidecontainer = document.createElement('div');
//         slidecontainer.classList.add('slidecontainer');

//         const slider = document.createElement('input');
//         slider.classList.add('slider');
//         slider.setAttribute('type', 'range');
//         slider.setAttribute('min', 5);
//         slider.setAttribute('max', 10);
//         slider.setAttribute('step', 1);
//         slider.setAttribute('value', dimension);

//         slidecontainer.append(slider);

//         slider.onmousedown = () => {
            
//         }

//         slider.onmouseup = (event) => {
//             const value = document.querySelector('.slider').value;
//             if (value !== dimension) {
//                 dimension = value;   
//                 console.log(this);             
//             }            
//         }

//         return slidecontainer;

//     }
// }