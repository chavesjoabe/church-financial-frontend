import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../models/user.models';
import { CheckCircle } from '@mui/icons-material';
import { UrlConstants } from '../../constants/url.contants';

export const UserSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const createdUser = location.state as User;

  const handleOnClick = () => {
    return navigate(UrlConstants.HOME);
  }

  return (
    <Box
      width='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Card elevation={24} sx={{
        width: '650px',
        marginTop: '40px',
        padding: '10px'
      }}>
        <CardContent sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <CheckCircle color='success' sx={{ marginTop: '20px', fontSize: '50px' }} />
          <Typography
            marginTop='20px'
            marginBottom='20px'
          >
            Usuário {createdUser.name} com o documento {createdUser.document} foi criado com sucesso
          </Typography>
        </CardContent>
        <CardActions sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button onClick={handleOnClick} variant='contained' color='primary'>
            Retornar para a página inicial
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
