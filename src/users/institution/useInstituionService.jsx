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

    const getMe = () => {
        return HttpHelper.get(`${generic.pathName}/me`, generic.getUser().token).then(genericLog);
    };

    const updateMe = (data) => {
        return HttpHelper.put(`${generic.pathName}/me`, data, generic.getUser().token).then(genericLog);
    };

    const getAllTriages = (data) => {
        let params = '';
        if (data) {
            if (data.babyName) params += `babyName=${data.babyName}&`;
            if (data.responsibleName) params += `responsibleName=${data.responsibleName}&`;
            if (data.evaluationDate) params += `evaluationDate=${data.evaluationDate}&`;
            if (data.testType) params += `testType=${data.testType}&`;
            if (data.rightEar) params += `rightEar=${data.rightEar}&`;
            if (data.leftEar) params += `leftEar=${data.leftEar}&`;
        }
        return HttpHelper.get(`${generic.pathName}/triage?${params}`, generic.getUser().token).then(genericLog);
    };

    const getTriageById = (id) => {
        return HttpHelper.get(`therapist/triage/${id}`, generic.getUser().token).then(genericLog);
    };

    return { ...generic, getMe, getReferralServiceTypes, getTypes, referralServiceRegister, updateMe, getAllTriages, getTriageById };
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
