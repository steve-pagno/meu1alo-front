import React, { useCallback, useState } from 'react';
import { Alert, Stack } from '@mui/material';

const styles = {
    alertsContainer: {
        position: 'fixed',
        right: '20px',
        top: '90px',
        width: 'fit-content',
    },
};

const isValidAlertType = (type) => {
    return type && ['error', 'warning', 'info', 'success'].includes(type);
};

const LoggerContext = React.createContext(null);
export const LoggerProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const pushAlert = useCallback((type, message) => {
        if(!message || !isValidAlertType(type)) {
            if(import.meta.env.NODE_ENV === 'development'){
                console.error('Invalid Alert', type, message);
            }
            return;
        }

        setAlerts([...alerts, { message, type }]);
        setTimeout(() => {
            alerts.pop();
            setAlerts([...alerts]);
        }, 10000);
    }, [alerts]);

    const genericLog = useCallback((response) => {
        if(response.isSuccess) {
            if(import.meta.env.NODE_ENV === 'development'){
                pushAlert('success', `${response.status} - ${response.body.fancyMessage || response.body.message || response.fancyMessage || response.message || 'OK'}`);
                console.error(response);
            }
        }else{
            pushAlert('error', `${response.status} - ${response.body.fancyMessage || response.body.message || response.fancyMessage || response.message || 'Error'}`);
            if(import.meta.env.NODE_ENV === 'development'){
                console.error(`${response.status} - ${response.body.message || response.body.message || response.message || response.fancyMessage }`);
            }
        }
        return response;
    }, [pushAlert]);

    const value = { genericLog, pushAlert };

    return (
        <LoggerContext.Provider value={value}>
            {children}
            <Stack sx={styles.alertsContainer} spacing={2}>
                {alerts.map(({ message, type }, index) => (<Alert severity={type} key={type+'_'+index}>{message}</Alert>))}
            </Stack>
        </LoggerContext.Provider>
    );
};

export const useGenericLogger = () => {
    return React.useContext(LoggerContext);
};
