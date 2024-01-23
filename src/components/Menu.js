import React, { useState } from "react";
import Modal from "./Modal";
import {ContactUs} from "./ContactUs";

export const Menu = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="menu">
      <button className="button-30" onClick={() => openModal('contact')}>contact</button>
      <button className="button-30" onClick={() => openModal('modal2')}>about</button>
      <a type="button" className="button-30 black" href="https://www.buymeacoffee.com/bogutskii">buy me a coffee</a>
      
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal} children={<ContactUs />} />
      <Modal isOpen={activeModal === 'modal2'} onClose={closeModal}/>
    </div>
  );



};

export default Menu;
