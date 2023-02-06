import "./App.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {
  useGetAllPostQuery,
  useLazyGetContactByIdQuery,
  useRemoveContactMutation,
  useAddContactHandlerMutation,
} from "./data/allDataApi";
import { AddContact } from "./AddContact";

import { ClickButton } from "./ClickButtons"

function ContactList() {
  // const responseInfo = useGetAllPostQuery();
  const [showAddContact, setShowAddContact] = useState(false);

  const {
    isLoading,
    isError,
    isSuccess: GetAllPost,
    data: oriData,
  } = useGetAllPostQuery();

  const [removeContact, { isLoading: deletingContact, isError: deleteError }] =
    useRemoveContactMutation();

  const [addContactHandler, { responseInfo }] = useAddContactHandlerMutation();

  const AddContactToggle = () => {
    return setShowAddContact(!showAddContact);
  };

  const addContactsData = (e, contactsData) => {
    e.preventDefault();
    addContactHandler(contactsData);
  };

  console.log(responseInfo);

  const [contactSpecific, setContactSpecific] = useState();

  const [getContactById, resultsContactById] = useLazyGetContactByIdQuery();

//   useEffect(() => {
//     if (resultsContactById && resultsContactById.data) {
//       setContactSpecific([resultsContactById.data]);
//     }
//   }, [resultsContactById]);

//   const [firstName, setFirstName] = useState("");
//   // console.log(resultsContactById.data.firstName);
//   if (resultsContactById.isSuccess) {
//     console.log(resultsContactById.data);
//   }

  return (
    <div className="App">
      <h2>RTK query details</h2>

      <ClickButton />

      {/* {resultsContactById.isSuccess && (
        <ul className="edit-contact">
          {resultsContactById && (
            <input
              type="text"
              value={firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}

          <li>
            {resultsContactById && <p> {resultsContactById.data.firstName} </p>}
          </li>
          <li>
            {resultsContactById && <p> {resultsContactById.data.lastName} </p>}
          </li>
          <li>
            {resultsContactById && <p> {resultsContactById.data.email} </p>}
          </li>
          <li>
            {resultsContactById && <p> {resultsContactById.data.company} </p>}
          </li>
          <li>
            {resultsContactById && <p> {resultsContactById.data.phone} </p>}
          </li>
        </ul>
      )} */}
      <button onClick={() => AddContactToggle()}>Add Contact</button>

      {showAddContact && <AddContact addContacts={addContactsData} />}

      <div className="contactWrapper">
        {GetAllPost &&
          oriData.map((post, i) => (
            <div className="contact" key={i}>
              <p>
                <strong>First name :</strong> {post.firstName}
              </p>
              <p>
                <strong>Last name :</strong> {post.lastName}
              </p>
              <p>
                <strong>Email :</strong> {post.email}
              </p>
              <p>
                <strong>Company :</strong> {post.company}
              </p>
              <p>
                <strong>Phone :</strong> {post.phone}
              </p>
              <p>
                <strong>Created at :</strong> {post.created_date}
              </p>
              <div className="btn-block">
                <button
                  className="remove"
                  onClick={() => removeContact(post._id)}
                >
                  X
                </button>
                {/* <button onClick={() => getContactById(post._id)}>Edit</button> */}
                <Link to={`edit/${post._id}`}>Edit</Link>
              </div>
              {deletingContact && <p>Deleting...</p>}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ContactList;
