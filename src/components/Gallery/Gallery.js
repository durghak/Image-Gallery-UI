import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";

import IndividualFolders from './IndividualFolders';

export default function Gallery() {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
 
   

   const fetchFolders = async () => {
      try {
        const response = await fetch("http://localhost:5000/folders/get/"+localStorage.getItem("user_id"), {
          method: "GET",
          headers: {  
            "Content-Type": "application/json",
          },        
        });
        if (response.ok) {
          const data = await response.json();
          setFolders(data.folders); // Assuming the backend returns an array of folder names
        } else {
          console.error("Failed to fetch folders");
        }
      } catch (error) {
        console.error("An error occurred while fetching folders:", error);
      }
    };
  useEffect(() => {
    // Fetch existing folders from the backend when the component mounts
    localStorage.getItem("user_id") && fetchFolders();
  }, []);
  

  const handleFolderSubmit = async () => {
    if (folderName.trim() === "") {
      alert("Folder name cannot be empty");
      return;
    }

    const folderData = {
      name: folderName,  // Only send folder name (user_id will be handled by backend)
    };

    try {
      const response = await fetch("http://localhost:5000/folders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(folderData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        // Folder creation succeeded, update the state
        fetchFolders();  // Refresh the folder list
        console.log(result.message);  // Folder created successfully
      } else {
        // Handle error if folder creation failed
        console.error(result.error);  // Show error message (e.g., folder already exists)
        alert(result.error || "An error occurred while creating the folder.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while connecting to the server.");
    }

    // Clear the folder name input after submission
    setFolderName("");
  };

  return (
    <div>
      <Box sx={{ width: 500, maxWidth: '100%', margin: 4 }}>
        <h1>Gallery</h1>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            label="Create Folder Name"
            required
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            id="fullWidth"
          />
          <Button
            variant="contained"
            onClick={handleFolderSubmit}  // Use handleFolderSubmit here
            color="success"
          >
            ADD
          </Button>
        </Stack>

        {/* Display Created Folders */}
        <Box sx={{ marginTop: 3 }}>
          <h2>Created Folders:</h2>
          <Stack spacing={2}>
            {folders.length > 0 ? (
              folders.map((folder,index) => (
                 <IndividualFolders key={index} folder={folder} fetchFolders={fetchFolders} />
              ))
            ) : (
              <p>No folders created yet.</p>
            )}
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
