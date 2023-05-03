import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

const Card = (props) => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const imagemStyle = {
        backgroundImage: `url(${props.imagem})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: "200px",
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        height: "200px"
    };

    return (
        <Box sx={{
            width: '200px',
            height: '420px',
            boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)",
            borderRadius: '10px',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
                backgroundColor: '#DCDCDC'
            }
        }}>
            <Box sx={{ display: 'flex', gap: '1.5rem', flexDirection: 'column', alignItems: 'center' }}>
                <Box style={imagemStyle}></Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                    <Typography sx={{ fontWeight: 'bold', color: blueColor, fontSize: '20px' }}>{props.titulo}</Typography>
                    <Typography sx={{ color: blueColor }}>{props.descricao}</Typography>
                </Box>
            </Box>

            <Box sx={{ width: '80%', paddingBottom: '10px' }}>
                <Typography sx={{ color: blueColor }}>Pacoter apartir de</Typography>
                <Box sx={{ color: blueColor, fontWeight: 'bold', display: 'flex', gap: '1rem' }}>
                    <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}> R$ {props.valor}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Card