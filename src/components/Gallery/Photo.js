import AppBar from '@mui/material/AppBar';
import {Button,Stack,Box,Popover} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../Utils/Appbar";


const Photo=()=>{
    const { folderid } = useParams();
    const[upload,setupload]=useState(null);
    const[image,setimage]=useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const openpopover = Boolean(anchorEl);
 
    const [selectedImage, setSelectedImage] = useState(null); 



    const handlephotoSubmit=async()=>{
        console.log('Inside handle',upload);
        console.log('Folder id ', folderid);
        if (!upload) {
      alert("please upload");
      return;
    }
     const formData = new FormData();
  formData.append("file", upload);
    
    try {
      const response = await fetch("http://localhost:5000/photo/upload/"+folderid, {
        method: "POST",
    body: formData, // DO NOT set Content-Type manually       
      });

      const result = await response.json();

      if (response.ok) {
        console.log(response)
        alert("Image uploaded successfully");
        Getphotos();  
        
      } else {
        
        console.error(result.error);  
        alert(result.error || "An error occurred while showing  the images.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while connecting to the server.");
    }


    }

    const handleFileChange = (e) => {
        setupload(e.target.files[0]); // <-- this is your uploaded file
    }

    const Getphotos=async()=>{
        try {
        const response = await fetch("http://localhost:5000/photo/get/"+folderid, {
          method: "GET"});
         if (response.ok) {
          const data = await response.json();
          console.log("Fetched Images:", data?.photos);
          setimage(data?.photos);
        } else {
          console.error("Failed to fetch Images");
        }
        } catch (error) {
        console.error("An error occurred while fetching Images:", error);
      }
    }

    useEffect(() => {
        Getphotos();
    }, []);

const handleRightClick = (event,fileName) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
   
    // const filename = event.currentTarget.src.split("uploads/")[1];
    setSelectedImage(fileName);

    Getphotos();
};
    
const deleteImage = async () => {
console.log("Deleting image:", selectedImage); 
try {
const response = await fetch("http://localhost:5000/photo/delete/" +folderid+ "/" + selectedImage, {
method: "DELETE"
});
const data = await response.json();
if(data.message==="File and database record deleted successfully"){
Getphotos();
}


} catch (error) {  // 
console.error("An error occurred while fetching folders:", error);
}
};
const navigate = useNavigate();




    return(
        <div>
          <ButtonAppBar Name1="Image Gallery" Name2="Images" Button1="Back" onButtonClick={() => navigate('/gallery')}  />
        <Box sx={{ width: 500, maxWidth: '100%', margin: 7 }}>
        <Stack direction="row" spacing={2}>
        <Input type = 'file' onChange={handleFileChange}  />
        <Button variant="contained" onClick={handlephotoSubmit}>Upload</Button>
            </Stack>
            </Box>
        <Box sx={{ marginTop: 3 }}>
             <Stack spacing={2}>
               {/* {upload.length>0 ?():()} */}
               {image?.length>0 ? (
                image.map((img,index)=>(
                    <div key={index} >
                    <img src={`http://localhost:5000/photo/getFile/${img.image_path?.split("uploads/")[1]}`}
                    onContextMenu={(event) => handleRightClick(event, img.image_path?.split("uploads/")[1])} 
                    style={{cursor: "pointer"}}  alt="img" />
                   
                    </div>
                ))
               ) : (
                <p>No images found.</p>
               )}
               
               <Popover
               
               open={openpopover}
               anchorEl={anchorEl}
               onClose={() => setAnchorEl(null)}
               anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
               }}>
                  <IconButton aria-label="delete"  color="error">
                 <DeleteIcon  onClick={ () => {
                  deleteImage(selectedImage); 
                  setAnchorEl(null);
                  setSelectedImage(null);
                  Getphotos();}} />
                
                 </IconButton>
              </Popover>
              
             </Stack>
                     
        </Box>
        </div>
    
    );
    
}
export default Photo;