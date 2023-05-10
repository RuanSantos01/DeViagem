import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import CalendarComp from "components/CalendarComp";
import { useFormik } from "formik";
import { useState } from "react";
import Navbar from "scenes/navbar";
import TextMask from 'react-text-mask';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [pagantes, setPagantes] = useState();

    const cartInformations = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log(cartInformations)
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const inf = {
        adultos: 2
    }

    // BIRTHDAY DATE
    const [b1, setB1] = useState();
    const handleDataNascimento1 = (e) => {
        setB1(e)
        formik.setFieldValue('dataNascimentoViajante1', e)
    }

    const [b2, setB2] = useState();
    const handleDataNascimento2 = (e) => {
        setB2(e)
        formik.setFieldValue('dataNascimentoViajante2', e)
    }

    const validationSchema = Yup.object().shape({
        nomeViajante1: Yup.string().required('Campo obrigatório'),
        sobrenomeViajante1: Yup.string().required('Campo obrigatório'),
        dataNascimentoViajante1: Yup.string().required('Campo obrigatório'),
        sexoViajante1: Yup.string().required('Campo obrigatório'),
        nomeViajante2: Yup.string(),
        sobrenomeViajante2: Yup.string(),
        dataNascimentoViajante2: Yup.string(),
        sexoViajante2: Yup.string(),
        qtdPagantes: Yup.string().required('Campo obrigatório'),
        nomeTitular: Yup.string().required('Campo obrigatório'),
        cpfTitular: Yup.string().required('Campo obrigatório'),
        celularTitular: Yup.string().required('Campo obrigatório'),
        sexoTitular: Yup.string().required('Campo obrigatório'),
        emailTitular: Yup.string().required('Campo obrigatório'),
        cpfSegundoPagante: pagantes > 1 ? Yup.string().required('Campo obrigatório') : Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            nomeViajante1: '',
            sobrenomeViajante1: '',
            dataNascimentoViajante1: '',
            sexoViajante1: '',
            nomeViajante2: '',
            sobrenomeViajante2: '',
            dataNascimentoViajante2: '',
            sexoViajante2: '',
            qtdPagantes: 1,
            nomeTitular: '',
            cpfTitular: '',
            celularTitular: '',
            sexoTitular: '',
            emailTitular: '',
            cpfSegundoPagante: '',
            cartaoMask: ''
        },
        // validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
            // dispatch(setPaymentInformation({ paymentInformations: values }))
            // navigate('/accommodation/reservation')
        }
    })

    // CARD
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('')
    const getCardType = (cardNumber) => {
        if (/^5[1-5]/.test(cardNumber)) {
            setCardType('Mastecard');
        } else if (/^4/.test(cardNumber)) {
            setCardType('Visa')
        } else if (/^3[47]/.test(cardNumber)) {
            setCardType('American Express')
            return "American Express";
        } else if (/^3(?:0[0-5]|[68][0-9])/.test(cardNumber)) {
            setCardType('Diners Club')
        } else if (/^6(?:011|5[0-9]{2}|4[0-9]{3}|2[2-7][0-9]{2}|2[89][0-9]{1})/.test(cardNumber)) {
            setCardType('Discover')
        } else {
            setCardType('Bandeira não encontrada')
        }
    }
    const isValidCreditCardNumber = (cardNumber) => {
        if (cardNumber.length < 12 || cardNumber.length > 19) {
            return false;
        }

        if (!/^\d+$/.test(cardNumber)) {
            return false;
        }

        let sum = 0;
        let doubleUp = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let curDigit = parseInt(cardNumber.charAt(i));
            if (doubleUp) {
                if ((curDigit *= 2) > 9) curDigit -= 9;
            }
            sum += curDigit;
            doubleUp = !doubleUp;
        }

        if (sum % 10 === 0) {
            getCardType(cardNumber)
            return true
        };
    }
    const handleCardNumberChange = (event) => {
        let newCardNumber = event.target.value.replace(/[^\d]/g, '');
        newCardNumber = newCardNumber.replace(/(\d{4})/g, '$1 ').trim();
        if (newCardNumber.length > 12) {
            event.preventDefault();
        }
        setCardNumber(newCardNumber);
        isValidCreditCardNumber(newCardNumber)
    }
    function handleKeyPress(event) {
        const regex = /(\d{1,4})/g;
        const key = event.key;

        if (event.target.value.length === 19 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
        } else if (!regex.test(key)) {
            event.preventDefault();
        }
    }

    const [securityCode, setSecurityCode] = useState();

    const [month, setMonth] = useState();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const [year, setYear] = useState();
    const years = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036']

    // PHONE
    const phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    // CPF
    const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    // GENDER
    const [gender1, setGender1] = useState("");
    const handleGender = (e) => {
        setGender1(e.target.value)
        formik.setFieldValue('sexoViajante1', e.target.value)
    }

    const [gender2, setGender2] = useState("");
    const handleGender2 = (e) => {
        setGender2(e.target.value)
        formik.setFieldValue('sexoViajante2', e.target.value)
    }

    const [genderTitular, setGenderTitular] = useState("");
    const handleGenderTitular = (e) => {
        setGenderTitular(e.target.value)
        formik.setFieldValue('sexoTitular', e.target.value)
    }

    const imagemStyle = {
        backgroundImage: `url(http://localhost:3001/assets/${cart.imageQuarto})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        width: "100%",
        height: "21vh"
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", backgroundColor: '#DCE0E6' }}>
            <Navbar />

            <Box sx={{ width: '65%', padding: '20px 0', backgroundColor: '#DCE0E6', display: 'flex', gap: isNonMobile ? '0px' : '1.5rem', flexDirection: isNonMobile ? 'row' : 'column', justifyContent: 'space-between', height: 'auto', margin: '10px' }}>

                <Box sx={{ width: isNonMobile ? '52%' : '100%', backgroundColor: 'white', height: 'auto', borderRadius: '20px', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '30px' }}>
                    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Typography sx={{ border: `2px solid ${blueColor}`, borderRadius: '50%', width: '30px', height: '30px', color: blueColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>1</Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor }}>Viajantes</Typography>
                    </Box>
                    <hr style={{ width: '100%', color: blueColor }} />

                    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Viajante 1 - Adulto</Typography>

                        <Box>
                            <TextField
                                sx={{ width: '100%' }}
                                label='Primeiro nome*'
                                onChange={(e) => formik.setFieldValue('nomeViajante1', e.target.value)}
                                name="primeiroNome"
                                InputProps={{
                                    style: { backgroundColor: "white", borderRadius: "4px" },
                                }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                }}
                            />
                            {formik.touched.nomeViajante1 && !formik.values.nomeViajante1 && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}
                        </Box>

                        <Box>
                            <TextField
                                sx={{ width: '100%' }}
                                label='Ultimo sobrenome*'
                                name="ultimoSobrenome"
                                onChange={(e) => formik.setFieldValue('sobrenomeViajante1', e.target.value)}
                                InputProps={{
                                    style: { backgroundColor: "white", borderRadius: "4px" },
                                }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                }}
                            />
                            {formik.touched.sobrenomeViajante1 && !formik.values.sobrenomeViajante1 && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}
                        </Box>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CalendarComp onSelect={handleDataNascimento1} />
                            <FormControl sx={{ width: '47%' }}>
                                <InputLabel sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Sexo</InputLabel>
                                <Select
                                    value={gender1}
                                    label="Age"
                                    onChange={handleGender}
                                >
                                    <MenuItem value='masculino' name='masculino'>Masculino</MenuItem>
                                    <MenuItem value='feminino' name='feminino'>Feminino</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {formik.touched.gender1 && !formik.values.gender1 && (
                            <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                        )}

                        {inf.adultos === 2 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Viajante 2 - Adulto</Typography>
                                <Box>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label='Primeiro nome*'
                                        name="primeiroNome"
                                        onChange={(e) => formik.setFieldValue('nomeViajante2', e.target.value)}
                                        InputProps={{
                                            style: { backgroundColor: "white", borderRadius: "4px" },
                                        }}
                                        InputLabelProps={{
                                            style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                        }}
                                    />
                                    {formik.touched.nomeViajante2 && !formik.values.nomeViajante2 && (
                                        <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                    )}
                                </Box>

                                <Box>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label='Ultimo sobrenome*'
                                        onChange={(e) => formik.setFieldValue('sobrenomeViajante2', e.target.value)}
                                        name="ultimoSobrenome"
                                        InputProps={{
                                            style: { backgroundColor: "white", borderRadius: "4px" },
                                        }}
                                        InputLabelProps={{
                                            style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                        }}
                                    />
                                    {formik.touched.sobrenomeViajante2 && !formik.values.sobrenomeViajante2 && (
                                        <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                    )}
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <CalendarComp onSelect={handleDataNascimento2} />
                                    <FormControl sx={{ width: '47%' }}>
                                        <InputLabel id="demo-simple-select-label" sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Sexo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={gender2}
                                            label="Age"
                                            onChange={handleGender2}
                                        >
                                            <MenuItem value='masculino' name='masculino'>Masculino</MenuItem>
                                            <MenuItem value='feminino' name='feminino'>Feminino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                {formik.touched.gender2 && !formik.values.gender2 && (
                                    <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                )}
                            </Box>

                        )}

                        <Box>
                            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Typography sx={{ border: `2px solid ${blueColor}`, borderRadius: '50%', width: '30px', height: '30px', color: blueColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>2</Typography>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '30px', color: blueColor }}>Dados de Pagamento</Typography>
                            </Box>
                            <hr style={{ width: '100%', color: blueColor }} />
                        </Box>

                        <FormControl fullWidth>
                            <InputLabel sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Quantos Pagantes ?</InputLabel>
                            <Select
                                value={pagantes ? pagantes : ''}
                                label="Quantos Pagantes ?"
                                onChange={(e) => { setPagantes(e.target.value); formik.setFieldValue('qtdPagantes', e.target.value) }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                            </Select>
                            <Typography sx={{ textAlign: 'justify' }}>Se a quantidade de pagantes for mais que uma pessoa, será gerado um código ao finalizar sua compra, com esse código a(s) outra(s) pessoa(s) pode(em) finalizar o pagamento.</Typography>
                        </FormControl>

                        {pagantes > 1 && (
                            <>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label='CPF do segundo pagante*'
                                    name="cpf"
                                    onChange={(e) => formik.setFieldValue('cpfSegundoPagante', e.target.value)}
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                        inputComponent: TextMask,
                                        inputProps: {
                                            mask: cpfMask,
                                            autoComplete: "off",
                                            autoCorrect: "off",
                                            spellCheck: "false"
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />
                                {formik.touched.cpfSegundoPagante && !formik.values.cpfSegundoPagante && (
                                    <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                )}
                            </>

                        )}

                        <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Cartão de crédito</Typography>

                        <TextField
                            sx={{ width: '100%' }}
                            label='Número do Cartão'
                            name="numeroCartao"
                            value={cardNumber}
                            onKeyPress={handleKeyPress}
                            onChange={handleCardNumberChange}
                            InputProps={{
                                style: { backgroundColor: "white", borderRadius: "4px" },
                            }}
                            InputLabelProps={{
                                style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                            }}
                        />
                        {formik.touched.cardNumber && !formik.values.cardNumber && (
                            <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                        )}

                        <TextField
                            sx={{ width: '100%' }}
                            label='Bandeira'
                            disabled
                            name="Bandeira"
                            value={cardType}
                            InputProps={{
                                style: { backgroundColor: "white", borderRadius: "4px" },
                            }}
                            InputLabelProps={{
                                style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                            }}
                        />

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <FormControl sx={{ width: '30%' }}>
                                <InputLabel sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Mês de validade</InputLabel>
                                <Select
                                    value={month ? month : ''}
                                    label="Mês"
                                    onChange={(e) => setMonth(e.target.value)}
                                >
                                    {months.map((y) => (
                                        <MenuItem value={y}>{y}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.month && !formik.values.month && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}

                            <FormControl sx={{ width: '30%' }}>
                                <InputLabel sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Ano de validade</InputLabel>
                                <Select
                                    value={year ? year : ''}
                                    label="Ano"
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    {years.map((y) => (
                                        <MenuItem value={y}>{y}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.year && !formik.values.year && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}

                            <TextField
                                sx={{ width: '30%' }}
                                label='Cod. Segurança*'
                                name="Cod. Segurança"
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e.target.value)}
                                InputProps={{
                                    style: { backgroundColor: "white", borderRadius: "4px" },
                                }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                }}
                            />
                            {formik.touched.securityCode && !formik.values.securityCode && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}
                        </Box>

                        <Typography sx={{ fontWeight: 'bold', fontSize: '24px', color: blueColor }}>Informações do Titular do Cartão</Typography>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                            <Box sx={{ width: '60%' }}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label='Nome completo*'
                                    name="nomeCompleto"
                                    onChange={(e) => formik.setFieldValue('nomeTitular', e.target.value)}
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />
                                {formik.touched.nomeTitular && !formik.values.nomeTitular && (
                                    <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                )}
                            </Box>

                            <Box sx={{ width: '38%' }}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label='CPF*'
                                    name="cpf"
                                    onChange={(e) => formik.setFieldValue('cpfTitular', e.target.value)}
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                        inputComponent: TextMask,
                                        inputProps: {
                                            mask: cpfMask,
                                            autoComplete: "off",
                                            autoCorrect: "off",
                                            spellCheck: "false"
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />
                                {formik.touched.cpfTitular && !formik.values.cpfTitular && (
                                    <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                            <Box sx={{ width: '48%' }}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label='Celular*'
                                    name="celular"
                                    onChange={(e) => formik.setFieldValue('celularTitular', e.target.value)}
                                    InputProps={{
                                        style: { backgroundColor: "white", borderRadius: "4px" },
                                        inputComponent: TextMask,
                                        inputProps: {
                                            mask: phoneMask,
                                            autoComplete: "off",
                                            autoCorrect: "off",
                                            spellCheck: "false"
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                    }}
                                />
                                {formik.touched.celularTitular && !formik.values.celularTitular && (
                                    <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                                )}
                            </Box>

                            <FormControl sx={{ width: '50%' }}>
                                <InputLabel id="demo-simple-select-label" sx={{ color: blueColor, fontWeight: "200", fontSize: "1rem" }}>Sexo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={genderTitular}
                                    label="Age"
                                    onChange={handleGenderTitular}
                                >
                                    <MenuItem value='masculino' name='masculino'>Masculino</MenuItem>
                                    <MenuItem value='feminino' name='feminino'>Feminino</MenuItem>
                                </Select>
                            </FormControl>
                            {formik.touched.genderTitular && !formik.values.genderTitular && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}
                        </Box>

                        <Box>
                            <TextField
                                sx={{ width: '100%' }}
                                label='Email*'
                                name="email"
                                onChange={(e) => formik.setFieldValue('emailTitular', e.target.value)}
                                InputProps={{
                                    style: { backgroundColor: "white", borderRadius: "4px" },
                                }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "200", fontSize: "1rem" }
                                }}
                            />
                            {formik.touched.emailTitular && !formik.values.emailTitular && (
                                <Typography sx={{ color: 'red' }}>Por favor, preencha este campo</Typography>
                            )}
                            <Typography sx={{ textAlign: 'justify' }}>Será enviado as informações da viagem para este email</Typography>
                        </Box>

                        <Button type="submit" sx={{ border: `1px solid ${blueColor}`, width: '100%', textAlign: 'center', padding: '20px', backgroundColor: blueColor, color: 'white', borderRadius: '20px', '&:hover': { border: `1px solid ${blueColor}`, color: blueColor } }}>Reservar</Button>


                    </form>

                </Box>

                <Box sx={{ width: isNonMobile ? '42%' : '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Box sx={{ width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: '20px', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '30px', color: blueColor }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>{cart.nomeLocal}</Typography>
                        <hr style={{ color: 'white', width: '100%' }} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}> <LocationOnIcon sx={{ color: blueColor }} />{cart.localizacao}</Typography>
                        <hr style={{ color: 'white', width: '100%' }} />

                        <Box sx={{ display: 'flex', marginTop: '14px' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography sx={{ fontSize: '20px' }}>Check-in</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Janeiro</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Typography sx={{ fontSize: '20px' }}>Check-out</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Fevereiro</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', marginTop: '14px' }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography sx={{ fontSize: '20px' }}>Hóspedes</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{cart.capacidade}</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Typography sx={{ fontSize: '20px' }}>Estadia</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>{cart.diarias} diárias</Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ marginTop: '14px', fontSize: '20px' }}> <strong>Quartos:</strong> 1x {cart.tipoQuarto}</Typography>

                        <hr style={{ width: '100%' }} />

                        <Box style={imagemStyle}></Box>
                    </Box>

                    <Box sx={{ width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: '20px', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', padding: '30px', color: blueColor }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>Detalhes do pagamento</Typography>
                        <hr style={{ width: '100%' }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '20px' }}>Hotél</Typography>
                                <Typography sx={{ fontSize: '20px' }}>R$ {cart.valor},00</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '20px' }}>Texas e impostos</Typography>
                                <Typography sx={{ fontSize: '20px' }}>R$0,00</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '20px' }}>Diaria</Typography>
                                <Typography sx={{ fontSize: '20px' }}>{cart.diarias}</Typography>
                            </Box>

                            {pagantes > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '20px' }}>Pagantes</Typography>
                                    <Typography sx={{ fontSize: '20px' }}>{pagantes}</Typography>
                                </Box>
                            )}

                        </Box>

                        <hr style={{ width: '100%' }} />

                        {pagantes > 1 ? (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Sua parte</Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>R${cart.valorTotal / pagantes},00</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>O restante</Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>R${cart.valorTotal - (cart.valorTotal / pagantes)},00</Typography>
                                </Box>

                                <hr style={{ width: '100%' }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Total</Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>R${cart.valorTotal},00</Typography>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Total</Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>R${cart.valorTotal},00</Typography>
                                </Box>
                            </>
                        )}



                        <Typography sx={{ textAlign: 'justify', marginTop: '10px' }}>As tarifas cotadas em reais são baseadas nas taxas de câmbio atuais e podem variar até o momento da viagem.</Typography>
                    </Box>
                </Box>


            </Box >
        </Box >
    )
}

export default PaymentPage;