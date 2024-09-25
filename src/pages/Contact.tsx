import React from 'react';

function Contact() {
  return (
    <div>
      <h1>Welcome to the Contact Page</h1>
      <p>If you'd like to reach us, you can:</p>
      <ul>
        <li><a href="mailto:bearmane@byu.edu?subject=Golden%20Door%20Inquiry&body=Please%20include%20your%20name%20and%20what%20and%20what%20you%20hope%20we%20can%20do%20for%20you.">Send Email</a></li>
        <li>or <a href="https://docs.google.com/forms/d/1Z9WmKMq73SRc4oCdu1VjnTXnv-jYwzrjJ5kmU6lcWkI/prefill" target="_blank" rel="noopener noreferrer">click this link to fill out a survey</a>.</li>
      </ul>
    </div>
  );
}

export default Contact;
