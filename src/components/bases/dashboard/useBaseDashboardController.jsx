import React from 'react';

const isTypeSmall = (length) => length <= 5;

const getSizes = (lengthTitle, isTypeSmall) => {
    if (lengthTitle > 50 || !isTypeSmall) {
        return { xl: 6, xs: 12 };
    }
    return { lg: 4, md: 4, sm: 8, xl: 2, xs: 12 };
};

const useBaseDashboardController = () => {
    const onClickElement = (elementIndex, type) => {
        console.log('report type', type, 'clicked element index', elementIndex);
    };

    return { getSizes, isTypeSmall, onClickElement };
};

export default useBaseDashboardController;
