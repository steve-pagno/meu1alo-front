import React from 'react';
import { useNavigate } from 'react-router-dom';

const useBaseRegisterController = (serviceFunction, baseRoute) => {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        serviceFunction(data).then((response) => {
            if(response.isSuccess){
                navigate(baseRoute);
            }
        });
    };

    return { onSubmit };
};

export default useBaseRegisterController;
