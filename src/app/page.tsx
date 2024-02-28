'use client';
import { HomeSlider } from '@/components/HomeSlider';
import { StyledLink } from '@/components/StyledLink';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
export default function Home() {
  return (
    <Container
      component="main"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        justifyContent="space-between"
        gap="50px"
      >
        <Stack gap="30px" sx={{ minWidth: '300px', alignSelf: 'flex-end' }}>
          <Typography variant="h4" align="center" textAlign="left">
            Ready for a top tasting experience?
          </Typography>

          <StyledLink href="/restaurants" passHref>
            <Button
              variant="contained"
              fullWidth
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
        </Stack>
        <Box sx={{ minWidth: '400px' }}>
          <HomeSlider />
        </Box>
      </Stack>
    </Container>
  );
}
