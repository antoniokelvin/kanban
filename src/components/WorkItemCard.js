import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TasksContext } from './KanbanBoard';
import axios from '../axios';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    width: 230,
    height:200,
    margin:'5px',
    backgroundColor: 232323,
    boxShadow: 3,
  },
  bullet: {
    display: 'inline-block',
    margin: '2px 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WorkItemCard({task}) {
    async function fetchUsers() {
        const request = await axios.get("/users");
        setUsers(request.data);
    }

  const [users, setUsers] = useState([]);
  useEffect(() => {       
    fetchUsers();
  }, []);
  const classes = useStyles();
  const [status, setStatus] = useState('TODO');
  const {updateTask} = useContext(TasksContext);
  return (
      
    <Card className={classes.root}  variant="elevated" elevation="5">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={task.title}
        subheader={task.user.name}
      />
      <CardContent style={{ border: '1px'}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {task.description}
        </Typography>       
      </CardContent>
      <CardActions>
      <FormControl className={classes.formControl}>
      <InputLabel id="assigned-select-label">Assigned</InputLabel>
        <Select
          labelId="assigned-select-label"
          id="simple-select"
          onChange={(e) => {updateTask(task,'user/id', e.target.value)}}
          value={task.user.id}
        >
          {users?.map((user) => (<MenuItem value={user.id}>{user.name}</MenuItem>))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>    
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => {
              updateTask(task,'status', e.target.value);
            }}
          value={task.status}
        >
          <MenuItem value={'TODO'}>Todo</MenuItem>
          <MenuItem value={'IN_PROGRESS'}>In-progress</MenuItem>
          <MenuItem value={'DONE'}>Done</MenuItem>
        </Select>
      </FormControl>
      </CardActions>
    </Card>
  );
}