import { useCallback, useEffect, useState } from 'react';
import { useGenericLogger } from '../../../../providers/genericLogger/GenericLogger';
import useSecretaryService from '../../useSecretaryService';

const useEditZonesController = () => {
    const service = useSecretaryService();
    const { genericLog } = useGenericLogger(); // Importamos o disparador de avisos da tela

    const [zones, setZones] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newZoneName, setNewZoneName] = useState('');

    const [isMaster, setIsMaster] = useState(false);

    const fetchZones = useCallback(() => {
        service.getAllZonesWithCities().then(r => r.body).then(setZones);
    }, [service]);

    useEffect(() => {
        fetchZones();

        // Verificação Definitiva e à prova de falhas:
        const currentUser = service.getUser()?.user;

        // Se o usuário logado existe e NÃO possui uma zona vinculada, ele é a Estadual (Master)
        if (currentUser && !currentUser.zone) {
            setIsMaster(true);
        } else {
            setIsMaster(false);
        }
    }, [fetchZones, service]);

    const onDropCity = ({ destination, sourceValueIndex, subValueIds }) => {
        if (!zones) { return; }

        // Bloqueio com aviso na tela
        if (!isMaster) {
            genericLog({ message: 'Acesso Negado: Apenas a Secretaria Estadual pode mover municípios e editar regiões.', type: 'error' });
            fetchZones();
            return;
        }

        const newZones = [...zones];
        const sourceZoneCities = newZones[sourceValueIndex].values;
        const destZoneId = newZones[destination.valueIndex].id;

        const cities = [];
        subValueIds.forEach((cityId) => {
            const index = sourceZoneCities.findIndex((city) => city.id === cityId);
            const removed = sourceZoneCities.splice(index, 1)[0];
            cities.push(removed);
        });

        newZones[destination.valueIndex].values.splice(destination.subValueIndex, 0, ...cities);
        setZones(newZones);

        Promise.all(cities.map(city => service.setZoneId(city.id, destZoneId)))
            .catch(() => {
                // Erro no banco usando aviso nativo
                genericLog({ message: 'Ocorreu um erro ao salvar a alteração. A tela será recarregada.', type: 'error' });
                fetchZones();
            });
    };

    const handleOpenDialog = () => {
        if (!isMaster) { return; }
        setNewZoneName('');
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const submitNewZone = () => {
        if (!isMaster) { return; }

        if (newZoneName && newZoneName.trim() !== '') {
            const stateId = service.getUser()?.user?.state?.id || service.getUser()?.user?.id;

            service.createZone({
                secretary: { name: newZoneName },
                state: { id: stateId }
            }).then(() => {
                genericLog({ message: 'Região criada com sucesso!', type: 'success' });
                fetchZones();
                setIsDialogOpen(false);
            }).catch(() => {
                genericLog({ message: 'Erro ao criar a região. Verifique os dados.', type: 'error' });
            });
        }
    };

    const onEditZone = (index) => {
        if (!isMaster) { return; }
        // Substitui o alerta feio por um aviso informativo ("info")
        genericLog({ message: 'Para alterar o nome de uma região, edite o perfil daquela Secretaria Regional.', type: 'info' });
    };

    const onDeleteZone = (index) => {
        if (!isMaster) { return; }

        const newZones = [...zones];
        const zoneToDelete = newZones[index];

        // O Confirm continua nativo porque ele exige que o usuário clique em "OK" ou "Cancelar" para prosseguir
        if (window.confirm(`Tem certeza que deseja excluir a região "${zoneToDelete.title}"?`)) {
            service.deleteZone(zoneToDelete.id).then(() => {
                genericLog({ message: 'Região excluída com sucesso!', type: 'success' });

                const cities = newZones[index].values;
                newZones[newZones.length - 1].values.push(...cities);
                newZones.splice(index, 1);
                setZones(newZones);
            }).catch(() => {
                genericLog({ message: 'Ocorreu um erro ao tentar excluir a região.', type: 'error' });
            });
        }
    };

    return {
        handleCloseDialog, handleOpenDialog, isDialogOpen, isMaster,
        newZoneName, onDeleteZone, onDropCity, onEditZone, setNewZoneName, submitNewZone,
        zones
    };
};

export default useEditZonesController;