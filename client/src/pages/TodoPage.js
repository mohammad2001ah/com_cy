import styled from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/theme';
import { Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import TodoItem from '../components/Todo/TodoItem';
import Pagination from '../components/Pagination';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  background-color: #222c36;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
              rgb(0 0 0 / 50%) 0px 3px 4px -2px;
  width: 522px;
  min-height: 522px;
  position: relative;
`;

const CreateNewTodoContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const FormHeader = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
`;

const FormSubHeader = styled.h2`
  color: rgb(145, 158, 171);
  line-height: 1.43;
  font-size: 0.875rem;
  margin-left: 10px;
`;

const getWelcome = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour <= 5) return 'Time to sleep';
  if (currentHour > 5 && currentHour <= 12) return 'Good morning';
  if (currentHour > 12 && currentHour <= 17) return 'Good afternoon';
  return 'Good Evening';
};

const getName = (name) => {
  if (!name || name.length < 2 || name.includes('@') || name.includes('.')) return 'user';
  return name;
};

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    axios.get('http://localhost:8080/api/v1/tasks', {
      headers: { Authorization: `Bearer ${user.access_token}` },
    })
    .then((res) => {
      setTodos(res.data.tasks.reverse());
    })
    .catch((err) => console.log(err.response));
  }, [user]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    }).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTodos = todos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (number) => setCurrentPage(number);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <PageWrapper>
          <PageContainer>
            <FormHeader>{`${getWelcome()} ${getName(user?.firstName)}`}</FormHeader>
            <CreateNewTodoContainer>
              <IconButton onClick={() => navigate('/todo/new')}>
                <AddIcon color="action" fontSize="small" />
              </IconButton>
              <FormSubHeader>Add a new Todo</FormSubHeader>
            </CreateNewTodoContainer>

            {currentTodos.map(todo => (
              <TodoItem key={todo._id} todo={todo} handleDelete={handleDelete} />
            ))}

            {!currentTodos.length && <h4>No Available Todos</h4>}

            {todos.length > postsPerPage && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={todos.length}
                paginate={paginate}
              />
            )}
          </PageContainer>
        </PageWrapper>
      </Container>
    </ThemeProvider>
  );
}

export default TodoPage;
