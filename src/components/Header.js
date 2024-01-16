import React from "react";
import LanguageInterfaceToggle from "./LanguageInterfaceToggle";
import Title from "./Title";
import Logo from "./Logo";
import { connect } from "react-redux";
import Menu from "./Menu";

export const Header = ({ interfaceLanguage }) => {
  return (
    <header className="header">
      <Logo />
      <Title title={interfaceLanguage.app_title} />
      <LanguageInterfaceToggle />
      <Menu />
    </header>
  );
};

const mapStateToProps = (state) => ({
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(Header);
