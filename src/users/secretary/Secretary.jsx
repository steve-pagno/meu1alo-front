import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RedirectIfAuth, RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditSecretary from './pages/edit/EditSecretary';
import EditZones from './pages/edit/EditZones';
import RegisterSecretaryUser from './pages/register/RegisterSecretaryUser';
import useSecretaryService from './useSecretaryService';

const Secretary = () => {
    const service = useSecretaryService();

    return (
        <BaseUserRoute
            baseRoute={'/secretaria'}
            userTypeTitle={'Secretaria'}
            userTypeTitleWithConjunction={'da Secretaria'}
            service={service}
            metaRoutesLink={MetaLinkMenu(service.getUser().user && service.getUser().user.type === 'STATE')}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={true}
        >
            <Route path={'/cadastro'} element={<RedirectIfAuth> <RegisterSecretaryUser/> </RedirectIfAuth>} />
            <Route path={'/minha-conta/:id'} element={<RequireAuth> <EditSecretary/> </RequireAuth>} />
            <Route path={'/gerenciar-regioes'} element={<RequireAuth> <EditZones/> </RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Secretary;
