
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import backgroundImg from 'assets/background-confirme-email.png';
import FlexBetween from 'components/FlexBetween';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height: "100vh"
};

const codeSchema = yup.object().shape({
  code: yup.string().required("Campo obrigatório")
})

const initialValeusSendCode = { 
  code: ""
}

const ConfirmEmailPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const theme = useTheme();
  const blueColor = theme.palette.background.blue;
  const blueButton = theme.palette.background.button;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleCode = async(values, onSubmitProps) => {
    const body = {
      email: user.email,
      code: values.code
    }

    const codeSent = await fetch(
      "http://localhost:3001/auth/confirmAccount", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      }
    )

    const response = await codeSent.json();
    if(response.statusCode === 200) {
      navigate("/home")
    }
  }

  return (
    <div style={backgroundStyle}>
      <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: "100%"
      }}
      >

      <FlexBetween
      sx={{
        backgroundColor: blueColor,
        flexDirection: "column",
        width: isNonMobile ? "600px" : "370px",
        height: "auto",
        borderRadius: "25px",
        p: "2rem 5%",
        gap: "1rem"
      }}>

        <Typography fontWeight="bold" variant="h1" color="white">Confime seu email</Typography>
        <Typography color="white" textAlign="center">Verique seu email e coloque o código que foi enviado para validação</Typography>

        <Formik
        onSubmit={handleCode}
        initialValues={initialValeusSendCode}
        validationSchema={codeSchema}
        >
        {({
          values, errors, touched, handleBlur, handleChange, handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <FlexBetween
            flexDirection="column"
            alignItems="center"
            width={isNonMobile ? "400px" : "100%"}
            height="100%"
            gap="1rem"
            >
              <TextField
              fullWidth
              label="Código"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.code}
              name="code"
              error={Boolean(touched.code) && Boolean(errors.code)}
              variant="filled"
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "4px"}
              }}
              InputLabelProps={{
                style: {color: blueColor, fontWeight: "bold", fontSize: "1rem"}
              }}
              />


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
                  borderRadius: "4px"
                }}
              >
                Confirmar Código
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

export default ConfirmEmailPage;