import { Box, Breadcrumbs, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardCart from "components/CardCart";
import Navbar from "scenes/navbar";

import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    const [adults, setAdults] = useState(1);

    const { state } = useLocation();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleDiaries = (a) => {
        setAdults(a);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ width: '80%', padding: '30px 0px' }}>

                    <Breadcrumbs aria-label="breadcrumb" separator={isNonMobile ? "------------------------------------------------------------------------------------------------" : "-"} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontWeight: 'bold', color: blueColor, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircleOutlineIcon sx={{ color: 'white', width: '20px', backgroundColor: blueColor, borderRadius: '50%' }} />A sua seleção</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: blueColor, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Box sx={{ backgroundColor: blueColor, color: 'white', borderRadius: '50%', width: '20px', display: 'flex', justifyContent: 'center' }}>2</Box> Resumo da sua reserva</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: 'grey', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Box sx={{ backgroundColor: "#DCE0E6", color: 'white', borderRadius: '50%', width: '20px', display: 'flex', justifyContent: 'center' }}>3</Box>Pagamento</Typography>
                    </Breadcrumbs>

                    <Typography sx={{ fontSize: '40px', fontWeight: 'bold', color: blueColor, marginTop: '40px' }}>Resumo da sua reserva</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            <CardCart adults={adults} onHandleAdults={handleDiaries} />
                        </Box>

                        <Box sx={{ width: '23%', height: 'auto', backgroundColor: '#DCE0E6', borderRadius: '20px', boxShadow: '1px 2px 4px 0 rgba(0, 0, 0, 0.5)', padding: '20px', display: 'flex', flexDirection: 'column' }}>

                            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Resumo da compra</Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '17px' }}><PersonIcon />2 Adultos</Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '17px' }}><CalendarMonthIcon />{adults} Dias</Typography>
                            <hr style={{ width: '100%' }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BedIcon />Hotel</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>R$ {state.quarto.valor},0</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Taxas e impostos</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>R$ 0,0</Typography>
                            </Box>
                            <hr style={{ width: '100%' }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Valor Total</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>R$ {state.quarto.valor * adults},00</Typography>
                            </Box>

                            <Link to="/cart/checkout" state={state}>
                                <Button sx={{ backgroundColor: blueColor, color: 'white', width: '100%', padding: '10px', fontWeight: 'bold', fontSize: '15px', marginTop: '15px' }}>IR PARA O PAGAMENTO</Button>
                            </Link>
                        </Box>

                    </Box>

                </Box>
            </Box>

            <footer style={{ backgroundColor: '#DCE0E6', width: '100%', padding: '30px', boxShadow: '1px -2px 4px 0 rgba(0, 0, 0, 0.5)' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: blueColor }}>• Os serviços citados no resumo não estão reservados. A compra só será concluída após a confirmação de disponibilidade e de pagamento;</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: blueColor }}>• O valor da tarifa referente à criança é válido somente quando acompanhada de dois adultos pagantes no mesmo apartamento;</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: blueColor }}>• A tarifa poderá sofrer alteração caso haja indisponibilidade da opção selecionada;</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: blueColor }}>• Preços em Real (R$) convertido ao câmbio do dia, sujeito à alteração;</Typography>
            </footer>
        </Box>
    )
}

export default CartPage;