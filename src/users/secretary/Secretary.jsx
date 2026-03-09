import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditSecretary from './pages/edit/EditSecretary';
import EditZones from './pages/edit/EditZones';
import RegisterSecretaryUser from './pages/register/RegisterSecretaryUser';
import RegisterInstitutionBySecretary from './pages/register/RegisterInstitutionBySecretary';
import useSecretaryService from './useSecretaryService';

const Secretary = () => {
    const service = useSecretaryService();

    const [isState, setIsState] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const user = service.getUser()?.user;

            if (user) {
                setUserId(user.id);

                if (user.type === 'STATE') {
                    setIsState(true);
                } else {
                    try {
                        const response = await service.isStateSecretary();
                        if (response && response.body) {
                            setIsState(true);
                        }
                    } catch (error) {
                        // ignora se não for secretaria estadual
                    }
                }
            }
        };

        checkUser();
    }, [service]);

    return (
        <BaseUserRoute
            baseRoute={'/secretaria'}
            userTypeTitle={'Secretaria'}
            userTypeTitleWithConjunction={'da Secretaria'}
            userType="secretary"
            service={service}
            metaRoutesLink={MetaLinkMenu(isState, userId)}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={false}
        >
            <Route path={'/novo-cadastro'} element={<RequireAuth><RegisterSecretaryUser /></RequireAuth>} />
            <Route path={'/instituicao/cadastro'} element={<RequireAuth><RegisterInstitutionBySecretary /></RequireAuth>} />
            <Route path={'/minha-conta/:id'} element={<RequireAuth><EditSecretary /></RequireAuth>} />
            <Route path={'/gerenciar-regioes'} element={<RequireAuth><EditZones /></RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Secretary;