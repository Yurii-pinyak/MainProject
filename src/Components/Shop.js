import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';



function Shop() {
  const [data, setData] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const authenticatedUserok = JSON.parse(localStorage.getItem('authenticatedUser'));
  const Idcode = authenticatedUserok.Identification;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
 


  useEffect(() => {
    fetchData();
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchData = () => {
    fetch('https://646a874d7d3c1cae4ce2a2cd.mockapi.io/Users')
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.Identification === Idcode && user.type === 'parent');
        if (user && user.shops) {
          setData(user.shops);
        } else {
          setData([]);
        }
      })
      .catch(error => console.error('Помилка при отриманні даних:', error));
  };
  

  const renderCards = () => {
    const handleBuyNow = async (item) => {
      try {
        const response = await fetch(`https://646a874d7d3c1cae4ce2a2cd.mockapi.io/Users/${authenticatedUser.id}`);
        const userData = await response.json();
  
        const userBalance = userData.balance;
        const itemPrice = item.price;
  
        if (userBalance >= itemPrice) {
          const updatedBalance = userBalance - itemPrice;
  
          await fetch(`https://646a874d7d3c1cae4ce2a2cd.mockapi.io/Users/${authenticatedUser.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: updatedBalance }),
          });
  
          console.log('Purchase successful');
          setSnackbarOpen(true); 
          setTimeout(() => {
          setSnackbarOpen(false); 
        }, 2000);
        } else {
          console.log('Insufficient balance');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    return data.map((item) => (
      <Grid item key={item.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia component="img" height="225" image={item.image} alt={item.title} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {item.price}
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: 'auto' }}>
            <Button size="small" onClick={() => handleBuyNow(item)}>Buy Now</Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <div style={{
      backgroundImage: `url(${require('./image.png')})`,
      backgroundSize: 'cover',
      minHeight: '100vh'}}> 
    <ThemeProvider theme={createTheme()}>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 8}}>
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            {renderCards()}
          </Grid>
        </Container>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Purchase is successful!"
        />
      </main>
    </ThemeProvider>
    </div>
  );
}

export default Shop;
