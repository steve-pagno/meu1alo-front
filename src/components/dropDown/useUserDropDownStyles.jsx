import React from 'react';

const useUserDropDownStyles = () => {
    return {
        container: {
            display: 'flex'
        },
        menuPaper: {
            '&:before': {
                bgcolor: 'background.paper',
                content: '""',
                display: 'block',
                height: 10,
                position: 'absolute',
                right: 14,
                top: 0,
                transform: 'translateY(-50%) rotate(45deg)',
                width: 10,
                zIndex: 0,
            },
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            overflow: 'visible',
        },
    };
};

export default useUserDropDownStyles;
