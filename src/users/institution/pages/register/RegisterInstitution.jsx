import React, { useState } from 'react';
import { CircularProgress, Divider, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
// 4 níveis estão corretos para este arquivo específico
import AsyncRequest from '../../../../components/api/AsyncRequest';
import CNPJField from '../../../../components/fileds/documents/CNPJField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useRegisterInstitutionController from './useRegisterInstitutionController';
import CEPField from '../../../../components/fileds/address/CEPField';

const inputProps = {
    cep: { maxLength: '8', pattern: '[0-9]+' },
    cnes: { maxLength: '11', pattern: '[0-9]+' },
    cnpj: { maxLength: '14', pattern: '[0-9]+' },
    general: { maxLength: '255' },
    state: { maxLength: '2' },
    number: { maxLength: '4', pattern: '[0-9]+' }
};

const RegisterInstitution = ({ register, setValue }) => {
    const { getTypes } = useRegisterInstitutionController();

    // Estado para as notificações no canto da tela
    const [notify, setNotify] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseNotify = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotify({ ...notify, open: false });
    };

    const handleSearchStart = () => {
        setNotify({
            open: true,
            message: 'Buscando CEP...',
            severity: 'info'
        });
        setValue('institution.address.street', '...');
        setValue('institution.address.adjunct', '...');
        setValue('institution.address.state_uf', '...'); 
        setValue('institution.address.city_name', '...'); 
    };

    const handleAddressFound = (data) => {
        setNotify({
            open: true,
            message: 'Endereço encontrado!',
            severity: 'success'
        });

        setValue('institution.address.street', data.logradouro);
        setValue('institution.address.adjunct', data.complemento);
        setValue('institution.address.state_uf', data.uf);
        setValue('institution.address.city_name', data.localidade);

        const numberField = document.querySelector('input[name="institution.address.number"]');
        if (numberField) {
            numberField.focus();
        }
    };

    const handleError = (msg) => {
        setNotify({
            open: true,
            message: msg || 'Erro ao localizar o CEP.',
            severity: 'error'
        });
        setValue('institution.address.street', '');
        setValue('institution.address.adjunct', '');
        setValue('institution.address.state_uf', '');
        setValue('institution.address.city_name', '');
    };

    return (
        <React.Fragment>
            {/* Componente de Notificação */}
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

            <Grid item xs={12} sm={12} md={12}><Divider/></Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>Informações sobre a Instituição</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('institution.institutionName')} label="Nome da instituição"
                    inputProps={inputProps.general} variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.cnes')} label="CNES"
                    inputProps={inputProps.cnes} variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <CNPJField register={register} name="institution.cnpj" label="CNPJ"/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={getTypes} loaderChildren={<CircularProgress />}>
                    {(institutionTypes) => (
                        <RadioField
                            title={'Tipo de instituição'} register={{ ...register('institution.institutionType') }}
                            required values={institutionTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>Endereço</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <CEPField
                    register={register} name="institution.address.cep" setValue={setValue}
                    onSearchStart={handleSearchStart} onAddressFound={handleAddressFound}
                    onError={handleError} inputProps={inputProps.cep}
                    variant="outlined" size="small" required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.street')} label="Logradouro"
                    InputLabelProps={{ shrink: true }} variant="outlined" size="small" required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.state_uf')} label="Estado (UF)"
                    inputProps={inputProps.state} InputLabelProps={{ shrink: true }}
                    variant="outlined" size="small" required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.city_name')} label="Cidade"
                    InputLabelProps={{ shrink: true }} variant="outlined" size="small" required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.number')} label="Número"
                    inputProps={inputProps.number} variant="outlined" size="small" required
                />
            </Grid>
            
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.adjunct')} label="Complemento"
                    InputLabelProps={{ shrink: true }} variant="outlined" size="small"
                />
            </Grid>
        </React.Fragment>
    );
};

export default RegisterInstitution;