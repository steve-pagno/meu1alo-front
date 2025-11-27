import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import UserFieldsRegister from '../../../../components/bases/register/userFields/UserFieldsRegister';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    crfa: {
        maxLength: '8',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    },
};

const RegisterTherapist = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'Fonoaudiólogo'} serviceFunction={service.register} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')} label="Nome completo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                    error={errors?.name}
                />
            </Grid>
            <UserFieldsRegister register={register} errors={errors}/>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('crfa')} label="CRFa"
                    inputProps={inputProps.crfa}
                    variant="outlined" size="small" required
                    error={errors?.crfa}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={service.getXpTypes} loaderChildren={<CircularProgress />}>
                    {(xps) => (
                        <SelectField
                            title={'Tempo de experiência'}
                            register={{ ...register('xp') }}
                            required values={xps}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={service.getAllInstitutions} loaderChildren={<CircularProgress />}>
                    {(institutions) => (
                        <SelectField
                            title={'Instituições'}
                            register={{ ...register('institutions') }}
                            required values={institutions} multiple
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
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
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones.0" error={errors?.phones && errors?.phones[0]}
                    label="Telefone principal" variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones.1" error={errors?.phones && errors?.phones[1]}
                    label="Telefone alternativo" variant="outlined" size="small"
                />
            </Grid>
        </BaseRegisterPaper>
    );
};
export default RegisterTherapist;
