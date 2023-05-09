import { Box, Button, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Navbar from 'scenes/navbar';
import * as yup from "yup";
import { Formik, useFormik } from 'formik';
import ClassPick from 'components/ClassPick';

// IMAGENS
import bannerHome from 'assets/banner.png';
import bannerPlanejamento from 'assets/background-planejamento.png';
import bannerRoteiros from 'assets/background-roteiros.png';

// import { autocomplete } from 'air-port-codes-node';
import Carousel from 'widgets/Carousel';

// DATEPICKER
import DateRangeCalendar from 'components/DateRangeCalendar';

// ICONS
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import WorkIcon from '@mui/icons-material/Work';

// AIRPORT
import { autocomplete } from 'air-port-codes-node';
import { useDispatch } from 'react-redux';
import { setSearch } from 'state';
import { useNavigate } from 'react-router-dom';

const imagemStyle = {
  backgroundImage: `url(${bannerHome})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: "100%",
  height: "21vh"
};

const initialValues = {
  de: '',
  para: '',
  ida: '',
  volta: '',
  classe: ''
}
const validationValues = yup.object().shape({
  de: yup.string(),
  para: yup.string(),
  ida: yup.date(),
  volta: yup.date(),
  classe: yup.string()
});

const HomePage = () => {
  const theme = useTheme();
  const blueColor = theme.palette.background.blue;
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imagemPlanejamento = {
    backgroundImage: `url(${bannerPlanejamento})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: isNonMobile ? '45%' : '90%',
    height: '300px',
    borderRadius: '40px'
  };

  const imagemRoteiros = {
    backgroundImage: `url(${bannerRoteiros})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isNonMobile ? 'left' : '-35px 0px',
    backgroundSize: 'cover',
    width: isNonMobile ? '45%' : '90%',
    height: '300px',
    borderRadius: '40px'
  };

  // TO
  const [termSelectedTo, setTermSelectedTo] = useState("");
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [searchTermTo, setSearchTermTo] = useState("");
  const [openTo, setOpenTo] = useState(false);

  // FROM
  const [termSelectedFrom, setTermSelectedFrom] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [openFrom, setOpenFrom] = useState(false);

  // CALENDAR
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // CLASSPICK
  const refOne = useRef(null);
  const apca = autocomplete({
    key: '04af77382e',
    secret: 'c87049e666f922c',
    limit: 15
  });

  const formik = useFormik({
    initialValues: {
      de: '',
      para: '',
      ida: '',
      volta: '',
      classe: {}
    },
    onSubmit: values => {
      if (
        formik.values.de === '' |
        formik.values.para === '' |
        formik.values.ida === '' |
        formik.values.volta === '' |
        Object.keys(formik.values.classe).length === 0) {
        alert('Preencha todos os campos')
      } else {
        dispatch(setSearch({ search: values }))
      }
    }
  });

  const handleAirportInputChangeTo = async (event) => {
    const term = event.target.value;
    setSearchTermTo(term);

    if (term.length >= 3) {
      setOpenTo(true)
      apca.request(term);
      apca.onSuccess = (data) => {
        setSuggestionsTo(data.airports)
      }
      apca.onError = (data) => {
        console.log('onError', data.message);
      };

    } else {
      setSuggestionsTo([]);
    }
  };
  const handleAirportInputChangeFrom = async (event) => {
    const term = event.target.value;
    setSearchTermFrom(term);

    if (term.length >= 3) {
      setOpenFrom(true)
      apca.request(term);
      apca.onSuccess = (data) => {
        setSuggestionsFrom(data.airports)
      }
      apca.onError = (data) => {
        console.log('onError', data.message);
      };

    } else {
      setSuggestionsFrom([]);
    }
  };

  const handleTermSelectedTo = (airport) => {
    setTermSelectedTo(`${airport.iata} - ${airport.name}`)
    formik.setFieldValue('para', `${airport.iata} - ${airport.name}`)
    setOpenTo(false)
  };
  const handleTermSelectedFrom = (airport) => {
    setTermSelectedFrom(`${airport.iata} - ${airport.name}`)
    formik.setFieldValue('de', `${airport.iata} - ${airport.name}`)
    setOpenFrom(false)
  };

  const hideOnClickOutsideTo = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenTo(false)
    }
  };
  const hideOnClickOutsideFrom = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenFrom(false)
    }
  };

  const handleStartDate = (newStartDate) => {
    setStartDate(newStartDate)
    formik.setFieldValue('ida', startDate)
  }
  const handleEndDate = (newEndDate) => {
    setEndDate(newEndDate)
    formik.setFieldValue('volta', endDate)
  }

  const handleSubmitClass = (values) => {
    formik.setFieldValue('classe', values)
  }

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutsideTo, true)
    document.addEventListener("click", hideOnClickOutsideFrom, true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{
        backgroundColor: blueColor,
        width: "100%",
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={imagemStyle}></div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationValues}
        >
          {({ values }) => (
            <form onSubmit={formik.handleSubmit}>
              {isNonMobile ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: 'center',
                    gap: "1rem",
                    justifyContent: "space-evenly"
                  }}>

                  <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    top: '-35px',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '1rem',
                  }}>
                    <TextField
                      label={isNonMobile ? 'De' : ''}
                      value={termSelectedFrom ? termSelectedFrom : searchTermFrom}
                      name="de"
                      variant="filled"
                      onChange={handleAirportInputChangeFrom}
                      InputProps={{
                        style: { backgroundColor: "white", borderRadius: "4px", fontWeight: 600 },
                        placeholder: 'País, Cidade ou aeroporto',
                        startAdornment: isNonMobile ? (
                          <InputAdornment sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingRight: '10px'
                          }}><FlightTakeoffIcon sx={{ color: 'black' }} /></InputAdornment>
                        ) : (<></>)
                      }}
                      InputLabelProps={{
                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem", marginLeft: '30px' }
                      }}
                    />


                    {searchTermFrom.length >= 3 && openFrom && (
                      <Box sx={{
                        position: 'absolute',
                        width: '150%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '40px',
                        zIndex: '999',
                      }}>
                        <ul style={{
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          listStyle: 'none',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem'
                        }}>
                          {suggestionsFrom.map((airport) => (
                            <li
                              key={airport.icao}
                              onClick={() => {
                                handleTermSelectedFrom(airport);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <LocalAirportIcon sx={{ color: 'black' }} />
                              {airport.iata} - {airport.name}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    top: '-35px',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '1rem',
                  }}>

                    <TextField
                      label={isNonMobile ? 'Para' : ''}
                      value={termSelectedTo ? termSelectedTo : searchTermTo}
                      type="De"
                      variant="filled"
                      onChange={handleAirportInputChangeTo}
                      InputProps={{
                        style: { backgroundColor: "white", borderRadius: "4px", fontWeight: 600 },
                        placeholder: 'País, Cidade ou aeroporto',
                        startAdornment: isNonMobile ? (
                          <InputAdornment sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingRight: '10px'
                          }}><FlightLandIcon sx={{ color: 'black' }} /></InputAdornment>
                        ) : (<></>)
                      }}
                      InputLabelProps={{
                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem", marginLeft: '30px' }
                      }}
                    />

                    {searchTermTo.length >= 3 && openTo && (
                      <Box sx={{
                        position: 'absolute',
                        width: '150%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '40px',
                        zIndex: '999',
                      }}>
                        <ul style={{
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          listStyle: 'none',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem'
                        }}>
                          {suggestionsTo.map((airport) => (
                            <li
                              key={airport.icao}
                              onClick={() => handleTermSelectedTo(airport)}
                              style={{ cursor: 'pointer' }}
                            >
                              <LocalAirportIcon sx={{ color: 'black' }} />
                              {airport.iata} - {airport.name}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}

                  </Box>

                  <DateRangeCalendar startDate={handleStartDate} endDate={handleEndDate} filter={true} />

                  <ClassPick onApply={handleSubmitClass} />

                  <Button
                    type="submit"
                    sx={{
                      p: "1rem",
                      width: '200px',
                      position: 'relative', top: '-35px',
                      heigth: "85px",
                      backgroundColor: '#567EBB',
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": { color: blueColor, backgroundColor: 'white' },
                      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)"
                    }}
                  >Buscar
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: "1rem",
                    justifyContent: "space-evenly"
                  }}>

                  <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '1rem',
                    width: '100%'
                  }}>
                    <TextField
                      sx={{ width: '100%' }}
                      label='De'
                      value={termSelectedFrom ? termSelectedFrom : searchTermFrom}
                      name="de"
                      variant="filled"
                      onChange={handleAirportInputChangeFrom}
                      InputProps={{
                        style: { backgroundColor: "white", borderRadius: "4px", fontWeight: 600 },
                        placeholder: 'País, Cidade ou aeroporto',
                        startAdornment: isNonMobile ? (
                          <InputAdornment sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingRight: '10px'
                          }}><FlightTakeoffIcon sx={{ color: 'black' }} /></InputAdornment>
                        ) : (<></>)
                      }}
                      InputLabelProps={{
                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem", marginLeft: isNonMobile ? '30px' : '' }
                      }}
                    />

                    {searchTermFrom.length >= 3 && openFrom && (
                      <Box sx={{
                        position: 'absolute',
                        width: '150%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '40px',
                        zIndex: '999',
                      }}>
                        <ul style={{
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          listStyle: 'none',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem'
                        }}>
                          {suggestionsFrom.map((airport) => (
                            <li
                              key={airport.icao}
                              onClick={() => {
                                handleTermSelectedFrom(airport);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <LocalAirportIcon sx={{ color: 'black' }} />
                              {airport.iata} - {airport.name}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '1rem',
                    width: '100%'
                  }}>
                    <TextField
                      sx={{ width: '100%' }}
                      label='Para'
                      value={termSelectedTo ? termSelectedTo : searchTermTo}
                      type="De"
                      variant="filled"
                      onChange={handleAirportInputChangeTo}
                      InputProps={{
                        style: { backgroundColor: "white", borderRadius: "4px", fontWeight: 600 },
                        placeholder: 'País, Cidade ou aeroporto',
                        startAdornment: isNonMobile ? (
                          <InputAdornment sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingRight: '10px'
                          }}><FlightLandIcon sx={{ color: 'black' }} /></InputAdornment>
                        ) : (<></>)
                      }}
                      InputLabelProps={{
                        style: { color: blueColor, fontWeight: "bold", fontSize: "1rem", marginLeft: isNonMobile ? '30px' : '' }
                      }}
                    />
                    {searchTermTo.length >= 3 && openTo && (
                      <Box sx={{
                        position: 'absolute',
                        width: '150%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '40px',
                        zIndex: '999',
                      }}>
                        <ul style={{
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          listStyle: 'none',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem'
                        }}>
                          {suggestionsTo.map((airport) => (
                            <li
                              key={airport.icao}
                              onClick={() => handleTermSelectedTo(airport)}
                              style={{ cursor: 'pointer' }}
                            >
                              <LocalAirportIcon sx={{ color: 'black' }} />
                              {airport.iata} - {airport.name}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}

                  </Box>

                  <DateRangeCalendar startDate={handleStartDate} endDate={handleEndDate} filter={true} />

                  <ClassPick onApply={handleSubmitClass} />

                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      p: "1rem",
                      position: 'relative',
                      heigth: "85px",
                      backgroundColor: '#567EBB',
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": { color: blueColor, backgroundColor: 'white' },
                      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)"
                    }}
                  >Buscar
                  </Button>
                </Box>
              )}
            </form>
          )}
        </Formik>


        {isNonMobile ? (
          <Box sx={{
            backgroundColor: 'white',
            width: '80%',
            height: 'auto',
            marginBottom: '100px',
            padding: '50px',
            borderRadius: '40px'
          }}>
            <Typography></Typography>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>

              <Button onClick={() => navigate('/packages')} sx={{ '&:hover': { boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)" } }} style={imagemPlanejamento}></Button>
              <Button sx={{ '&:hover': { boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)" } }} style={imagemRoteiros}></Button>
            </Box>

          </Box>
        ) : (

          <Box sx={{
            backgroundColor: 'white',
            width: '100%',
            height: 'auto',
            marginBottom: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '50px',
            gap: '1rem'
          }}>

            <Button sx={{ '&:hover': { boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)" } }} style={imagemPlanejamento}></Button>
            <Button sx={{ '&:hover': { boxShadow: "4px 4px 2px rgba(0, 0, 0, 0.3)" } }} style={imagemRoteiros}></Button>
          </Box>
        )}


        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7rem', marginBottom: '100px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: isNonMobile ? 'row' : 'column', width: isNonMobile ? '80rem' : '100%', color: 'white', gap: '0.5rem' }}>
            {isNonMobile ? (
              <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Typography sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0.6rem', fontSize: '20px' }}><WorkIcon />Pacotes populares</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                  Aqui estão algumas opções de pacotes de viagem que podem tornar suas próximas férias ainda mais incríveis.
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', fontSize: '25px' }}><WorkIcon />Pacotes</Typography>
            )}

            <Carousel />
          </Box>


          <Box sx={{ display: 'flex', flexDirection: isNonMobile ? 'row' : 'column-reverse', justifyContent: 'space-between', width: isNonMobile ? '80rem' : '100%', color: 'white', gap: '0.5rem' }}>
            <Carousel />

            {isNonMobile ? (
              <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '20px' }}><LocalAirportIcon />Roteiros famosos</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'right' }}>
                  Confira agora nossas incríveis ofertas! Temos preços arrasadores para os melhores destinos nacionais e internacionais. Não perca mais tempo e reserve sua viagem hoje mesmo!
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', fontSize: '25px' }}><LocalAirportIcon />Passagens aéreas</Typography>
            )}


          </Box>

        </Box>

      </Box>
    </Box >
  )
}

export default HomePage;