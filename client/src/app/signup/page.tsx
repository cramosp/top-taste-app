'use client';

import { API_URL } from '@/core/env';
import { API_ROUTES, APP_ROUTES } from '@/core/routes';
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

interface FormState {
  email: string;
  password: string;
  name: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}${API_ROUTES.SIGNUP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setError('Sorry, something went wrong signing you up! Try again!');
        setIsLoading(false);
        return;
      }

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      router.push(APP_ROUTES.RESTAURANTS);

      setIsLoading(false);
    } catch (error) {
      setError('Something went wrong. Please try again;');
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack
        sx={{
          borderRadius: '4px',
          maxWidth: '500px',
          width: '100%',
          gap: '30px',
        }}
      >
        <Stack flexDirection="row" gap="10px" alignSelf="center">
          <Image
            src="/toptastelogo.png"
            alt="Top taste logo"
            width="35"
            height="35"
          />

          <Typography variant="h1" fontSize="30px">
            Top taste
          </Typography>
        </Stack>

        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <Button
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.password ||
              isLoading
            }
            variant="contained"
            type="submit"
          >
            Sign up
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
