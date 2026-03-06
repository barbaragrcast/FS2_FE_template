import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
  });

 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      
      .post(`${process.env.REACT_APP_API_BASE_URL}/submit-form`, formData)
      .then((response) => {
        console.log(response.data);
       
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div id="contact">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          className="name"
          id="fname"
          name="firstname"
          placeholder="Your name.."
          value={formData.firstname}
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          className="name"
          id="lname"
          name="lastname"
          placeholder="Your last name.."
          value={formData.lastname}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email Address</label>
        <textarea
          id="email"
          name="email"
          placeholder="Please leave an email address where we can reach you"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="subject">Subject</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write something.."
          value={formData.subject}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
