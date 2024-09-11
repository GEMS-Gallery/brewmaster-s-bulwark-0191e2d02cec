import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GuideSection {
  title: string;
  content: string;
}

const RotationPage = () => {
  const [rotation, setRotation] = useState<GuideSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRotation = async () => {
      try {
        const result = await backend.getRotation();
        setRotation(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rotation:', error);
        setLoading(false);
      }
    };

    fetchRotation();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Rotation Guide
      </Typography>
      {rotation.map((section, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{section.title}</Typography>
            <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
              {section.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RotationPage;
