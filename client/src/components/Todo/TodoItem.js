import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Checkbox, IconButton } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
// No additional imports are needed for the refactor as the code already uses @mui/material and @mui/icons-material.
// The code is already updated to use styled-components for styling instead of @material-ui/styles.
const TodoItem = (props) => {
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(props.todo.isCompleted);

  const handleUpdate = () => {
    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/v1/tasks/${props.todo._id}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
      data: {
        item: props.todo.item,
        isCompleted: !checked,
        userID: user.id,
      },
    }).then(() => {
      setChecked(!checked);
    });
  };

  const handleDelete = () => {
    props.handleDelete(props.todo._id);
  };

  return (
    <TodoItemContainer checked={checked} data-testid="todo-item">
      <Checkbox
        name="checked"
        onChange={handleUpdate}
        checked={checked}
        inputProps={{ 'data-testid': 'complete-task' }}
      />
      <FormSubHeader data-testid="todo-text" checked={checked}>
        {props.todo.item}
      </FormSubHeader>
      <DeleteContainer>
        <IconButton data-testid="delete" aria-label="delete" onClick={handleDelete}>
          <DeleteForeverTwoToneIcon color="action" fontSize="small" />
        </IconButton>
      </DeleteContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;

const FormSubHeader = styled.h2`
  color: rgb(145, 158, 171);
  line-height: 1.43;
  font-size: 0.875rem;
  margin: 1rem 0;
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
`;

const TodoItemContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.checked ? '#214C61' : '#3f51b5')};
  border-radius: 16px;
  padding: 5px 30px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  &:last-of-type {
    margin-bottom: 100px;
  }
`;

const DeleteContainer = styled.div`
  margin-left: auto;
`;
