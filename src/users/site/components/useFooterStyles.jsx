import React from 'react';
import { useTheme } from '@mui/material';

const useFooterStyles = () => {
    const theme = useTheme();

    return {
        container: {
            backgroundColor: theme.palette.secondary.main,
            padding: '40px'
        },
        divider: {
            backgroundColor: 'white',
            margin: '40px 0'
        },
        link: {
            fontWeight: 'bold',
            margin: '0 15px',
        },
        mail: {
            color: 'white',
            margin: '6px 6px -6px 0px'
        },
        padding:{
            paddingTop: '25px'
        },
        toCenter: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
        }
    };
};

export default useFooterStyles;
