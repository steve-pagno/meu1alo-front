import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Typography } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import UserFieldsRegister from '../../../../components/bases/register/userFields/UserFieldsRegister';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import RegisterInstitution from '../../../institution/pages/register/RegisterInstitution';
import useSecretaryService from '../../useSecretaryService';

const inputProps = {
    general: {
        maxLength: '255'
    },
};

const RegisterInstitutionBySecretary = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useSecretaryService();

    return (
        <BaseRegisterPaper
            handleSubmit={handleSubmit}
            title={'cadastro de instituição'}
            serviceFunction={service.createInstitution}
            baseRoute={'/secretaria'}
        >
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')}
                    label="Nome completo do responsável"
                    inputProps={inputProps.general}
                    variant="outlined"
                    size="small"
                    required
                    error={errors?.name}
                />
            </Grid>

            <UserFieldsRegister register={register} errors={errors} />

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('role')}
                    label="Cargo"
                    inputProps={inputProps.general}
                    variant="outlined"
                    size="small"
                    required
                    error={errors?.role}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Contato do responsável
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails[0]')}
                    label="E-mail preferencial"
                    inputProps={inputProps.general}
                    variant="outlined"
                    size="small"
                    required
                    error={errors?.emails && errors?.emails[0]}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails[1]')}
                    label="E-mail alternativo"
                    inputProps={inputProps.general}
                    variant="outlined"
                    size="small"
                    error={errors?.emails && errors?.emails[1]}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register}
                    name="phones[0]"
                    error={errors?.phones && errors?.phones[0]}
                    label="Telefone principal"
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register}
                    name="phones[1]"
                    error={errors?.phones && errors?.phones[1]}
                    label="Telefone alternativo"
                />
            </Grid>

            <RegisterInstitution register={register} setValue={setValue} />
        </BaseRegisterPaper>
    );
};

export default RegisterInstitutionBySecretary;