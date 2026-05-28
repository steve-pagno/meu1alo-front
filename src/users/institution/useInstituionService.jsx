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

    const getTherapists = () => {
        return HttpHelper.get(`${generic.pathName}/therapist`, generic.getUser().token)
            .then(res => {
                if (res && res.isSuccess && res.body && Array.isArray(res.body)) {
                    res.body = res.body.map(t => {
                        const emailObj = t.emails?.find(e => e.isPrincipal || e.is_principal) || t.emails?.[0];
                        const phoneObj = t.phones?.find(p => p.isPrincipal || p.is_principal) || t.phones?.[0];
                        return {
                            ...t,
                            email: emailObj ? emailObj.email : 'N/A',
                            phone: phoneObj ? phoneObj.phoneNumber || phoneObj.numero || 'N/A' : 'N/A',
                            xpLabel: t.xp === 2 ? 'Mais de 5 anos' : t.xp === 1 ? 'De 2 a 5 anos' : 'Menos de 2 anos',
                            dateOfDeactivation: null
                        };
                    });
                }
                return res;
            })
            .then(genericLog);
    };

    const checkTherapistByCrfa = (crfa) => {
        return HttpHelper.get(`${generic.pathName}/therapist/check-crfa/${crfa}`, generic.getUser().token).then(genericLog);
    };

    const addOrRegisterTherapist = (data) => {
        return HttpHelper.post(`${generic.pathName}/therapist`, data, generic.getUser().token).then(genericLog);
    };

    const removeTherapist = (id) => {
        return HttpHelper.deleted(`${generic.pathName}/therapist/${id}`, generic.getUser().token)
            .then(res => {
                if (res && res.isSuccess) {
                    res.body = { id, dateOfDeactivation: new Date().toISOString() };
                }
                return res;
            })
            .then(genericLog);
    };

    return { ...generic, getMe, getReferralServiceTypes, getTypes, referralServiceRegister, updateMe, getAllTriages, getTriageById, getTherapists, checkTherapistByCrfa, addOrRegisterTherapist, removeTherapist };
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
