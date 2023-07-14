import React, { useState, useEffect } from "react";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

function App() {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    recognition.onresult = function (event) {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setFinalTranscript((prevTranscript) => prevTranscript + " " + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      setInterimTranscript(interimTranscript);
    };

    recognition.onend = function () {
      if (isListening) {
        recognition.start();
      }
    };
  }, [isListening]);

  const startListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (isListening) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const resetTranscript = () => {
    stopListening();
    setFinalTranscript("");
    setInterimTranscript("");
  };

  const copyToClipboard = () => {
    const textToCopy = finalTranscript.trim();

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={copyToClipboard}>Copy Text</button>
        <div>
          <p>{finalTranscript}</p>
          <p>{interimTranscript}</p>
        </div>
      </div>
  );
}

export default App;
