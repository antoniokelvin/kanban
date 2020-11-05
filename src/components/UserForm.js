import React, {useState, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import {TasksContext} from './KanbanBoard'; 
import PersonAdd from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UserForm() {
  const classes = useStyles();
const [user, setUser] = React.useState({});
const [open, setOpen] = React.useState(false);
const {users} = useContext(TasksContext);
const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const {createUser} = useContext(TasksContext);

const handleInputChange = ( e) => {
    const {name, value} = e.target
    user[name] = value;
    setUser(setUser);  
}
async function handleSave() {
    createUser(user);
    handleClose();
};

return (
<>
    <Box component="span" m={1}>
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PersonAdd />}
        onClick={handleClickOpen}
      >
        New user
      </Button>
      </Box>
<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task fill in the form below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="name"
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            onChange={handleInputChange}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </>
      );
      
};