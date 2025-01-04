import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { AccountingReportItem, Balance } from '../../models/balance.models';
import { BalanceService } from '../../services/BalanceService/balance.service';
import { useAuth } from '../../context/LoginContext';
import { ReportTypes } from '../../constants/report.types';
import { IncomingOutgoingTable } from './IncomingOutgoingTable';
import { AccountingTable } from './AccountingTable';
import { getFriendlyName, reportTypesMapper } from '../../helpers/friendlyNames.helper';
import { TaxService } from '../../services/TaxService/tax.service';
import { Tax } from '../../models/tax.models';

export const BalanceReport: React.FC = () => {
  const [balances, setBalances] = useState<Balance[] | AccountingReportItem>([]);
  const [tax, setTax] = useState<Tax>();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string | null>(null);

  const { getToken } = useAuth();
  const token = getToken() || '';

  useEffect(() => {
    const getTaxes = async () => {
      const fetchTaxes = await TaxService.getTaxes(token);
      setTax(fetchTaxes);
    }

    getTaxes();
  }, []);

  const renderTable = (type: string) => {
    const tableMapper: Record<string, ReactElement> = {
      incoming: (<IncomingOutgoingTable balances={balances as Balance[]} />),
      outgoing: (<IncomingOutgoingTable balances={balances as Balance[]} />),
      incoming_outgoing: (<IncomingOutgoingTable balances={balances as Balance[]} />),
      accounting: (<AccountingTable balances={balances as unknown as AccountingReportItem[]} tax={tax as Tax} />),
    }

    return tableMapper[type];
  }

  const handleOnClick = async () => {
    try {
      setLoading(true);
      if (!startDate || !endDate || !type) {
        window.alert('Preencha todos os campos');
        return;
      }

      const response = await BalanceService.extractReport(
        startDate,
        endDate,
        type,
        token,
      );
      setBalances(response);
    } catch (error) {
      const errorMessage = `ERROR ON GET BALANCES BY DATE - ${error}`;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setBalances([]);
    setType(event.target.value);
  }

  const handleOnClickClear = () => {
    setBalances([]);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      alignContent='center'
      marginTop='50px'
    >
      <Card elevation={24} sx={{ width: '80%', maxWidth: 800 }}>
        <CardHeader title='Selecione as datas para extração do relatório' />
        <CardContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  label='Data inicial'
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  label='Data final'
                />
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            id='outlined-select-currency-a'
            select
            label='Tipo de Relatório'
            fullWidth
            value={type}
            onChange={handleOnSelect}
            sx={{ marginTop: '20px' }}
          >
            {Object.values(ReportTypes).map((reportType: string) => (
              <MenuItem key={reportType} value={reportType}>
                {getFriendlyName(reportType, reportTypesMapper)}
              </MenuItem>
            ))}
          </TextField>
          <Box
            display='flex'
            justifyContent='space-between'
            width='100%'
            marginTop='30px'
          >
            <Button
              variant='outlined'
              color='error'
              onClick={handleOnClickClear}
              disabled={loading}
            >
              Limpar
            </Button>
            <Button
              variant='contained'
              type='submit'
              onClick={handleOnClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size='20px' /> : 'Buscar Dados'}
            </Button>
          </Box>
        </CardContent>
      </Card>
      {balances.length > 0 && renderTable(type)}
    </Box>
  );
};
