import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RedirectIfAuth, RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditInstitution from './pages/edit/EditInstitution';
import RegisterReferralService from './pages/referralService/RegisterReferralService';
import RegisterInstitutionUser from './pages/register/RegisterInstitutionUser';
import useInstitutionService from './useInstituionService';

const Institution = () => {
    const service = useInstitutionService();

    return (
        <BaseUserRoute
            baseRoute={'/institucional'}
            userTypeTitle={'Institucional'}
            userTypeTitleWithConjunction={'Institucional'}
            service={service}
            metaRoutesLink={MetaLinkMenu}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={true}
        >
            <Route path={'/cadastro'} element={<RedirectIfAuth> <RegisterInstitutionUser/> </RedirectIfAuth>} />
            <Route path={'/minha-conta/:id'} element={<RequireAuth> <EditInstitution/> </RequireAuth>} />
            <Route path={'/servico-referencia/cadastro'} element={<RequireAuth> <RegisterReferralService/> </RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Institution;
