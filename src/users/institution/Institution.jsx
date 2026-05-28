import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditInstitution from './pages/edit/EditInstitution';
import RegisterReferralService from './pages/referralService/RegisterReferralService';
import ListTriage from './pages/triage/ListTriage';
import ViewTriage from './pages/triage/ViewTriage';
import ListTherapists from './pages/therapist/ListTherapists';
import RegisterTherapistByInstitution from './pages/therapist/RegisterTherapistByInstitution';
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
            <Route path={'/triagem'} element={<RequireAuth><ListTriage /></RequireAuth>} />
            <Route path={'/triagem/:id'} element={<RequireAuth><ViewTriage /></RequireAuth>} />
            <Route path={'/fonoaudiologos'} element={<RequireAuth><ListTherapists /></RequireAuth>} />
            <Route path={'/fonoaudiologos/cadastro'} element={<RequireAuth><RegisterTherapistByInstitution /></RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Institution;