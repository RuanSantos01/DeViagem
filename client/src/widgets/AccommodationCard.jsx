import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react'
import StarRating from './StarRating';

const AccommodationCard = (props) => {
    const { image, nomeLocal, localizacao, tipoQuarto, capacidade, tempoCapacidade, valor, adicional } = props.cards;
    const diffDays = props.diffDays;
    const handleSelection = props.handleSelection;
    const isSelected = props.isSelected;
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const handleButtonClick = () => {
        console.log(isSelected)
        if (!isSelected) {
            handleSelection(props)
        }
    }

    const backgroundAccommodation = {
        backgroundImage: `url(http://localhost:3001/assets/${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: "25%",
        borderRadius: '15px'
    }

    return (
        <Box sx={{ width: '100%', height: '300px', border: `1px solid ${'#BFD3F1'}`, backgroundColor: 'white', borderRadius: '15px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItens: 'center' }}>
            <Box style={backgroundAccommodation}></Box>
            <Box sx={{ width: '52%', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: '#567EBB', fontSize: '36px', fontWeight: 'bold' }}>{nomeLocal}</Typography>
                    <Typography sx={{ color: '#567EBB', fontSize: '20px' }}>{localizacao}</Typography>
                </Box>
                <Box sx={{ color: "#567EBB" }}>
                    <Typography sx={{ fontSize: '20px' }}>{adicional}</Typography>
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{tipoQuarto}</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}> - </Typography>
                        <Typography sx={{ fontSize: '20px' }}>{capacidade}</Typography>
                    </Box>
                </Box>
            </Box >

            <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ height: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'end' }}><StarRating rating={4} /></Box>
                <Box sx={{ display: ' flex', textAlign: 'end', flexDirection: 'column', gap: '1rem' }}>
                    <Box>
                        <Typography sx={{ fontSize: '18px' }}>{tempoCapacidade}</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>R$ {valor * diffDays}</Typography>
                    </Box>

                    <Button onClick={handleButtonClick} disabled={isSelected} sx={{ backgroundColor: isSelected ? "#BFD3F1" : blueColor, color: 'white', height: '40px', '&:hover': { color: blueColor, border: `1px solid ${blueColor}` } }}>{isSelected ? "Escolhido" : "Escolho esse!"}</Button>

                </Box>
            </Box>
        </Box >
    )
}

export default AccommodationCard;