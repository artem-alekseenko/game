const INIT_PUZZLE = 'changeDimension';

class EventEmitter {
    
    emitChangeDimension(countRows) {
        var event = new CustomEvent(INIT_PUZZLE, { countRows });
        document.dispatchEvent(event);
    }
    
    onInitPuzzle(callback) {
        document.addEventListener(INIT_PUZZLE, callback);
    }

}



// __________0__________

// changeDimension(5,6,7)


// SliderView 


// SliderView
//     constructor(evEmitter)
//         this.

//     this.evEmitter.emitChangeDimension(5)



// PuzzleView
//     constructor(evEmitter)
//         this.

//     init()
//         this.evEmitter.onChangeDimension(this.onInitPuzzle.bind(this))


//     onInitPuzzle({countRows}) {

//     }
// // Add an event listener
// document.addEventListener("name-of-event", function(e) {
//     console.log(e.detail); // Prints "Example of an event"
//   });
  
//   // Create the event
//   var event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
  
//   // Dispatch/Trigger/Fire the event
//   document.dispatchEvent(event);
