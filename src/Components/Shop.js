import * as React from 'react';
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4 , 5, 6];

const theme = createTheme();

export default function Shop() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '10%',
                    }}
                    image="data:image/jpeg;base64,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"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Gift
                    </Typography>
                    <Typography>
                    Грицю, Грицю, до роботи!
                    В Гриця порвані чоботи...
                    Грицю, Грицю, до телят!
                    В Гриця ніженьки болять...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Buy</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    <Copyright />
    </ThemeProvider>
  );
}