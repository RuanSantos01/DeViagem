import { Autocomplete, Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StarRating from "widgets/StarRating";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const NewProductPage = () => {
    const theme = useTheme();
    const blueColor = theme.palette.background.blue;
    const isNonMobile = useMediaQuery("(min-width:650px)");

    const navigate = useNavigate();
    const handleVoltar = () => {
        navigate('/products')
    }

    const user = useSelector((state) => state.user);

    const [estados, setEstados] = useState([])
    async function fetchStates() {
        const response = await fetch('http://localhost:3001/states/states', {
            method: 'GET',
        });
        const data = await response.json();
        const nomesEstados = data.estados.map((d) => d.nome);
        setEstados(nomesEstados);
    }

    useEffect(() => {
        fetchStates()
    }, [])

    const [accommodations, setAccommodations] = useState();
    const fetchAccommodations = async (destino) => {
        const response = await fetch('http://localhost:3001/accommodations/getByDestiny', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destiny: destino }),
        });

        if (response.status === 200) {
            const acc = await response.json();
            setAccommodations(acc)
        }
    }

    const [packageImage, setPackageImage] = useState();
    const [packageImages, setPackageImages] = useState();

    const formik = useFormik({
        initialValues: {
            operador: user.fullName,
            destino: '',
            valorPassagem: 0,
            pessoas: 0,
            imagem: '',
            imagens: '',
            hospedagem: 'Da um fetch nos pacotes',
            vagas: 0,
            vagasRestantes: 0
        },
        onSubmit: values => {
            insertPackage(values)
        }
    })

    const [estado, setEstado] = useState();
    const handleChangeState = (e) => {
        setEstado(e.target.value)
        formikAccomodations.setFieldValue('destino', e.target.value);
        formik.setFieldValue('destino', e.target.value);
        fetchAccommodations(e.target.value)
    }

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [image, setImage] = useState('')
    const [images, setImages] = useState();

    const [imageHotel, setImageHotel] = useState('');
    const [imagesHotel, setImagesHotel] = useState();


    const registerAccommodations = async (inf) => {
        let requestBody = {};
        for (let value in inf) {
            requestBody[value] = inf[value]
        }

        requestBody['image'] = inf['image'].name;

        requestBody['images'] = []
        for (let v in inf['images']) {
            requestBody['images'] = [...requestBody['images'], inf['images'][v].name]
        }

        requestBody.quartos['imageQuarto'] = inf['quartos']['imageQuarto'].name

        let arrayQuartos = [];
        for (let i in inf.quartos['image']) {
            arrayQuartos[i] = requestBody.quartos['image'][i].name
        }
        requestBody.quartos['image'] = arrayQuartos;

        const response = await fetch('http://localhost:3001/accommodations/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })

        if (response.status !== 201) {
            alert('Erro ao salvar')
        }

    }

    const formikAccomodations = useFormik({
        initialValues: {
            nomeLocal: '',
            destino: '',
            image: '',
            images: [],
            localizacao: '',
            localizacaoCompleta: '',
            informacaoGeral: '',
            tipoQuarto: '',
            quartos: {
                image: '',
                imageQuarto: '',
                nomeLocal: '',
                tipoQuarto: '',
                localizacao: '',
                capacidade: '',
                valor: '',
                adicional: ''
            },
            camas: '',
            avaliacao: 0,
            tempoCapacidade: '',
            valor: '',
            descricao: '',
            informacoesAdicionais: [],
            geolocalizacao: []
        },
        onSubmit: values => {
            values.quartos.localizacao = values.localizacao
            values.quartos.nomeLocal = values.nomeLocal
            values.geolocalizacao = [latitude, longitude];
            registerAccommodations(values)
        }
    })

    const options = [
        "Animais de estimação permitidos",
        "Acesso Wi-Fi gratuito",
        "Ar Condicionado",
        "Casa de banho privativa",
        "Recepção disponível 24 horas",
        "Cartão de acesso",
        "Cofre",
        "Sala para Bagagem",
    ]

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'latitude') {
            setLatitude(value);
        } else if (name === 'longitude') {
            setLongitude(value);
        }
    };

    const [isSelected, setIsSelected] = useState(false);

    const insertPackage = async (req) => {
        let requestBody = {};
        for (let value in req) {
            requestBody[value] = req[value]
        }

        requestBody['imagem'] = `/packages/${req['imagem'].name}`;

        requestBody['imagens'] = []
        for (let v in req['imagens']) {
            requestBody['imagens'] = [...requestBody['imagens'], `/packages/${requestBody['destino']}/${req['imagens'][v].name}`]
        }

        const response = await fetch('http://localhost:3001/packages/insertPackage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })

        if (response.status === 201) {
            response.json();
            insertPackageToAccount(requestBody);
        } else {
            alert('Erro ao inserir novo pacote')
        }
    }

    const insertPackageToAccount = async (accommodation) => {
        const body = {
            cpf: user.cpf,
            accommodation: accommodation
        }

        const response = await fetch('http://localhost:3001/packages/insertPackagesToAccount', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            alert('Pacote vinculado com sucesso!')
        } else {
            alert('Erro ao vincular pacote')
        }
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCE0E6' }}>
            <Navbar />

            <Box sx={{ width: '80%', backgroundColor: 'white', minHeight: '90vh', boxShadow: '0px 0px 4px rgba(0,0,0,0.5)' }}>

                <Box sx={{ padding: '30px', width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: isNonMobile ? 'row' : 'column-reverse' }}>
                    <Typography sx={{ fontSize: isNonMobile ? '2.7rem' : '1.5rem', color: blueColor, fontWeight: 'bold' }}>Inclua novo produto</Typography>
                    {isNonMobile && (
                        <Button onClick={() => handleVoltar()} sx={{ border: `1px solid ${blueColor}`, color: 'white', backgroundColor: blueColor, fontWeight: 'bold', width: isNonMobile ? '150px' : '100%' }}>Voltar</Button>
                    )}
                </Box>
                <hr style={{
                    width: '100%', border: `1px solid ${blueColor}`
                }} />

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label="Pacote" {...a11yProps(0)} sx={{ fontWeight: 'bold', color: blueColor, fontSize: '1.2rem' }} />
                            <Tab label="Hospedagem" {...a11yProps(1)} sx={{ fontWeight: 'bold', color: blueColor, fontSize: '1.2rem' }} />
                            <Tab label="Roteiro" {...a11yProps(2)} sx={{ fontWeight: 'bold', color: blueColor, fontSize: '1.2rem' }} />
                        </Tabs>
                    </Box>

                    {/* PACOTE */}
                    <TabPanel value={value} index={0}>
                        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'space-between' }}>

                            <Typography sx={{ width: '100%', color: blueColor, fontWeight: 'bold', fontSize: '1.5rem', textAlign: isNonMobile ? 'start' : 'center' }}>Cadastro de pacote</Typography>
                            <hr style={{ width: '100%' }} />

                            <FormControl variant="outlined" sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <InputLabel sx={{ color: blueColor, fontWeight: 'bold', fontSize: '1rem' }}>Pra onde vai?</InputLabel>
                                <Select
                                    value={estado}
                                    onChange={(e) => handleChangeState(e)}
                                    sx={{ backgroundColor: 'white' }}
                                >
                                    {estados && estados.map((estado, i) => (
                                        <MenuItem key={i} value={estado}>{estado}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Valor base"
                                variant="outlined"
                                type="number"
                                onChange={(e) => formik.setFieldValue('valorPassagem', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Pacote para quantas pessoas?"
                                variant="outlined"
                                type="number"
                                onChange={(e) => formik.setFieldValue('pessoas', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Quantas vagas serão disponibilizadas?"
                                variant="outlined"
                                type="number"
                                onChange={(e) => {
                                    formik.setFieldValue('vagas', e.target.value)
                                    formik.setFieldValue('vagasRestantes', e.target.value)
                                }}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        formik.setFieldValue("imagem", acceptedFiles[0]);
                                        setPackageImage(acceptedFiles[0])
                                    }
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!packageImage ? (
                                                <p>Imagem principal</p>
                                            ) : (
                                                <FlexBetween height='51px'>
                                                    <Typography>{packageImage.name}</Typography>
                                                    <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={true}
                                    onDrop={(acceptedFiles) => {
                                        formik.setFieldValue("imagens", acceptedFiles);
                                        setPackageImages(acceptedFiles)
                                    }
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!packageImages ? (
                                                <p>Imagens sobre o pacote</p>
                                            ) : (
                                                <FlexBetween height='51px'>
                                                    {packageImages.map((pack) => (
                                                        <Typography>{pack.name}</Typography>
                                                    ))}
                                                    <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            {accommodations && (
                                <Box sx={{ width: '100%' }}>
                                    <hr style={{ width: '100%' }} />
                                    <Typography sx={{ width: '100%', color: blueColor, fontWeight: 'bold', fontSize: '1.1rem' }}>Selecione uma hospedagem pré cadastrada</Typography>
                                </Box>

                            )}

                            {accommodations && accommodations.map((acc) => (
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <Box sx={{ border: '1px solid #C4C4C4', width: '100%', borderRadius: '10px', height: '250px', display: 'flex' }}>
                                        <Box sx={{
                                            backgroundImage: `url(http://localhost:3001/assets/${acc.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            width: '20%',
                                            height: '248px',
                                            borderRadius: '10px'
                                        }} />

                                        <Box sx={{ width: '60%', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                            <Box>
                                                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', color: blueColor, padding: '10px' }}>{acc.nomeLocal}</Typography>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: blueColor, paddingLeft: '10px' }}>{acc.localizacao}</Typography>
                                            </Box>

                                            <Box>
                                                <Link to="/reserveAccommodation" state={{ hospedagem: acc }}>
                                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem', paddingLeft: '10px' }}>Mais informações sobre a hospedagem</Typography>
                                                </Link>
                                                <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: blueColor, paddingLeft: '10px' }}>{acc.informacaoGeral}, {acc.tipoQuarto}</Typography>
                                            </Box>

                                        </Box>

                                        <Box sx={{ width: '20%', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', padding: '10px' }}>
                                            <StarRating rating={4} />
                                            <Button disabled={isSelected} onClick={() => { formik.setFieldValue('hospedagem', acc); setIsSelected(true) }} sx={{ fontWeight: 'bold', width: '100%', border: `1px solid ${blueColor}`, backgroundColor: blueColor, color: 'white', '&:hover': { backgroundColor: 'white', color: blueColor } }}>Selecionar esse</Button>
                                        </Box>

                                    </Box>
                                </Box>
                            ))}

                            <Button onClick={() => setIsSelected(false)} type='submit' sx={{ fontWeight: 'bold', width: '100%', height: '3rem', border: `1px solid ${blueColor}`, backgroundColor: blueColor, color: 'white', '&:hover': { backgroundColor: 'white', color: blueColor } }}>Cadastrar Pacote</Button>

                        </form>
                    </TabPanel>

                    {/* HOSPEDAGEM */}
                    <TabPanel value={value} index={1}>
                        <form onSubmit={formikAccomodations.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'space-between' }}>
                            <Typography sx={{ width: '100%', color: blueColor, fontWeight: 'bold', fontSize: '1.5rem' }}>Sobre a hospedagem...</Typography>
                            <hr style={{ width: '100%' }} />

                            <FormControl variant="outlined" sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <InputLabel sx={{ color: blueColor, fontWeight: 'bold', fontSize: "1rem" }}>Destino</InputLabel>
                                <Select
                                    value={estado}
                                    onChange={(e) => handleChangeState(e)}
                                >
                                    {estados && estados.map((estado, i) => (
                                        <MenuItem key={i} value={estado}>{estado}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Razão Social"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('nomeLocal', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%', color: blueColor }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        formikAccomodations.setFieldValue("image", acceptedFiles[0]);
                                        setImage(acceptedFiles[0])
                                    }
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!image ? (
                                                <p>Imagem principal</p>
                                            ) : (
                                                <FlexBetween height='51px'>
                                                    <Typography>{image.name}</Typography>
                                                    <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={true}
                                    onDrop={(acceptedFiles) => {
                                        formikAccomodations.setFieldValue("images", acceptedFiles);
                                        setImages(acceptedFiles)
                                    }
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!images ? (
                                                <p>Imagens</p>
                                            ) : (
                                                <FlexBetween height='51px'>
                                                    {images && images.map((i) => (
                                                        <Typography>{i.name}</Typography>
                                                    ))}
                                                    <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>

                            <TextField
                                label="Cidade, Estado ou Município"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('localizacao', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Localização Completa"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('localizacaoCompleta', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Informação Geral"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('informacaoGeral', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Tipo de quarto"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('tipoQuarto', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Quantas camas"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('camas', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Tempo Capacidade"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('tempoCapacidade', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Descrição"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('descricao', e.target.value)}
                                placeholder="Informe um texto sobre sua hospedagem"
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                label="Valor base"
                                variant="outlined"
                                onChange={(e) => formikAccomodations.setFieldValue('valor', e.target.value)}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                name="latitude"
                                label="Latitude"
                                value={latitude}
                                onChange={handleInputChange}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <TextField
                                name="longitude"
                                label="Longitude"
                                value={longitude}
                                onChange={handleInputChange}
                                variant="outlined"
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                InputLabelProps={{
                                    style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                }}
                            />

                            <Autocomplete
                                multiple
                                value={formikAccomodations.values.informacoesAdicionais}
                                onChange={(event, value) => {
                                    formikAccomodations.setFieldValue('informacoesAdicionais', value);
                                }}
                                sx={{ width: isNonMobile ? '32%' : '100%' }}
                                options={options}
                                getOptionLabel={(option) => option}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="outlined"
                                            label={option}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Informações adicionais"
                                        InputLabelProps={{
                                            style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                        }}
                                    />
                                )}
                            />

                            <Typography sx={{ width: '100%', color: blueColor, fontWeight: 'bold', fontSize: '1.5rem', marginTop: '20px' }}>Sobre os quartos...</Typography>
                            <hr style={{ width: '100%' }} />


                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'space-between', width: '100%' }}>

                                <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={true}
                                        onDrop={(acceptedFiles) => {
                                            setImageHotel(acceptedFiles)
                                            formikAccomodations.setFieldValue('quartos.image', acceptedFiles)
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!imageHotel ? (
                                                    <p>Imagem principal</p>
                                                ) : (
                                                    <FlexBetween height='51px'>
                                                        {imageHotel && imageHotel.map((i) => (
                                                            <Typography>{i.name}</Typography>
                                                        ))}
                                                        <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>

                                <Box sx={{ width: isNonMobile ? '32%' : '100%' }}>
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            setImagesHotel(acceptedFiles[0])
                                            formikAccomodations.setFieldValue('quartos.imageQuarto', acceptedFiles[0])
                                        }
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                sx={{ paddingLeft: '12px', border: `1px solid #C4C4C4`, borderRadius: '5px', color: blueColor, fontWeight: "bold", fontSize: "1rem", "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!imagesHotel ? (
                                                    <p>Imagens do quarto</p>
                                                ) : (
                                                    <FlexBetween height='51px'>
                                                        <Typography>{imagesHotel.name}</Typography>
                                                        <EditOutlinedIcon sx={{ marginRight: '12px' }} />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>

                                <TextField
                                    name="localizacao"
                                    label="Localizacao"
                                    value={formikAccomodations.values.localizacao}
                                    onChange={(e) => formikAccomodations.setFieldValue('localizacao', e.target.value)}
                                    variant="outlined"
                                    sx={{ width: isNonMobile ? '32%' : '100%' }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                    }}
                                />

                                <TextField
                                    name="tipoQuarto"
                                    label="Tipo de Quarto"
                                    value={formikAccomodations.values.quartos.tipoQuarto}
                                    onChange={(e) => formikAccomodations.setFieldValue('quartos.tipoQuarto', e.target.value)}
                                    variant="outlined"
                                    sx={{ width: isNonMobile ? '32%' : '100%' }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                    }}
                                />

                                <TextField
                                    name="capacidade"
                                    label="Capacidade"
                                    value={formikAccomodations.values.quartos.capacidade}
                                    onChange={(e) => formikAccomodations.setFieldValue('quartos.capacidade', e.target.value)}
                                    variant="outlined"
                                    sx={{ width: isNonMobile ? '32%' : '100%' }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                    }}
                                />

                                <TextField
                                    name="valor"
                                    label="Valor"
                                    value={formikAccomodations.values.quartos.valor}
                                    onChange={(e) => formikAccomodations.setFieldValue('quartos.valor', e.target.value)}
                                    variant="outlined"
                                    sx={{ width: isNonMobile ? '32%' : '100%' }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                    }}
                                />

                                <TextField
                                    name="adicionais"
                                    label="Adicionais"
                                    value={formikAccomodations.values.quartos.adicional}
                                    onChange={(e) => formikAccomodations.setFieldValue('quartos.adicional', e.target.value)}
                                    variant="outlined"
                                    sx={{ width: isNonMobile ? '32%' : '100%' }}
                                    InputLabelProps={{
                                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem" }
                                    }}
                                />

                            </div>

                            <Button type='submit' sx={{ fontWeight: 'bold', width: '100%', height: '3rem', border: `1px solid ${blueColor}`, color: 'white', backgroundColor: blueColor, "&:hover": { color: blueColor } }}>Cadastrar Hospedagem</Button>

                        </form>
                    </TabPanel>

                    {/* ROTEIRO */}
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>

            </Box>
        </Box>
    )
}

export default NewProductPage;