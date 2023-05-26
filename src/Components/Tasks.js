import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
  const parentUsername = authenticatedUser.username;
  
  const fetchData = () => {
    fetch('https://646a874d7d3c1cae4ce2a2cd.mockapi.io/Users')
      .then(response => response.json())
      .then(data => {
        const userTasks = data.filter(user => user.type === 'parent' && user.username === parentUsername)
          .flatMap(user => user.tasks || []);
        setTasks(userTasks);
      })
      .catch(error => console.error('Помилка при отриманні даних:', error));
  };

  const handleToggle = (taskId) => () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          checked: !task.checked, 
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };
  console.log('Username:', parentUsername);
  return (
    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', margin:'10px auto', mt:10 }}> 
      {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;
        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <ModeIcon />
              </IconButton>
            }
            disablePadding
          > 
            <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={Boolean(task.checked)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.description} secondary={`Нагорода: ${task.reward}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
