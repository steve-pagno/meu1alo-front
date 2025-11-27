import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import useSecretaryService from '../../useSecretaryService';

const EditSecretary = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useSecretaryService();
    const { id } = useParams();

    return (
        <BaseEditPaper title={'Secretaria'}
            handleSubmit={handleSubmit}
            serviceFunction={service.update}
            serviceGetFunction={service.get}
            setValue={setValue} id={id}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('nameOfSecretary')} label="Nome secretaria"
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('password')} label="Senha"
                    type="password" variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('passwordConfirm')} label="Confirmação de senha"
                    type="password" variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('preferentialEmail')} label="E-mail preferencial"
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('alternativeEmail')} label="E-mail alternativo"
                    variant="outlined" size="small"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Endereço
                </Typography>
            </Grid>
        </BaseEditPaper>
    );
};
export default EditSecretary;
