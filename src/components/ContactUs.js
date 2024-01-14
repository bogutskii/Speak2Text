import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false); 

 
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_s90ifjd", "template_mz6bf2d", form.current, "3ud4mthkwWMTWYacT")
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
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            className="form-input"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            />
        </div>
        <div className="right-column">
          <label>Message</label>
          <textarea
            name="message"
            className="form-textarea"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            ></textarea>
            {messageSent && <div className="message-sent">Message Sent!</div>}
            <input type="submit" value="Send" className="glow-button regular" />
        </div>
      </form>
    </div>
  );
};
