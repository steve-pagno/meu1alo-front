import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../providers/auth/Auth';

const useBaseLoginController = () => {
    const { handleSubmit, register } = useForm();
    const auth = useAuth();

    const onSubmit = (data, event) => {
        event.preventDefault();
        auth.login(data.login, data.password);
    };

    return { onSubmit: handleSubmit(onSubmit), register };
};

export default useBaseLoginController;
