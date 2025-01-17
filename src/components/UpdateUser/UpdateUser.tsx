import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { UrlConstants } from "../../constants/url.contants";
import { CreateUserPayload, UserService } from "../../services/UserService/user.service";

export const UpdateUser: React.FC = () => {
  const { getLoggedUser, getToken } = useAuth();
  const loggedUser = getLoggedUser();

  const [showPassword, setShowPassword] = useState(false);
  const [document, setDocument] = useState<string>(loggedUser!.document);
  const [name, setName] = useState<string>(loggedUser!.name);
  const [email, setEmail] = useState<string>(loggedUser!.email);
  const [password, setPassword] = useState<string>(loggedUser!.password);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = getToken();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnClickReturnToHome = () => {
    return navigate(UrlConstants.HOME);
  }

  const handleOnClickReset = () => {
    setDocument(loggedUser!.document);
    setEmail(loggedUser!.email);
    setPassword(loggedUser!.password);
    setName(loggedUser!.name);
  }

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      const updateUserPayload: CreateUserPayload = {
        document: document,
        name: name,
        email: email,
        password: password,
      };
      console.log(loading);

      await UserService.update(updateUserPayload, token!);
      navigate(UrlConstants.HOME);
    } catch (error) {
      const errorMessage = `ERROR ON UPDATE USER - ${error}`;
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
          <Typography variant='h6'>Atualize os dados do usuário</Typography>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-document">Documento</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-document"
              onChange={(event) => setDocument(event.target.value)}
              value={document}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginTop: '15px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
            <FilledInput
              required
              id="outlined-adornment-email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
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
              onChange={(event) => setPassword(event.target.value)}
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
            />
          </FormControl>
        </CardContent>
        <CardActions sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button onClick={handleOnClickReturnToHome} variant='contained' color='primary'>
            Retornar para a página inicial
          </Button>
          <Button onClick={handleOnClickReset} variant='outlined' color='error'>
            Resetar valores
          </Button>
          <Button onClick={handleOnSubmit} variant='contained' color='primary'>
            Atualizar
          </Button>
        </CardActions>
      </Card>
    </Box>

  )
}
