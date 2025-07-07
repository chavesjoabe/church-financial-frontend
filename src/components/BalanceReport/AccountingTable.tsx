import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDate } from '../../helpers/date.helper';
import { Tax } from '../../models/tax.models';
import { AccountingReportResponseV2 } from '../../models/balance.models';
import { ReportTypeObject } from '../../models/report.models';
import { AccountingTransferTable } from './AccountingTransferTable';
import { AccountingTransferGeolTable } from './AccountingTansferGeolTable';
import { AccountingNonOficialTable } from './AccountingNonOficialTable';
import { formatCurrency } from '../../helpers/currency.helper';

type Props = {
  data: AccountingReportResponseV2;
  tax: Tax;
}

export const AccountingTable: React.FC<Props> = ({ data, tax }: Props) => {

  const theme = useTheme();
  const totalTableRowStyle = { color: '#FFF', fontWeight: 'bold' };

  const transferTypes: ReportTypeObject[] = [
    {
      type: 'Repasse - Aliança',
      balances: data.transferBalances,
      total: data.transferBalancesTotal,
    },
    {
      type: 'Repasse - GEOL',
      balances: data.transferGeolBalances,
      total: data.transferGeolBalancesTotal,
    },
    {
      type: 'Não Oficiais',
      balances: data.transferGeolBalances,
      total: data.transferGeolBalancesTotal,
    }
  ];

  const nonOficialTotal = data.nonOficialBalances.reduce((acc, curr) => acc += curr.value, 0);
  const transferTotal = (tax.transferMainChurchPercentage + tax.transferMainLeaderPercentage) * data.transferBalancesTotal.total;


  const tableMapper: Record<string, JSX.Element> = {
    ['Repasse - Aliança']: (<AccountingTransferTable balances={data.transferBalances} total={data.transferBalancesTotal} tax={tax} type={'Repasse - Aliança'} />),
    ['Repasse - GEOL']: (<AccountingTransferGeolTable balances={data.transferGeolBalances} total={data.transferGeolBalancesTotal} tax={tax} type={'Repasse - Geol'} />),
    ['Não Oficiais']: (<AccountingNonOficialTable balances={data.nonOficialBalances} type={'Não Oficiais'} />)
  }

  return (
    <>
      <Card elevation={24} sx={{ marginTop: '20px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}> Data </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>% Pastor 1 ({tax.firstLeaderPercentage * 100}%)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>% Pastor 2 ({tax.secondLeaderPercentage * 100}%)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>% Sede ({tax.mainChurchPercentage * 100}%)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>% Ministério ({tax.ministryPercentage * 100}%)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>% Apóstolo ({tax.mainLeaderPercentage * 100}%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.balances.map((balance) => (
                <TableRow
                  key={balance.balanceId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {formatDate.format(new Date(balance.balanceDate))}
                  </TableCell>
                  <TableCell component='th' scope='row'>{formatCurrency.format(balance.value)}</TableCell>
                  <TableCell>{formatCurrency.format(balance.churchFirstLeaderPercentage)}</TableCell>
                  <TableCell>{formatCurrency.format(balance.churchSecondLeaderPercentage)}</TableCell>
                  <TableCell>{formatCurrency.format(balance.mainChurchPercentage)}</TableCell>
                  <TableCell>{formatCurrency.format(balance.ministryPercentage)}</TableCell>
                  <TableCell>{formatCurrency.format(balance.mainLeaderPercentage)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={totalTableRowStyle}>TOTAL</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.total)}</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.churchFirstLeaderPercentage)}</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.churchSecondLeaderPercentage)}</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.mainChurchPercentage)}</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.ministryPercentage)}</TableCell>
                <TableCell sx={totalTableRowStyle}>{formatCurrency.format(data.balancesTotal.mainLeaderPercentage)}</TableCell>
              </TableRow>
              {
                transferTypes.map(transferType => tableMapper[transferType.type as unknown as string])
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card elevation={24} sx={{ marginTop: '20px', width: '80%', maxWidth: 800, padding: '10px' }}>
        <Typography>Total Final</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}> Tipo </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell>Oficiais</TableCell>
              <TableCell component='th' scope='row'>{formatCurrency.format(data.balancesTotal.total)} </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell>Repasse - Aliança</TableCell>
              <TableCell component='th' scope='row'>
                {formatCurrency.format(transferTotal)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell>Repasse - GEOL</TableCell>
              <TableCell component='th' scope='row'>{formatCurrency.format(data.transferGeolBalancesTotal.total)} </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell>Não Oficiais</TableCell>
              <TableCell component='th' scope='row'>
                {formatCurrency.format(nonOficialTotal)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              <TableCell component='th' scope='row' sx={{ fontWeight: 'bold' }}>
                {formatCurrency.format((data.balancesTotal.total + data.transferGeolBalancesTotal.total + nonOficialTotal + transferTotal))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
