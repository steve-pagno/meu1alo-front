import React from 'react';
import { useTheme } from '@mui/material';

const useTextParagraphStyles = () => {
    const theme = useTheme();

    return {
        textBox: {
            [theme.breakpoints.up('md')]: {
                padding: '50px 20%',
                textAlign: 'center',
            },
            padding: '35px',

            textAlign: 'left',
        },
        title: {
            marginBottom: '20px'
        }
    };
};

export default useTextParagraphStyles;
