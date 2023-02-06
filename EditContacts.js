import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    useGetContactByIdQuery,
    useUpdateContactHandlerMutation
  } from "./data/allDataApi";
  import { ThreeDots } from  'react-loader-spinner'

import { ClickContext } from './ClickContext';  

const EditContact = () => {
    const { contactId } = useParams()
    const navigate = useNavigate()


    const { numberOfClicks, increment, decrement } = useContext(ClickContext)

    console.log(contactId)

    const { isLoading, isError, isSuccess, data } =   useGetContactByIdQuery(contactId)

    const [updateContactHandler, updateResInfo] = useUpdateContactHandlerMutation()
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [phone, setPhone] = useState("")
    
    
    const [firstNameOri, setFirstNameOri] = useState("")
    const [lastNameOri, setLastNameOri] = useState("")
    const [emailOri, setEmailOri] = useState("")
    const [companyOri, setCompanyOri] = useState("")
    const [phoneOri, setPhoneOri] = useState("")


    console.log(updateResInfo)
    
   useEffect(() => {
    if(isSuccess) {
        setFirstName(data?.firstName)
        setLastName(data?.lastName)
        setEmail(data?.email)
        setCompany(data?.company)
        setPhone(data?.phone) 

        // Set again for reseting value while updating.
        setFirstNameOri(data?.firstName)
        setLastNameOri(data?.lastName)
        setEmailOri(data?.email)
        setCompanyOri(data?.company)
        setPhoneOri(phoneOri) 
    }
   }, [data])
   
   const resetAll = (e) => {
    e.preventDefault();
        setFirstName(firstNameOri)
        setLastName(lastNameOri)
        setEmail(emailOri)
        setCompany(companyOri)
        setPhone(data?.phone) 
   }

   const updateContactData = {
    id: data?._id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    company: company,
    phone: phone,
   }

   const contactUpdateHandler = (e) => {
    e.preventDefault()
    updateContactHandler(updateContactData)
    navigate("/")

   } 
 
    return (
        <>
            <h2>Edit Contact</h2>
            <p>{numberOfClicks}</p>
            <hr/>

             {updateResInfo.isLoading && <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClassName=""
                visible={true}
                />}   


                {isLoading && <ThreeDots 
                height="30" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClassName=""
                visible={true}
                />}
            <form onSubmit={contactUpdateHandler}>
                <div>  
                    <Link to="/">Back</Link>
                </div>
                <div>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='btn-block'>
                    <button type='submit'>Update</button>
                    <button onClick={(e) => resetAll(e)}>Reset</button>
                </div>
            </form>
        </>
    )
}

export default EditContact