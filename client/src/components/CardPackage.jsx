import { Box, Button, Typography, useTheme } from '@mui/material';

import BedIcon from '@mui/icons-material/Bed';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPackage } from 'state';

const CardPackage = (props) => {
    const { imagem, destino, valorPassagem, hospedagem } = props.package;

    const imageBanner = {
        backgroundImage: `url(http://localhost:3001/assets/${imagem})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '250px',
        borderRadius: '10px'
    };

    const theme = useTheme();
    const blueColor = theme.palette.background.blue;


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButton = () => {
        dispatch(
            setPackage({ package: props.package })
        )
        navigate('/packages/cart')
    }

    return (
        <Box sx={{ width: '90%', height: 'auto', display: 'flex', flexDirection: 'column', borderRadius: '10px', marginTop: '10px', gap: '1rem', padding: '10px', color: blueColor, backgroundColor: 'white', boxShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            <Box sx={imageBanner} />
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Typography sx={{ fontSize: '20px' }}>Pacote para </Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{destino}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '0.3rem', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>a partir de </Typography>
                    <Typography sx={{ color: '#567ebb', fontWeight: 'bold', fontSize: '17px', textDecoration: 'line-through', fontStyle: 'italic' }}>R${valorPassagem + 152},00</Typography>
                </Box>
                <Typography sx={{ fontSize: '25px', fontWeight: 'bold', color: '#FF4500' }}>R${valorPassagem},00</Typography>
            </Box>
            <hr style={{ width: '100%' }} />
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><BedIcon />Hospedagem - {hospedagem.nomeLocal}</Typography>
            <Link to="/reserveAccommodation" state={{ hospedagem }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Mais informações sobre a hospedagem</Typography>
            </Link>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AirplaneTicketIcon />Voo ida e volta</Typography>
            <Button onClick={() => handleButton()} sx={{ backgroundColor: blueColor, color: 'white', border: `1px solid ${blueColor}`, '&:hover': { color: blueColor } }}>Comprar</Button>
        </Box>
    )
}

export default CardPackage;