import { useState } from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Popover, Stack } from '@mui/material';


import SnackbarComp from '../Utils/Snackbar';
import ModalComp from '../Utils/Modal';

const IndividualFolders = ({folder, fetchFolders}) => {

const [anchorEl, setAnchorEl] = useState(null);
const [opens, setOpens] = useState(false);
const openpopover = Boolean(anchorEl);

const [openSnackbar, setOpenSnackbar] = useState(false);

const handleRightClick = (event) => {
event.preventDefault();
setAnchorEl(event.currentTarget);
};


const deleteFolder = async (folderId) => {
console.log("Deleting folder with ID:", folderId);
try {
const response = await fetch("http://localhost:5000/folders/delete/" + folderId, {
method: "DELETE",
headers: {
"Content-Type": "application/json",
},
});

const data = await response.json();
console.log("Delete folder with ID:", data);

if (data.message === "Folder deleted successfully") {
setOpens(false);
setOpenSnackbar(true);  // Show snackbar
setTimeout(() => { fetchFolders() }, 3000);  // Re-show buttons after snackbar disappears       // Refresh folder list
}

} catch (error) {  // 
console.error("An error occurred while fetching folders:", error);
}
};

const editFolder = async (folderId, newName) => {
try {
const response = await fetch("http://localhost:5000/folders/edit/" + folderId, {  
method: "PATCH", 
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ name: newName }), 
});   
const data = await response.json();
if (data.message === "Folder updated successfully") {
fetchFolders(); // Refresh folder list
} else {
console.error("Failed to update folder:", data.error);
}   
} catch (error) {
console.error("An error occurred while updating the folder:", error);
}
} ;


return (
<>
<Stack direction="row" spacing={1}  alignItems="center" style={{cursor: "pointer"}} onContextMenu={handleRightClick} >
<FolderIcon sx={{ color: "green" , fontSize: 40  }}  />
<span>{folder.name}</span>
</Stack>

<Popover
id={folder.id}
open={openpopover}
anchorEl={anchorEl}
onClose={() => setAnchorEl(null)}
anchorOrigin={{
vertical: 'bottom',
horizontal: 'left',
}}>

<IconButton aria-label="delete"  color="error">
<DeleteIcon onClick={ () => {setOpens(true); setAnchorEl(null);}}/>
</IconButton>
<IconButton aria-label="edit"  color="primary">
<EditIcon />
</IconButton>
</Popover>
<ModalComp  folder={folder} open={opens} setOpens={setOpens} deleteFolder={deleteFolder} /> 

<SnackbarComp
openSnackbar={openSnackbar}
handleClose={() => { setOpenSnackbar(false);}}
severity="success"
message="Folder deleted successfully!"
/>

</> 
);
}

export default IndividualFolders;