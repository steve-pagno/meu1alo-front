import React from 'react';

const useRegisterTriageController = () => {
    const [conductParams, setConductParams] =
        React.useState({ irda: null,
            leftEar: null,
            rightEar: null,
            testType: null
        });

    // const handleOnNext = (event) => {
    //     event.preventDefault();
    //     setActiveStep(activeStep + 1);
    // };

    return { };
};

export default useRegisterTriageController;
