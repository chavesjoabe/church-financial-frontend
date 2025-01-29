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
import { Balance, BalanceTypes } from '../../models/balance.models';
import { formatDate } from '../../helpers/date.helper';
import { balanceDescriptionMapper, balanceTypeMapper, getFriendlyName } from '../../helpers/friendlyNames.helper';

type Props = {
  balances: Balance[];
}

export const IncomingOutgoingTable: React.FC<Props> = ({ balances }) => {
  const theme = useTheme();
  const incomingBalances = balances.filter(balance => balance.type === BalanceTypes.INCOMING.toUpperCase());
  const outgoingBalances = balances.filter(balance => balance.type === BalanceTypes.OUTGOING.toUpperCase());

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
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map((balance) => (
              <TableRow
                key={balance.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {formatDate.format(new Date(balance.balanceDate))}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {getFriendlyName(balance.type, balanceTypeMapper)}
                </TableCell>
                <TableCell>
                  {getFriendlyName(
                    balance.description,
                    balanceDescriptionMapper,
                  )}
                </TableCell>
                <TableCell>{balance.responsible}</TableCell>
                <TableCell component='th' scope='row'>
                  R$ {balance.value.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell colSpan={4} sx={totalTableRowStyle}>
              TOTAL
            </TableCell>
            <TableCell sx={totalTableRowStyle}>
              R$ {(incomingBalances.reduce((acc, curr) => acc += curr.value ,0) - outgoingBalances.reduce((acc, curr) => acc += curr.value, 0)).toFixed(2)}
            </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
