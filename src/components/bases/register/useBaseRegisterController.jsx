import React from 'react';
import { useNavigate } from 'react-router-dom';

const useBaseRegisterController = (serviceFunction, baseRoute) => {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        serviceFunction(data).then((response) => {
            if(response.isSuccess){
                const message = response.result?.message || 'Cadastro realizado com sucesso!';
                alert(message);
                navigate(baseRoute);
            }
        });
    };

    return { onSubmit };
};

export default useBaseRegisterController;
