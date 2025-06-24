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
import { Tax } from '../../models/tax.models';
import { AccountingReportItem, TotalObject } from '../../models/balance.models';
import { useState } from 'react';

type Props = {
  balances: AccountingReportItem[];
  total: TotalObject;
  tax: Tax;
  type: string;
}

export const AccountingTransferGeolTable: React.FC<Props> = ({ balances, total, tax, type }: Props) => {
  const theme = useTheme();
  const totalTableRowStyle = { color: '#FFF', fontWeight: 'bold' };

  const [open, setOpen] = useState<boolean>(false);

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
        <TableCell sx={totalTableRowStyle} colSpan={5}>R$ {total.total.toFixed(2)}</TableCell>

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
                    <TableCell sx={{ fontWeight: 'bold' }}>% Pastor ({(tax.firstLeaderPercentage + tax.secondLeaderPercentage) * 100}%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>% Sede ({tax.mainChurchPercentage * 100}%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>% Ministério ({tax.ministryPercentage * 100}%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>% Apóstolo ({tax.mainLeaderPercentage * 100}%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {balances.map((balance) => (
                    <TableRow
                      key={balance.balanceId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell> {formatDate.format(new Date(balance.balanceDate))} </TableCell>
                      <TableCell component='th' scope='row'> R$ {balance.value.toFixed(2)} </TableCell>
                      <TableCell> R$ {(balance.churchFirstLeaderPercentage + balance.churchSecondLeaderPercentage).toFixed(2)}</TableCell>
                      <TableCell>R$ {balance.mainChurchPercentage.toFixed(2)}</TableCell>
                      <TableCell>R$ {balance.ministryPercentage.toFixed(2)}</TableCell>
                      <TableCell>R$ {balance.mainLeaderPercentage.toFixed(2)}</TableCell>
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
