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
import { User } from '../../models/user.models';

type Props = {
  user: User;
  handleClose: () => void;
  open: boolean;
  loading: boolean;
  handleOnClickUnactive: (id: string) => void;
  handleOnClickActive: (id: string) => void;
  modalType: 'active' | 'unactive' | null;
};

export const ActiveUnactiveUserModal: React.FC<Props> = ({
  user,
  handleClose,
  open,
  loading,
  handleOnClickActive,
  handleOnClickUnactive,
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
          Tem certeza que deseja {modalType == 'active' ? 'Ativar' : 'Inativar'}{' '}
          o usuário abaixo?
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Documento</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Função</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={'teste'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {user ? user.name : ''}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {user ? user.document : ''}
                </TableCell>
                <TableCell>{user ? user.role : ''}</TableCell>
                <TableCell>
                  {user ? (user.isActive ? 'ATIVO' : 'INATIVO') : ''}
                </TableCell>
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
            onClick={() =>
              modalType == 'active'
                ? handleOnClickActive(user.document)
                : handleOnClickUnactive(user.document)
            }
          >
            {loading ? (
              <CircularProgress size='20px' />
            ) : modalType == 'active' ? (
              'Ativar'
            ) : (
              'Inativar'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
