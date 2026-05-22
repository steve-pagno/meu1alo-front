import React from 'react';

const useRegisterResponsibleStyles = () => {

    return {
        addButton: {
            '&:hover': {
                background: 'linear-gradient(45deg, #20999d 0%, #2db7bc 100%)',
                boxShadow: '0 6px 16px rgba(45, 183, 188, 0.4)',
                transform: 'translateY(-1px)'
            },
            background: 'linear-gradient(45deg, #2db7bc 0%, #4bd1d6 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(45, 183, 188, 0.25)',
            fontWeight: 700,
            mt: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out'
        },
        grid: {
            marginBottom: '40px',
            marginTop: '20px'
        },
        removeButton: {
            '&:hover': {
                background: 'linear-gradient(45deg, #cc2354 0%, #E83268 100%)',
                boxShadow: '0 6px 16px rgba(232, 50, 104, 0.4)',
                transform: 'translateY(-1px)'
            },
            background: 'linear-gradient(45deg, #E83268 0%, #ff5c8c 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(232, 50, 104, 0.2)',
            fontWeight: 700,
            mt: 1,
            px: 3,
            py: 1,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out'
        },
        textTitle: {
            marginTop: '40px'
        }
    };
};

export default useRegisterResponsibleStyles;
