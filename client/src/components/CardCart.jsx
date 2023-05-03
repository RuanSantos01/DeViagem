import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react'

import BedIcon from '@mui/icons-material/Bed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useLocation } from "react-router-dom";

const CardCart = (props) => {
    const { adults, onHandleAdults } = props;
    const { state } = useLocation();
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const backgroundAccommodation = {
        backgroundImage: `url(http://localhost:3001/assets/${state.quarto.image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: "20%",
        borderRadius: '20px',
        height: '200px'
    }

    return (
        <Box sx={{ width: '90%', backgroundColor: '#DCE0E6', borderRadius: '20px', height: 'auto', padding: '20px', display: 'flex', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)' }}>
            <Box style={backgroundAccommodation}></Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{state.quarto.nomeLocal}</Typography>
                <Typography sx={{ fontSize: '17px' }}>{state.quarto.localizacao}</Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BedIcon />{state.quarto.tipoQuarto}</Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CalendarMonthIcon />{state.quarto.data}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, padding: '20px', alignItems: 'flex-end', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '17px' }}>Quantos dias ficará hospedado?</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => { onHandleAdults(adults - 1) }} disabled={adults <= 1}><RemoveIcon sx={{ color: blueColor }} /></Button>
                    <Typography sx={{ fontWeight: 'bold' }}>{adults}</Typography>
                    <Button onClick={() => { onHandleAdults(adults + 1) }}><AddIcon sx={{ color: blueColor }} /></Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CardCart;