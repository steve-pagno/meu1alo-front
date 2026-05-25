const get = (path, token, accept) => {
    return _genericFetch('GET', path, null, 'Bearer '+token, accept);
};

const post = (path, data, token) => {
    return _genericFetch('POST', path, data, 'Bearer '+token);
};

const put = (path, data, token) => {
    return _genericFetch('PUT', path, data, 'Bearer '+token);
};

const patch = (path, data, token) => {
    return _genericFetch('PATCH', path, data, 'Bearer '+token);
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

let activeRequests = 0;

const startRequest = () => {
    activeRequests++;
    if (activeRequests === 1) {
        window.dispatchEvent(new CustomEvent('global-loading', { detail: true }));
    }
};

const endRequest = () => {
    activeRequests--;
    if (activeRequests <= 0) {
        activeRequests = 0;
        window.dispatchEvent(new CustomEvent('global-loading', { detail: false }));
    }
};

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

    startRequest();
    return fetch(makeUrl(path), init).then(response => {
        let responseBodyPromise;

        if(response.headers.get('Content-Type').includes('application/json')) {
            responseBodyPromise = response.json();
        }else {
            responseBodyPromise = response.blob();
        }

        return responseBodyPromise.then(body => {
            endRequest();
            return {
                body,
                isSuccess: _isSuccess(response.status),
                message: response.message,
                status: response.status
            };
        }).catch(err => {
            endRequest();
            throw err;
        });
    }).catch(err => {
        endRequest();
        throw err;
    });
};

const makeUrl = (path) => {
    const baseUrl = import.meta.env.REACT_APP_SERVER_URL;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};

export default { deleted, get, login, logout, makeUrl, patch, post, put };
