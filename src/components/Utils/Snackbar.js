import { Snackbar,Alert } from "@mui/material";
const SnackbarComp = ({ openSnackbar, handleClose, severity, message }) => {
    return (
        <Snackbar open={openSnackbar} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }}onClose={handleClose}>
            <Alert severity={severity} variant="filled" onClose={handleClose}>
            {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComp;