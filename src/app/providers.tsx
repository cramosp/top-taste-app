import { FC, PropsWithChildren } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};
