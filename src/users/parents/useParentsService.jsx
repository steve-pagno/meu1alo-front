import React from 'react';
import GenericService from '../../helpers/GenericService';
import { useGenericLogger } from '../../providers/genericLogger/GenericLogger';

const ParentsService = (genericLog) => {
    const generic= GenericService('parents', 'parentUser', genericLog);

    return { ...generic };
};

let parentsServiceInstance = null;
const useParentsService = () => {
    const { genericLog } = useGenericLogger();
    if(!parentsServiceInstance) {
        parentsServiceInstance = ParentsService(genericLog);
    }
    return parentsServiceInstance;
};
export default useParentsService;
