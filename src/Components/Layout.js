import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Snackbar
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskCreated, setIsTaskCreated] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskReward, setTaskReward] = useState('');
  const [taskChecked, setTaskChecked] = useState('');

  const isTaskPage = location.pathname === '/Tasks';

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsTaskCreated(false);
    setIsFieldsEmpty(false);
    setTaskId('');
    setTaskDescription('');
    setTaskReward('');
    setTaskChecked('');
  };

  const handleSaveTask = () => {
    if (!taskId || !taskDescription || !taskReward || !taskChecked) {
      setIsFieldsEmpty(true);
      return;
    }

    const taskData = {
      id: taskId,
      description: taskDescription,
      reward: Number(taskReward), 
      checked: taskChecked === 'true'
    };

    fetch('https://646393da043c103502a69402.mockapi.io/Tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
      .then(response => {
        if (response.ok) {
          setIsTaskCreated(true);
          setTaskId('');
          setTaskDescription('');
          setTaskReward('');
          setTaskChecked('');
        } else {
          throw new Error('Failed to create task');
        }
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };

  const inputProps = {
    margin: 'dense',
    fullWidth: true,
  };

  return (
    <>
      <Outlet />
      <AppBar>
        <Container fixed>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-laabel="menu">
            </IconButton>
            <Typography variant="h4" mr={3}>FammiHelp |</Typography>
            <Button color='inherit' variant='primary' href="Tasks">Tasks</Button>
            <Box mr={40}>
              <Button color='inherit' variant='primary' href="Shop">Shop</Button>
            </Box>
            {isTaskPage && (
              <Box mr={5}>
                <Button color='secondary' variant='contained' onClick={handleModalOpen}>
                  <AddCircleIcon /> Task Button
                </Button>
              </Box>
            )}
            <Box mr={5}>
              <Button color='success' variant='contained' href="Login">Log In</Button>
            </Box>
            <Button color='error' variant='contained' href="Register">Sign up</Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Id"
            inputProps={inputProps}
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
          <TextField
            label="Description"
            inputProps={inputProps}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            label="Reward"
            inputProps={inputProps}
            value={taskReward}
            onChange={(e) => setTaskReward(e.target.value)}
          />
          <TextField
            label="Checked"
            inputProps={inputProps}
            value={taskChecked}
            onChange={(e) => setTaskChecked(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSaveTask}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isFieldsEmpty}
        autoHideDuration={3000}
        onClose={() => setIsFieldsEmpty(false)}
        message="Please fill in all fields."
      />

      <Snackbar
        open={isTaskCreated}
        autoHideDuration={3000}
        onClose={handleModalClose}
        message="Task successfully created."
      />
    </>
  );
};

export { Layout };
