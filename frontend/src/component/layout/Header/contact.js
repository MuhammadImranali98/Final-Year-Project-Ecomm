import React from "react";
import "./Contact.css";

import { Button } from "@material-ui/core";


const Contact = () => {
  return (
    

      <div className="contactContainer">
        <a className="mailBtn" href="https://mail.google.com/mail/u/0/#inbox">
          <Button>Contact: mymailforIMRAN@gmail.com</Button>
        </a>
      </div>
   
  );
};

export default Contact;
