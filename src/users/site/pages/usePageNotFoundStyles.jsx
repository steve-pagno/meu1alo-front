import React from 'react';
import { useTheme } from '@mui/material';

const usePageNotFoundStyles = () => {
    const theme = useTheme();

    return {
        div: {
            display: 'block',
            width: '100%'
        },
        firstLinkBox: {
            marginBottom: '10px',
            marginTop: '-20px'
        },
        link: {
            fontWeight: 'bold',
            margin: '0 15px',
        },
        linksContainer: {
            padding: '0px 20px',
        },
        toCenter: {
            [theme.breakpoints.up('md')]: {
                justifyContent: 'center',
                textAlign: 'center',
            },
            display: 'flex',
            justifyContent: 'left',
            textAlign: 'left'
        }
    };
};

export default usePageNotFoundStyles;
