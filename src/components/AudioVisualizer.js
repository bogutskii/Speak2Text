import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MicrophoneError from "./MicrophoneError";

const AudioVisualizer = ({ isListening }) => {
  const [volume, setVolume] = useState(0);
  let audioContext;
  let analyser;
  let dataArray;
  let source;
  let mediaStream;

  const setupMicrophone = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      draw();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const draw = () => {
    if (!isListening) {
      return;
    }
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a, b) => a + b, 0);
    let average = sum / dataArray.length;
    setVolume(average / 80.0);
  };

  const calculateColor = (volume) => {
    if (volume > 0.7) {
      return "rgb(255, 0, 0)"; // Красный цвет при громкости выше 70%
    }
    return `rgb(${volume * 255}, ${255 - volume * 255}, 0)`; // Интерполяция цвета
  };

  const barColor = isListening ? calculateColor(volume) : "white"; 
  const barHeight = isListening ? Math.min(volume * 150, 200) : 0; 

  useEffect(() => {
    if (isListening) {
      setupMicrophone();
    } else {
      if (source) {
        source.disconnect();
        source = null;
      }
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    }
    return () => {
      if (source) source.disconnect();
      if (audioContext) audioContext.close();
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isListening]);

  return (
    <div
      style={{
        width: "200px",
        height: "20px",
        backgroundColor: `${isListening ? "rgb(206 217 230)": "#90a4ae"}`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${barHeight}px`,
          height: '100%',
          backgroundColor: barColor,
          position: "absolute",
          bottom: 0,
        }}
      />
      <MicrophoneError volume={volume}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
});

export default connect(mapStateToProps)(AudioVisualizer);
