import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';

const FinalPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    // const isNonMobile = useMediaQuery("(min-width:600px)");

    const cart = useSelector((state) => state.cart);
    const paymentInformations = useSelector((state) => state.paymentInformations);

    const [codigo, setCodigo] = useState();

    const gerarCodigo = () => {
        let codigo = '#';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[randomIndex];
        }

        return codigo;
    }

    const imagemStyle = {
        backgroundImage: `url(http://localhost:3001/assets/${cart.imageQuarto})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        width: "100%",
        height: paymentInformations.qtdPagantes > 1 ? "38vh" : "49vh"
    };

    useEffect(() => {
        setCodigo(gerarCodigo());
        console.log(cart)
        console.log(paymentInformations)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", backgroundColor: '#DCE0E6' }}>
            <Navbar />

            <Box sx={{ borderRadius: '10px', width: '65%', padding: '30px', backgroundColor: 'white', height: '100%', margin: '10px', boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                <Typography sx={{ fontWeight: 'bold', color: blueColor, fontSize: '40px' }}>Sua reserva foi efetuada com sucesso.</Typography>
                <Typography sx={{ color: blueColor, fontSize: '20px' }}>Um email foi enviado para você contendo todas as informações.</Typography>


                {paymentInformations.qtdPagantes > 1 && (
                    <Box>
                        <hr style={{ width: '100%' }} />
                        <Typography sx={{ fontWeight: 'bold', color: blueColor, fontSize: '20px' }}>Código para os próximos pagantes: {codigo}</Typography>
                        <Typography sx={{ color: blueColor, fontSize: '17px' }}>Para utilizar esse código basta colocá-lo na parte superior do site</Typography>
                    </Box>
                )}

                <Box sx={{ width: '100%', height: 'auto', border: `2px solid ${blueColor}`, borderRadius: '10px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', padding: '20px' }}>
                    <Typography sx={{ fontWeight: 'bold', color: blueColor, fontSize: '25px' }}>Sobre sua reserva</Typography>

                    <Box sx={{ width: '100%', height: '55px', display: 'flex', color: blueColor, gap: '0.5rem', alignItems: 'center' }}>
                        <LocationOnIcon />
                        <Typography sx={{ fontSize: '16px' }}>{cart.nomeLocal},</Typography>
                        <Typography sx={{ fontSize: '16px' }}>{cart.localizacao}</Typography>
                    </Box>

                    <Box sx={{ width: '100%', height: '55px', display: 'flex', color: blueColor, gap: '1rem', alignItems: 'center' }}>
                        <CalendarMonthIcon sx={{ color: blueColor }} />
                        <Box>
                            <Typography sx={{ fontSize: '16px' }}>Check-in</Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{cart.startDate}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '16px' }}>Check-out</Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: "bold" }}>{cart.endDate}</Typography>
                        </Box>
                    </Box>

                    <Box sx={imagemStyle} />

                </Box>

                <Link to="/home">
                    <Button sx={{ width: '100%', backgroundColor: blueColor, textAlign: 'center', marginTop: '20px', color: 'white', border: `1px solid ${blueColor}`, '&:hover': { color: blueColor } }}>Voltar para o menu</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default FinalPage;