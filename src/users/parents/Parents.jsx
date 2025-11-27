import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import useParentsService from './useParentsService';

const Parents = () => {
    const service = useParentsService();

    return (
        <BaseUserRoute
            baseRoute={'/pais'}
            userTypeTitle={'Pais'}
            userTypeTitleWithConjunction={'dos Pais'}
            service={service}
            metaRoutesLink={MetaLinkMenu}
            withDashboard={false}
            withNotifications={true}
            hasRegisterRoute={false}
        >
            <Route path={'/meu-bebe'} element={<RequireAuth> informações </RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Parents;
