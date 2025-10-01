import styled from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/theme';
import { Container, TextField, Button, Divider, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  background-color: #222c36;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
    rgb(0 0 0 / 50%) 0px 3px 4px -2px;
  width: 522px;
  height: 522px;
`;

const FormHeader = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`;

const FormSubHeader = styled.h2`
  color: rgb(145, 158, 171);
  line-height: 1.43;
  font-size: 0.875rem;
  margin: 1rem 0;
`;

const FormFooter = styled.h2`
  color: rgb(145, 158, 171);
  line-height: 1.43;
  font-size: 0.875rem;
  margin: 1rem 0;
  &:hover {
    cursor: pointer;
  }
`;

const FormInput = styled(TextField)`
  margin: 10px 0;
`;

const Loader = styled(CircularProgress)`
  margin: 0 auto;
`;

function NewTodo() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('');
  const [newTodoError, setNewTodoError] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('Something went wrong, please try again');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleSubmit = () => {
    setNewTodoError('');
    setSubmitError(false);

    if (!newTodo || newTodo.length < 3) {
      setNewTodoError('New todo is required, and it should be more than 3 characters');
      return;
    }

    setLoading(true);
    axios.post(
      'http://localhost:8080/api/v1/tasks',
      {
        item: newTodo,
        isCompleted: false,
        userID: user.id,
      },
      {
        headers: { Authorization: `Bearer ${user.access_token}` },
      }
    )
    .then(() => {
      setLoading(false);
      navigate('/todo'); // React Router v6
    })
    .catch((err) => {
      setLoading(false);
      if (err.response) {
        setSubmitErrorMessage(err.response.data.message);
      }
      setSubmitError(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <LoginContainer>
          <LoginFormContainer>
            <FormHeader data-testid="header">Create a new Todo</FormHeader>
            <FormSubHeader data-testid="sub-header">
              Ready to mark some Todos as completed?
            </FormSubHeader>

            <FormInput
              required
              label="Todo Item"
              variant="outlined"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              error={!!newTodoError}
              helperText={newTodoError}
              inputProps={{ 'data-testid': 'new-todo' }}
            />

            {loading ? (
              <Loader />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                data-testid="submit-newTask"
              >
                Create Todo
              </Button>
            )}

            {submitError && (
              <Alert severity="error" data-testid="error-message">
                {submitErrorMessage}
              </Alert>
            )}

            <Divider light />

            <FormFooter onClick={() => navigate('/todo')} data-testid="back">
              Go back to your Todos
            </FormFooter>
          </LoginFormContainer>
        </LoginContainer>
      </Container>
    </ThemeProvider>
  );
}

export default NewTodo;
