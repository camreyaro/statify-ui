import { useTopTracks } from '../hooks/useTopTracks';
import { Box, Grid, Card, CardContent, Avatar, Typography, CircularProgress, Alert } from '@mui/material';

const TopTracks = () => {
  const { tracks, loading: tracksLoading, error: tracksError } = useTopTracks();

  if (tracksLoading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (tracksError)
    return (
      <Box textAlign="center" mt={10}>
        <Alert severity="error">Error: {tracksError}</Alert>
      </Box>
    );

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h5" fontWeight="600" mb={3} color="text.primary">
        Top Tracks
      </Typography>

      <Grid container spacing={2}>
        {tracks.map((track, index) => (
          <Grid size={6} item xs={12} sm={6} key={track.id || index}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                gap: 2,
                mb: 0,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              {track.album_image_url && (
                <Avatar
                  src={track.album_image_url}
                  alt={track.name}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
              )}
              <CardContent sx={{ p: 0 }}>
                <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                  {index + 1}. {track.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {track.artist}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopTracks;
