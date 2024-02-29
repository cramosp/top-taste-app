import { useUserContext } from '@/context/UserContext';
import { API_URL } from '@/core/env';
import { API_ROUTES, APP_ROUTES } from '@/core/routes';
import { User } from '@/core/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  restaurantId: string;
}

export const LikeButton: FC<Props> = ({ restaurantId }) => {
  const { isAuthenticated, user, updateUser, accessToken, isLoading } =
    useUserContext();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const isFavourite = user?.favoriteRestaurants.some(
    (restaurant) => restaurant._id === restaurantId
  );
  const tooltipText = !isFavourite
    ? 'Add to favorites'
    : 'Remove from favorites';

  const handleLikeRestaurant = async (restaurantId: string) => {
    try {
      // If user is not authenticated the the like button will redirect to login
      if (!isAuthenticated || !user) {
        router.push(APP_ROUTES.LOGIN);
        return;
      }

      setIsLoading(true);

      let favRestaurantIds = user?.favoriteRestaurants.map(
        (restaurant) => restaurant._id
      );

      if (isFavourite) {
        favRestaurantIds = favRestaurantIds.filter((id) => id !== restaurantId);
      } else {
        favRestaurantIds.push(restaurantId);
      }

      const response = await fetch(`${API_URL}${API_ROUTES.MY_RESTAURANTS}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(favRestaurantIds),
      });

      if (response.ok) {
        const updatedUser: User = await response.json();
        updateUser(updatedUser);
      } else {
        throw new Error('Failed to add restaurant to favorites');
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || loading) {
    return <CircularProgress size={20} />;
  }

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton
          aria-label={tooltipText}
          onClick={() => handleLikeRestaurant(restaurantId)}
        >
          <FavoriteIcon color={isFavourite ? 'primary' : 'inherit'} />
        </IconButton>
      </Tooltip>

      <Snackbar
        open={error !== undefined}
        autoHideDuration={2000}
        onClose={() => setError(undefined)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setError(undefined)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
