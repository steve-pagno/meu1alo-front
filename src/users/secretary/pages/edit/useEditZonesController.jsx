import React, { useEffect, useState } from 'react';
import useSecretaryService from '../../useSecretaryService';

const useEditZonesController = () => {
    const service = useSecretaryService();
    const [zones, setZones] = useState(null);

    const onDropCity = ({ destination, sourceValueIndex, subValueIds }) => {
        const sourceZoneCities = zones[sourceValueIndex].values;

        const cities = [];
        subValueIds.forEach((cityId) => {
            const index = sourceZoneCities.findIndex((city) => city.id === cityId);
            const removed = sourceZoneCities.splice(index, 1)[0];
            cities.push(removed);
        });

        zones[destination.valueIndex].values.splice(destination.subValueIndex, 0, ...cities);

        // TODO: atualizar cidade
        // Promise.all(cities.map(city => service.setZoneId(city))).then(responses => {
        setZones([...zones]);
        // });
    };

    const onNewZone = (zone) => {
        // service.createZone().then();
        //TODO: criar zona
    };

    const onEditZone = () => {
        //TODO: editar zona
    };

    const onDeleteZone = (index) => {
        // const cities = zones[index].values;
        //
        // zones[zones.length - 1].values.push(...cities);
        //
        // zones.splice(index, 1);
        //
        // setZones([...zones]);
    };

    useEffect(() => {
        service.getAllZonesWithCities().then(r => r.body).then(setZones);
    }, [service]);


    return { onDeleteZone, onDropCity, onEditZone, onNewZone, zones };
};

export default useEditZonesController;
