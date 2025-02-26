import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { formatDate } from '../../helpers/date.helper';
import { AccountingReportResponseV2 } from '../../models/balance.models';
import { Tax } from '../../models/tax.models';

type Props = {
  data: AccountingReportResponseV2;
  tax: Tax;
}

export const AccountingTable: React.FC<Props> = ({ tax, data }) => {
  const theme = useTheme();
  const totalTableRowStyle = { color: '#FFF', fontWeight: 'bold'};

  return (
    <Card elevation={24} sx={{ marginTop: '20px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Data do Lançamento
              </TableCell>
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
                <TableCell component='th' scope='row'>
                  R$ {balance.value.toFixed(2)}
                </TableCell>
                <TableCell> R$ {balance.churchFirstLeaderPercentage.toFixed(2)}</TableCell>
                <TableCell> R$ {balance.churchSecondLeaderPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.mainChurchPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.ministryPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.mainLeaderPercentage.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell sx={totalTableRowStyle}>TOTAL</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.total.toFixed(2)}</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.churchFirstLeaderPercentageTotal.toFixed(2)}</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.churchSecondLeaderPercentageTotal.toFixed(2)}</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.mainChurchPercentageTotal.toFixed(2)}</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.ministryPercentageTotal.toFixed(2)}</TableCell>
              <TableCell sx={totalTableRowStyle}>R$ {data.mainLeaderPercentageTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
