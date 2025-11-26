import { useState } from "react"
import {Button,Typography,TextField} from '@mui/material';
const Register = ({ setShowRegistration }) =>{
const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const handleSubmit = () => {
        console.log("Username:", username);
        console.log("Password:", password);
        
    
    const formData = {
      "username": username,
   "password": password
}
    
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json', // Important!
  },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Registered Success:", data);
      setShowRegistration(false);
      // Handle successful response
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
    }
    return(
        <>
        <Typography sx={{ mt: 2 }}>
            Register
            </Typography>
        <TextField
          required
          id="outlined-required"
          label="username"
          onChange={(e)=>setUsername(e.target.value)}
          />

          <br />
         <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>setPassword(e.target.value)}
        /><br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>           
          <br />
        </>
    )
}
export default Register;