'use client'

import { useUser } from './hooks/useUser';
import TopArtists from './components/topArtists';
import TopTracks from './components/topTracks';
import TopTracksByArtist from './components/topTracksByArtist';
import { Box, Grid, Avatar, Typography, CircularProgress, Alert, Container } from '@mui/material';

export default function Stats() {
  const { user, loading: userLoading, error: userError } = useUser();

  if (userLoading)
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (userError)
    return (
      <Box textAlign="center">
        <Alert severity="error">{userError}</Alert>
      </Box>
    );

  return (
    <Container maxWidth="lg">
      {/* User Info */}
      {user && (
        <Box display="flex" flexDirection="column" alignItems="center" mb={10}>
          <Avatar
            src={user.photo}
            alt={user.name}
            sx={{ width: 80, height: 80, mb: 2, boxShadow: 3 }}
          />
          <Typography variant="h4" component="h4" fontWeight="bold" color="text.primary">
            {user.name}
          </Typography>
        </Box>
      )}

      {/* Tracks & Artists */}
      <Grid container spacing={8} mb={12}>
        <Grid size={6} item xs={12} md={6}>
          <TopTracks />
        </Grid>
        <Grid size={6} item xs={12} md={6}>
          <TopArtists />
        </Grid>
      </Grid>

      {/* Top Tracks By Artist */}
      <Box mb={16}>
        <TopTracksByArtist />
      </Box>
    </Container>
  );
};
