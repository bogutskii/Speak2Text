import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
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
          <input type="text" name="user_name" className="form-input" />
          <label>Email</label>
          <input type="email" name="user_email" className="form-input" />
        </div>
        <div className="right-column">
          <label>Message</label>
          <textarea name="message" className="form-textarea"></textarea>
          <input type="submit" value="Send" className="form-submit" />
        </div>
      </form>
    </div>
  );
};
