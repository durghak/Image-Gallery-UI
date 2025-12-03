import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/SignIn';
import Register from './components/Login/register';
import Gallery from "./components/Gallery/Gallery"; 
import Login from "./components/Login/Login";
import Photo from "./components/Gallery/Photo";


function App() {
  return (
    //  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/photo/:folderid" element={< Photo/>} />
      </Routes>
      // </BrowserRouter>
    
  );
}

export default App;
