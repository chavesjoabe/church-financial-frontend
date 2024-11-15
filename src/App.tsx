import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { AuthProvider } from './context/LoginContext';
import { Home } from './components/Home/Home';
import { UrlConstants } from './constants/url.contants';
import { BalanceSuccess } from './components/BalanceSuccess/BalanceSuccess';
import { UserSuccess } from './components/UserSuccess/UserSuccess';
import SnackbarProvider from './providers/SnackbarProvider';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { UpdateUser } from './components/UpdateUser/UpdateUser';

function App() {

  return (
    <AuthProvider>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Header />
            <Routes>
              <Route path={UrlConstants.LOGIN} element={<Login />} />
              <Route path="/*" element={<ProtectedRoute component={Home} />} />
              <Route path={UrlConstants.HOME} element={<ProtectedRoute component={Home} />} />
              <Route path={UrlConstants.BALANCE_SUCCESS} element={<ProtectedRoute component={BalanceSuccess} />} />
              <Route path={UrlConstants.USER_SUCCESS} element={<ProtectedRoute component={UserSuccess} />} />
              <Route path={UrlConstants.USER_UPDATE} element={<ProtectedRoute component={UpdateUser} />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </SnackbarProvider>
    </ AuthProvider>
  )
}

export default App
