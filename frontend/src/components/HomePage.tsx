import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to the Monk Tank Guide
      </Typography>
      <Typography variant="body1" paragraph>
        This guide provides essential information for Brewmaster Monks in World of Warcraft. Navigate through the sections to learn about talents, stats, rotation, and cooldowns.
      </Typography>
      <Grid container spacing={3}>
        {['Talents', 'Stats', 'Rotation', 'Cooldowns'].map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {section}
                </Typography>
                <Typography variant="body2">
                  <Link to={`/${section.toLowerCase()}`}>View {section}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
