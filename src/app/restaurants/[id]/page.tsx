import { API_URL } from '@/core/env';
import { Restaurant } from '@/core/types';
import { API_ROUTES } from '@/core/routes';

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
    <main>
      <div>
        <h1>{restaurant.name}</h1>
      </div>
    </main>
  );
}
