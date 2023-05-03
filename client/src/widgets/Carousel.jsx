import { Box, Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import bannerRioDeJaneiro from 'assets/rio-de-janeiro.png';
import bannerLondres from 'assets/londres.png';
import bannerParis from 'assets/paris.png';
import bannerBarcelona from 'assets/barcelona.png';
import Card from './Card';

const pacotes = [
    { titulo: 'Rio de Janeiro', descricao: '1 de abril - 10 de abril, 2023.', imagem: bannerRioDeJaneiro, valor: '500' },
    { titulo: 'Londres', descricao: '20 de setembro - 24 de setembro, 2023.', imagem: bannerLondres, valor: '1000' },
    { titulo: 'Paris', descricao: '16 de outubro, 2023 - 21 de outubro, 2023.', imagem: bannerParis, valor: '1200' },
    { titulo: 'Barcelona', descricao: '5 de janeiro, 2024 - 10 de janeiro, 2023.', imagem: bannerBarcelona, valor: '700' },
]

export default function Carousel() {
    const isNonMobile = useMediaQuery("(min-width:650px)");
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex(currentIndex === pacotes.length - 1 ? 0 : currentIndex + 1);
    };

    const handlePrev = () => {
        setCurrentIndex(currentIndex === 0 ? pacotes.length - 1 : currentIndex - 1);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1.4rem' }}>
            <Button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                sx={{
                    fontSize: '70px',
                    color: 'white'
                }}>&#129168;
            </Button>

            {isNonMobile ? (
                <>
                    {pacotes.slice(currentIndex, currentIndex + 3).map((item) => (
                        <Card titulo={item.titulo} descricao={item.descricao} imagem={item.imagem} valor={item.valor}></Card>
                    ))}
                </>

            ) : (
                <>
                    {pacotes.slice(currentIndex, currentIndex + 1).map((item) => (
                        <Card titulo={item.titulo} descricao={item.descricao} imagem={item.imagem} valor={item.valor}></Card>
                    ))}
                </>
            )}


            <Button
                disabled={isNonMobile ? currentIndex === pacotes.length - 3 : currentIndex === pacotes.length - 1}
                onClick={handleNext}
                sx={{
                    fontSize: '70px',
                    color: 'white'
                }}>&#129170;
            </Button>
        </Box>
    );
};