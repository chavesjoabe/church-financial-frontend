import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { UrlConstants } from "../../constants/url.contants";
import { UserService } from "../../services/UserService/user.service";
import { useSnackbar } from "../../providers/SnackbarProvider";

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [document, setDocument] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorOnDocumentOrPassword, setErrorOnDocumentOrPassword] = useState<boolean>(false);
  const { setLoggedUser, setToken } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnChangeDocument = (event: ChangeEvent<HTMLInputElement>) => {
    setDocument(event.target.value)
  }

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      setErrorOnDocumentOrPassword(false);
      if (!document || !password) {
        const snackbarMessage: string = 'É NECESSÁRIO PREENCHER TODOS OS CAMPOS';
        showSnackbar(snackbarMessage, 'error');
        return;
      }

      setLoading(true);

      const token = await UserService.login(document, password);

      if (!token) {
        console.log('teste');
        setErrorOnDocumentOrPassword(true);
        return;
      }

      setToken(token);

      const userDetails = await UserService.getUserByDocument(document, token);

      setLoggedUser(JSON.stringify(userDetails));

      setLoading(false);
      navigate(UrlConstants.HOME);
    } catch (error) {
      const errorMessage = 'ERRO AO TENTAR FAZER O LOGIN'
      console.error(errorMessage, error);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleOnClickClear = () => {
    setDocument('');
    setPassword('');
  }

  return (
    <Box
      width='100%'
      display='flex'
      alignItems='center'
      alignContent='center'
      justifyContent='center'
      marginTop='50px'
    >
      <Card elevation={24} sx={{ width: '80%', maxWidth: 800 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h5' fontWeight='bold' marginTop='20px'>
            BEM VINDO
          </Typography>
          <Typography color='#8E918F'>
            Insira suas credenciais para o login
          </Typography>
          <Box
            width='100%'
            sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
            alignItems='center'
            justifyContent='center'
            marginTop='20px'
          >
            {
              errorOnDocumentOrPassword ?
              <Alert severity="error">
                Usuário ou senha incorretos
              </Alert>
              : ''
            }
            <div style={{ width: '75%' }}>
              <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-document">Documento</InputLabel>
                <FilledInput
                  required
                  id="outlined-adornment-document"
                  value={document}
                  onChange={handleOnChangeDocument}
                />
              </FormControl>
              <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <FilledInput
                  required
                  fullWidth
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={handleOnChangePassword}
                />
              </FormControl>
              <Box
                display='flex'
                justifyContent='space-between'
                width='100%'
                marginTop='30px'
              >
                <Button
                  disabled={loading}
                  variant='outlined'
                  color='error'
                  onClick={handleOnClickClear}
                >
                  Limpar
                </Button>
                <Button
                  variant='contained'
                  onClick={handleSubmit}
                >
                  {
                    loading
                      ? <CircularProgress size={20} color='inherit' />
                      : 'Login'
                  }
                </Button>
              </Box>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>

  )
}
