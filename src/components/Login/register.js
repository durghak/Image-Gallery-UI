import { useState } from "react";
import { Button, Typography, TextField, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SnackbarComp from '../Utils/Snackbar';

const Register = ({ setShowRegistration }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      username,
      password
    };

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Registered Success:", data);

        setOpenSnackbar(true); // Show success message
        setUsername("");
        setPassword("");
        navigate("/");
        // Move back to login after 1 sec
        setTimeout(() => {
          setShowRegistration(false);
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

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
      <Typography sx={{ mt: 2 }}>Register</Typography>

      <TextField
        required
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        required
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>

      {/* Snackbar */}
      <SnackbarComp
        openSnackbar={openSnackbar}
        handleClose={handleClose}
        severity="success"
        message="Registered Successfully!"
      />
    </Box>
  );
};

export default Register;
