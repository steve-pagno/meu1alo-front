import React, { useCallback, useState } from 'react';
import useInstitutionService from '../../useInstituionService';

const useRegisterReferralServiceController = () => {
    const service = useInstitutionService();
    const [state, setState] = useState(null);

    const getCities = useCallback(() => {
        return service.getCities(state);
    }, [service, state]);

    const onChangeState = (event) => {
        setState(event.target.value);
    };

    return { getCities, getStates: service.getStates, getTypes: service.getTypes,
        onChangeState, state };
};

export default useRegisterReferralServiceController;
