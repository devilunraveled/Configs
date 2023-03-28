// import 'react-phone-input-2/lib/style.css'
import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'material-ui-phone-number';
import * as valid from '../Validation/SignUpValidation'

function Copyright(props) {
  return (
    <Typography variant="body2" color="inherit" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        Greddiit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const SignUp = ({switchTab}) => {
    
  const theme = useTheme();
  
  const [formData,setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    userId: '',
    email: '',
    password: '', 
  });
  const [validForm, setValidForm] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };
 
  function handleChange(event){
    const { name, value } = event.target;
    setFormData( prevState => ( {...prevState, [name] : value }));
  }
   
  function validFormEntryForSignUp( formData ){
    if ( valid.validNameForSignUp( formData.firstName, formData.lastName ) && valid.validUserIdForSignUp( formData.user) && valid.validEmailForSignUp(formData.email) && valid.validPasswordForSignUp(formData.password) && valid.validPhoneNumberForSignUp( formData.phoneNumber ) && valid.validUserAgeForSignUp( formData.age ) )
      return true;
    else
      return false;
  }

  useEffect( () => {
      if ( validFormEntryForSignUp( formData ) ){
          setValidForm(true);
      } else {
          setValidForm(false);
      }
  }, [formData] );

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, backgroundColor: theme.palette.background.default }}>
            <SensorOccupiedIcon color='inherit'/>
          </Avatar>
          <Typography component="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>   
                <TextField
                  id="standard-number"
                  label="Age"
                  type="number"
                  required
                  name="age"
                  InputLabelProps={{
                  shrink: true,
                  }}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPhoneNumber
                    variant="outlined"
                    defaultCountry={'in'}
                    regions={'asia'}
                    required
                    label="Mobile Number"
                    onChange={ (e) => setFormData( prevState => ( {...prevState, ['phoneNumber'] : e })) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="User Name"
                  name="userId"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive spam."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {!validForm}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => switchTab(1)} variant="body2">
                    {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
