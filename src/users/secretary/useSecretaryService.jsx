import React from 'react';
import GenericService from '../../helpers/GenericService';
import HttpHelper from '../../helpers/HttpHelper';
import { useGenericLogger } from '../../providers/genericLogger/GenericLogger';

const SecretaryService = (genericLog) => {
    const generic = GenericService('secretary', 'secretaryUser', genericLog);

    const getZones = (stateId) => {
        return HttpHelper.get(`${generic.pathName}/zone?stateId=${stateId}`, generic.getUser().token).then(genericLog);
    };

    const getAllZonesWithCities = () => {
        return HttpHelper.get(`${generic.pathName}/zone/with-cities`, generic.getUser().token).then(genericLog);
    };

    const registerZoneUser = (data) => {
        return HttpHelper.post(`${generic.pathName}/zone/user`, data, generic.getUser().token).then(genericLog);
    };

    const isStateSecretary = () => {
        return HttpHelper.get(`${generic.pathName}/${generic.getUser().user.id}/is-state`, generic.getUser().token).then(genericLog);
    };

    const createInstitution = (data) => {
        return HttpHelper.post('institution', data, generic.getUser().token).then(genericLog);
    };

    const setZoneId = (cityId, zoneId) => {
        const body = zoneId ? { zone: { id: zoneId } } : { zone: null };
        return HttpHelper.patch(`${generic.pathName}/city/${cityId}`, body, generic.getUser().token).then(genericLog);
    };

    const createZone = (zoneData) => {
        return HttpHelper.post(`${generic.pathName}/zone`, zoneData, generic.getUser().token).then(genericLog);
    };

    const deleteZone = (zoneId) => {
        return HttpHelper.deleted(`${generic.pathName}/zone/${zoneId}`, generic.getUser().token).then(genericLog);
    };

    const getMe = () => {
        return HttpHelper.get(`${generic.pathName}/me`, generic.getUser().token).then(genericLog);
    };

    const updateMe = (data) => {
        return HttpHelper.put(`${generic.pathName}/me`, data, generic.getUser().token).then(genericLog);
    };

    return { 
        ...generic, 
        getAllZonesWithCities, 
        getZones, 
        isStateSecretary, 
        registerZoneUser, 
        createInstitution,
        setZoneId, 
        createZone, 
        deleteZone,
        getMe,
        updateMe
    };
};

let secretaryServiceInstance = null;

const useSecretaryService = () => {
    const { genericLog } = useGenericLogger();
    if (!secretaryServiceInstance) {
        secretaryServiceInstance = SecretaryService(genericLog);
    }
    return secretaryServiceInstance;
};

export default useSecretaryService;