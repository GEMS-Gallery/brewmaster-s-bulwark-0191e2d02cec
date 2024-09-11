import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GuideSection {
  title: string;
  content: string;
}

const TalentsPage = () => {
  const [talents, setTalents] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const result = await backend.getTalentPoints();
        setTalents(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching talents:', error);
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Talent Points
      </Typography>
      {talents.map((talent, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{talent.title}</Typography>
            <Typography variant="body1">{talent.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TalentsPage;
