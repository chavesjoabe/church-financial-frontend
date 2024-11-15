import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Balance } from '../../models/balance.models';
import { UrlConstants } from '../../constants/url.contants';
import { formatDate } from '../../helpers/date.helper';
import { CheckCircle } from '@mui/icons-material';
import { balanceDescriptionMapper, balanceStatusMapper, balanceTypeMapper, getFriendlyName } from '../../helpers/friendlyNames.helper';

export const BalanceSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const createdBalance = location.state as Balance;

  const handleOnClickButton = () => {
    return navigate(UrlConstants.HOME);
  };

  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      marginTop='40px'
    >
      <Paper
        sx={{
          maxWidth: '900px',
          minHeight: '300px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
        elevation={24}
      >
        <CheckCircle color='success' sx={{ fontSize: '60px' }} />
        <Typography variant='h6'> Lançamento criado com sucesso </Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={createdBalance.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  R$ {createdBalance.value.toFixed(2)}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {getFriendlyName(createdBalance.type, balanceTypeMapper)}
                </TableCell>
                <TableCell>{getFriendlyName(createdBalance.status, balanceStatusMapper)}</TableCell>
                <TableCell>{getFriendlyName(createdBalance.description, balanceDescriptionMapper)}</TableCell>
                <TableCell>
                  {formatDate.format(new Date(createdBalance.balanceDate))}
                </TableCell>
                <TableCell>{createdBalance.responsible}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box marginTop='20px' display='flex' flexDirection='row-reverse'>
          <Button variant='contained' onClick={handleOnClickButton}>
            Voltar para a tela inicial
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
