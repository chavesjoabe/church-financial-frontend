import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Balance } from '../../models/balance.models';

type Props = {
  balance: Balance;
  handleClose: () => void;
  open: boolean;
  loading: boolean;
  handleOnClickApprove: (id: string) => void;
  handleOnClickRemove: (id: string) => void;
  modalType: 'reject' | 'approve' | null;
};

export const PendingBalanceModal: React.FC<Props> = ({
  balance,
  handleClose,
  open,
  loading,
  handleOnClickApprove,
  handleOnClickRemove,
  modalType,
}) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <Typography id='modal-modal-title' variant='h5' component='h2'>
          Tem certeza que deseja {modalType == 'approve' ? 'aprovar' : 'rejeitar'} o lançamento abaixo?
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                   <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Forma de pagamento
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Data do Lançamento
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={'teste'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  R$ {balance ? balance.value?.toFixed(2): ''}
                </TableCell>
                    <TableCell component='th' scope='row'>
                      {balance ? balance.incomingType : ''}
                    </TableCell>
                <TableCell>{balance ? balance.description : ''}</TableCell>
                <TableCell>{balance ? balance.balanceDate : ''}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          width='100%'
          marginTop='20px'
          display='flex'
          justifyContent='space-between'
        >
          <Button
            disabled={loading}
            variant='outlined'
            color='error'
            sx={{ marginTop: '20px' }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            variant='contained'
            sx={{ marginTop: '20px' }}
            onClick={() => modalType == 'approve' ? handleOnClickApprove(balance.id) : handleOnClickRemove(balance.id)}
          >
            {loading ? (
              <CircularProgress size='20px' />
            ) : (
              modalType == 'approve' ? 'Aprovar' : 'Rejeitar'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
