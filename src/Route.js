import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery/Gallery"; 
import Login from "./components/Login/Login";
import Photo from "./components/Gallery/Photo";
import ProtectedRoute from "./Protected_routes";


function AppRoute() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path="/photo/:folderid" element={<ProtectedRoute>< Photo/></ProtectedRoute>} />
      </Routes>
      </BrowserRouter>
    
  );
}

export default AppRoute;
