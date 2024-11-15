import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { UrlConstants } from '../../constants/url.contants';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { getToken, logout, getLoggedUser } = useAuth()
  const isLogged = getToken();
  const user = getLoggedUser()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleOnClickLogout = () => {
    logout();
    setAnchorEl(null);
    return navigate(UrlConstants.LOGIN);
  };

  const handleOnClickMyAccount = () => {
    setAnchorEl(null);
    return navigate(UrlConstants.USER_UPDATE);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='primary' position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ebenezer Tesouraria
          </Typography>
          {
            isLogged
              ? <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography>Olá, {user?.name}</Typography>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: '#fff' }}
                >
                  <AccountCircle />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleOnClickMyAccount}>Atualização de dados</MenuItem>
                  <MenuItem onClick={handleOnClickLogout}>Logout</MenuItem>
                </Menu>
              </Box>
              : ''
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
