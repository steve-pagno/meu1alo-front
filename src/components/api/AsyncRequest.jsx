import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const AsyncRequest = ({ children, defaultValue, isReloadAllowed = false, loaderChildren, onError, requestFunction }) => {
    const [values, setValues] = useState(defaultValue !== undefined? defaultValue : []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        executeRequest();
    }, [requestFunction]);

    const executeRequest = useCallback(() => {
        if(requestFunction) {
            if(!loading) {
                setLoading(true);
                requestFunction().then(response => {
                    if(response && response.isSuccess) {
                        setValues(response.body);
                    }else {
                        if (onError) {
                            onError(response);
                        }
                    }
                    setLoading(false);
                });
            }
        }
    }, [requestFunction]);


    if(loaderChildren && loading){
        return loaderChildren;
    }

    return <Fragment>
        <div style={{ display: 'flex' }}>
            {children(values)}
            {
                isReloadAllowed &&
                (
                    <IconButton onClick={executeRequest} size="small">
                        <ReplayIcon color={'primary'}/>
                    </IconButton>
                )
            }
        </div>
    </Fragment>;
};

export default AsyncRequest;
