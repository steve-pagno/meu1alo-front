const get = (path, token, accept) => {
    return _genericFetch('GET', path, null, 'Bearer '+token, accept);
};

const post = (path, data, token) => {
    return _genericFetch('POST', path, data, 'Bearer '+token);
};

const put = (path, data, token) => {
    return _genericFetch('PUT', path, data, 'Bearer '+token);
};

const deleted = (path, token) => {
    return _genericFetch('DELETE', path, null, 'Bearer '+token);
};

const login = (path, login, password) => {
    return _genericFetch('POST', path, null, 'Basic '+btoa(login+':'+password));
};

const logout = (path, token) => {
    return _genericFetch('POST', path, null, 'Bearer '+token);
};

const _isSuccess = (status) => status >= 200 && status <= 299;

const _genericFetch = (method, path, data, auth, accept = 'application/json') => {
    const init = {
        headers: {
            'Accept': accept,
            'Content-Type': 'application/json'
        },
        method: method
    };
    if(auth) { init.headers['authorization'] = auth; }
    if(data) { init['body'] = JSON.stringify(data); }

    return fetch(makeUrl(path), init).then(response => {
        let responseBodyPromise;

        if(response.headers.get('Content-Type').includes('application/json')) {
            responseBodyPromise = response.json();
        }else {
            responseBodyPromise = response.blob();
        }

        return responseBodyPromise.then(body => ({
            body,
            isSuccess: _isSuccess(response.status),
            message: response.message,
            status: response.status
        }));
    });
};

const makeUrl = (path) => {
    const baseUrl = import.meta.env.REACT_APP_SERVER_URL;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};

export default { deleted, get, login, logout, makeUrl, post, put };
