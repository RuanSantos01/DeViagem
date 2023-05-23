import { TextField } from '@mui/material';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const PhoneInput = ({ handleChange, value }) => {
    const [mask, setMask] = useState("(99) 99999-9999");

    return (
        <InputMask
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            mask={mask}
            onBlur={e => {
                if (e.target.value.replace("_", "").length === 14) {
                    setMask("(99) 9999-9999");
                }
            }}
            onFocus={e => {
                if (e.target.value.replace("_", "").length === 14) {
                    setMask("(99) 99999-9999");
                }
            }}
        >
            {(inputProps) => (
                <TextField
                    fullWidth
                    label="Celular"
                    {...inputProps}
                />
            )}
        </InputMask>
    );
};

export default PhoneInput;