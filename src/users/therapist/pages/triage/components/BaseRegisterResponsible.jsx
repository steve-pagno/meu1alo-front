import React, { Fragment, useState } from 'react';
import { Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import BrazilianPhoneField from '../../../../../components/fileds/phone/BrazilianPhoneField';
import CEPField from '../../../../../components/fileds/address/CEPField'; // ✅ import do seu campo customizado

const inputProps = {
    cep: {
        maxLength: '8',
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

const BaseRegisterResponsible = ({ errors, prefixName, register, setValue }) => {
    // Endereço segue a mesma lógica do cadastro de Instituição (ViaCEP + UF/Cidade por texto)
    const [notify, setNotify] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') return;
        setNotify({ ...notify, open: false });
    };

    // ✅ 1. Função chamada quando começa a busca (coloca "..." nos campos)
    const handleSearchStart = () => {
        setNotify({ open: true, message: 'Buscando CEP...', severity: 'info' });
        setValue(`${prefixName}.address.street`, '...');
        setValue(`${prefixName}.address.adjunct`, '...');
        setValue(`${prefixName}.address.state_uf`, '...');
        setValue(`${prefixName}.address.city_name`, '...');
    };

    // ✅ 2. Função chamada quando o CEP é encontrado
    const handleAddressFound = (data) => {
        setNotify({ open: true, message: 'Endereço encontrado!', severity: 'success' });
        setValue(`${prefixName}.address.street`, data.logradouro);
        setValue(`${prefixName}.address.adjunct`, data.complemento);
        setValue(`${prefixName}.address.state_uf`, data.uf);
        setValue(`${prefixName}.address.city_name`, data.localidade);

        // opcional: focar no campo de número
        const numberField = document.querySelector(`input[name="${prefixName}.address.number"]`);
        if (numberField) {
            numberField.focus();
        }
    };

    // ✅ 3. Função chamada em caso de erro
    const handleError = (msg) => {
        setNotify({ open: true, message: msg || 'Erro ao localizar o CEP.', severity: 'error' });
        setValue(`${prefixName}.address.street`, '');
        setValue(`${prefixName}.address.adjunct`, '');
        setValue(`${prefixName}.address.state_uf`, '');
        setValue(`${prefixName}.address.city_name`, '');
    };

    return (
        <Fragment>
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

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                    <TextField
                        {...register(`${prefixName}.name`)} label="Nome completo"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <TextField
                        {...register(`${prefixName}.birthDate`)} label="Data de nascimento"
                        variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} required
                    />
                </Grid>

                {/* ==================== CONTATO ==================== */}
                <Grid item xs={12}>
                    <Typography variant="h6">Contato</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.emails.0`)} label="E-mail preferencial"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.emails.1`)} label="E-mail alternativo"
                        variant="outlined" size="small" inputProps={inputProps.general}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BrazilianPhoneField
                        register={register} name={`${prefixName}.phones.0`} formErrors={errors}
                        label="Telefone residencial" variant="outlined" size="small" required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BrazilianPhoneField
                        register={register} name={`${prefixName}.phones.1`} formErrors={errors}
                        label="Telefone celular" size="small" variant="outlined"
                    />
                </Grid>

                {/* ==================== ENDEREÇO ==================== */}
                <Grid item xs={12}>
                    <Typography variant="h6">Endereço</Typography>
                </Grid>

                {/* ✅ Campo de CEP customizado */}
                <Grid item xs={12} sm={12} md={6}>
                    <CEPField
                        register={register}
                        name={`${prefixName}.address.cep`}
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
                        {...register(`${prefixName}.address.street`)} label="Logradouro"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.state_uf`)} label="Estado (UF)"
                        variant="outlined" size="small" inputProps={{ maxLength: '2' }} required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.city_name`)} label="Cidade"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.number`)} label="Número"
                        variant="outlined" size="small" inputProps={inputProps.number} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.adjunct`)} label="Complemento"
                        variant="outlined" size="small" inputProps={inputProps.general}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default BaseRegisterResponsible;
