"use strict";

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;

let p = document.createElement("p");
p.className = "words-text";
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");
  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement("p");
    p.className = "words-text";
    words.appendChild(p);
  }

  if (
    transcript.toLowerCase().includes("google search") &&
    e.results[0].isFinal &&
    transcript.toLowerCase().startsWith("google search")
  ) {
    if (transcript.length === 13) return;
    const query = transcript.substring(
      transcript.indexOf("Google search") + 13
    );
    const encodeQuery = encodeURIComponent(query);

    const searchUrl = `https://www.google.com/search?q=${encodeQuery}`;

    window.open(searchUrl);
  }
});

recognition.addEventListener("end", recognition.start);

recognition.start();
