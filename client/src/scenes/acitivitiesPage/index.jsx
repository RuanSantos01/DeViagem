import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import PhoneInput from 'components/phoneInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ActivitesPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const user = useSelector((state) => state.user)

    const [value, setValue] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: {
            fullName: user.fullName,
            email: user.email,
            password: "",
            confirmPassword: "",
            gender: user.gender,
            phone: user.phone,
            birthDate: user.birthDate
        },
        onSubmit: values => {
            const obj = {
                _id: user._id,
                fullName: values.fullName,
                email: values.email,
                phone: values.phone
            }

            updateUser(obj);
        }
    })

    const handleChange = (e) => {
        formik.setFieldValue('phone', e)
    }

    const updateUser = async (data) => {

        const response = await fetch(
            'http://localhost:3001/auth/updateUser', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        )

        if (response.status !== 200) {
            alert('Erro ao alterar dados do usuário')
        } else {
            alert('Dados alterados com sucesso!')
        }
    }

    const updatePassword = async (data) => {
        const response = await fetch(
            'http://localhost:3001/auth/updatePassword', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (response.status === 505) {
            alert('Senha original informada está incorreta')
        } else if (response.status === 200) {
            alert('Senha alterada com sucesso!')
        } else {
            alert('Houve um erro ao atualizar sua senha')
        }
    }

    const formikPassword = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        onSubmit: values => {
            console.log(values)
            if (values.newPassword !== values.confirmNewPassword) {
                return alert('Senhas não coincidem')
            } else {
                const obj = {
                    ...values,
                    _id: user._id
                }

                updatePassword(obj)
            }

        }
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
    const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#DCE0E6' }}>
            <Navbar />

            <Box sx={{ width: '65%', height: '100%', marginTop: '20px', borderRadius: '10px', boxShadow: '0px 0px 5px rgba(0,0,0,0.4)', padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto', borderRadius: '10px', }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChangeTabs}
                        aria-label="Vertical tabs profile"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '25%' }}
                    >
                        <Tab label="Perfil" {...a11yProps(0)} sx={{ fontWeight: 'bold', color: blueColor }} />
                        <Tab label="Segurança" {...a11yProps(1)} sx={{ fontWeight: 'bold', color: blueColor }} />
                        <Tab label="Atividades" {...a11yProps(2)} sx={{ fontWeight: 'bold', color: blueColor }} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor, padding: '10px' }}>Atualize seus dados</Typography>
                        <form onSubmit={formik.handleSubmit} style={{ width: '200%', height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                                <TextField
                                    fullWidth
                                    label="Nome completo"
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => formik.setFieldValue('fullName', e.target.value)}
                                    value={formik.values.fullName}
                                    name="fullName"
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                    value={formik.values.email}
                                    name='email'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        disabled
                                        label="Data de Nascimento"
                                        value={moment(formik.values.birthDate)}
                                    />
                                </LocalizationProvider>

                                <PhoneInput handleChange={handleChange} value={formik.values.phone} />
                            </Box>

                            <Button type='submit' fullWidth sx={{ color: 'white', fontWeight: 'bold', height: '50px', backgroundColor: blueColor, border: `1px solid ${blueColor}`, '&:hover': { backgroundColor: 'white', color: blueColor } }}>ALTERAR DADOS</Button>

                        </form>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor, padding: '10px' }}>Atualize sua senha</Typography>
                        <form onSubmit={formikPassword.handleSubmit} style={{ width: '200%', height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', width: '90%' }}>

                                <FormControl sx={{ width: '50%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Digite sua senha</InputLabel>
                                    <OutlinedInput
                                        type={showPassword1 ? 'text' : 'password'}
                                        onChange={(e) => formikPassword.setFieldValue('password', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword1}
                                                    edge="end"
                                                >
                                                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>


                                <FormControl sx={{ width: '50%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Digite sua nova senha</InputLabel>
                                    <OutlinedInput
                                        type={showPassword2 ? 'text' : 'password'}
                                        onChange={(e) => formikPassword.setFieldValue('newPassword', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword2}
                                                    edge="end"
                                                >
                                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', width: '90%' }}>

                                <FormControl sx={{ width: '50%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Digite sua nova senha novamente</InputLabel>
                                    <OutlinedInput
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => formikPassword.setFieldValue('confirmNewPassword', e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>


                                <Button type='submit' sx={{ width: '50%', color: 'white', fontWeight: 'bold', height: '50px', backgroundColor: blueColor, border: `1px solid ${blueColor}`, '&:hover': { backgroundColor: 'white', color: blueColor } }}>CONFIRMAR ALTERAÇÃO</Button>
                            </Box>
                        </form>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor, padding: '10px' }}>Atividades realizadas no nosso sistema</Typography>
                    </TabPanel>
                </Box>
            </Box>

        </Box>
    )
}

export default ActivitesPage;
