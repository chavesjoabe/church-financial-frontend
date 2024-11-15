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
import { balanceDescriptionMapper, getFriendlyName, incomingTypeMapper } from '../../helpers/friendlyNames.helper';

type Props = {
  type: 'incoming' | 'outgoing';
  handleClose: () => void;
  open: boolean;
  balanceEntryValue: number;
  incomingType: string;
  description: string;
  balanceEntryDay: string;
  loading: boolean;
  handleOnClick: () => void;
};

export const IncomingOutgoingModal: React.FC<Props> = ({
  type,
  handleClose,
  open,
  balanceEntryDay,
  balanceEntryValue,
  incomingType,
  loading,
  description,
  handleOnClick,
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
          Confira os dados do lançamento:
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                {
                  type === 'incoming'
                  ? <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                  : ''
                }
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
                  R$ {balanceEntryValue?.toFixed(2)}
                </TableCell>
                {
                  type === 'incoming'
                    ? <TableCell component='th' scope='row'>
                      {getFriendlyName(incomingType, incomingTypeMapper)}
                    </TableCell>
                    : ''
                }
                <TableCell>{getFriendlyName(description, balanceDescriptionMapper)}</TableCell>
                <TableCell>{balanceEntryDay}</TableCell>
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
            onClick={handleOnClick}
          >
            {loading ? (
              <CircularProgress size='20px' />
            ) : (
              'Enviar para aprovação'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
