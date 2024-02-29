'use client';

import { StyledLink } from '@/components/StyledLink';
import { APP_ROUTES } from '@/core/routes';
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
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
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

      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!response?.ok) {
        setError('Incorrect credentials!');
        setIsLoading(false);
        return;
      } else {
        router.push('/');
      }
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

          <StyledLink href={APP_ROUTES.SIGNUP}>Sign up</StyledLink>

          <Button
            disabled={!formData.email || !formData.password || isLoading}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
