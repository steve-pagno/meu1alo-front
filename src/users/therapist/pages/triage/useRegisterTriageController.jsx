import React from 'react';

const useRegisterTriageController = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleOnNext = (event) => {
        event.preventDefault();
        setActiveStep(activeStep + 1);
    };

    return { activeStep, handleOnNext, setActiveStep };
};

export default useRegisterTriageController;
