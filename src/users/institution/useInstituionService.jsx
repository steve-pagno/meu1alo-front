import GenericService from '../../helpers/GenericService';
import HttpHelper from '../../helpers/HttpHelper';
import { useGenericLogger } from '../../providers/genericLogger/GenericLogger';

const InstitutionService = (genericLog) => {
    const generic = GenericService('institution', 'institutionUser', genericLog);

    const getTypes = () => {
        return HttpHelper.get(generic.pathName+'/types', generic.getUser().token).then(genericLog);
    };

    const referralServiceRegister = (data) => {
        return HttpHelper.post('referral-service', data, generic.getUser().token).then(genericLog);
    };

    const getReferralServiceTypes = () => {
        return HttpHelper.get('referral-service/types', generic.getUser().token).then(genericLog);
    };

    return { ...generic, getReferralServiceTypes, getTypes, referralServiceRegister };
};

let institutionServiceInstance = null;
const useInstitutionService = () => {
    const { genericLog } = useGenericLogger();

    if(!institutionServiceInstance) {
        institutionServiceInstance = InstitutionService(genericLog);
    }
    return institutionServiceInstance;
};
export default useInstitutionService;
