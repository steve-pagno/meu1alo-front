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

    // 1. Método para atualizar a qual região a cidade pertence
    const setZoneId = (cityId, zoneId) => {
        // Se a cidade for arrastada para "Cidades sem região", enviamos zone: null
        const body = zoneId ? { zone: { id: zoneId } } : { zone: null };
        // Agora usamos .patch para bater exatamente com a sua rota no CityRoutes
        return HttpHelper.patch(`${generic.pathName}/city/${cityId}`, body, generic.getUser().token).then(genericLog);
    };

    // 2. Método para Criar a região
    const createZone = (zoneData) => {
        return HttpHelper.post(`${generic.pathName}/zone`, zoneData, generic.getUser().token).then(genericLog);
    };

    // 3. Método para Deletar a região
    const deleteZone = (zoneId) => {
        return HttpHelper.deleted(`${generic.pathName}/zone/${zoneId}`, generic.getUser().token).then(genericLog);
    };

    // Retornamos todos os métodos novos no objeto final
    return { 
        ...generic, 
        getAllZonesWithCities, 
        getZones, 
        isStateSecretary, 
        registerZoneUser, 
        setZoneId, 
        createZone, 
        deleteZone 
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