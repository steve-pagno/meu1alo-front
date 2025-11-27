import React from 'react';
import { useTheme } from '@mui/material';

const useVideoAndTextStyles = () => {
    const theme = useTheme();

    return {
        container: {
            padding: '0 100px',
        },
        margin: {
            marginBottom: '20px'
        },
        textBox:{
            [theme.breakpoints.up('md')]: {
                padding: '50px',
            },
            padding: '35px',
        },
        toCenter: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
        },
        videoBox: {
            [theme.breakpoints.up('md')]: {
                padding: '50px 50px 45px 50px',
            },
            backgroundColor: theme.palette.secondaryBlue.main,
            padding: '35px 35px 30px 35px',
        }
    };
};

export default useVideoAndTextStyles;
