import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import UserFieldsRegister from '../../../../components/bases/register/userFields/UserFieldsRegister';
import SelectField from '../../../../components/fileds/select/SelectField';
import useRegisterSecretaryUserController from './useRegisterSecretaryUserController';

const inputProps = {
    general: {
        maxLength: '255'
    },
};

const RegisterSecretaryUser = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const { getStates, getZones, onChangeState, registerZoneUser, state } = useRegisterSecretaryUserController();

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'novo usuário para a secretaria'} serviceFunction={registerZoneUser} baseRoute={'/secretaria'}>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')} label="Nome completo"
                    inputProps={inputProps.general}
                    error={errors?.name}
                    variant="outlined" size="small" required/>
            </Grid>
            <UserFieldsRegister register={register} errors={errors}/>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={getStates} loaderChildren={<CircularProgress />}>
                    {(states) => (
                        <SelectField
                            title={'Estado'} register={{ ...register('state.id') }}
                            onChange={onChangeState} required values={states}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={state? getZones: null} loaderChildren={<CircularProgress />}>
                    {(zones) => (
                        <SelectField
                            title={'Região'} register={{ ...register('zone.id') }}
                            disabled={!state} required values={zones}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('role')} label="Cargo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    error={errors?.role}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.0')} label="E-mail preferencial"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                    error={errors?.emails && errors?.emails[0]}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.1')} label="E-mail alternativo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    error={errors?.emails && errors?.emails[1]}
                />
            </Grid>
        </BaseRegisterPaper>
    );
};
export default RegisterSecretaryUser;
