import React from 'react';
import { useTheme } from '@mui/material';

const useEditZonesStyles = () => {
    const theme = useTheme();

    return {
        container: {
            padding: '25px 35px',
            width: 'auto',
        },
        grid:{
            display: 'grid'
        },
        saveButton: {
            [theme.breakpoints.up('sm')]: {
                width: '350px',
            },
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '0.00938e',
            textTransform: 'none',
            width: '100%'
        }
    };
};

export default useEditZonesStyles;