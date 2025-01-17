import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { User } from '../../models/user.models';
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService/user.service';
import { useAuth } from '../../context/LoginContext';
import { ActiveUnactiveUserModal } from './ActiveUnactiveUserModal';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useAuth();
  const token = getToken();

  const handleClose = () => setOpen(false);

  const handleOpen = (user: User, modalType: string) => {
    setModalType(modalType);
    setModalUser(user);
    setOpen(true)
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserService.findAllUsers(token!);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleOnClickActive = async (document: string) => {
    try {
      setLoading(true);
      await UserService.activeUser(document, token!);
      const newUserList: User[] | null =
        await UserService.findAllUsers(token!);

      if (!newUserList) {
        throw new Error('Error on get users');
      }

      setUsers(newUserList);
    } catch (error) {
      const errorMessage = `ERROR ON ACTIVE USER`;
      console.error(`${errorMessage} - ${error}`);
      // showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleOnClickUnactive = async (document: string) => {
    try {
      setLoading(true);
      await UserService.unactiveUser(document, token!);
      const newUserList: User[] | null =
        await UserService.findAllUsers(token!);

      if (!newUserList) {
        throw new Error('Error on get users');
      }

      setUsers(newUserList);
    } catch (error) {
      const errorMessage = `ERROR ON ACTIVE USER`;
      console.error(`${errorMessage} - ${error}`);
      // showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Box width='100%' height='100%'>
      <Card>
        <CardHeader title='Gerenciamento de usuários' />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Documento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Função</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {user ? user.name : ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {user ? user.document: ''}
                    </TableCell>
                    <TableCell>{user ? user.email: ''}</TableCell>
                    <TableCell>{user ? user.role : ''}</TableCell>
                    <TableCell>{user ? (user.isActive ? 'ATIVO' : 'INATIVO') : ''}</TableCell>
                    <TableCell>
                      <Box>
                        <IconButton
                          disabled={loading}
                          color='primary'
                          size='small'
                          aria-label='approve'
                          onClick={() => handleOpen(user, 'active')}
                        >
                          <Check color='primary' />
                        </IconButton>
                        <IconButton
                          disabled={loading}
                          color='error'
                          size='small'
                          aria-label='approve'
                          onClick={() => handleOpen(user, 'unactive')}
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
          <ActiveUnactiveUserModal
            user={modalUser!}
            open={open}
            handleClose={handleClose}
            loading={loading}
            handleOnClickActive={handleOnClickActive}
            handleOnClickUnactive={handleOnClickUnactive}
            modalType={modalType as "active" | "unactive" | null }
          />
        </CardContent>
      </Card>
    </Box>
  );
};
