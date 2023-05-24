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

  const fetchData = () => {
    fetch('https://646393da043c103502a69402.mockapi.io/Tasks/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Помилка при отриманні даних:', error));
  };

  const handleToggle = (taskId) => () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          checked: !task.checked, // Інвертуємо значення "checked"
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', margin:10, ml:35  }}> 
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
