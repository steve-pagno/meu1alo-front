import React, { Fragment, useMemo, useState } from 'react';
import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import BrazilianPhoneField from '../../../../../components/fileds/phone/BrazilianPhoneField';
import CEPField from '../../../../../components/fileds/address/CEPField';
import useTherapistService from '../../../useTherapistService';

const inputProps = {
    cep: {
        maxLength: '8',
        pattern: '[0-9]+'
    },
    cpf: {
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

const BaseRegisterResponsible = ({ errors, prefixName, register, setValue, watch }) => {
    const service = useTherapistService();

    const [notify, setNotify] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const [lookupStatus, setLookupStatus] = useState('idle'); // idle | loading | found | not-found
    const [existingGuardian, setExistingGuardian] = useState(null);

    const cpfValue = watch(`${prefixName}.cpf`);

    const normalizedCpf = useMemo(
        () => String(cpfValue || '').replace(/\D/g, ''),
        [cpfValue]
    );

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') return;
        setNotify({ ...notify, open: false });
    };

    const handleSearchStart = () => {
        setNotify({ open: true, message: 'Buscando CEP...', severity: 'info' });
        setValue(`${prefixName}.address.street`, '...');
        setValue(`${prefixName}.address.adjunct`, '...');
        setValue(`${prefixName}.address.state_uf`, '...');
        setValue(`${prefixName}.address.city_name`, '...');
    };

    const handleAddressFound = (data) => {
        setNotify({ open: true, message: 'Endereço encontrado!', severity: 'success' });
        setValue(`${prefixName}.address.street`, data.logradouro);
        setValue(`${prefixName}.address.adjunct`, data.complemento);
        setValue(`${prefixName}.address.state_uf`, data.uf);
        setValue(`${prefixName}.address.city_name`, data.localidade);

        const numberField = document.querySelector(`input[name="${prefixName}.address.number"]`);
        if (numberField) {
            numberField.focus();
        }
    };

    const handleError = (msg) => {
        setNotify({ open: true, message: msg || 'Erro ao localizar o CEP.', severity: 'error' });
        setValue(`${prefixName}.address.street`, '');
        setValue(`${prefixName}.address.adjunct`, '');
        setValue(`${prefixName}.address.state_uf`, '');
        setValue(`${prefixName}.address.city_name`, '');
    };

    const clearFullForm = () => {
        setValue(`${prefixName}.id`, undefined);
        setValue(`${prefixName}.name`, '');
        setValue(`${prefixName}.birthDate`, '');
        setValue(`${prefixName}.emails.0`, '');
        setValue(`${prefixName}.emails.1`, '');
        setValue(`${prefixName}.phones.0`, '');
        setValue(`${prefixName}.phones.1`, '');
        setValue(`${prefixName}.address.cep`, '');
        setValue(`${prefixName}.address.street`, '');
        setValue(`${prefixName}.address.state_uf`, '');
        setValue(`${prefixName}.address.city_name`, '');
        setValue(`${prefixName}.address.number`, '');
        setValue(`${prefixName}.address.adjunct`, '');
    };

    const handleCpfLookup = async () => {
        if (normalizedCpf.length !== 11) {
            setNotify({
                open: true,
                message: 'Informe um CPF válido com 11 dígitos.',
                severity: 'warning'
            });
            return;
        }

        setLookupStatus('loading');
        setExistingGuardian(null);
        setValue(`${prefixName}.id`, undefined);

        const response = await service.findParentByCpf(normalizedCpf);

        if (response?.isSuccess && response.body) {
            const guardian = response.body;
            setExistingGuardian(guardian);
            setLookupStatus('found');

            setValue(`${prefixName}.id`, guardian.id);
            setValue(`${prefixName}.cpf`, guardian.cpf || normalizedCpf);

            setNotify({
                open: true,
                message: 'Responsável já cadastrado. Você pode seguir com o cadastro do bebê.',
                severity: 'success'
            });
            return;
        }

        setLookupStatus('not-found');
        setExistingGuardian(null);
        clearFullForm();
        setValue(`${prefixName}.cpf`, normalizedCpf);

        setNotify({
            open: true,
            message: 'CPF não encontrado. Preencha os dados para cadastrar um novo responsável.',
            severity: 'info'
        });
    };

    const showFullForm = lookupStatus === 'not-found';

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

            <input type="hidden" {...register(`${prefixName}.id`)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Consulta por CPF</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <TextField
                        {...register(`${prefixName}.cpf`)}
                        label="CPF do responsável"
                        variant="outlined"
                        size="small"
                        inputProps={inputProps.cpf}
                        required
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCpfLookup}
                        disabled={lookupStatus === 'loading'}
                        sx={{ height: '40px', width: '100%' }}
                    >
                        {lookupStatus === 'loading' ? 'Consultando...' : 'Verificar CPF'}
                    </Button>
                </Grid>

                {lookupStatus === 'found' && existingGuardian && (
                    <Grid item xs={12}>
                        <Alert severity="success">
                            <strong>Responsável encontrado.</strong><br />
                            Nome: {existingGuardian.name}<br />
                            CPF: {existingGuardian.cpf}<br />
                            {existingGuardian.emails?.[0] && <>E-mail: {existingGuardian.emails[0]}<br /></>}
                            {existingGuardian.phones?.[0] && <>Telefone: {existingGuardian.phones[0]}</>}
                        </Alert>
                    </Grid>
                )}

                {showFullForm && (
                    <>
                        <Grid item xs={12} sm={12} md={9}>
                            <TextField
                                {...register(`${prefixName}.name`)}
                                label="Nome completo"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={3}>
                            <TextField
                                {...register(`${prefixName}.birthDate`)}
                                label="Data de nascimento"
                                variant="outlined"
                                size="small"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">Contato</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.emails.0`)}
                                label="E-mail preferencial"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.emails.1`)}
                                label="E-mail alternativo"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <BrazilianPhoneField
                                register={register}
                                name={`${prefixName}.phones.0`}
                                formErrors={errors}
                                label="Telefone residencial"
                                variant="outlined"
                                size="small"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <BrazilianPhoneField
                                register={register}
                                name={`${prefixName}.phones.1`}
                                formErrors={errors}
                                label="Telefone celular"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">Endereço</Typography>
                        </Grid>

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
                                {...register(`${prefixName}.address.street`)}
                                label="Logradouro"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.address.state_uf`)}
                                label="Estado (UF)"
                                variant="outlined"
                                size="small"
                                inputProps={{ maxLength: '2' }}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.address.city_name`)}
                                label="Cidade"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.address.number`)}
                                label="Número"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.number}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                {...register(`${prefixName}.address.adjunct`)}
                                label="Complemento"
                                variant="outlined"
                                size="small"
                                inputProps={inputProps.general}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Fragment>
    );
};

export default BaseRegisterResponsible;