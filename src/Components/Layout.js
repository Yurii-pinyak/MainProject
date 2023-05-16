import React from "react";
import Button from '@mui/material/Button';
import { AppBar, Container, Toolbar, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {Link, Outlet} from 'react-router-dom'

const Layout = () => {
    return ( 
        <>
        <Outlet/>
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
            <Box mr={5}>
              <Button color='success' variant='contained' href="Login">Log In</Button>
            </Box>
            <Button color='error' variant='contained' href="Register">Sign up</Button>
          </Toolbar>
        </Container>
      </AppBar>
      
      </>
    );
};
export {Layout};