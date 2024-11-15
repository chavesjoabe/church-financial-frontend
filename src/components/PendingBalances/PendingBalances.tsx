import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Balance } from '../../models/balance.models';
import { BalanceService } from '../../services/BalanceService/balance.service';
import { formatDate } from '../../helpers/date.helper';
import Check from '@mui/icons-material/Check';
import Delete from '@mui/icons-material/Delete';
import { useSnackbar } from '../../providers/SnackbarProvider';
import { useAuth } from '../../context/LoginContext';
import { PendingBalanceModal } from './PendingBalanceModal';
import { balanceDescriptionMapper, balanceStatusMapper, balanceTypeMapper, getFriendlyName } from '../../helpers/friendlyNames.helper';

export const PendingBalances: React.FC = () => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalBalance, setModalBalance] = useState<Balance | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  const handleOpen = (balance: Balance, modalType: string) => {
    setModalType(modalType);
    setModalBalance(balance);
    setOpen(true)
  };

  const { getToken } = useAuth();
  const token = getToken() || '';

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBalances = async () => {
      const response = await BalanceService.getAllPendingBalances(token);
      setBalances(response);
    };

    fetchBalances();
  }, []);


  const handleOnClickApprove = async (id: string) => {
    try {
      setLoading(true);
      await BalanceService.approveBalance(id, token);
      const pendingBalances: Balance[] | null =
        await BalanceService.getAllPendingBalances(token);

      if (!pendingBalances) {
        throw new Error('');
      }

      setBalances(pendingBalances);
    } catch (error) {
      const errorMessage = `ERROR ON APPROVE BALANCE`;
      console.error(`${errorMessage} - ${error}`);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleOnClickRemove = async (id: string) => {
    try {
      setLoading(true);
      await BalanceService.rejectBalance(id, token);
      const pendingBalances: Balance[] | null =
        await BalanceService.getAllPendingBalances(token);

      if (!pendingBalances) {
        throw new Error('');
      }

      setBalances(pendingBalances);
    } catch (error) {
      const errorMessage = `ERROR ON REMOVE BALANCE`;
      console.error(`${errorMessage} - ${error}`);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
      handleClose();
    }
  }

  return (
    <Box width='100%' height='100%'>
      <Card>
        <CardHeader title='Lançamentos Pendentes' />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Tipo de Lançamento
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Data do Lançamento
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
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
                      {getFriendlyName(balance.status, balanceStatusMapper)}
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
                    <TableCell>
                      <Box>
                        <IconButton
                          disabled={loading}
                          color='primary'
                          size='small'
                          aria-label='approve'
                          onClick={() => handleOpen(balance, 'approve')}
                        >
                          <Check color='primary' />
                        </IconButton>
                        <IconButton
                          disabled={loading}
                          color='error'
                          size='small'
                          aria-label='approve'
                          onClick={() => handleOpen(balance, 'reject')}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PendingBalanceModal
            balance={modalBalance}
            open={open}
            handleClose={handleClose}
            loading={loading}
            handleOnClickApprove={handleOnClickApprove}
            handleOnClickRemove={handleOnClickRemove}
            modalType={modalType}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
