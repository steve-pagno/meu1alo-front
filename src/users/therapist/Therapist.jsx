import React from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RedirectIfAuth, RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import ListConduct from './pages/conduct/ListConduct';
import RegisterConduct from './pages/conduct/RegisterConduct';
import EditTherapist from './pages/edit/EditTherapist';
import ListEquipment from './pages/equipment/ListEquipment';
import RegisterEquipment from './pages/equipment/RegisterEquipment';
import ListIndicator from './pages/indicator/ListIndicator';
import RegisterIndicator from './pages/indicator/RegisterIndicator';
import ListOrientation from './pages/orientation/ListOrientation';
import RegisterOrientation from './pages/orientation/RegisterOrientation';
import RegisterTherapist from './pages/register/RegisterTherapist';
import ListBaby from './pages/triage/components/ListBaby';
import ListTriage from './pages/triage/ListTriage';
import RegisterTriage from './pages/triage/RegisterTriage';
import useTherapistService from './useTherapistService';

const Therapist = () => {
    const service = useTherapistService();

    return (
        <BaseUserRoute
            baseRoute={'/fono'}
            userTypeTitle={'Fonoaudiólogo'}
            userTypeTitleWithConjunction={'do Fonoaudiólogo'}
            userType="therapist"
            service={service}
            metaRoutesLink={MetaLinkMenu}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={true}
            // Adicionado para vincular o clique no UserDropDown à rota correta
            editRoute={'/fono/perfil'} 
        >
            <Route path={'/cadastro'} element={
                <RedirectIfAuth>
                    <RegisterTherapist />
                </RedirectIfAuth>
            } />

            <Route path={'/perfil'} element={
                <RequireAuth>
                    <EditTherapist />
                </RequireAuth>
            } />

            <Route path={'/triagem'} element={
                <RequireAuth>
                    <ListTriage />
                </RequireAuth>
            } />
            <Route path={'/triagem/cadastro'} element={
                <RequireAuth>
                    <RegisterTriage />
                </RequireAuth>
            } />
            <Route path={'/bebe'} element={
                <RequireAuth>
                    <ListBaby />
                </RequireAuth>
            } />

            <Route path={'/indicador'} element={
                <RequireAuth>
                    <ListIndicator />
                </RequireAuth>
            } />
            <Route path={'/indicador/cadastro'} element={
                <RequireAuth>
                    <RegisterIndicator />
                </RequireAuth>
            } />

            <Route path={'/equipamento'} element={
                <RequireAuth>
                    <ListEquipment />
                </RequireAuth>
            } />
            <Route path={'/equipamento/cadastro'} element={
                <RequireAuth>
                    <RegisterEquipment />
                </RequireAuth>
            } />

            <Route path={'/conduta'} element={
                <RequireAuth>
                    <ListConduct />
                </RequireAuth>
            } />
            <Route path={'/conduta/cadastro'} element={
                <RequireAuth>
                    <RegisterConduct />
                </RequireAuth>
            } />

            <Route path={'/orientacao'} element={
                <RequireAuth>
                    <ListOrientation />
                </RequireAuth>
            } />
            <Route path={'/orientacao/cadastro'} element={
                <RequireAuth>
                    <RegisterOrientation />
                </RequireAuth>
            } />
        </BaseUserRoute>
    );
};

export default Therapist;