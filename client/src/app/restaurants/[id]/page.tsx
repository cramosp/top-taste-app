import { API_URL } from '@/core/env';
import { Restaurant } from '@/core/types';
import { API_ROUTES } from '@/core/routes';
import {
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Fastfood, LocalPizza, RamenDining } from '@mui/icons-material';

export async function generateStaticParams() {
  const restaurants: Restaurant[] = await fetch(
    `${API_URL}${API_ROUTES.RESTAURANTS}`
  ).then((res) => res.json());

  return restaurants.map((restaurant) => ({
    id: restaurant._id,
  }));
}

async function getRestaurant(restaurantId: string): Promise<Restaurant> {
  const res = await fetch(
    `${API_URL}${API_ROUTES.RESTAURANTS}/${restaurantId}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch restaurant');
  }

  return res.json();
}

export default async function RestaurantDetails({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = await getRestaurant(params.id);

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '3%',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        justifyContent="space-between"
        gap="10px"
      >
        <Stack gap="20px">
          <Box>
            <Typography variant="h3">{restaurant.name}</Typography>
            <Typography variant="h4">
              {restaurant.cuisineType}{' '}
              {restaurant.cuisineType === 'Asian' && <RamenDining />}
              {restaurant.cuisineType === 'American' && <Fastfood />}
              {restaurant.cuisineType === 'Pizza' && <LocalPizza />}
            </Typography>
            <Typography variant="h6">
              {restaurant.neighborhood} | {restaurant.address}
            </Typography>
          </Box>

          <Image
            src={restaurant.image}
            alt={`${restaurant.name} image`}
            width={400}
            height={300}
          />
        </Stack>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Operating Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(restaurant.operatingHours).map(
                  ([day, hours]) => (
                    <TableRow key={day}>
                      <TableCell component="th" scope="row">
                        {day}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{hours}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}
