'use client';

import { APP_ROUTES } from '@/core/routes';
import { AccountCircle } from '@mui/icons-material';
import { Avatar, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, MouseEventHandler } from 'react';
import { StyledLink } from '../StyledLink';

const pages = ['Home', 'Temptations', 'Favorites'] as const;
const pagePaths = {
  Home: '/',
  Temptations: '/restaurants',
  Favorites: '/my-restaurants',
};

export const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { data: session } = useSession();
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogin: MouseEventHandler = async () => {
    router.push(APP_ROUTES.LOGIN);
  };
  const handleLogout: MouseEventHandler = async () => {
    handleCloseUserMenu();
    await signOut({ redirect: false });
    router.push(APP_ROUTES.ROOT);
  };

  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const userName = session?.user?.name;
  const userInitial = userName && `${userName.split(' ')[0][0]}`;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#082032',
        height: '80px',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isSmallScreen && (
            <Image
              src="/toptastelogo.png"
              alt="Top taste logo"
              width="65"
              height="65"
            />
          )}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Image
                src="/burgericon.png"
                alt="Burger menu icon"
                width="30"
                height="30"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <StyledLink href={pagePaths[page]} passHref>
                    <Typography textAlign="center">{page}</Typography>
                  </StyledLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: '150px',
            }}
          >
            {pages.map((page) => (
              <StyledLink key={page} href={pagePaths[page]} passHref>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  {page}
                </Button>
              </StyledLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!session ? (
                  <AccountCircle sx={{ color: 'white', fontSize: 50 }} />
                ) : (
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {userInitial}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!session ? (
                <MenuItem onClick={handleLogin}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              ) : (
                <>
                  {userName}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
