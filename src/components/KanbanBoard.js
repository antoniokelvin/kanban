import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KanbanColumn from './KanbanColumn';
import axios from '../axios';
import TaskForm from './TaskForm';
import UserForm from './UserForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 500,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export const TasksContext = React.createContext({
  tasks: [],
  users:[],
  updateTask: ()=>{},
  saveTask: ()=>{},
});

export default function KanbanBoard() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function fetchUsers() {
    const request = await axios.get("/users");
    setUsers(request.data);
  }
  async function fetchTasks() {
      const request = await axios.get("/workitems");
      setTasks(request.data);
  }

  async function updateTaskProperty(task, field, value) {
    const request = await axios.patch(`/workitems/${task.id}`, 
      [
        { "op": "replace", "path": `/${field}`, "value": value }
      ]
    );
  }
  useEffect(() => {       
      fetchTasks();
      fetchUsers();
  }, []);

  const classes = useStyles();

  const updateTask = async (taskToUpdate, field, value) => {
    try {
      await updateTaskProperty(taskToUpdate,field, value);
      const updatedTasks = tasks.map((task) => {
        if (taskToUpdate.id === task.id) {
          if (field === 'status' && taskToUpdate.id === task.id) {
            task.status = value;      
          } 
          if (field === 'user/id' && taskToUpdate.id === task.id) {
            const newUser = users.filter((user) => { return user.id === value});           
            task.user = newUser[0];    
          } 
        }
        return task;
      });
        setTasks(updatedTasks);
      } catch (error) {   
    }   
  }

  const createTask = async (task) => {
    task.status = 'TODO';
    const request = await axios.post("/workitems", { 
      "title": task.title,
      "status": 'TODO',
      "description": task.description,
      "user": task.user }
    );
    const updatedTasks = tasks.concat(request.data);
    setTasks(updatedTasks);
  }

  const createUser = async (user) => {
    const request = await axios.post("/users", { 
      "name": user.name,
      "email": user.email 
    }
    );
    const updatedUsers = users.concat(request.data);
    setUsers(updatedUsers);
  }

  return (
    <TasksContext.Provider value={{tasks, users, updateTask, createTask, createUser}}>
    <div>
    <Paper elevation={0} />
    <Typography variant="h3" style={{ color: 'white'}} component="h3" gutterBottom>
      Kanban Board
    </Typography>
    <Grid container className={classes.root} spacing={2}>
    <Grid container justify="center" spacing={2}>
    <TaskForm />
    <UserForm />
    </Grid>
      <Grid item xs={12}>      
      <Grid container justify="center" spacing={2}>
            <KanbanColumn status='TODO'/>
            <KanbanColumn status='IN_PROGRESS'/>
            <KanbanColumn status='DONE'/>
      </Grid>
    </Grid>
    </Grid>
    </div>
    </TasksContext.Provider>
  );
}

