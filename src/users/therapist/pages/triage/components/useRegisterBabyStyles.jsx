import React from 'react';

const useRegisterBabyStyles = () => {

    return {
        primaryButton: {
            '&:hover': {
                background: 'linear-gradient(45deg, #441f5c 0%, #5D307A 100%)',
                boxShadow: '0 6px 16px rgba(93, 48, 122, 0.4)',
                transform: 'translateY(-1px)'
            },
            background: 'linear-gradient(45deg, #5D307A 0%, #8247ab 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(93, 48, 122, 0.2)',
            fontWeight: 700,
            px: 3,
            py: 1,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out'
        },
        secondaryButton: {
            '&:hover': {
                background: 'linear-gradient(45deg, #20999d 0%, #2db7bc 100%)',
                boxShadow: '0 6px 16px rgba(45, 183, 188, 0.35)',
                transform: 'translateY(-1px)'
            },
            background: 'linear-gradient(45deg, #2db7bc 0%, #4bd1d6 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(45, 183, 188, 0.2)',
            fontWeight: 700,
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

export default useRegisterBabyStyles;
