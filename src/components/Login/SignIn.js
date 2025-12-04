import { useState } from "react";
import {Button,Typography,TextField,Box,Snackbar,Alert} from '@mui/material';

import { useNavigate } from "react-router-dom";


const SignIn = ({ setShowRegistration }) => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit =  (e) => 
{e.preventDefault();
    if (!username || !password) {
  alert("Username and password are required");
  return;
}
    
  //  const formData = {username, password};
    fetch("http://localhost:5000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ username, password })
})
    
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data.user_id);
      localStorage.setItem("user_id", data.user_id);
      setOpenSnackbar(true); // Show success message
        setUsername("");
        setPassword("");
        
        navigate("/gallery");
      // Handle successful response
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
  }

    return (
       
     <Box
      
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
         required
      />

      <TextField
       
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         required
      />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Typography sx={{ mt: 2 }}>
             New User? <a href="#" onClick={() => setShowRegistration(true)}>Register here</a>
            </Typography>
            {/* Snackbar */}
                  <Snackbar open={openSnackbar} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert severity="success" variant="filled" >
                      Login Successfully!
                    </Alert>
                  </Snackbar>
        </Box>  
        
       
    );
}
export default SignIn;