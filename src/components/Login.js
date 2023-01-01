import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const {showAlert} = props;
  let history = useNavigate();

  const  handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password}) 
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
      // Saving the auth token and Redirecting User To Home Page... 
      localStorage.setItem('token',json.authtoken);
      history('/');
      showAlert("Logged In Successfully","success");
    }
    else
    {
      showAlert(json.error,"danger");
    }
  }

  const handleChange = (e) => {
      if(e.target.name === "email")
      {
        setEmail(e.target.value);
      }
      else if(e.target.name === "password")
      {
        setpassword(e.target.value);
      }
  }

  return (
    <div className="container my-4 mt-3">
      <h2>Login to countinue to iNotebook</h2>      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={email} aria-describedby="emailHelp" onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login