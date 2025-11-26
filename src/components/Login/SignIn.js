import { useState } from "react";
import {Button,Typography,TextField,Box} from '@mui/material';

const SignIn = ({ setShowRegistration }) => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
     const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form action
    console.log("Username:", username);
    console.log("Password:", password);
    const formData = {
      "username": username,
   "password": password
}
    
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json', // Important!
  },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful response
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
  }
    return (
       
     <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        px: 3,
        transform: "translateY(-90px)"
      }}
    >     
      <Typography variant="h5" fontWeight="bold">
        Sign In
      </Typography>
        <TextField
        
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
       
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Typography sx={{ mt: 2 }}>
             New User? <a href="#" onClick={() => setShowRegistration(true)}>Register here</a>
            </Typography>
        </Box>  
        
       
    );
}
export default SignIn;