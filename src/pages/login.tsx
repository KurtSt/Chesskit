import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await auth.login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={auth.loading}
          >
            {auth.loading ? 'Logging in...' : 'Login'}
          </Button>
          <Link component={NextLink} href="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
