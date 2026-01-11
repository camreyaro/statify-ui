'use client'

import Image from "next/image";
import { Box, Button, Typography, Container, Link } from "@mui/material";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/login";
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        py: 4,
      }}
    >
      <main
        style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 400, alignItems: 'center' }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 250, mb: 4 }}> 
          <Image 
          src="/logo.png" 
          alt="Statify logo" 
          fill 
          priority 
          style={{ borderRadius: '12px' }} /> 
        </Box>

        <Button
          onClick={handleLogin}
          variant="contained"
          color="secondary"
          sx={{
            px: 8,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: '#525252',
            '&:hover': { backgroundColor: '#3f3f3f' },
            fontSize: '1.25rem',
            width: '100%'
          }}
        >
          Login with Spotify
          <Image
            src="/spotify.png"
            alt="Spotify logo"
            width={20}
            height={20}
            priority
          />
        </Button>
      </main>

      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Made with 💜 by</Typography>
        <Link
          href="https://github.com/camreyaro"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          @camreyaro
        </Link>
      </Box>
    </Container>
  );
}
