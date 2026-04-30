import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditInstitution from './pages/edit/EditInstitution';
import RegisterReferralService from './pages/referralService/RegisterReferralService';
import useInstitutionService from './useInstituionService';

const Institution = () => {
    const service = useInstitutionService();

    return (
        <BaseUserRoute
            baseRoute={'/institucional'}
            userTypeTitle={'Institucional'}
            userTypeTitleWithConjunction={'Institucional'}
            userType="institution"
            service={service}
            metaRoutesLink={MetaLinkMenu}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={false}
            editRoute={'/institucional/minha-conta/editar'}
        >
            <Route path={'/minha-conta/editar'} element={<RequireAuth><EditInstitution /></RequireAuth>} />
            <Route path={'/servico-referencia/cadastro'} element={<RequireAuth><RegisterReferralService /></RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Institution;