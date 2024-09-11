import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { backend } from '../../declarations/backend';

interface TalentBuild {
  name: string;
  description: string;
  treeLink: string;
}

interface TalentSection {
  title: string;
  builds: TalentBuild[];
}

const TalentsPage = () => {
  const [talentSections, setTalentSections] = useState<TalentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalentSections = async () => {
      try {
        const result = await backend.getTalentSections();
        console.log('Fetched talent sections:', result);
        setTalentSections(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching talent sections:', error);
        setError('Failed to load talent data. Please try again later.');
        setLoading(false);
      }
    };

    fetchTalentSections();
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Talent Builds
      </Typography>
      {talentSections.map((section, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.builds.map((build, buildIndex) => (
              <Box key={buildIndex} mb={2}>
                <Typography variant="h6">{build.name}</Typography>
                <Typography variant="body1">{build.description}</Typography>
                <Box mt={2}>
                  <a href={build.treeLink} target="_blank" rel="noopener noreferrer" data-wowhead="talent-calc">
                    View Talent Tree
                  </a>
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={2}>
        <Typography variant="caption">
          Talent trees provided by Wowhead. Click on the links to view interactive talent calculators.
        </Typography>
      </Box>
    </Box>
  );
};

export default TalentsPage;
