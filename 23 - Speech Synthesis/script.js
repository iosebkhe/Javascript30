"use strict";

//what is the person is going to say
const msg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
//default text for speech
msg.text = document.querySelector("[name='text']").value;

//get voices and add them to select as options
let voices = [];
const populateVoices = function () {
  voices = this.getVoices();
  console.log(voices);
  voicesDropdown.innerHTML = voices
    .map((voice) => `<option value="${voice.name}">${voice.name}</option>`)
    .join("");
};

//set voice to message voice
const setVoice = function () {
  const messageVoice = voices.find((voice) => voice.name === this.value);
  msg.voice = messageVoice;
  toggle();
};

//change voice when user changes option from dropdown
const optionChange = function () {
  msg[this.name] = this.value;
  toggle();
};

//start or cancel speaking
const toggle = function (startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => {
  option.addEventListener("change", optionChange);
});
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", function () {
  toggle(false);
});
