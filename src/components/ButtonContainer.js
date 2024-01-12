import React from 'react';
import { connect } from 'react-redux';
import { toggleListening, resetTranscript ,setCopiedToClipboard} from '../actions/transcriptActions';

const ButtonContainer = ({
  isListening,
  resetTranscript,
  finalTranscript,
  toggleListening,
  setCopiedToClipboard,
  interfaceLanguage
}) => {

    const copyToClipboard = () => {
      navigator.clipboard.writeText(finalTranscript.trim()).then(() => {
        setCopiedToClipboard(true)
        setTimeout(()=>setCopiedToClipboard(false), 1000)
      }).catch(err => {
        console.error("Ошибка при копировании текста: ", err);
      });
    };

  return (
    <div className="button-container">
      <button className={`glow-button ${isListening ? 'stop' : 'start'}`} onClick={toggleListening}>
        {isListening ? interfaceLanguage.stop_button_text : interfaceLanguage.start_button_text}
      </button>
      <button className="glow-button reset" onClick={resetTranscript}>
        {interfaceLanguage.reset_button_text}
      </button>
      <button className="glow-button copy" onClick={copyToClipboard}>
        {interfaceLanguage.copy_button_text}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
  finalTranscript: state.transcript.finalTranscript,
  interfaceLanguage: state.transcript.interfaceLanguage
});


const mapDispatchToProps = {
  toggleListening,
  resetTranscript,
  setCopiedToClipboard
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);
