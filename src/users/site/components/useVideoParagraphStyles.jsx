import React from 'react';
import { useTheme } from '@mui/material';

const useVideoParagraphStyles = () => {
    const theme = useTheme();

    return {
        textBox: {
            [theme.breakpoints.up('md')]: {
                padding: '50px 20% 40px 20%',
            },
            backgroundColor: theme.palette.tertiary.main,

            padding: '35px 35px 30px 35px',
        },
        title: {
            marginBottom: '20px'
        }
    };
};

export default useVideoParagraphStyles;
