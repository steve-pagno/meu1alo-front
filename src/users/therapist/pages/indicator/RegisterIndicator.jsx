import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';

const RegisterIndicator = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'Indicador de risco'} serviceFunction={service.indicatorRegister} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('name')} label="Nome do indicador"
                    variant="outlined" size="small" required
                />
            </Grid>
        </BaseRegisterPaper>
    );
};
export default RegisterIndicator;
