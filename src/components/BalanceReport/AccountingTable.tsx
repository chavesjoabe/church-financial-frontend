import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { formatDate } from '../../helpers/date.helper';
import { AccountingReportItem } from '../../models/balance.models';

type Props = {
  balances: AccountingReportItem[];
}

export const AccountingTable: React.FC<Props> = ({ balances }) => {
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
              <TableCell sx={{ fontWeight: 'bold' }}>% Pastor (25%)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>% Sede (11%)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>% Ministério (4%)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>% Apóstolo (2%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map((balance) => (
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
                <TableCell> R$ {balance.churchLeaderPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.mainChurchPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.ministryPercentage.toFixed(2)}</TableCell>
                <TableCell>R$ {balance.mainLeaderPercentage.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
