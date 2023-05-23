import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageGalleryElastic from 'components/ImageGalleryElastic';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import HotelIcon from '@mui/icons-material/Hotel';
import AccommodationCard from 'widgets/AccommodationCard';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCart, setPaymentInformation } from 'state';

const PackageCartPage = () => {
    const isNonMobile = useMediaQuery("(min-width:650px)");
    const packages = useSelector((state) => state.package);

    const theme = useTheme();
    const blueColor = theme.palette.background.blue;

    const [valorPassagem, setValorPassagem] = useState();
    const [valorFinal, setValorFinal] = useState(valorPassagem);

    const [selectedCard, setSelectedCart] = useState(null);
    const handleSelection = (e) => {
        setSelectedCart(e)
        setValorFinal(valorPassagem + e.cards.valor * e.diffDays)
    }

    const [distancia, setDistancia] = useState([]);
    async function fetchDistancias() {
        const response = await fetch(`http://localhost:3001/states/l/${packages.destino}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (!data) {
            return;
        }

        const listaA = data.filter(estado => estado.nome.toLowerCase() !== packages.destino.toLowerCase())
        listaA.forEach(estado => {
            const currentDate = moment();
            const endDate = moment(currentDate).endOf('year');
            const pairs = [];
            for (let i = 0; i < 3; i++) {
                const diffDays = [3, 5, 7][Math.floor(Math.random() * 3)];
                const startDate = moment(currentDate).add(Math.floor(Math.random() * (endDate.diff(currentDate, 'days') - diffDays)), 'days');
                const dataVolta = moment(startDate).add(diffDays, 'days');
                pairs.push({
                    dataIda: startDate.format('DD [de] MMMM'),
                    dataVolta: dataVolta.format('DD [de] MMMM'),
                    diffdays: diffDays,
                    horaIda: moment().hour(Math.floor(Math.random() * 24)).minute(Math.floor(Math.random() * 60)).format('HH:mm'),
                    horaVolta: moment().hour(Math.floor(Math.random() * 24)).minute(Math.floor(Math.random() * 60)).format('HH:mm'),
                });
            }

            estado.dias = pairs;
        });

        setDistancia(listaA);
    }

    const [estados, setEstados] = useState([])
    async function fetchStates() {
        const response = await fetch('http://localhost:3001/states/states', {
            method: 'GET',
        });
        const data = await response.json();
        const listaA = data.estados.filter(estado => estado.nome.toLowerCase() !== packages.destino.toLowerCase())
        setEstados(listaA);
    }

    const [estado, setEstado] = useState();

    useEffect(() => {
        fetchDistancias();
        fetchStates();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (estado) {
            const newValor = parseFloat(estado.distancia * 0.55).toFixed(2);
            setValorPassagem(parseFloat(newValor));
            setValorFinal(parseFloat(newValor));
            setSelectedCart()
        }
    }, [estado]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeState = (e) => {
        const estadoSelecionado = distancia.find(es => es.nome === e.target.value);
        if (estadoSelecionado) {
            setEstado(estadoSelecionado);
        }
    }

    const [selectedDate, setSelectedDate] = useState(0);
    const handleSelectedDate = (e) => {
        setSelectedDate(e.target.value)
        setValorFinal(valorPassagem)
        setSelectedCart()
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleButtonClick = () => {
        dispatch(setPaymentInformation({ paymentInformations: null }))
        dispatch(setCart({
            cart: {
                packages,
                estado,
                selectedDate,
                selectedCard,
                valorPassagem,
                valorFinal
            }
        }));
        navigate('/packages/cart/checkout')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#E6ECF5' }}>
            <Navbar />
            <Box sx={{ width: '80%' }}>
                <ImageGalleryElastic images={packages.imagens} />
            </Box>
            <Box sx={{ width: isNonMobile ? '80%' : '100%', marginTop: '30px', marginBottom: '30px', display: 'flex', height: '100%', minHeight: '90vh', justifyContent: 'space-between', flexDirection: isNonMobile ? 'row' : 'column' }}>

                <Box sx={{ width: isNonMobile ? '70%' : '100%', marginTop: '15px', backgroundColor: 'white', borderRadius: isNonMobile ? '20px' : '4px', padding: '20px', boxShadow: isNonMobile ? '2px 2px 2px rgba(0,0,0,0.5)' : '0px 0px 6px rgba(0,0,0,0.5)', color: blueColor, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: isNonMobile ? '35px' : '27px' }}>Pacote para {packages.destino}</Typography>

                    <Box sx={{ display: 'flex', gap: '0.5rem', border: `1px solid ${blueColor}`, width: '100%', borderRadius: '10px', padding: '10px' }}>
                        {estado && (
                            <Typography sx={{ fontSize: isNonMobile ? '18px' : '13px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CalendarMonthIcon />{estado.dias[selectedDate].dataIda} - {estado.dias[selectedDate].dataVolta}</Typography>
                        )}
                        <Typography sx={{ fontSize: isNonMobile ? '18px' : '13px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><PersonIcon />Viagem para 2 pessoas</Typography>
                    </Box>


                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 'bold', fontSize: isNonMobile ? '20px' : '17px' }}><DoneIcon />Personalize seu pacote</Typography>

                    <Box sx={{ display: 'flex', gap: '2rem' }}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel
                                sx={{ color: blueColor, fontWeight: 'bold' }}
                            >Origem</InputLabel>
                            <Select
                                value={estado}
                                onChange={(e) => handleChangeState(e)}
                                sx={{ backgroundColor: 'white' }}
                            >
                                {estados.map((estado, i) => (
                                    <MenuItem key={i} value={estado.nome}>{estado.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="filled" disabled={!estado}>
                            <InputLabel
                                sx={{ color: blueColor, fontWeight: 'bold' }}
                            >Datas disponíveis</InputLabel>
                            <Select
                                value={selectedDate}
                                onChange={(e) => handleSelectedDate(e)}
                                sx={{ backgroundColor: 'white' }}
                            >
                                {estado && estado.dias.map((dataRange, index) => (
                                    <MenuItem key={index} value={index}>{`${dataRange.dataIda} - ${dataRange.dataVolta}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', borderRadius: '10px', padding: '15px', flexDirection: 'column' }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}><HotelIcon />Hospedagem <strong>{estado && selectedDate !== null ? `- ${estado.dias[selectedDate].diffdays} diária(s)` : ''}</strong></Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {packages.hospedagem.quartos.map((h) => (
                                <AccommodationCard
                                    key={h.id}
                                    cards={h}
                                    diffDays={estado && selectedDate !== null ? estado.dias[selectedDate].diffdays : ""}
                                    handleSelection={handleSelection}
                                    isSelected={h.id === selectedCard?.cards.id}
                                >
                                </AccommodationCard>
                            ))}
                        </Box>
                    </Box>

                </Box>

                <Box sx={{ width: isNonMobile ? '28%' : '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Box sx={{ height: 'auto', marginTop: '15px', backgroundColor: 'white', borderRadius: isNonMobile ? '20px' : '4px', padding: '20px', boxShadow: isNonMobile ? '2px 2px 2px rgba(0,0,0,0.5)' : '0px 0px 6px rgba(0,0,0,0.5)', color: blueColor, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                        <Typography sx={{ fontWeight: 'bold', fontSize: isNonMobile ? '35px' : '25px' }}>Informações sobre o pacote...</Typography>

                        {estado ? (
                            <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', borderRadius: '10px', padding: '15px', flexDirection: 'column', border: `1px solid ${blueColor}` }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '13px' }}><AirplaneTicketIcon /> <strong>Voo</strong> operado por<strong>aviadora interna</strong></Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '17px' }}> <strong>Ida</strong>{estado.dias[selectedDate].dataIda} às {estado.dias[selectedDate].horaIda}</Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '17px' }}> <strong>Volta</strong> {estado.dias[selectedDate].dataVolta} às {estado.dias[selectedDate].horaVolta}</Typography>
                            </Box>
                        ) : (
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '18px' }}>Selecione de onde partirá para informações do Vôo</Typography>
                        )}

                        {selectedCard && (
                            <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', borderRadius: '10px', padding: '15px', flexDirection: 'column', border: `1px solid ${blueColor}` }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '13px' }}><HotelIcon /> <strong>Hospedagem</strong></Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '17px' }}> <strong>Check-in</strong> até {moment(estado.dias[selectedDate].dataIda + ' ' + estado.dias[selectedDate].horaIda, 'DD [de] MMMM [às] HH:mm').add(6, 'hours').format('DD [de] MMMM [às] HH:mm')}</Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: isNonMobile ? '18px' : '17px' }}> <strong>Check-out</strong> até {moment(estado.dias[selectedDate].dataVolta + ' ' + estado.dias[selectedDate].horaVolta, 'DD [de] MMMM [às] HH:mm').subtract(1, 'hours').format('DD [de] MMMM [às] HH:mm')}</Typography>
                            </Box>
                        )}

                    </Box>

                    {estado && (
                        <Box sx={{ height: 'auto', marginTop: '15px', backgroundColor: 'white', borderRadius: isNonMobile ? '20px' : '4px', padding: '20px', boxShadow: isNonMobile ? '2px 2px 2px rgba(0,0,0,0.5)' : '0px 0px 6px rgba(0,0,0,0.5)', color: blueColor, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '35px' }}>Valores</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Typography sx={{ textDecoration: 'line-through', fontStyle: 'italic', fontSize: '17px', fontWeight: 'bold', color: 'grey' }}>R$ {(valorFinal * 1.1).toFixed(2)}</Typography>
                                <Typography sx={{ fontSize: '30px', color: '#FF4500', fontWeight: 'bold' }}>R$ {valorFinal}</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '17px', fontWeight: 'bold' }}>Valor para 2 pessoas</Typography>

                            <hr style={{ width: '100%' }} />

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '18px' }}>Diária(s)</Typography>
                                <Typography sx={{ fontSize: '18px' }}>{estado.dias[selectedDate].diffdays}</Typography>
                            </Box>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '18px' }}>Passagem</Typography>
                                <Typography sx={{ fontSize: '18px' }}>R$ {valorPassagem}</Typography>
                            </Box>

                            {selectedCard && (
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '18px' }}>Hospedagem</Typography>
                                    <Typography sx={{ fontSize: '18px' }}>R$ {selectedCard.cards.valor * selectedCard.diffDays}</Typography>
                                </Box>
                            )}

                            {estado && selectedCard && (
                                <Button onClick={() => handleButtonClick()} sx={{ border: `1px solid ${blueColor}`, backgroundColor: blueColor, color: 'white', height: '50px', '&:hover': { color: blueColor } }}>Prosseguir com a compra</Button>
                            )}

                        </Box>
                    )}

                </Box>



            </Box>

        </Box>
    )
}

export default PackageCartPage;