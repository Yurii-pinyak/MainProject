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


function Shop() {
  const [data, setData] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    fetchData();
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://646393da043c103502a69402.mockapi.io/Shop');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
          <CardMedia component="img" height="140" image={item.image} alt={item.title} />
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
    <ThemeProvider theme={createTheme()}>
      <main>
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {renderCards()}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Shop;
