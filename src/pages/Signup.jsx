import React, { useState } from 'react'
import Auth from '../components/Auth'
import { account } from '../helper/appwrite'
import { ID } from 'appwrite'
import { useNavigate } from 'react-router-dom'

const Signupbtn = ({onClick}) => {
    return <button onClick={onClick} className="btn btn-primary">SignUp</button>
};

const Signup = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const navigate=useNavigate();
    const createAccount =async() =>{
        const promise = account.create(ID.unique(),email, password,name);

        promise.then(() =>{
            navigate('/login')
        }).catch(err =>{
            alert(err);
        });
    };

    return (
        <Auth title={"Create an account"}
            description={"Let's start the journey of codedrop by creating an account"}
            button={<Signupbtn onClick={createAccount} />}
            bottomquestion={"Already have an account!"}
            bottomlink={"/login"}
            bottomtext={"Login instead"} 
            email={email}
            password={password}
            name={name}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
             />
    )
}

export default Signup