import React from 'react';
import { CircularProgress, Divider, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const useBaseRegisterController = (serviceFunction, baseRoute, setNotify) => {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        serviceFunction(data).then((response) => {
            if (response.isSuccess) {
                const message = response.result?.message || 'Cadastro realizado com sucesso!';
                
                if (setNotify) {
                    setNotify({
                        open: true,
                        message: message,
                        severity: 'success'
                    });
                    setTimeout(() => navigate(baseRoute), 2000);
                } else {
                    // Se não houver setNotify, apenas navega sem alert
                    console.log(message); 
                    navigate(baseRoute);
                }
            } else {
                if (setNotify) {
                    setNotify({
                        open: true,
                        message: response.error?.message || 'Erro ao realizar cadastro.',
                        severity: 'error'
                    });
                } else {
                    // Fallback para erro caso setNotify não exista
                    console.error('Erro no cadastro');
                }
            }
        });
    };

    return { onSubmit };
};

export default useBaseRegisterController;