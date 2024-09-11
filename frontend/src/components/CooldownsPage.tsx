import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GuideSection {
  title: string;
  content: string;
}

const CooldownsPage = () => {
  const [cooldowns, setCooldowns] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCooldowns = async () => {
      try {
        const result = await backend.getCooldowns();
        setCooldowns(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cooldowns:', error);
        setLoading(false);
      }
    };

    fetchCooldowns();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Important Cooldowns
      </Typography>
      {cooldowns.map((cooldown, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{cooldown.title}</Typography>
            <Typography variant="body1">{cooldown.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CooldownsPage;
