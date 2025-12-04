import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function ButtonAppBar({Name1,Name2,Button1,onButtonClick}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {Name1}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {Name2}
          </Typography>
          <Button color="inherit"  onClick={onButtonClick}>
            {Button1}
          </Button>
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
