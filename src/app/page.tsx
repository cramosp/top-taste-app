'use client';

import { Carousel } from '@/components/Carousel';
import { StyledLink } from '@/components/StyledLink';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 1, md: 2 }}
        width="100%"
        margin="5% 5% 2% 5%"
        sx={{ gap: 15 }}
      >
        <Typography
          variant="h4"
          align="center"
          textAlign="left"
          sx={{ width: '30%', alignSelf: 'flex-end' }}
        >
          Ready for a top tasting experience?
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Carousel />
        </Box>
      </Stack>

      <Box sx={{ marginLeft: '10%' }}>
        <StyledLink href="/restaurants" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF4C29',
              '&:hover': {
                backgroundColor: '#334756 ',
              },
            }}
          >
            I&apos;m ready!
          </Button>
        </StyledLink>
      </Box>
    </main>
  );
}
