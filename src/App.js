import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './lib/styles/styles.css';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
