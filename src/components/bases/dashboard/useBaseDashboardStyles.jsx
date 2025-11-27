import React from 'react';

const useBaseDashboardStyles = () => {
    return {
        container: {
            padding: '30px'
        },
        grid: {
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '1px 1px 1px lightgrey',
            marginBottom: '15px',
            marginRight: '15px',
            padding: '20px'
        },
        title: {
            paddingBottom: '25px',
            paddingTop: '10px'
        }
    };
};

export default useBaseDashboardStyles;
