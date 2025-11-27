import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const useDraggableListStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const getSubItemHeight = () => {
        if(isMobile || !window || !window.innerHeight) {
            return 300;
        }
        return (window.innerHeight - 400);
    };

    return {
        getSubItemHeight
    };
};

export default useDraggableListStyles;
