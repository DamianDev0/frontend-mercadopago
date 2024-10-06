import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/public/Login.page';
import { RegisterPage } from './pages/public/Register.page';
import { DashboardPage } from './pages/private/Dashboard';
import ProtectedRoute from './auth/protect-routes'; // Asegúrate de importar tu componente ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
