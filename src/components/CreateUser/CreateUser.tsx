import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ErrorIcon from '@mui/icons-material/Error';
import { CreateUserPayload, UserService } from "../../services/UserService/user.service";
import { UrlConstants } from "../../constants/url.contants";
import { useAuth } from "../../context/LoginContext";

export const CreateUser: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading] = useState<boolean>(false);
  const [userAlreadyExists] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const token = getToken() || '';

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleOnChangeDocument = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.replace(/\D/g, '');
    setDocument(event.target.value)
  }

  const handleOnChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.replace(/\D/g, '');
    setEmail(event.target.value)
  }

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleOnChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      const createUserPayload: CreateUserPayload = {
        name: username,
        email,
        document,
        role,
        password,
      }

      const createdUser = await UserService.createUser(createUserPayload, token);

      return navigate(UrlConstants.USER_SUCCESS, { state: createdUser });
    } catch (error) {
      console.error('Error on create user', error);
      window.alert('Error');
    }
  }

  const handleOnClickClear = () => {
    setUsername('');
    setPassword('');
    setDocument('');
    setRole('');
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
        <CardHeader
          title='Criação de um novo usuário'
        />
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '30px',
          paddingRight: '30px'
        }}>
          <Typography variant='h5' >
            Dados do usuário
          </Typography>
          <Typography color='#8E918F'>
            Insira abaixo os dados do novo usuário
          </Typography>
          <Box
            width='100%'
            alignItems='center'
            justifyContent='center'
            marginTop='20px'
          >
            {
              userAlreadyExists ?
                <Alert
                  icon={<ErrorIcon fontSize="inherit" />}
                  severity="error"
                  sx={{ marginBottom: '20px' }}
                >
                  <Typography>
                    Já existe um usuário cadastrado com o CPF informado.
                  </Typography>
                </Alert>
                : ''
            }
            <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">Nome do usuário</InputLabel>
              <FilledInput
                required
                id="outlined-adornment-username"
                name="username"
                value={username}
                onChange={handleOnChangeUsername}
              />
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">Documento (CPF)</InputLabel>
              <FilledInput
                required
                id="outlined-adornment-document"
                name='document'
                value={document.replace(/\D/g, '').trim()}
                onChange={handleOnChangeDocument}
                inputProps={{ maxLength: 11 }}
              />
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <FilledInput
                required
                id="outlined-adornment-email"
                name='email'
                value={email}
                onChange={handleOnChangeEmail}
              />
            </FormControl>
            <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <FilledInput
                required
                fullWidth
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='password'
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
            <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
              <InputLabel id="demo-simple-select-label">Função</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='role'
                value={role}
                label="Age"
                variant="filled"
                onChange={handleOnChangeRole}
              >
                {
                  ['ADMIN', 'COMMON'].map(item => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))
                }
              </Select>
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
                disabled={loading}
                variant='contained'
                onClick={handleSubmit}
                type='submit'
              >
                {
                  loading
                    ? <CircularProgress size={20} color='inherit' />
                    : 'Criar Usuário'
                }
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>

  )
}

