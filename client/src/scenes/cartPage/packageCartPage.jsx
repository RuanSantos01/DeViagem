import { Box, Typography, useTheme } from '@mui/material';
import ImageGalleryElastic from 'components/ImageGalleryElastic';
import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import HotelIcon from '@mui/icons-material/Hotel';
import AccommodationCard from 'widgets/AccommodationCard';
import { useState } from 'react';

const PackageCartPage = () => {

    const packages = useSelector((state) => state.package);

    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const monthNames = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const startDate1 = new Date(packages.dataIda);
    const dayStartDate = startDate1.getDate();
    const monthIndexStartDate = startDate1.getMonth();
    const monthNameStartDate = monthNames[monthIndexStartDate];
    const formattedStartDate = `${dayStartDate} de ${monthNameStartDate}`;

    const endDate1 = new Date(packages.dataVolta);
    const dayEndDate = endDate1.getDate();
    const monthIndexEndDate = endDate1.getMonth();
    const monthNameEndDate = monthNames[monthIndexEndDate];
    const formattedEndDate = `${dayEndDate} de ${monthNameEndDate}`;

    const timeDiff = Math.abs(startDate1.getTime() - endDate1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const [selectedCard, setSelectedCart] = useState(null);
    const handleSelection = (e) => {
        setSelectedCart(e)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#E6ECF5' }}>
            <Navbar />

            <ImageGalleryElastic images={packages.imagens} />
            <Box sx={{ width: '80%', marginTop: '30px', display: 'flex', height: '100%', minHeight: '90vh', justifyContent: 'space-between' }}>

                <Box sx={{ width: '70%', marginTop: '15px', backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '2px 2px 2px rgba(0,0,0,0.5)', color: blueColor, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '35px' }}>Pacote para {packages.destino}</Typography>

                    <Box sx={{ display: 'flex', gap: '0.5rem', border: `1px solid ${blueColor}`, width: '100%', borderRadius: '10px', padding: '10px' }}>
                        <Typography sx={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CalendarMonthIcon />{formattedStartDate} - {formattedEndDate}</Typography>
                        <Typography sx={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><PersonIcon />Viagem para 2 pessoas</Typography>
                    </Box>


                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 'bold', fontSize: '20px' }}><DoneIcon />Este pacote inclui</Typography>
                    <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', borderRadius: '10px', padding: '15px', flexDirection: 'column', border: `1px solid ${blueColor}` }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}><AirplaneTicketIcon />Voo - Operador por <strong>{packages.aviadora}</strong></Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}> <strong>Ida</strong> {formattedStartDate} às {packages.horaIda}</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}> <strong>Volta</strong> {formattedEndDate} às {packages.horaVolta}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', borderRadius: '10px', padding: '15px', flexDirection: 'column', border: `1px solid ${blueColor}` }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}><HotelIcon />Hospedagem - <strong>{diffDays} diária(s)</strong></Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {packages.hospedagem.quartos.map((h) => (
                                <AccommodationCard
                                    key={h.id}
                                    cards={h}
                                    diffDays={diffDays}
                                    handleSelection={handleSelection}
                                    isSelected={h.id === selectedCard?.cards.id}>
                                </AccommodationCard>
                            ))}
                        </Box>
                    </Box>

                </Box>

                <Box sx={{ width: '28%', marginTop: '15px', backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '2px 2px 2px rgba(0,0,0,0.5)', color: blueColor, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '35px' }}>Resumo</Typography>
                </Box>

            </Box>

        </Box>
    )
}

export default PackageCartPage;