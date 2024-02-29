'use client';

import { APP_ROUTES } from '@/core/routes';
import { Restaurant } from '@/core/types';
import { ArrowCircleRight, CalendarMonth, Reviews } from '@mui/icons-material';
import { Box, Button, Divider, Modal, Stack, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { StyledLink } from '../StyledLink';
import { LikeButton } from '../LikeButton';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        action={
          <Tooltip title="Check details" arrow>
            <StyledLink href={`${APP_ROUTES.RESTAURANTS}/${restaurant._id}`}>
              <IconButton aria-label="check details">
                <ArrowCircleRight sx={{color: 'white'}}/>
              </IconButton>
            </StyledLink>
          </Tooltip>
        }
        title={restaurant.name}
        subheader={restaurant.neighborhood}
        sx={{ height: 80, alignItems: 'flex-start' }}
      />
      <CardMedia
        component="img"
        height="194"
        image={restaurant.image || '/default.png'}
        alt={`${restaurant.name} image`}
      />

      <CardContent sx={{ height: 5 }}>
        <Typography variant="body2" color="text.secondary">
          {restaurant.address}
        </Typography>
        <Typography>{restaurant.cuisineType}</Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <LikeButton restaurantId={restaurant._id} />

        <Tooltip title="Check Reviews" arrow>
          <Button onClick={handleOpen}>
            <Reviews sx={{ color: '#FF4C29' }} />
          </Button>
        </Tooltip>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="reviews"
          aria-describedby="check reviews"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {restaurant.reviews.map((review, index) => (
              <div key={index}>
                <Typography paragraph>{`${review.name}`}</Typography>

                <Stack direction="row">
                  <CalendarMonth sx={{ marginRight: '2%' }} />
                  <Typography paragraph>{`${review.date}`}</Typography>
                </Stack>

                <Typography
                  paragraph
                >{`Comments: ${review.comments}`}</Typography>
                {index !== restaurant.reviews.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </div>
            ))}
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};
