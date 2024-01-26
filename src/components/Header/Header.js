import React from "react";
import Title from "./Title";
import { connect } from "react-redux";
import Menu from "./Menu";

export const Header = () => {
  return (
    <header className="header">
      <Title />
      <Menu />
    
    </header>
  );
};

const mapStateToProps = (state) => ({
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(Header);
