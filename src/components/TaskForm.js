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
import PostAdd from '@material-ui/icons/PostAdd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function TaskForm() {
  const classes = useStyles();
const [task, setTask] = React.useState({});
const [open, setOpen] = React.useState(false);
const {users} = useContext(TasksContext);
const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const {createTask} = useContext(TasksContext);

const handleInputChange = ( e) => {
    const {name, value} = e.target
    if (name === 'user'){
        task[name] = {id: value};
    } else {
        task[name] = value;
    }
    setTask(setTask);
    
}
async function handleSave() {
    createTask(task);
    handleClose();
};

return (
<>
    <Box component="span" m={1}>
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PostAdd />}
        onClick={handleClickOpen}
      >
        New task
      </Button>
      </Box>
<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task fill in the form below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
          labelId="demo-simple-select-label"
                input={<Input id="demo-dialog-native" />}
                name="user"
                onChange={handleInputChange}
              >
                <option aria-label="None" value="0" >None</option>
                {users?.map((user) => (<option id="userId" key={user.id} value={user.id}>{user.name}</option>))}
              </Select>
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