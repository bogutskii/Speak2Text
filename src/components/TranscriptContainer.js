import React from "react";

const TranscriptTextArea = ({
  finalTranscript,
  setFinalTranscript,
  interimTranscript,
  setInterimTranscript,
}) => {
  
const filterByRule = (text) => {

  console.log(" text.replace",   text.replace(/т/igm, "."))
  return text.replace(/т/igm, ".");
}
const textAreaOnChange = (e) => {
  setFinalTranscript(e.target.value)


}

  return (
    <div className="transcript-container">
      <textarea
        className="transcript-text"
        value={finalTranscript}
        onChange={textAreaOnChange}
      ></textarea>
    </div>
  );
};

export default TranscriptTextArea;
