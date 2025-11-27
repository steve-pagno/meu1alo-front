import React from 'react';
import { useTheme } from '@mui/material';

const useDraggableListAccordionStyles = () => {
    const theme = useTheme();

    return {
        accordionSummary: {
            div: {
                margin: '0 !important',
                padding: '0 !important'
            },
            flexDirection: 'row-reverse',
            minHeight: '44px !important',
            padding: '0 0 0 5px',
        },
        headerPaper: {
            alignSelf: 'center',
        },
        headerPaperContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
        iconColor: {
            color: 'white',
        },
        listContainer: {
            backgroundColor: theme.palette.secondaryBlue.main,
            margin: 0,
            padding: '5px',
            width: '307px'
        },
        popup: {
            [theme.breakpoints.up('sm')]: {
                width: '500px'
            },
            [theme.breakpoints.up('md')]: {
                width: '600px'
            },
            width: '300px',
        }
    };
};

export default useDraggableListAccordionStyles;
