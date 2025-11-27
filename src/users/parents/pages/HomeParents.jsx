import React from 'react';
import BaseDashboard from '../../../components/bases/dashboard/BaseDashboard';
import { useAuth } from '../../../providers/auth/Auth';
import useParentsService from '../useParentsService';

const HomeParents = () => {
    const auth = useAuth();
    const service = useParentsService();

    return (
        <BaseDashboard
            user={auth.user}
            getDashboard={service.getDashboard}
            getReport={service.getReport}
        />
    );
};

export default HomeParents;
