import React  from 'react';
import BaseDashboard from '../../../components/bases/dashboard/BaseDashboard';
import { useAuth } from '../../../providers/auth/Auth';
import useInstitutionService from '../useInstituionService';

const HomeInstitution = () => {
    const auth = useAuth();
    const service = useInstitutionService();

    return (
        <React.Fragment>
            <BaseDashboard
                user={auth.user}
                getDashboard={service.getDashboard}
                getReport={service.getReport}
            />
        </React.Fragment>
    );
};

export default HomeInstitution;
