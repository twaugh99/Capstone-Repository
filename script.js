console.log('script loaded');
let key1Pressed = false;
let key2Pressed = false;
let key3Pressed = false;
let key4Pressed = false;
let key5Pressed = false;
let key6Pressed = false;
let key7Pressed = false;
let key8Pressed = false;

let fillColor = '#FFFFFF';
let colorOpacity = 255;
let now = Tone.now();

let fillR = 0;
let fillG = 0;
let fillB = 0;

let colorR = ['', '255', '255', '255', '0', '0', '75', '148', '255'];
let colorG = ['', '0', '127', '255', '255', '0', '0', '0', '0'];
let colorB = ['', '0', '0', '0', '0', '255', '130', '211', '0'];

function setColor(note){
  fillR = colorR[note];
  fillG = colorG[note];
  fillB = colorB[note];
  colorOpacity = 255;
}

//canvas
function setup() {
  let canvasInit = createCanvas(windowWidth, 400);
  console.log(windowWidth, windowHeight);

  canvasInit.id('canvas');
}




function draw() {
  // console.log(windowWidth, windowHeight);
  background(0);

  fill(fillR, fillG, fillB, colorOpacity);

  if(colorOpacity > 0){
    colorOpacity = colorOpacity - 5;
  }

  stroke(255);
  strokeWeight(5);

  ellipse(mouseX, mouseY, 150, 150);
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




function attackNote(note){
  now = Tone.now();
  console.log('note ' + note + ' attacked');
  if(note == 8){
    melodySynth.triggerAttack(activeScale[0]+(octave+2), now);
  } else {
    melodySynth.triggerAttack(activeScale[(note-1)]+(octave+1), now);
  }
  setColor(note);
}

function releaseNote(note){
  console.log('note ' + note + ' released');
  now = Tone.now();
  if(note == 8){
    melodySynth.triggerRelease(activeScale[0]+(octave+2), now + .3);
  } else {
    melodySynth.triggerRelease(activeScale[(note-1)]+(octave+1), now + .3);
  }
}


function attackChord(chord){
  console.log('chord ' + chord + ' attacked');
  now = Tone.now();
  // NEEDS TO BE REVISED FOR DIFFERENT SCALES THAT CHANGE OCTAVE SOONER OR LATER
  if(chord < 4){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord + 3;
    chordSynth.triggerAttack([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+octave], now);
  }
  if(chord == 4 || chord == 5){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord - 4;
    chordSynth.triggerAttack([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+(octave+1)], now);
  }
  if(chord == 6 || chord == 7){
    let first = chord - 1;
    let third = chord - 6;
    let fifth = chord - 4;
    chordSynth.triggerAttack([activeScale[first]+octave, activeScale[third]+(octave+1), activeScale[fifth]+(octave+1)], now);
  }
  if(chord == 8){
    chordSynth.triggerAttack([activeScale[0]+(octave+1), activeScale[2]+(octave+1), activeScale[4]+(octave+1)], now);
  }
  setColor(chord);
}

function releaseChord(chord){
  console.log('chord ' + chord + ' released');
  now = Tone.now();
  // NEEDS TO BE REVISED FOR DIFFERENT SCALES THAT CHANGE OCTAVE SOONER OR LATER
  if(chord < 4){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord + 3;
    chordSynth.triggerRelease([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+octave], now + .1);
  }
  if(chord == 4 || chord == 5){
    let first = chord - 1;
    let third = chord + 1;
    let fifth = chord - 4;
    chordSynth.triggerRelease([activeScale[first]+octave, activeScale[third]+octave, activeScale[fifth]+(octave+1)], now + .1);
  }
  if(chord == 6 || chord == 7){
    let first = chord - 1;
    let third = chord - 6;
    let fifth = chord - 4;
    chordSynth.triggerRelease([activeScale[first]+octave, activeScale[third]+(octave+1), activeScale[fifth]+(octave+1)], now + .1);
  }
  if(chord == 8){
    chordSynth.triggerRelease([activeScale[0]+(octave+1), activeScale[2]+(octave+1), activeScale[4]+(octave+1)], now + .1);
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
  fillColor = "#ffffff";
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
      if(key1Pressed == false){
        key1Pressed = true;
        console.log(1);
        attackNote(1);
      }
    }
    if(event.code == 'KeyS'){
      if(key2Pressed == false){
        key2Pressed = true;
        console.log(2);
        attackNote(2);
      }
    }
    if(event.code == 'KeyD'){
      if(key3Pressed == false){
        key3Pressed = true;
        console.log(3);
        attackNote(3);
      }
    }
    if(event.code == 'KeyF'){
      if(key4Pressed == false){
        key4Pressed = true;
        console.log(4);
        attackNote(4);
      }
    }
    if(event.code == 'KeyG'){
      if(key5Pressed == false){
        key5Pressed = true;
        console.log(5);
        attackNote(5);
      }
    }
    if(event.code == 'KeyH'){
      if(key6Pressed == false){
        key6Pressed = true;
        console.log(6);
        attackNote(6);
      }
    }
    if(event.code == 'KeyJ'){
      if(key7Pressed == false){
        key7Pressed = true;
        console.log(7);
        attackNote(7);
      }
    }
    if(event.code == 'KeyK') {
      if(key8Pressed == false){
        key8Pressed = true;
        console.log(8);
        attackNote(8);
      }
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
      if(key1Pressed == false){
        key1Pressed = true;
        console.log(1);
        attackChord(1);
      }
    }
    if(event.code == 'KeyS'){
      if(key2Pressed == false){
        key2Pressed = true;
        console.log(2);
        attackChord(2);
      }
    }
    if(event.code == 'KeyD'){
      if(key3Pressed == false){
        key3Pressed = true;
        console.log(3);
        attackChord(3);
      }
    }
    if(event.code == 'KeyF'){
      if(key4Pressed == false){
        key4Pressed = true;
        console.log(4);
        attackChord(4);
      }
    }
    if(event.code == 'KeyG'){
      if(key5Pressed == false){
        key5Pressed = true;
        console.log(5);
        attackChord(5);
      }
    }
    if(event.code == 'KeyH'){
      if(key6Pressed == false){
        key6Pressed = true;
        console.log(6);
        attackChord(6);
      }
    }
    if(event.code == 'KeyJ'){
      if(key7Pressed == false){
        key7Pressed = true;
        console.log(7);
        attackChord(7);
      }
    }
    if(event.code == 'KeyK') {
      if(key8Pressed == false){
        key8Pressed = true;
        console.log(8);
        attackChord(8);
      }
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


//event listeners for keyboard inputs
document.addEventListener('keyup', function(event) {
  if(mode == "Melody"){
    //keys a-k play notes of the scale when in melody mode
    if(event.code == 'KeyA'){
      key1Pressed = false;
      console.log(1);
      releaseNote(1);
    }
    if(event.code == 'KeyS'){
      key2Pressed = false;
      console.log(2);
      releaseNote(2);
    }
    if(event.code == 'KeyD'){
      key3Pressed = false;
      console.log(3);
      releaseNote(3);
    }
    if(event.code == 'KeyF'){
      key4Pressed = false;
      console.log(4);
      releaseNote(4);
    }
    if(event.code == 'KeyG'){
      key5Pressed = false;
      console.log(5);
      releaseNote(5);
    }
    if(event.code == 'KeyH'){
      key6Pressed = false;
      console.log(6);
      releaseNote(6);
    }
    if(event.code == 'KeyJ'){
      key7Pressed = false;
      console.log(7);
      releaseNote(7);
    }
    if(event.code == 'KeyK') {
      key8Pressed = false;
      console.log(8);
      releaseNote(8);
    }
  }

  if(mode == "Chord"){
    //keys a-k play drums of the drum kit when in drum mode
    if(event.code == 'KeyA'){
      key1Pressed = false;
      console.log(1);
      releaseChord(1);
    }
    if(event.code == 'KeyS'){
      key2Pressed = false;
      console.log(2);
      releaseChord(2);
    }
    if(event.code == 'KeyD'){
      key3Pressed = false;
      console.log(3);
      releaseChord(3);
    }
    if(event.code == 'KeyF'){
      key4Pressed = false;
      console.log(4);
      releaseChord(4);
    }
    if(event.code == 'KeyG'){
      key5Pressed = false;
      console.log(5);
      releaseChord(5);
    }
    if(event.code == 'KeyH'){
      key6Pressed = false;
      console.log(6);
      releaseChord(6);
    }
    if(event.code == 'KeyJ'){
      key7Pressed = false;
      console.log(7);
      releaseChord(7);
    }
    if(event.code == 'KeyK') {
      key8Pressed = false;
      console.log(8);
      releaseChord(8);
    }
  }
});
