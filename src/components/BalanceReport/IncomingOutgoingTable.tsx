import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Balance } from '../../models/balance.models';
import { formatDate } from '../../helpers/date.helper';
import { balanceDescriptionMapper, balanceStatusMapper, balanceTypeMapper, getFriendlyName } from '../../helpers/friendlyNames.helper';

type Props = {
  balances: Balance[];
}

export const IncomingOutgoingTable: React.FC<Props> = ({ balances }) => {
  return (
    <Card elevation={24} sx={{ marginTop: '20px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Data do Lançamento
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map((balance) => (
              <TableRow
                key={balance.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  R$ {balance.value.toFixed(2)}
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
                <TableCell>
                  {formatDate.format(new Date(balance.balanceDate))}
                </TableCell>
                <TableCell>{balance.responsible}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
