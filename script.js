console.log('script loaded');


//canvas
function setup() {
  let canvasInit = createCanvas(1000, 600);
  console.log(windowWidth, windowHeight);

  canvasInit.id('canvas');
}

function draw() {
  // console.log(windowWidth, windowHeight);
  background(125);


  fill(255);
  //drum circles
  ellipse(150, 50, 50, 50);
  ellipse(250, 50, 50, 50);
  ellipse(350, 50, 50, 50);
  ellipse(450, 50, 50, 50);
  ellipse(550, 50, 50, 50);
  ellipse(650, 50, 50, 50);
  ellipse(750, 50, 50, 50);
  ellipse(850, 50, 50, 50);

  //melody circles
  ellipse(150, 550, 50, 50);
  ellipse(250, 550, 50, 50);
  ellipse(350, 550, 50, 50);
  ellipse(450, 550, 50, 50);
  ellipse(550, 550, 50, 50);
  ellipse(650, 550, 50, 50);
  ellipse(750, 550, 50, 50);
  ellipse(850, 550, 50, 50);

  fill(255, 0 ,0);
  stroke(0);
  strokeWeight(2);

  ellipse(mouseX, mouseY, 15, 15);
  rect(0, 0, )
}

//audio

//scale arrays
let scale_C_Major = ["C", "D", "E", "F", "G", "A", "B"];
let scale_Db_Major = ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];
let scale_D_Major = ["D", "E", "F#", "G", "A", "B", "C#"];
let scale_Eb_Major = ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
let scale_E_Major = ["E", "F#", "G#", "A", "B", "C#", "D#"];
let scale_F_Major = ["F", "G", "A", "Bb", "C", "D", "E"];
let scale_Fsharp_Major = ["F#", "G#", "A#", "B", "C#", "D#", "F"];
let scale_G_Major = ["G", "A", "B", "C", "D", "E", "F#"];
let scale_Ab_Major = ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];
let scale_A_Major = ["A", "B", "C#", "D", "E", "F#", "G#"];
let scale_Bb_Major = ["Bb", "C", "D", "Eb", "F", "G", "A"];
let scale_B_Major = ["B", "C#", "D#", "E", "F#", "G#", "A#"];
let scale_C_Minor = ["C", "D", "Eb", "F", "G", "Ab", "Bb"];
let scale_Csharp_Minor = ["C#", "D#", "E", "F#", "G#", "A", "B"];
let scale_D_Minor = ["D", "E", "F", "G", "A", "Bb", "C"];
let scale_Eb_Minor = ["Eb", "F", "Gb", "Ab", "Bb", "B", "Db"];
let scale_E_Minor = ["E", "F#", "G", "A", "B", "C", "D"];
let scale_F_Minor = ["F", "G", "Ab", "Bb", "C", "Db", "Eb"];
let scale_Fsharp_Minor = ["F#", "G#", "A", "B", "C#", "D", "E"];
let scale_G_Minor = ["G", "A", "Bb", "C", "D", "Eb", "F"];
let scale_Gsharp_Minor = ["G#", "A#", "B", "C#", "D#", "E", "F#"];
let scale_A_Minor = ["A", "B", "C", "D", "E", "F", "G"];
let scale_Bb_Minor = ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"];
let scale_B_Minor = ["B", "C#", "D", "E", "F#", "G", "A"];

let activeScale = scale_C_Major;
console.log('active scale is ' + activeScale);



let melodySynth = new Tone.PolySynth().toDestination();

let chordSynth = new Tone.PolySynth().toDestination();

let octave = 4;
let octaveText = document.getElementById("octaveText");


function playNote(note){
  if(note == 8){
    melodySynth.triggerAttackRelease(activeScale[0]+(octave+2), "8n");
  } else {
    melodySynth.triggerAttackRelease(activeScale[(note-1)]+(octave+1), "8n");
  }
}

function playChord(chord){

  console.log('playing chord: ' + chord);
  // NEEDS TO BE REVISED FOR DIFFERENT SCALES THAT CHANGE OCTAVE SOONER OR LATER
  if(chord < 4){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord + 3;
    chordSynth.triggerAttackRelease([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+octave], "4n");
  }
  if(chord == 4 || chord == 5){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord - 4;
    chordSynth.triggerAttackRelease([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+(octave+1)], "4n");
  }
  if(chord == 6 || chord == 7){
    let first = chord - 1;
    let third = chord - 6;
    let fifth = chord - 4;
    chordSynth.triggerAttackRelease([activeScale[first]+octave, activeScale[third]+(octave+1), activeScale[fifth]+(octave+1)], "4n");
  }
  if(chord == 8){
    chordSynth.triggerAttackRelease([activeScale[0]+(octave+1), activeScale[2]+(octave+1), activeScale[4]+(octave+1)], "4n");
  }
}


