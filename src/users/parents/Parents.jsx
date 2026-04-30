import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import ListParentTriages from './pages/ListParentTriages';
import EditParent from './pages/edit/EditParent';
import useParentsService from './useParentsService';

const Parents = () => {
    const service = useParentsService();

    return (
        <BaseUserRoute
            baseRoute={'/pais'}
            userTypeTitle={'Pais'}
            userTypeTitleWithConjunction={'dos Pais'}
            userType="parents"
            service={service}
            metaRoutesLink={MetaLinkMenu}
            withDashboard={false}
            withNotifications={true}
            hasRegisterRoute={false}
            editRoute={'/pais/minha-conta/editar'}
        >
            <Route path={'/minha-conta/editar'} element={<RequireAuth><EditParent /></RequireAuth>} />
            <Route
                path={'/triagens'}
                element={
                    <RequireAuth>
                        <ListParentTriages />
                    </RequireAuth>
                }
            />
        </BaseUserRoute>
    );
};

export default Parents;