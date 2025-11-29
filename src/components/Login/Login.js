import { useState } from "react";
import Grid from '@mui/material/Grid';
import SignIn from './SignIn';
import Register from './register';  
import image from '../../photos/image.png';
      


const Login = () => {
    const [showRegistration, setShowRegistration] = useState(false);
    return (
        <>
        <h1 style={{textAlign:'center'}}>Welcome to Photo Gallery</h1>
<Grid container spacing={2}>
    <Grid size={{ xs: 6}}sx={{height: "100%"}}>
        <img src={image} alt="Gallery" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
    </Grid>
    <Grid size={{ xs: 6 }}sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
           {showRegistration ? <Register setShowRegistration={setShowRegistration} /> : <SignIn setShowRegistration={setShowRegistration} />}
    </Grid>
</Grid>
        </>
    );
};

export default Login;