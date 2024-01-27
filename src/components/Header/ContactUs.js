import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMessageValid, setIsMessageValid] = useState(true);

  const handleSetUserName = (e) => {
    const name = e.target.value;
    setUserName(name);
    setIsNameValid(name.trim().length > 0);
  };

  const handleSetUserEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleSetUserMessage = (e) => {
    const message = e.target.value;
    setUserMessage(message);
    setIsMessageValid(message.trim().length > 0);
  };
  const sendEmail = (e) => {
    e.preventDefault();

    const isNameFilled = userName.trim().length > 0;
    const isEmailFilled = userEmail.match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    );
    const isMessageFilled = userMessage.trim().length > 0;

    setIsNameValid(isNameFilled);
    setIsEmailValid(!!isEmailFilled);
    setIsMessageValid(isMessageFilled);

    if (!isNameFilled || !isEmailFilled || !isMessageFilled) {
      return;
    }

    emailjs
      .sendForm(
        "service_s90ifjd",
        "template_mz6bf2d",
        form.current,
        "3ud4mthkwWMTWYacT"
      )
      .then(
        (result) => {
          console.log(result.text);
          setUserEmail("");
          setUserName("");
          setUserMessage("");
          setMessageSent(true);
          setTimeout(() => {
            setMessageSent(false);
          }, 1000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-form-container">
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="left-column">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="user_name"
            className={`form-input ${!isNameValid ? "invalid" : ""}`}
            value={userName}
            onChange={handleSetUserName}
          />
          <label className="form-label">Email</label>
          <input
            type="email"
            name="user_email"
            className={`form-input ${!isEmailValid ? "invalid" : ""}`}
            value={userEmail}
            onChange={handleSetUserEmail}
          />
        </div>
        <div className="right-column">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className={`form-textarea ${!isMessageValid ? "invalid" : ""}`}
            value={userMessage}
            onChange={handleSetUserMessage}
            placeholder = 'Your wishes, suggestions, or bug reports'
          ></textarea>
          {messageSent && <div className="message-sent">Message Sent!</div>}
          <input type="submit" value="Send" className="glow-button regular" />
        </div>
      </form>
    </div>
  );
};
