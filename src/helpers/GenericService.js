import HttpHelper from './HttpHelper';

const GenericService = (pathName, sessionStorageKey, genericLog) => {
    const getAll = () => {
        return HttpHelper.get(pathName, getUser().token).then(genericLog);
    };

    const get = (id) => {
        return HttpHelper.get(`${pathName}/${id}`, getUser().token).then(genericLog);
    };

    const register = (data) => {
        return HttpHelper.post(pathName, data, getUser().token).then(genericLog);
    };

    const update = (id, data) => {
        return HttpHelper.put(`${pathName}/${id}`, data, getUser().token).then(genericLog);
    };

    const login = (login, password) => {
        return HttpHelper.login(`user/${pathName}/login`, login, password).then(genericLog).then((r) => {
            if(r.isSuccess){
                localStorage.setItem(sessionStorageKey, JSON.stringify(r.body));
            }
            return r;
        });
    };

    const logout = () => {
        const token = getUser().token;
        localStorage.removeItem(sessionStorageKey);

        return HttpHelper.logout(`user/${pathName}/logout`, token).then(genericLog);
    };

    const getUser = () => {
        return JSON.parse(localStorage.getItem(sessionStorageKey)) || { token: null, user: null };
    };

    const getDashboard = () => {
        return HttpHelper.get(pathName+'/dashboard', getUser().token).then(genericLog);
    };

    const getReport = (type) => {
        return HttpHelper.get(`reports/${type}/${pathName}`, getUser().token).then(genericLog);
    };

    const getStates = () => {
        return HttpHelper.get('secretary/state', getUser().token).then(genericLog);
    };

    const getCities = (state) => {
        return HttpHelper.get('secretary/city?state='+state, getUser().token).then(genericLog);
    };

    return { get, getAll, getCities, getDashboard, getReport, getStates, getUser, login, logout, pathName, register, sessionStorageKey, update };
};

export default GenericService;
