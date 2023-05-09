import { FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { setLogout } from 'state';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {

  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const user = useSelector((state) => state.user);
  const userName = user ? user.fullName : false;

  const navigate = useNavigate();

  const theme = useTheme();
  const background = theme.palette.background.blue;
  const neutralLight = theme.palette.neutral.light;

  const logout = () => {
    dispatch(setLogout())
    window.location.reload();
  }

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={background} sx={{ width: '100%' }} boxShadow="0px 2px 2px rgba(0,0,0,0.3)">
      <FlexBetween gap="1.75rem" >
        <Typography
          onClick={() => navigate("/home")}
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.5rem)"
          color="white"
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          DeViagem
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Código aqui.." />
            <IconButton><Search /></IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {user ? (
        <FormControl variant="standard" value={userName}>
          <Select value={userName} sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem"
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight
            }
          }}
            input={<InputBase />}
          >
            <MenuItem value={userName}>
              <Typography>{userName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => logout()}>Sair</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FlexBetween
          onClick={() => navigate("/login")}
          gap="0.25rem"
          sx={{
            backgroundColor: "#f0f0f0",
            boxShadow: "0px 10px 14px -7px #276873",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#2b4c7e",
            padding: "10px 10px",
            "&:hover": {
              backgroundColor: "#2b4c7e",
              color: neutralLight
            }
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "20px" }} />
          <Typography sx={{
            fontSize: "15px",
            fontWeight: "bold",
          }}>Entrar</Typography>
        </FlexBetween>
      )}

    </FlexBetween>
  )
}

export default Navbar;