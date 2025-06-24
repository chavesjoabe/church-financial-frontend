import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatDate } from '../../helpers/date.helper';
import { Balance } from '../../models/balance.models';
import { useState } from 'react';

type Props = {
  balances: Balance[];
  type: string;
}

export const AccountingNonOficialTable: React.FC<Props> = ({ balances, type }: Props) => {
  const theme = useTheme();
  const totalTableRowStyle = { color: '#FFF', fontWeight: 'bold' };

  const [open, setOpen] = useState<boolean>(false);
  const total = balances.reduce((acc, curr) => acc += curr.value, 0);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: theme.palette.primary.main }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={totalTableRowStyle}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={totalTableRowStyle}>{type}</TableCell>
        <TableCell sx={totalTableRowStyle} colSpan={5}>R$ {total.toFixed(2)}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}> Data </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {balances.map((balance) => (
                    <TableRow
                      key={balance.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell> {formatDate.format(new Date(balance.balanceDate))} </TableCell>
                      <TableCell component='th' scope='row'> R$ {balance.value.toFixed(2)} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
