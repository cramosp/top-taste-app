import { Restaurant } from '@/core/types';
import { RestaurantCard } from '@/components/RestaurantCard';
import { API_ROUTES } from '@/core/routes';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { API_URL } from '@/core/env';

async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_URL}${API_ROUTES.RESTAURANTS}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Restaurants() {
  const restaurants = await getRestaurants();

  return (
    <main>
      <Container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3%',
          marginBottom: '3%',
        }}
      >
        <Grid container spacing={8}>
          {restaurants.map((restaurant) => (
            <Grid key={restaurant._id} item xs={12} sm={6} md={4}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
