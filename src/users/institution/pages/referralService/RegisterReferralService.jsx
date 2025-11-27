import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import CNPJField from '../../../../components/fileds/documents/CNPJField';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useInstitutionService from '../../useInstituionService';
import useRegisterReferralServiceController from './useRegisterReferralServiceController';

const inputProps = {
    cep: {
        maxLength: '8',
        pattern: '[0-9]+'
    },
    cnes: {
        maxLength: '11',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    },
    number: {
        maxLength: '4',
        pattern: '[0-9]+'
    }
};
const RegisterReferralService = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useInstitutionService();
    const { getCities, getStates, onChangeState, state } = useRegisterReferralServiceController();

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'de Serviço de Saúde Auditiva'} serviceFunction={service.referralServiceRegister} baseRoute={'/institucional'}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('name')} label="Nome do serviço"
                    variant="outlined" size="small" inputProps={inputProps.general} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <CNPJField
                    register={register} label="CNPJ"
                    name={'cnpj'}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('cnes')} label="CNES"
                    variant="outlined" size="small" inputProps={inputProps.cnes} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={service.getReferralServiceTypes} loaderChildren={<CircularProgress />}>
                    {(referralServiceTypes) => (
                        <RadioField
                            title={'Tipo de serviço'}
                            register={{ ...register('typeService') }}
                            values={referralServiceTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails[0]')} label="E-mail preferencial"
                    variant="outlined" size="small" inputProps={inputProps.general} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails[1]')} label="E-mail alternativo"
                    variant="outlined" size="small" inputProps={inputProps.general}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField  register={register} name="phones[0]" formErrors={errors}
                    label="Telefone institucional" variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField  register={register} name="phones[1]" formErrors={errors}
                    label="Telefone celular institucional" variant="outlined" size="small"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Endereço
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.cep')} label="CEP"
                    variant="outlined" size="small" inputProps={inputProps.cep} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.street')} label="Logradouro"
                    variant="outlined" size="small" inputProps={inputProps.general} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={getStates} loaderChildren={<CircularProgress />}>
                    {(states) => (
                        <SelectField
                            title={'Estado'} register={{ ...register('address.state') }}
                            onChange={onChangeState} required values={states}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={state ? getCities : null} loaderChildren={<CircularProgress />}>
                    {(cities) => (
                        <SelectField
                            title={'Cidade'} register={register('address.city.id')}
                            disabled={!state} required values={cities}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.number')} label="Número"
                    variant="outlined" size="small" inputProps={inputProps.number}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.adjunct')} label="Complemento"
                    variant="outlined" size="small" inputProps={inputProps.general}
                />
            </Grid>
            {/*<Grid item xs={12} sm={12} md={12}>*/}
            {/*    <Typography  variant={'h6'}>*/}
            {/*        Dados do responsável do serviço*/}
            {/*    </Typography>*/}
            {/*    <TextField*/}
            {/*        {...register('nameOfResponsible')} label="Nome do responsável"*/}
            {/*        variant="outlined" size="small" inputProps={inputProps.general} required*/}
            {/*    />*/}
            {/*</Grid>*/}
        </BaseRegisterPaper>
    );
};
export default RegisterReferralService;
