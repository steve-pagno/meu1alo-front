import React from 'react';
import GenericService from '../../helpers/GenericService';
import HttpHelper from '../../helpers/HttpHelper';
import { useGenericLogger } from '../../providers/genericLogger/GenericLogger';

const ParentsService = (genericLog) => {
    const generic = GenericService('parents', 'parentUser', genericLog);

    const getAllTriages = () => {
        return HttpHelper.get('parents/triage', generic.getUser().token).then(genericLog);
    };

    const getMe = () => {
        return HttpHelper.get(`${generic.pathName}/me`, generic.getUser().token).then(genericLog);
    };

    const updateMe = (data) => {
        return HttpHelper.put(`${generic.pathName}/me`, data, generic.getUser().token).then(genericLog);
    };

    return {
        ...generic,
        getAllTriages,
        getMe,
        updateMe
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