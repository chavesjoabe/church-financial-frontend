import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { IncomingOutgoingCard } from '../IncomingOutgoingCard/IncomingOutgoingCard';
import { CreateUser } from '../CreateUser/CreateUser';
import { BalanceReport } from '../BalanceReport/BalanceReport';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ToolBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event.target);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, backgroundColor: 'primary'}}>
        <Tabs sx={{backgroundColor: 'primary'}} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Entrada de valores" {...a11yProps(0)} />
          <Tab label="Saída de valores" {...a11yProps(1)} />
          <Tab label="Criação de usuários" {...a11yProps(2)} />
          <Tab label="Extração de Relatório" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IncomingOutgoingCard type='incoming'/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IncomingOutgoingCard type='outgoing'/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CreateUser />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BalanceReport />
      </CustomTabPanel>
    </Box>)
}
