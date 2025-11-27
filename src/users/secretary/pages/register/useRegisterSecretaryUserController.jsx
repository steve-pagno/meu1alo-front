import React, { useCallback, useState } from 'react';
import useSecretaryService from '../../useSecretaryService';

const useRegisterSecretaryUserController = () => {
    const service = useSecretaryService();
    const [state, setState] = useState(null);

    const getZones = useCallback(() => {
        return service.getZones(state);
    }, [service, state]);

    const onChangeState = (event) => {
        setState(event.target.value);
    };

    return { getStates: service.getStates, getZones, onChangeState, registerZoneUser: service.registerZoneUser, state };
};

export default useRegisterSecretaryUserController;
