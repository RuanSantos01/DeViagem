import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react'

// ICONS
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ClassPick = (props) => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    const isNonMobile = useMediaQuery("(min-width:650px)");
    const isNonMobile2 = useMediaQuery("(min-width:900px)");
    const refOne = useRef(null);
    const [open, setOpen] = useState('');
    const [val, setVal] = useState(false);
    const [classPick, setClassPick] = useState({
        adults: 0,
        children: 0,
        class: ''
    });

    const handleClassPick = () => {
        props.classPick(classPick);
        setOpen(false);
        setVal(true);
    }

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            top: isNonMobile ? '-35px' : '',
            alignItems: 'center',
            color: 'black',
            fontSize: '1rem',
            width: isNonMobile ? 'auto' : '100%'
        }}>
            <TextField
                fullWidth
                label="Viajantes e classe de voo"
                value={val ? `${classPick.adults} adultos, ${classPick.children} crianças - ${classPick.class}` : ''}
                name="classe"
                variant="filled"
                onClick={() => setOpen(open => !open)}
                InputProps={{
                    style: { backgroundColor: "white", borderRadius: "4px" }
                }}
                InputLabelProps={{
                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: isNonMobile ? '200%' : '100%',
                    left: isNonMobile2 && isNonMobile ? '50%' : '50%',
                    transform: 'translateX(-50%)',
                    top: '55px',
                    zIndex: '999',
                }}
                ref={refOne}>
                {open && (
                    <Box
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            padding: '15px 6%',
                            boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)"
                        }}
                    >
                        <FormControl variant='filled'>
                            <InputLabel sx={{ color: blueColor, fontWeight: "bold", fontSize: "1rem" }}>Classe da cabine</InputLabel>
                            <Select
                                label='Classe da cabine'
                                value={classPick.class ? classPick.class : ''}
                                onChange={(value) => setClassPick({ ...classPick, class: value.target.value })}
                                sx={{
                                    width: '100%',
                                    color: 'black'
                                }}>
                                <MenuItem value="Econônica">Econômica</MenuItem>
                                <MenuItem value="Primeira Classe">Primeira Classe</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sc={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>Adultos</Typography>
                                <Typography>16 anos ou mais</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                <Button onClick={() => setClassPick({ ...classPick, adults: classPick.adults - 1 })}><RemoveIcon sx={{ color: blueColor }} /></Button>
                                <Typography sx={{ fontWeight: 'bold' }}>{classPick.adults}</Typography>
                                <Button onClick={() => setClassPick({ ...classPick, adults: classPick.adults + 1 })}><AddIcon sx={{ color: blueColor }} /></Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sc={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>Crianças</Typography>
                                <Typography>Até 15 anos</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                <Button onClick={() => setClassPick({ ...classPick, children: classPick.children - 1 })}><RemoveIcon sx={{ color: blueColor }} /></Button>
                                <Typography sx={{ fontWeight: 'bold' }}>{classPick.children}</Typography>
                                <Button onClick={() => setClassPick({ ...classPick, children: classPick.children + 1 })}><AddIcon sx={{ color: blueColor }} /></Button>
                            </Box>
                        </Box>
                        <Box>{`${classPick.adults} adultos, ${classPick.children} crianças - ${classPick.class}`}</Box>

                        <Button onClick={handleClassPick} sx={{ backgroundColor: blueColor, color: 'white', '&:hover': { color: blueColor, border: `1px solid ${blueColor}` } }}>Aplicar</Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ClassPick