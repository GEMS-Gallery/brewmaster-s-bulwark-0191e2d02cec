import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GuideSection {
  title: string;
  content: string;
}

const StatsPage = () => {
  const [stats, setStats] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await backend.getStatPriority();
        setStats(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Stat Priority
      </Typography>
      {stats.map((stat, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="body1">{stat.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsPage;
