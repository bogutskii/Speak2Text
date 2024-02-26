import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import MicrophoneError from "./MicrophoneError";

const AudioVisualizer = ({ isListening }) => {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const setupMicrophone = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = mediaStream;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(analyser);
        sourceRef.current = source;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        dataArrayRef.current = dataArray;

        draw();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    const draw = () => {
      if (!isListening || !analyserRef.current || !dataArrayRef.current) {
        return;
      }
      animationFrameId = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      let sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
      let average = sum / dataArrayRef.current.length;
      setVolume(average / 80.0);
    };

    if (isListening) {
      setupMicrophone();
    } else {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isListening]);

  const calculateColor = (volume) => {
    if (volume > 0.7) {
      return "rgb(255, 0, 0)";
    }
    return `rgb(${volume * 255}, ${255 - volume * 255}, 0)`;
  };

  const barColor = isListening ? calculateColor(volume) : "white";
  const barHeight = isListening ? Math.min(volume * 150, 200) : 0;

  return (
    <div className="audio-visualizer">
      <div
        style={{
          width: "200px",
          height: "20px",
          backgroundColor: `${isListening ? "rgb(206 217 230)" : "#90a4ae"}`,
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${barHeight}px`,
            height: "100%",
            backgroundColor: barColor,
            position: "absolute",
            bottom: 0,
          }}
        />
        <MicrophoneError volume={volume} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
});

export default connect(mapStateToProps)(AudioVisualizer);