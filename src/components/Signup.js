import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {

  let history = useNavigate();
  const [userDetails, setUserDetails] = useState({"name":"", "email":"","password":"","cpassword":""});
  const {showAlert} = props;

  const handleSubmit = async (e) => {    
    e.preventDefault();
    const {name,email,password,cpassword} = userDetails;

    if(password === cpassword)
    {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password}) 
      });
      const json = await response.json();
      if(json.success)
      {
        // Saving the auth token and Redirecting User To Home Page... 
        localStorage.setItem('token',json.authtoken);
        history('/');
        showAlert("Signup Successfully !","success");
      }
      else
      {
         showAlert(json.error,"danger");
      }
    }
    else
    {
        showAlert("Passowrd And Confirm Passwords are Mismatch","danger");
    }

  }

  const handleChange = (e) => {
    setUserDetails({...userDetails,[e.target.name]: e.target.value});
  }

  return (
    <div className="container my-4 mt-2">
      <h2>Create an account to use iNotebook</h2>      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={userDetails.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"onChange={handleChange} value={userDetails.email} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={userDetails.password} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} value={userDetails.cpassword} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup