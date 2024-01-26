import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";

const Title = ({ title }) => {
  return (
    <div className="logo-container">
      <Logo />
      <div className="title">{title} </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  title: state.transcript.interfaceLanguage.app_title,
});

export default connect(mapStateToProps)(Title);
