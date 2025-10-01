import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodo';
import { AuthContext } from '../context/AuthContext';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/todo" />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/todo" />} />
      <Route path="/todo/new" element={user ? <NewTodoPage /> : <Navigate to="/login" replace />} />
      <Route path="/todo" element={user ? <TodoPage /> : <Navigate to="/login" replace />} />
      <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/todo" />} />
    </Routes>
  );
};

export default AppRouter;
