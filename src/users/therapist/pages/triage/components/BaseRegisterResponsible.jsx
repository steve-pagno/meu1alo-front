import React, { Fragment, useMemo, useState } from 'react';
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import CEPField from '../../../../../components/fileds/address/CEPField';
import BrazilianPhoneField from '../../../../../components/fileds/phone/BrazilianPhoneField';
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
        message: '',
        open: false,
        severity: 'info'
    });

    const [lookupStatus, setLookupStatus] = useState('idle'); // idle | loading | found | not-found
    const [existingGuardian, setExistingGuardian] = useState(null);
    const [isEditingExisting, setIsEditingExisting] = useState(false);

    const cpfValue = watch(`${prefixName}.cpf`);

    const normalizedCpf = useMemo(
        () => String(cpfValue || '').replace(/\D/g, ''),
        [cpfValue]
    );

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') { return; }
        setNotify({ ...notify, open: false });
    };

    const handleSearchStart = () => {
        setNotify({ message: 'Buscando CEP...', open: true, severity: 'info' });
        setValue(`${prefixName}.address.street`, '...');
        setValue(`${prefixName}.address.adjunct`, '...');
        setValue(`${prefixName}.address.state_uf`, '...');
        setValue(`${prefixName}.address.city_name`, '...');
    };

    const handleAddressFound = (data) => {
        setNotify({ message: 'Endereço encontrado!', open: true, severity: 'success' });
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
        setNotify({ message: msg || 'Erro ao localizar o CEP.', open: true, severity: 'error' });
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
        setValue('existingBabies', []);
        setIsEditingExisting(false);
    };

    const handleCpfLookup = async () => {
        if (normalizedCpf.length !== 11) {
            setNotify({
                message: 'Informe um CPF válido com 11 dígitos.',
                open: true,
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
            setIsEditingExisting(false);

            setValue(`${prefixName}.id`, guardian.id);
            setValue(`${prefixName}.cpf`, guardian.cpf || normalizedCpf);
            setValue(`${prefixName}.name`, guardian.name || '');
            setValue(`${prefixName}.birthDate`, guardian.birthDate?.split('T')[0] || '');
            setValue(`${prefixName}.emails.0`, guardian.emails?.[0] || '');
            setValue(`${prefixName}.emails.1`, guardian.emails?.[1] || '');
            setValue(`${prefixName}.phones.0`, guardian.phones?.[0] || '');
            setValue(`${prefixName}.phones.1`, guardian.phones?.[1] || '');
            if (guardian.address) {
                setValue(`${prefixName}.address.cep`, guardian.address.cep || '');
                setValue(`${prefixName}.address.street`, guardian.address.street || '');
                setValue(`${prefixName}.address.state_uf`, guardian.address.state_uf || '');
                setValue(`${prefixName}.address.city_name`, guardian.address.city_name || '');
                setValue(`${prefixName}.address.number`, guardian.address.number || '');
                setValue(`${prefixName}.address.adjunct`, guardian.address.adjunct || '');
            }
            setValue('existingBabies', guardian.babies || []);

            setNotify({
                message: 'Responsável já cadastrado. Você pode seguir com o cadastro do bebê.',
                open: true,
                severity: 'success'
            });
            return;
        }

        setLookupStatus('not-found');
        setExistingGuardian(null);
        setIsEditingExisting(false);
        clearFullForm();
        setValue(`${prefixName}.cpf`, normalizedCpf);
        setValue('existingBabies', []);

        setNotify({
            message: 'CPF não encontrado. Preencha os dados para cadastrar um novo responsável.',
            open: true,
            severity: 'info'
        });
    };

    const showFullForm = lookupStatus === 'not-found' || isEditingExisting;

    return (
        <Fragment>
            <Snackbar
                open={notify.open}
                autoHideDuration={4000}
                onClose={handleCloseNotify}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert onClose={handleCloseNotify} severity={notify.severity} variant="filled" sx={{ width: '100%' }}>
                    {notify.message}
                </Alert>
            </Snackbar>

            <input type="hidden" {...register(`${prefixName}.id`)} />

            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
                    <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.08)', display: 'flex', gap: 1.5, pb: 1 }}>
                        <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 20, width: 6 }} />
                        <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.3px' }}>
                            Consulta por CPF
                        </Typography>
                    </Box>
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
                        sx={{
                            '&:hover': {
                                background: 'linear-gradient(45deg, #cc2354 0%, #E83268 100%)',
                                boxShadow: '0 6px 16px rgba(232, 50, 104, 0.4)',
                                transform: 'translateY(-1px)'
                            },
                            background: 'linear-gradient(45deg, #E83268 0%, #ff5c8c 100%)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(232, 50, 104, 0.2)',
                            fontWeight: 700,
                            height: '40px',
                            textTransform: 'none',
                            transition: 'all 0.2s ease-in-out',
                            width: '100%'
                        }}
                    >
                        {lookupStatus === 'loading' ? 'Consultando...' : 'Verificar CPF'}
                    </Button>
                </Grid>

                {lookupStatus === 'found' && existingGuardian && (
                    <Grid item xs={12}>
                        <Alert
                            severity="success"
                            action={
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setIsEditingExisting(!isEditingExisting)}
                                >
                                    {isEditingExisting ? 'Ocultar Formulário' : 'Editar Dados'}
                                </Button>
                            }
                        >
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

                        <Grid item xs={12} sx={{ mb: 1, mt: 3 }}>
                            <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.08)', display: 'flex', gap: 1.5, pb: 1 }}>
                                <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 20, width: 6 }} />
                                <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.3px' }}>
                                    Contato
                                </Typography>
                            </Box>
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

                        <Grid item xs={12} sx={{ mb: 1, mt: 3 }}>
                            <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.08)', display: 'flex', gap: 1.5, pb: 1 }}>
                                <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 20, width: 6 }} />
                                <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.3px' }}>
                                    Endereço
                                </Typography>
                            </Box>
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