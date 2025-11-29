import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const ModalComp = ({ folder, open, setOpens, deleteFolder }) => {
    return (
        <Modal open={open} onClose={() => setOpens(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={ { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }  }>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure You Want to Delete Folder {folder.name}?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={() => {
            console.log("Deleting folder with ID from modal:", folder.id);
            deleteFolder(folder.id);
            }}>Delete</Button>
            <Button variant="contained" color="primary" onClick={() => setOpens(false)} style={{marginLeft: '10px'}}>Cancel</Button>
            </Typography>
        </Box>
        </Modal>
    );
}

export default ModalComp;