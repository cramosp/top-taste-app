'use client';

import { RestaurantCard } from '@/components/RestaurantCard';
import { useUserContext } from '@/context/UserContext';
import { Box, Container, Grid, Typography } from '@mui/material';

export default function MyRestaurants() {
  const { user } = useUserContext();

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        marginTop: '3%',
        marginBottom: '3%',
        gap: '30px',
      }}
    >
      <Box>
        <Typography variant="h5">Hello, {user?.name}!</Typography>
        <Typography variant="h6">
          Wanna visit any of your favorites restaurants today?
        </Typography>
      </Box>

      <Grid container spacing={8}>
        {user?.favoriteRestaurants.map((restaurant) => (
          <Grid key={restaurant._id} item xs={12} sm={6} md={4}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
