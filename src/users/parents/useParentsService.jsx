import React from 'react';
import GenericService from '../../helpers/GenericService';
import HttpHelper from '../../helpers/HttpHelper';
import { useGenericLogger } from '../../providers/genericLogger/GenericLogger';

const ParentsService = (genericLog) => {
    const generic = GenericService('parents', 'parentUser', genericLog);

    const getAllTriages = () => {
        return HttpHelper.get('parents/triage', generic.getUser().token).then(genericLog);
    };

    return {
        ...generic,
        getAllTriages
    };
};

let parentsServiceInstance = null;
const useParentsService = () => {
    const { genericLog } = useGenericLogger();
    if (!parentsServiceInstance) {
        parentsServiceInstance = ParentsService(genericLog);
    }
    return parentsServiceInstance;
};

export default useParentsService;