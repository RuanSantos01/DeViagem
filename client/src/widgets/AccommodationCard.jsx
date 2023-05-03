import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react'
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const AccommodationCard = (props) => {
    const { image, nomeLocal, localizacao, informacaoGeral, tipoQuarto, camas, avaliacao, tempoCapacidade, valor } = props.cards;
    const card = props.cards;
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const backgroundAccommodation = {
        backgroundImage: `url(http://localhost:3001/assets/${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: "25%",
        borderRadius: '15px'
    }

    return (
        <Box sx={{ width: '100%', height: '300px', border: '1px solid black', backgroundColor: 'white', borderRadius: '15px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItens: 'center' }}>
            <Box style={backgroundAccommodation}></Box>
            <Box sx={{ width: '52%', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: '#567EBB', fontSize: '36px', fontWeight: 'bold' }}>{nomeLocal}</Typography>
                    <Typography sx={{ color: '#567EBB', fontSize: '20px' }}>{localizacao}</Typography>
                </Box>
                <Box sx={{ color: "#567EBB" }}>
                    <Typography sx={{ fontSize: '20px' }}>{informacaoGeral}</Typography>
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{tipoQuarto}</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}> - </Typography>
                        <Typography sx={{ fontSize: '20px' }}>{camas}</Typography>
                    </Box>
                </Box>
            </Box >

            <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ height: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><StarRating rating={4} />
                    <Box sx={{ backgroundColor: blueColor, fontSize: '20px', color: 'white', width: '60px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', fontWeight: 'bold' }}>{avaliacao}</Box>
                </Box>
                <Box sx={{ display: ' flex', textAlign: 'end', flexDirection: 'column', gap: '1rem' }}>
                    <Box>
                        <Typography sx={{ fontSize: '18px' }}>{tempoCapacidade}</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>R$ {valor}</Typography>
                    </Box>
                    <Link to='/reserveAccommodation' state={{ card }}>
                        <Button sx={{ backgroundColor: blueColor, color: 'white', height: '40px', '&:hover': { color: blueColor, border: `1px solid ${blueColor}` } }}>Escolho esse!</Button>
                    </Link>
                </Box>
            </Box>
        </Box >
    )
}

export default AccommodationCard;