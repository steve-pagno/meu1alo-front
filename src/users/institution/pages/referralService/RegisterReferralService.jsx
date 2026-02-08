import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import CNPJField from '../../../../components/fileds/documents/CNPJField';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import CEPField from '../../../../components/fileds/address/CEPField';
import useInstitutionService from '../../useInstituionService';
// Endereço segue a mesma lógica do cadastro de Instituição (ViaCEP + UF/Cidade por texto)

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
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useInstitutionService();

    // Notificações (mesma UX do cadastro de Instituição)
    const [notify, setNotify] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') return;
        setNotify({ ...notify, open: false });
    };

    const handleSearchStart = () => {
        setNotify({ open: true, message: 'Buscando CEP...', severity: 'info' });
        setValue('address.street', '...');
        setValue('address.adjunct', '...');
        setValue('address.state_uf', '...');
        setValue('address.city_name', '...');
    };

    const handleAddressFound = (data) => {
        setNotify({ open: true, message: 'Endereço encontrado!', severity: 'success' });
        setValue('address.street', data.logradouro);
        setValue('address.adjunct', data.complemento);
        setValue('address.state_uf', data.uf);
        setValue('address.city_name', data.localidade);

        const numberField = document.querySelector('input[name="address.number"]');
        if (numberField) numberField.focus();
    };

    const handleError = (msg) => {
        setNotify({ open: true, message: msg || 'Erro ao localizar o CEP.', severity: 'error' });
        setValue('address.street', '');
        setValue('address.adjunct', '');
        setValue('address.state_uf', '');
        setValue('address.city_name', '');
    };

    return (
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'de Serviço de Saúde Auditiva'} serviceFunction={service.referralServiceRegister} baseRoute={'/institucional'}>
            <Snackbar 
                open={notify.open} 
                autoHideDuration={4000} 
                onClose={handleCloseNotify}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseNotify} severity={notify.severity} variant="filled" sx={{ width: '100%' }}>
                    {notify.message}
                </Alert>
            </Snackbar>

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
                <CEPField
                    register={register}
                    name="address.cep"
                    setValue={setValue}
                    onSearchStart={handleSearchStart}
                    onAddressFound={handleAddressFound}
                    onError={handleError}
                    inputProps={inputProps.cep}
                    variant="outlined"
                    size="small"
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.street')} label="Logradouro"
                    variant="outlined" size="small" inputProps={inputProps.general} required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.state_uf')} label="Estado (UF)"
                    variant="outlined" size="small" inputProps={{ maxLength: '2' }} required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('address.city_name')} label="Cidade"
                    variant="outlined" size="small" inputProps={inputProps.general} required
                    InputLabelProps={{ shrink: true }}
                />
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
                    InputLabelProps={{ shrink: true }}
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
