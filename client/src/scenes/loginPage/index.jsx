import React, { useState } from 'react'

import backgroundImgLogin from 'assets/background-login-cadastro.png';
import backgroundImgRegistro from 'assets/background-cadastro.png';
import FlexBetween from 'components/FlexBetween';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { useNavigate } from 'react-router-dom';
import TextMask from 'react-text-mask';

// ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// DATEPICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


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

const phoneMask = ['(',/[1-9]/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

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
      dispatch(
        setLogin({
          user: savedUser
        })
      )
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
    console.log(values)
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
        overflow: "hidden",
      }}>

        <FlexBetween 
        backgroundColor={blueColor}
        sx={{
          width: isNonMobile ? "600px" : "370px",
          height: "auto" ,
          borderRadius: "25px",
          flexDirection: "column",
          p: "2rem 6%",
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
              alignItems="center"
              width={isNonMobile ? "400px" : "100%"}
              height="100%"
              p="1rem"
              >
                <Box sx={{display:"flex", gap: "1.5rem", flexDirection: "column", width: isNonMobile ? "100%" : "20rem"}}>
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
                        style: { backgroundColor: "white", borderRadius: "4px"}
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
                      style: { backgroundColor: "white", borderRadius: "4px"}
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
                      style: {backgroundColor: "white", borderRadius: "4px"}
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
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                        variant="filled"
                        InputProps={{
                          style: { backgroundColor: "white", borderRadius: "4px"}
                        }}
                        InputLabelProps={{
                          style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                        }}
                      />
                      
                      <FormControl variant='filled'>
                        <InputLabel sx={{color: blueColor, fontWeight: "bold", fontSize:"1rem"}}>Sexo</InputLabel>
                        <Select
                          fullWidth
                          sx={{
                            "&:hover": {backgroundColor: "white", color: blueColor},
                            "& .MuiSelect-select": {backgroundColor: "white"},
                          }}
                          value={values.gender}
                          label="Sexo"
                          onChange={(value) => setFieldValue("gender", value.target.value)}
                          SelectDisplayProps={{
                            style: {
                              backgroundColor: 'white',
                              borderRadius: '4px'
                            }
                          }}
                          >
                            <MenuItem value="masculino">Masculino</MenuItem>
                            <MenuItem value="feminino">Feminino</MenuItem>
                            <MenuItem value="prefiro nao dizer">Prefiro não dizer</MenuItem>
                        </Select>
                      </FormControl>
                    
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField 
                          label="Data de Nascimento"
                          format="DD/MM/YYYY"
                          name="birthDate"
                          variant="filled"
                          inputFormat="DD/MM/YYYY"
                          value={values.birthDate}
                          onChange={(value) => setFieldValue("birthDate", value)}
                          maxDate={dayjs()}
                          TextFieldComponent={TextField}
                          sx={{
                            backgroundColor:"white",
                            "&:hover": {backgroundColor: "white", color: blueColor},
                            "& .MuiInput-root": {color: blueColor, borderRadius: "4px"},
                            "& .MuiFormLabel-root": {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                          }}
                        />
                      </LocalizationProvider>

                      <TextField
                        fullWidth
                        label="Telefone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        name="phone"
                        error={Boolean(touched.phone) && Boolean(errors.phone)}
                        variant="filled"
                        InputProps={{
                          style: { backgroundColor: "white", borderRadius: "4px"},
                          inputComponent: TextMask,
                          inputProps: {
                            mask: phoneMask,
                            autoComplete: "off",
                            autoCorrect: "off",
                            spellCheck: "false"
                          }
                        }}
                        InputLabelProps={{
                          style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
                        }}
                      />

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
                        color: "white", mb: "1rem", fontWeight: "bold", "&:hover": {textDecoration: "underline", cursor: "pointer"
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
                {isLogin ? "ENTRAR" : "REGISTRAR"}
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