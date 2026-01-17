'use client';

import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, CssBaseline } from '@mui/material';
import Stats from '../stats/page';
import Mood from '../mood/page';

export default function Dashboard() {
  const [active, setActive] = useState<'stats' | 'mood'>('stats');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={active === 'stats'} onClick={() => setActive('stats')}>
              <ListItemText primary="Stats" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={active === 'mood'} onClick={() => setActive('mood')}>
              <ListItemText primary="Mood" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Toolbar />
        {active === 'stats' && <Stats />}
        {active === 'mood' && <Mood />}
      </Box>
    </Box>
  );
}