let drum1 = new Audio("default-drumkit/kick.wav");
let drum2 = new Audio("default-drumkit/cowbell.wav");
let drum3 = new Audio("default-drumkit/hat.wav");
let drum4 = new Audio("default-drumkit/perc.wav");
let drum5 = new Audio("default-drumkit/clap.wav");
let drum6 = new Audio("default-drumkit/rimshot.wav");
let drum7 = new Audio("default-drumkit/snare.wav");
let drum8 = new Audio("default-drumkit/crash.wav");


function playDrum(drum){
  if(drum == 1){
    drum1.currentTime = 0;
    drum1.play();
  }
  if(drum == 2){
    drum2.currentTime = 0;
    drum2.play();
  }
  if(drum == 3){
    drum3.currentTime = 0;
    drum3.play();
  }
  if(drum == 4){
    drum4.currentTime = 0;
    drum4.play();
  }
  if(drum == 5){
    drum5.currentTime = 0;
    drum5.play();
  }
  if(drum == 6){
    drum6.currentTime = 0;
    drum6.play();
  }
  if(drum == 7){
    drum7.currentTime = 0;
    drum7.play();
  }
  if(drum == 8){
    drum8.currentTime = 0;
    drum8.play();
  }
}



let mode = "Drum";
let modeCycle = 0;
let modeText = document.getElementById("modeText");

function rotateMode(){
  if(modeCycle < 2){
    modeCycle++;
  } else {
    modeCycle = 0;
  }
  if(modeCycle == 2){
    mode = "Melody";
    console.log("mode: " + mode);
  } else {
    if(modeCycle == 1){
      mode = "Chord";
      console.log("mode: " + mode);
    } else {
      if(modeCycle == 0){
        mode = "Drum";
        console.log("mode: " + mode);
      }
    }
  }
  modeText.innerHTML = "Current Mode: " + mode;
}

function selectMode(newMode){
  mode = newMode;
  console.log("mode: " + mode);
  modeText.innerHTML = "Current Mode: " + mode;
}

//event listeners for keyboard inputs
document.addEventListener('keydown', function(event) {
  if(event.code == 'KeyP'){
    selectMode("FX");
  }

  if(event.code == 'Digit1'){
    selectMode("Drum");
  }

  if(event.code == 'Digit2'){
    selectMode("Chord");
  }

  if(event.code == 'Digit3'){
    selectMode("Melody");
  }

  if(mode == "Melody"){
    //keys a-k play notes of the scale when in melody mode
    if(event.code == 'KeyA'){
      console.log(1);
      playNote(1);
    }
    if(event.code == 'KeyS'){
      console.log(2);
      playNote(2);
    }
    if(event.code == 'KeyD'){
      console.log(3);
      playNote(3);
    }
    if(event.code == 'KeyF'){
      console.log(4);
      playNote(4);
    }
    if(event.code == 'KeyG'){
      console.log(5);
      playNote(5);
    }
    if(event.code == 'KeyH'){
      console.log(6);
      playNote(6);
    }
    if(event.code == 'KeyJ'){
      console.log(7);
      playNote(7);
    }
    if(event.code == 'KeyK') {
      console.log(8);
      playNote(8);
    }
  }

  if(mode == "Drum"){
    //keys a-k play drums of the drum kit when in drum mode
    if(event.code == 'KeyA'){
      console.log(1);
      playDrum(1);
    }
    if(event.code == 'KeyS'){
      console.log(2);
      playDrum(2);
    }
    if(event.code == 'KeyD'){
      console.log(3);
      playDrum(3);
    }
    if(event.code == 'KeyF'){
      console.log(4);
      playDrum(4);
    }
    if(event.code == 'KeyG'){
      console.log(5);
      playDrum(5);
    }
    if(event.code == 'KeyH'){
      console.log(6);
      playDrum(6);
    }
    if(event.code == 'KeyJ'){
      console.log(7);
      playDrum(7);
    }
    if(event.code == 'KeyK') {
      console.log(8);
      playDrum(8);
    }
  }

  if(mode == "Chord"){
    //keys a-k play drums of the drum kit when in drum mode
    if(event.code == 'KeyA'){
      console.log(1);
      playChord(1);
    }
    if(event.code == 'KeyS'){
      console.log(2);
      playChord(2);
    }
    if(event.code == 'KeyD'){
      console.log(3);
      playChord(3);
    }
    if(event.code == 'KeyF'){
      console.log(4);
      playChord(4);
    }
    if(event.code == 'KeyG'){
      console.log(5);
      playChord(5);
    }
    if(event.code == 'KeyH'){
      console.log(6);
      playChord(6);
    }
    if(event.code == 'KeyJ'){
      console.log(7);
      playChord(7);
    }
    if(event.code == 'KeyK') {
      console.log(8);
      playChord(8);
    }
  }

  //press x to go up an octave, press z to go down an octave
  if(event.code == 'KeyX') {
    if(octave < 6){
      octave++;
      console.log(octave);
      octaveText.innerHTML = "Current Octave: " + octave;
    }
  }
  if(event.code == 'KeyZ') {
    if(octave > 2){
      octave = octave - 1;
      console.log(octave);
      octaveText.innerHTML = "Current Octave: " + octave;
    }
  }
});
