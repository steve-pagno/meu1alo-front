import React from 'react';
import { useTheme } from '@mui/material';
import LoginUX from '../../../icons/login/Prancheta 9.svg';

const useBaseLoginStyles = () => {
    const theme = useTheme();

    return {
        container: {
            [theme.breakpoints.up('sm')]: {
                backgroundColor: undefined,
                backgroundImage: `url("${LoginUX}")`,
                backgroundPosition: '0px -1%',
                backgroundSize: 'auto 36%',
            },

            [theme.breakpoints.up('md')]: {
                backgroundPosition: '0px -31%',
                backgroundSize: 'auto 54%',
            },

            [theme.breakpoints.up('lg')]: {
                backgroundPosition: '0px -110%',
                backgroundSize: 'auto 70%',
            },

            [theme.breakpoints.up('xl')]: {
                backgroundPosition: '0px -582px',
                backgroundSize: 'auto 103%',
            },

            backgroundColor: theme.palette.secondaryBlue.main,
        },
        forgotPassword: {
            marginBottom: '20px'
        },
        icon: {
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
        },
        iconHeart: {

        },
        loginDescription: {
            fontSize: '14px'
        },
        paper: {
            [theme.breakpoints.up('sm')]: {
                margin: '40px',
            },
            [theme.breakpoints.up('md')]: {
                marginLeft: '8%',
                marginRight: '8%',
            },

            [theme.breakpoints.up('lg')]: {
                marginLeft: '14%',
                marginRight: '14%',
            },
            [theme.breakpoints.up('xl')]: {
                marginLeft: '23%',
                marginRight: '23%',
            },
            margin: '0px',
            padding: '30px',
            textAlign: 'center'
        },
        partnersColor: theme.palette.background.default,
        subtitle: {
            fontSize: '14px'
        },
    };
};

export default useBaseLoginStyles;
