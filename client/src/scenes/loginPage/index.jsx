import React, { useState } from 'react'

import backgroundImgLogin from 'assets/background-login-cadastro.png';
import backgroundImgRegistro from 'assets/background-cadastro.png';
import FlexBetween from 'components/FlexBetween';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { useNavigate } from 'react-router-dom';

// ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// DATEPICKER
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";


const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("Email Inválido").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Senhas não coincidem").required("required"),
  gender: yup.string(),
  phone: yup.string().required("required"),
  birthDate: yup.date().required("Campo obrigatório")
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Email Inválido").required("Campo Obrigatório"),
  password: yup.string().required("Campo Obrigatório")
});

const initialValuesRegister = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  phone: "",
  birthDate: ""
};

const initialValuesLogin = {
  email: "",
  password: ""
};

const backgroundStyleLogin = {
  backgroundImage: `url(${backgroundImgLogin})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height: "100vh"
};

const backgroundStyleRegistro = {
  backgroundImage: `url(${backgroundImgRegistro})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height: "100vh"
};

const LoginPage = () => {
  const theme = useTheme();
  const blueColor = theme.palette.background.blue;
  const blueButton = theme.palette.background.button;

  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async(values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register", {
        method: "POST",
        body: formData
      }
    );

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if(savedUser) {
      setPageType("login")
    }
  }

  const login = async(values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(values)
      }
    );

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if(loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );
      navigate("/home")
    }
  };

  const handleFormSubmit = async(values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }
  

  return (
    <div style={isLogin ? (backgroundStyleLogin) : (backgroundStyleRegistro)}>
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>

        <FlexBetween 
        backgroundColor={blueColor}
        sx={{
          width: "600px",
          height: "650px",
          borderRadius: "25px",
          flexDirection: "column",
          p: "2rem 6%"
        }}
        >
          
          {isLogin && (
            <>
              <FlexBetween sx={{flexDirection: "column", gap: "1.5rem"}}>
                <AccountCircleIcon sx={{fontSize: "150px", color: "white"}} />
                <Typography fontWeight="bold" variant="h1" color="white">Bem vindos !</Typography>
              </FlexBetween>
            </>
          )}

          <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
          >
          {({
            values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm
          }) => (
            <form onSubmit={handleSubmit}>
              <FlexBetween
              flexDirection="column"
              width="25rem"
              mb="35px"
              height="30vh"
              p="1rem"
              >
                <Box sx={{display:"flex", gap: "1.5rem", flexDirection: "column", width: "100%"}}>
                  {isRegister && (
                    <>
                      <Typography alignSelf="center" fontWeight="bold" variant="h1" color="white">Cadastre-se</Typography>

                      <TextField
                      fullWidth
                      label="Nome Completo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      name="fullName"
                      error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                      variant="filled"
                      InputProps={{
                        style: { backgroundColor: "white"}
                      }}
                      InputLabelProps={{
                        style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                      }}
                      />
                    </>
                  )}

                  <TextField
                    fullWidth
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    variant="filled"
                    InputProps={{
                      style: { backgroundColor: "white"}
                    }}
                    InputLabelProps={{
                      style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    variant="filled"
                    InputProps={{
                      style: {backgroundColor: "white"}
                    }}
                    InputLabelProps={{
                      style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                    }}
                  />

                  {isRegister && (
                    <>
                      <TextField
                        fullWidth
                        label="Confirmar Senha"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                        variant="filled"
                        InputProps={{
                          style: { backgroundColor: "white"}
                        }}
                        InputLabelProps={{
                          style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                        }}
                      />
                      
                      <FormControl variant='filled'>
                        <InputLabel sx={{color: blueColor, fontWeight: "bold", fontSize:"1rem"}}>Sexo</InputLabel>
                        <Select
                          fullWidth
                          sx={{backgroundColor:"white", fontWeight: "bold", fontSize:"1rem",
                            "&:hover": {backgroundColor: "white", color: blueColor},
                            "& .MuiSelect-select": {backgroundColor: "white", borderRadius: "4px"},
                          }}
                          value={values.gender}
                          label="Sexo"
                          onChange={handleChange}
                          SelectDisplayProps={{
                            style: {
                              backgroundColor: 'white',
                              borderRadius: '4px'
                            }
                          }}
                          >
                            <MenuItem value={"m"}>Masculino</MenuItem>
                            <MenuItem value={"f"}>Feminino</MenuItem>
                            <MenuItem value={"n"}>Prefiro não dizer</MenuItem>
                        </Select>
                      </FormControl>
                    
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker/>
                      </LocalizationProvider>

                    </>
                  )}

                  {isLogin ? (
                  <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <Typography 
                    onClick={() => setPageType("register")}
                    sx={{
                      color: "white", fontWeight: "bold", "&:hover": {textDecoration: "underline", cursor: "pointer"
                    }}}>Cadastre-se aqui</Typography>

                    <Typography 
                    onClick={() => navigate("/forgotPassword")}
                    sx={{
                      color: "white", fontWeight: "bold", "&:hover": {textDecoration: "underline", cursor: "pointer"
                    }}}>Esqueci minha senha</Typography>
                  </Box>
                  ) : (
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <Typography 
                      onClick={() => setPageType("login")}
                      sx={{
                        color: "white", fontWeight: "bold", "&:hover": {textDecoration: "underline", cursor: "pointer"
                      }}}>Já possui conta? Entre aqui.</Typography>
                    </Box>
                  )}

                </Box>

                <Button
                fullWidth
                type="submit"
                sx={{
                  p: "1rem",
                  heigth: "85px",
                  backgroundColor: blueButton,
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { color: blueButton},
                }}
              >
                {isLogin ? "ENTRAR" : "REGISTER"}
              </Button>

              </FlexBetween>
            </form>
          )}

          </Formik>

        </FlexBetween>

      </Box>
    </div>
  )
}

export default LoginPage;