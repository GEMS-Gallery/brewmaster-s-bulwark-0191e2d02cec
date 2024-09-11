import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Tooltip, Box } from '@mui/material';
import { backend } from '../../declarations/backend';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip as ChartTooltip } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, ChartTooltip);

interface Talent {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
  row: number;
  column: number;
}

interface TalentTree {
  name: string;
  talents: Talent[];
}

const TalentsPage = () => {
  const [talentTrees, setTalentTrees] = useState<TalentTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalentTrees = async () => {
      try {
        const result = await backend.getTalentTrees();
        console.log('Fetched talent trees:', result);
        setTalentTrees(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching talent trees:', error);
        setError('Failed to load talent data. Please try again later.');
        setLoading(false);
      }
    };

    fetchTalentTrees();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  if (talentTrees.length === 0) {
    return (
      <Typography variant="h6">
        No talent data available.
      </Typography>
    );
  }

  const talentTree = talentTrees[0]; // Assuming we're only displaying one tree

  const chartData = {
    datasets: [
      {
        label: 'Talents',
        data: talentTree.talents.map((talent) => ({
          x: talent.column,
          y: -talent.row, // Negative to invert the y-axis
          talent: talent,
        })),
        backgroundColor: talentTree.talents.map((talent) =>
          talent.recommended ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'
        ),
        pointRadius: 20,
        pointHoverRadius: 25,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: -1,
        max: 3,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        min: -6,
        max: 1,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const talent = context.raw.talent;
            return [`${talent.name}`, `${talent.description}`, talent.recommended ? 'Recommended' : ''];
          },
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {talentTree.name}
      </Typography>
      <Box sx={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
        <Scatter data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default TalentsPage;
