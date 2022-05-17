import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
