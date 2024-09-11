import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { backend } from '../../declarations/backend';

interface Talent {
  name: string;
  description: string;
  recommended: boolean;
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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Brewmaster Monk Talents
      </Typography>
      {talentTrees.map((tree, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{tree.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {tree.talents.map((talent, talentIndex) => (
              <Card key={talentIndex} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {talent.name}
                    {talent.recommended && (
                      <Chip label="Recommended" color="primary" size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Typography variant="body1">{talent.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default TalentsPage;
