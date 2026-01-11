import { useTopArtists } from '../hooks/useTopArtists';
import { Box, Grid, Card, CardContent, Avatar, Typography, CircularProgress, Alert } from '@mui/material';

const TopArtists = () => {
  const { artists, loading: artistsLoading, error: artistsError } = useTopArtists();

  if (artistsLoading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (artistsError)
    return (
      <Box textAlign="center" mt={10}>
        <Alert severity="error">Error: {artistsError}</Alert>
      </Box>
    );

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h5" fontWeight="600" mb={3} color="text.primary">
        Top Artists
      </Typography>

      <Grid container spacing={2}>
        {artists.map((artist, index) => (
          <Grid size={6} item xs={12} sm={6} key={index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                gap: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              {artist.image_url && (
                <Avatar
                  src={artist.image_url}
                  alt={artist.name}
                  sx={{ width: 64, height: 64 }}
                />
              )}
              <CardContent sx={{ p: 0 }}>
                <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                  {index + 1}. {artist.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopArtists;
