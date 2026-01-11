import { useTopTracksByArtist } from '../hooks/useTopTracksByArtist';
import { Box, Grid, Card, CardContent, Avatar, Typography, CircularProgress, Alert } from '@mui/material';

const TopTracksByArtist = () => {
  const { tracksByArtist, loading: tracksByArtistLoading, error: tracksByArtistError } = useTopTracksByArtist();

  if (tracksByArtistLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (tracksByArtistError) {
    return (
      <Box textAlign="center" mt={10}>
        <Alert severity="error">Error: {tracksByArtistError}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%' }}>
      {Object.entries(tracksByArtist).map(([artistId, artistInfo]) => (
        <Box key={artistId} mb={8}>
          <Typography variant="h6" fontWeight="600" mb={2} color="text.primary">
            {artistInfo.name}
          </Typography>

          <Grid container spacing={2}>
            {(artistInfo.tracks || []).map((track, idx) => (
              <Grid size={3} item xs={12} sm={6} md={4} key={track.id || track.name}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 6 },
                  }}
                >
                  {track.album_image_url && (
                    <Avatar
                      src={track.album_image_url}
                      alt={track.name}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  )}
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="body1" color="text.primary">
                      {idx + 1}. {track.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TopTracksByArtist;
