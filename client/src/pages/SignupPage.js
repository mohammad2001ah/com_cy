import styled from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/theme';
import { Container, TextField, Button, Divider, CircularProgress, Alert } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('Something went wrong, please try again');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Reset errors
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSubmitError(false);

    if (!firstName || firstName.length < 3) {
      setFirstNameError('First Name is required, and it should be more than 3 characters');
      return;
    }
    if (!lastName || lastName.length < 3) {
      setLastNameError('Last Name is required, and it should be more than 3 characters');
      return;
    }
    if (!emailReg.test(email)) {
      setEmailError('Please insert a correct email format');
      return;
    }
    if (!passwordReg.test(password)) {
      setPasswordError('Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Second password does not match the first password');
      return;
    }

    setLoading(true);

    axios.post(
      'http://localhost:8080/api/v1/users/register',
      { firstName, lastName, email, password }
    )
    .then((res) => {
      if (res.status === 201) {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setLoading(false);
        navigate('/todo'); // React Router v6
      }
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
        <FormWrapper>
          <FormContainer>
            <FormHeader>Register to Application</FormHeader>
            <FormSubHeader>Ready to mark some Todos as completed?</FormSubHeader>

            <FormInput
              required
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <FormInput
              required
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!lastNameError}
              helperText={lastNameError}
            />
            <FormInput
              required
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <FormInput
              required
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <FormInput
              required
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />

            {loading ? <Loader /> : 
              <Button variant="contained" color="primary" onClick={handleSubmit}>Signup</Button>
            }

            {submitError && <Alert severity="error">{submitErrorMessage}</Alert>}

            <Divider sx={{ my: 2 }} />

            <FormFooter onClick={() => navigate('/login')}>
              Do you have an account?
            </FormFooter>
          </FormContainer>
        </FormWrapper>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;

const FormWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  background-color: #222c36;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
              rgb(0 0 0 / 50%) 0px 3px 4px -2px;
  width: 522px;
  min-height: 522px;
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

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
