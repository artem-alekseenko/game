const canNotMoveAnimationDuration = 600;
const moveAnimationDuration = 400;

const mainElement = document.querySelector('.main');
const computedStyle = getComputedStyle(mainElement);
const mainElementWidth = computedStyle.width;
const maxWidthPuzzle = +mainElementWidth.slice(0, -2);

let dimension = 7;

const urlImage = 'https://cs.pikabu.ru/images/jobseeker/logo2.png';

