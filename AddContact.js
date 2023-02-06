import React, { useState } from "react";

export const AddContact = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const contactsData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    company: company,
    phone: phone,
  };

  return (
    <form
      onSubmit={(e) => props.addContacts(e, contactsData)}
      className="add-contact"
    >
      <div className="form-row">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name..."
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name..."
        />
      </div>
      <div className="form-row">
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          noValidate
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          value={company}
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>
      <div className="form-row">
        <input
          type="number"
          name="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone..."
        />
      </div>

      <div className="form-row">
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
