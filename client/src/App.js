import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './router/Router';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
