import React from 'react';

const isTypeSmall = (length) => length <= 5;

const getSizes = (lengthTitle, isTypeSmall) => {
    if (lengthTitle > 50 || !isTypeSmall) {
        return { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 };
    }
    return { lg: 6, md: 6, sm: 12, xl: 6, xs: 12 };
};

const useBaseDashboardController = () => {
    const onClickElement = (elementIndex, type) => {
        console.log('report type', type, 'clicked element index', elementIndex);
    };

    return { getSizes, isTypeSmall, onClickElement };
};

export default useBaseDashboardController;
