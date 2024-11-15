import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { IncomingOutgoingCard } from '../IncomingOutgoingCard/IncomingOutgoingCard';
import { CreateUser } from '../CreateUser/CreateUser';
import { HomeCard } from '../HomeCard/HomeCard';
import { useAuth } from '../../context/LoginContext';
import { PendingBalances } from '../PendingBalances/PendingBalances';
import { BalanceReport } from '../BalanceReport/BalanceReport';
import { UserManagement } from '../UserManagement/UserManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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

export const Home: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { getLoggedUser } = useAuth();
  const user = getLoggedUser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(user);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, backgroundColor: 'primary' }}>
        <Tabs
          sx={{ backgroundColor: 'primary' }}
          value={value}
          onChange={handleChange}
          variant='scrollable'
          aria-label='basic tabs example'
        >
          <Tab label='Página inicial' {...a11yProps(0)} />
          <Tab label='Entrada de valores' {...a11yProps(1)} />
          <Tab label='Saída de valores' {...a11yProps(2)} />
          <Tab label='Lançamentos Pendentes' {...a11yProps(3)} />
          {user?.role === 'ADMIN' && (
            <Tab label='Extração de relatório' {...a11yProps(5)} />
          )}
          {user?.role === 'ADMIN' && (
            <Tab label='Criação de usuários' {...a11yProps(4)} />
          )}
          {user?.role === 'ADMIN' && (
            <Tab label='Gerenciamento de usuários' {...a11yProps(5)} />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HomeCard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IncomingOutgoingCard type='incoming' />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <IncomingOutgoingCard type='outgoing' />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PendingBalances />
      </CustomTabPanel>
      {user?.role === 'ADMIN' ? (
        <CustomTabPanel value={value} index={4}>
          <BalanceReport />
        </CustomTabPanel>
      ) : (
        ''
      )}
      {user?.role === 'ADMIN' ? (
        <CustomTabPanel value={value} index={5}>
          <CreateUser />
        </CustomTabPanel>
      ) : (
        ''
      )}
      {user?.role === 'ADMIN' ? (
        <CustomTabPanel value={value} index={6}>
          <UserManagement />
        </CustomTabPanel>
      ) : (
        ''
      )}
    </Box>
  );
};
