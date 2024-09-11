import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress, Tabs, Tab, Box } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GuideSection {
  title: string;
  content: string;
}

interface TalentTree {
  name: string;
  talents: GuideSection[];
}

const TalentsPage = () => {
  const [talents, setTalents] = useState<TalentTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Talent Points
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="talent trees">
        {talents.map((tree, index) => (
          <Tab label={tree.name} key={index} />
        ))}
      </Tabs>
      {talents.map((tree, index) => (
        <TabPanel value={activeTab} index={index} key={index}>
          {tree.talents.map((talent, talentIndex) => (
            <Card key={talentIndex} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{talent.title}</Typography>
                <Typography variant="body1">{talent.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </TabPanel>
      ))}
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`talent-tabpanel-${index}`}
      aria-labelledby={`talent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default TalentsPage;
