import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import WorkItemCard from './WorkItemCard';
import {TasksContext} from './KanbanBoard'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 500,
      margin:'5px',
      borderRadius: 7,
    },

  });
export default function KanbanColumn({status}={status:'TODO'}) {
    const classes = useStyles();
    const {tasks} = useContext(TasksContext);
    const color = status === 'TODO'? '#ffac2c' : '#00d068';
    const filteredTasks = tasks.filter((task) => {return task.status === status});
    return (
        <Grid style={{ background: color}} className={classes.root} container item>
            <Grid xs={12} item>
            <Typography  variant="h4" component="h3">
              {status}
            </Typography>
            </Grid>
            
             {filteredTasks?.map((task) => (<WorkItemCard key={task.id} task={task} />))}
        </Grid>
    );
}
