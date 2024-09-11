import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Tooltip } from '@mui/material';
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

  useEffect(() => {
    const fetchTalentTrees = async () => {
      try {
        const result = await backend.getTalentTrees();
        setTalentTrees(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching talent trees:', error);
        setLoading(false);
      }
    };

    fetchTalentTrees();
  }, []);

  if (loading) {
    return <CircularProgress />;
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
    <div>
      <Typography variant="h4" gutterBottom>
        {talentTree.name}
      </Typography>
      <div style={{ width: '100%', height: '600px' }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TalentsPage;
