  import React, { useEffect, useState } from "react";
  import { checkUser, createUser } from "./AuthService";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';
  import Grid from '@mui/material/Grid';
  import Box from '@mui/material/Box';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import Typography from '@mui/material/Typography';
  import Container from '@mui/material/Container';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  
  const defaultTheme = createTheme();
  
  // Define the initial state for the newUser form outside the component
  const initialNewUserState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contr_uid: ""
  };
  
  const AuthRegister = () => {
    const navigate = useNavigate();
    // Use the initialNewUserState for the newUser state
    const [newUser, setNewUser] = useState(initialNewUserState);
  
    const [add, setAdd] = useState(false);
  
    useEffect(() => {
      const checkAuthentication = async () => {
        const isLoggedIn = await checkUser();
        if (isLoggedIn) {
          navigate("/main");
        }
      };
      checkAuthentication();
    }, [navigate]);
  
    useEffect(() => {
      if (add) {
        createUser(newUser).then((userCreated) => {
          if (userCreated) {
            alert(`${userCreated.get("firstName")}, you have successfully registered!`);
            setNewUser(initialNewUserState); // Reset newUser state to initial state using the const defined outside the component
            navigate("/main");
          }
          setAdd(false);
        });
      }
    }, [newUser, add, navigate]);
  
    const onChangeHandler = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      setNewUser({
        ...newUser,
        [name]: value
      });
    };
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      setAdd(true);
    };

  // Material UI used to improve the look of the Register page
  return (
  
  <ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={newUser.firstName}
                onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={newUser.lastName}
                  onChange={onChangeHandler}
                />
              </Grid>
           <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={newUser.email}
          onChange={onChangeHandler}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={newUser.password}
                onChange={onChangeHandler}
        />
        <TextField
          required
          fullWidth
          name="contr_uid"
          label="UID"
          type="text"
          id="contr_uid"
          autoComplete="new-UID"
          value={newUser.contr_uid}
                onChange={onChangeHandler}
        />
</Grid>
</Grid> 
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <RouterLink to="/auth/login" variant="body2">
              {"Already have an account? Log In"}
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
</ThemeProvider>
);
};

export default AuthRegister;
