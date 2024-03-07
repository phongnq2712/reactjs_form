import React, { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import './App.css';
import logo from './images/logo.png';
import { Box, CssBaseline, Divider, useMediaQuery, Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import Alert from '@mui/material/Alert';
import { createUser } from './postapi'; 

import { FieldElements, ButtonElements } from './RegistrationForm'

const theme = createTheme({
  palette: {
    primary: {
      main: '#127C95',
    },
  },
});

const App = () => {
  const [submissionResult, setSubmissionResult] = useState(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSubmissionResult(null);
    }, 4000);

    // Cleanup the timeout on component unmount or when submission result changes
    return () => clearTimeout(timeoutId);
  }, [submissionResult]);

  const form = useForm({
    defaultValues: {
      full_name: '',
      contact_number: '',
      day: '',
      month: '',
      year: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: async ({ value }) => {
      const payload = {
        full_name: value.full_name,
        contact_number: value.contact_number,
        email: value.email,
        password: value.password,
        confirm_password: value.confirm_password,
        birth_date: `${value.year}-${value.month}-${value.day}`,
      }

      const data = await createUser(payload)
      setSubmissionResult(data)
    },
  })
  const matches = useMediaQuery('(min-width: 600px)');

  return (
    <form.Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="banner">
          <img src={logo} alt="logo" />
        </Box>
        <Box marginTop={8}>
          <Container maxWidth="sm">
            <h2>Create User Account</h2>
          </Container>
        </Box>
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}>
          {matches ? (
            <Container maxWidth="sm">
              <Paper className="paper" elevation={6} >
                <FieldElements form={form} />
              </Paper>
            </Container>
          ) :
            <>
              <Divider />
              <Container maxWidth="sm">
                <FieldElements form={form} />
              </Container>
            </>
          }
          <Container
            maxWidth="sm"
            style={{
              position: matches ? "absolute" : "static",
              top: matches ? "200px" : "auto",
              right: matches ? "100px" : "auto",
            }}
          >
             {submissionResult && (
              <Alert
                icon={submissionResult.title === "Registration Error" ?
                  <CancelOutlined fontSize="inherit" /> :
                  <CheckCircleOutlineIcon fontSize="inherit" />}
                severity={submissionResult.title === "Registration Error" ? "error" : "success"}
                style={{ width: matches ? null : "100%", backgroundColor: "#CDFADC" }}
              >
                {submissionResult.description}
              </Alert>
            )}
            
          </Container>
          <Box marginTop={2}>
            {matches ?
              <ButtonElements form={form} />
              : (
                <Paper elevation={8}>
                  <ButtonElements form={form} />
                </Paper>
              )}
          </Box>
        </form>
      </ThemeProvider>
    </form.Provider >
  );
};

export default App;