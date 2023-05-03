import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import CalendarComp from "components/CalendarComp";
import { useFormik } from "formik";
import { useState } from "react";
import Navbar from "scenes/navbar";

const PaymentPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const inf = {
        adultos: 2
    }

    const formik = useFormik({
        initialValues: {
            nomeViajante1: '',
            sobrenomeViajante1: '',
            dataNascimentoViajante1: '',
            sexoViajante1: '',
            nomeViajante2: '',
            sobrenomeViajante2: '',
            dataNascimentoViajante2: '',
            sexoViajante2: ''
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    const [gender, setGender] = useState("");
    const handleGender = (e) => {
        setGender(e.target.value)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", backgroundColor: '#DCE0E6' }}>
            <Navbar />

            <Box sx={{ width: '65%', padding: '20px 0', backgroundColor: '#DCE0E6', display: 'flex', gap: isNonMobile ? '0px' : '1.5rem', flexDirection: isNonMobile ? 'row' : 'column', justifyContent: 'space-between', height: 'auto', margin: '10px' }}>

                <Box sx={{ width: isNonMobile ? '48%' : '100%', backgroundColor: 'white', height: '100vh', borderRadius: '20px', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '30px' }}>
                    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Typography sx={{ border: `2px solid ${blueColor}`, borderRadius: '50%', width: '30px', height: '30px', color: blueColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>1</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor }}>Viajantes</Typography>
                    </Box>
                    <hr style={{ width: '100%', color: blueColor }} />

                    <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Viajante 1 - Adulto</Typography>

                    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>

                        <TextField
                            sx={{ width: '100%' }}
                            label='Primeiro nome*'
                            name="primeiroNome"
                            InputProps={{
                                style: { backgroundColor: "white", borderRadius: "4px" },
                            }}
                            InputLabelProps={{
                                style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                            }}
                        />

                        <TextField
                            sx={{ width: '100%' }}
                            label='Ultimo sobrenome*'
                            name="ultimoSobrenome"
                            InputProps={{
                                style: { backgroundColor: "white", borderRadius: "4px" },
                            }}
                            InputLabelProps={{
                                style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                            }}
                        />


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CalendarComp />
                            <FormControl sx={{ width: '47%' }}>
                                <InputLabel id="demo-simple-select-label" sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Sexo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Age"
                                    onChange={handleGender}
                                >
                                    <MenuItem value='masculino' name='masculino'>Masculino</MenuItem>
                                    <MenuItem value='feminino' name='feminino'>Feminino</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {inf.adultos === 2 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Viajante 2 - Adulto</Typography>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label='Primeiro nome*'
                                    name="primeiroNome"
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />

                                <TextField
                                    sx={{ width: '100%' }}
                                    label='Ultimo sobrenome*'
                                    name="ultimoSobrenome"
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <CalendarComp />
                                    <FormControl sx={{ width: '47%' }}>
                                        <InputLabel id="demo-simple-select-label" sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Sexo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={gender}
                                            label="Age"
                                            onChange={handleGender}
                                        >
                                            <MenuItem value='masculino' name='masculino'>Masculino</MenuItem>
                                            <MenuItem value='feminino' name='feminino'>Feminino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        )}
                    </form>

                </Box>

                <Box sx={{ width: isNonMobile ? '48%' : '100%', backgroundColor: blueColor, height: '100vh', borderRadius: '20px', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>

                </Box>

            </Box>
        </Box>
    )
}

export default PaymentPage;