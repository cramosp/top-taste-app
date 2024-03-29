'use client';

import { UserContextProvider } from '@/context/UserContext';
import { globalStyles, theme } from '@/core/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {globalStyles}
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
};
