'use client';

import { API_URL } from '@/core/env';
import { API_ROUTES } from '@/core/routes';
import { UserSession, User } from '@/core/types';
import { Alert, Snackbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

interface ContextValues {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken?: string;
  user?: User;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<ContextValues | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const clearUser = () => {
    setUser(undefined);
  };

  const value: ContextValues = {
    isAuthenticated: session !== null,
    isLoading: loading,
    accessToken: (session as UserSession)?.user.accessToken,
    user,
    updateUser,
    clearUser,
  };

  useEffect(() => {
    if (!value.accessToken) {
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${API_ROUTES.USER}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value.accessToken}`,
          },
        });

        if (response.ok) {
          const user: User = await response.json();
          setUser(user);
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [value.accessToken]);

  return (
    <UserContext.Provider value={value}>
      {children}

      <Snackbar
        open={error !== undefined}
        autoHideDuration={6000}
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
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const values = useContext(UserContext);

  if (!values) {
    throw Error(
      'useUserContext hook needs to be used inside of UserContextProvider'
    );
  }

  return values;
};
