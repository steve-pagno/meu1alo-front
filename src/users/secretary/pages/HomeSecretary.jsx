import React from 'react';
import BaseDashboard from '../../../components/bases/dashboard/BaseDashboard';
import { useAuth } from '../../../providers/auth/Auth';
import useSecretaryService from '../useSecretaryService';

const HomeSecretary = () => {
    const auth = useAuth();
    const service = useSecretaryService();

    return (
        <BaseDashboard
            user={auth.user}
            getDashboard={service.getDashboard}
            getReport={service.getReport}
        />
    );
};

export default HomeSecretary;
