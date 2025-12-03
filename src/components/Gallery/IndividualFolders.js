import { useState  } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Popover, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SnackbarComp from '../Utils/Snackbar';
import ModalComp from '../Utils/Modal';
import { useNavigate } from 'react-router-dom';

const IndividualFolders = ({folder, fetchFolders}) => {

const [anchorEl, setAnchorEl] = useState(null);
const [opens, setOpens] = useState(false);
const openpopover = Boolean(anchorEl);
const [editMode, setEditMode] = useState(false);
const[message,setMessage]=useState("");
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
setMessage("Folder deleted successfully!");
setOpenSnackbar(true);
  // Show snackbar
setTimeout(() => { fetchFolders() }, 3000);  // Re-show buttons after snackbar disappears       // Refresh folder list
}

} catch (error) {  // 
console.error("An error occurred while fetching folders:", error);
}
};

const editFolder=async (folderid, newFolderName)=>{
    try{
        const response = await fetch("http://localhost:5000/folders/edit/" + folderid, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ new_name: newFolderName })
        });

        const data = await response.json();
        console.log("Edit folder with ID:", data);
        if (data.message === "Folder name updated successfully") {
            setOpens(false);
            setMessage("Folder name updated successfully!");
            setOpenSnackbar(true);  
            setTimeout(() => { fetchFolders() }, 3000);            
        }
       
}
catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while connecting to the server.");
    }
}
    const handleEditFolder = () => {
    setEditMode(true);
    setAnchorEl(null);
}

const handleEditNameChange = (event) => {
      if (event.key === 'Enter') {
        console.log("Enter key pressed!",event.target.value);  
        editFolder(folder.id, event.target.value);
        setEditMode(false);      
      }
    };
const navigate=useNavigate()
return (
<>
<Stack direction="row" spacing={1}  alignItems="center" style={{cursor: "pointer"}} onContextMenu={handleRightClick} onClick={()=> {navigate(`/photo/${folder.id}`)}}  >  
  {/* onClick={() => {window.open(photo,"_blank")}} */}
<FolderIcon sx={{ color: "green" , fontSize: 40  }}  />
{editMode ?<TextField
  hiddenLabel
  id="filled-hidden-label-small"
  defaultValue={folder.name}
  variant="filled"
  size="small"
  onKeyDown={handleEditNameChange}
  
/>
 :<Typography>{folder.name}</Typography>}
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
<IconButton aria-label="edit"  color="primary" onClick={handleEditFolder}>
<EditIcon />
</IconButton>
</Popover>
<ModalComp  folder={folder} open={opens} setOpens={setOpens} deleteFolder={deleteFolder} /> 

<SnackbarComp
openSnackbar={openSnackbar}
handleClose={() => { setOpenSnackbar(false);}}
severity="success"
message={message}
/>

</> 
);
}

export default IndividualFolders;