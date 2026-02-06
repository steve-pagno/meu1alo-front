import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import UserFieldsRegister from '../../../../components/bases/register/userFields/UserFieldsRegister';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useInstitutionService from '../../useInstituionService';
import RegisterInstitution from './RegisterInstitution';

const inputProps = {
    general: {
        maxLength: '255'
    },
};

const RegisterInstitutionUser = () => {
    const { formState: { errors }, handleSubmit, register, setValue, watch } = useForm();
    const service = useInstitutionService();
    const [isRegisterInstitutionOpen, setIsRegisterInstitutionOpen] = useState(false);

    const handleRegisterInstitution = React.useCallback(() => {
        setValue('institution.id', undefined);
        setIsRegisterInstitutionOpen(!isRegisterInstitutionOpen);
    }, [isRegisterInstitutionOpen, setValue]);

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'Usuário Instituição'} serviceFunction={service.register} baseRoute={'/institucional'}>
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
                    {...register('role')} label="Cargo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
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
                    {...register('emails[0]')} label="E-mail preferencial"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                    error={errors?.emails && errors?.emails[0]}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails[1]')} label="E-mail alternativo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    error={errors?.emails && errors?.emails[1]}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones[0]"
                    error={errors?.phones && errors?.phones[0]} label="Telefone principal" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones[1]"
                    error={errors?.phones && errors?.phones[0]} label="Telefone alternativo"
                />
            </Grid>
            {isRegisterInstitutionOpen === false &&
                <React.Fragment>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography  variant={'h6'}>
                            Instituição
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <AsyncRequest requestFunction={service.getAll} loaderChildren={<CircularProgress />}>
                            {(institutions) => (
                                <SelectField
                                    title={'Instituição'} register={{ ...register('institution.id') }}
                                    required values={institutions}
                                />
                            )}
                        </AsyncRequest>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleRegisterInstitution}
                        >
                            A sua instituição não está na listagem? Clique aqui para criar
                        </Link>
                    </Grid>
                </React.Fragment>
            }
            {isRegisterInstitutionOpen === true &&
                <RegisterInstitution register={register} setValue={setValue} watch={watch}/>
            }
        </BaseRegisterPaper>
    );
};
export default RegisterInstitutionUser;
