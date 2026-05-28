import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, CircularProgress, Grid, TextField, Typography, Button, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import UserFieldsRegister from '../../../../components/bases/register/userFields/UserFieldsRegister';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useInstitutionService from '../../useInstituionService';
import useTherapistService from '../../../therapist/useTherapistService';

const inputProps = {
    crfa: {
        maxLength: '9',
    },
    general: {
        maxLength: '255'
    },
};

const RegisterTherapistByInstitution = () => {
    const { formState: { errors }, handleSubmit, register, watch, setValue } = useForm();
    const service = useInstitutionService();
    const therapistService = useTherapistService();
    const navigate = useNavigate();

    const [searchState, setSearchState] = useState('idle'); // 'idle' | 'searching' | 'found' | 'not_found'
    const [existingTherapist, setExistingTherapist] = useState(null);
    const [notify, setNotify] = useState({ message: '', open: false, severity: 'info' });

    const crfaValue = watch('crfa');

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') return;
        setNotify({ ...notify, open: false });
    };

    const handleCheckCrfa = async () => {
        if (!crfaValue || crfaValue.trim() === '') {
            setNotify({ message: 'Digite um CRFa válido.', open: true, severity: 'warning' });
            return;
        }

        setSearchState('searching');
        try {
            const cleanCrfa = crfaValue.replace(/\D/g, '');
            const response = await service.checkTherapistByCrfa(cleanCrfa);
            if (response && response.isSuccess && response.body) {
                const fono = response.body;
                setExistingTherapist(fono);
                setSearchState('found');
                setValue('name', fono.name);
                setValue('login', fono.login);
                
                // Map xp field
                let xp = '';
                if (fono.xp) {
                    if (typeof fono.xp === 'object' && fono.xp.id !== undefined) {
                        xp = String(fono.xp.id);
                    } else {
                        xp = String(fono.xp);
                    }
                }
                setValue('xp', xp);
                
                setValue('emails.0', fono.emails?.[0]?.email || '');
                setValue('phones.0', fono.phones?.[0]?.phoneNumber || fono.phones?.[0]?.numero || '');
                setNotify({ message: `Fonoaudiólogo ${fono.name} localizado!`, open: true, severity: 'success' });
            } else {
                setExistingTherapist(null);
                setSearchState('not_found');
                setValue('name', '');
                setValue('login', '');
                setValue('xp', '');
                setValue('emails.0', '');
                setValue('phones.0', '');
                setNotify({ message: 'Fonoaudiólogo não localizado. Preencha os campos para cadastrá-lo.', open: true, severity: 'info' });
            }
        } catch (err) {
            setSearchState('idle');
            setNotify({ message: 'Erro ao consultar o CRFa.', open: true, severity: 'error' });
        }
    };

    const handleFormSubmit = async (data) => {
        const payload = existingTherapist
            ? { therapistId: existingTherapist.id }
            : {
                name: data.name,
                login: data.login,
                password: data.password,
                crfa: data.crfa,
                xp: data.xp,
                emails: [data.emails?.[0], data.emails?.[1]].filter(Boolean),
                phones: [data.phones?.[0], data.phones?.[1]].filter(Boolean),
              };

        try {
            const response = await service.addOrRegisterTherapist(payload);
            if (response && response.isSuccess) {
                setNotify({ message: 'Salvo com sucesso!', open: true, severity: 'success' });
                setTimeout(() => {
                    navigate('/institucional/fonoaudiologos');
                }, 1500);
            } else {
                setNotify({ message: response.message || response.body?.message || 'Erro ao salvar o fonoaudiólogo.', open: true, severity: 'error' });
            }
        } catch (err) {
            setNotify({ message: 'Erro na operação.', open: true, severity: 'error' });
        }
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 900, margin: '20px auto' }}>
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

            <Typography variant="h4" gutterBottom style={{ color: '#5D307A', fontWeight: 'bold', marginBottom: 20 }}>
                Vincular / Cadastrar Fonoaudiólogo
            </Typography>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            {...register('crfa', {
                                onChange: (e) => {
                                    const rawValue = e.target.value.replace(/\D/g, '');
                                    if (rawValue.length > 0) {
                                        e.target.value = rawValue.replace(/(\d{1})(\d{1,})/, '$1-$2');
                                    }
                                },
                                setValueAs: (v) => v.replace(/\D/g, '')
                            })}
                            label="CRFa"
                            inputProps={{ maxLength: 9 }}
                            variant="outlined" size="small" required
                            fullWidth
                            disabled={searchState === 'found'}
                            error={errors?.crfa}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {searchState === 'found' ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    setSearchState('idle');
                                    setExistingTherapist(null);
                                }}
                            >
                                Alterar CRFa
                            </Button>
                        ) : (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleCheckCrfa}
                                disabled={searchState === 'searching'}
                            >
                                {searchState === 'searching' ? <CircularProgress size={24} /> : 'Verificar CRFa'}
                            </Button>
                        )}
                    </Grid>

                    {searchState === 'found' && (
                        <Grid item xs={12}>
                            <Alert severity="success">
                                <strong>{existingTherapist.name}</strong> já está cadastrado no sistema com o CRFa correspondente. Ao clicar em salvar, ele será vinculado à sua instituição.
                            </Alert>
                        </Grid>
                    )}

                    {searchState === 'not_found' && (
                        <Grid item xs={12}>
                            <Alert severity="info">
                                Fonoaudiólogo não localizado no sistema. Preencha todos os campos abaixo para registrá-lo e vinculá-lo.
                            </Alert>
                        </Grid>
                    )}

                    {(searchState === 'found' || searchState === 'not_found') && (
                        <>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    {...register('name')} label="Nome completo"
                                    inputProps={inputProps.general}
                                    variant="outlined" size="small" required
                                    fullWidth
                                    disabled={searchState === 'found'}
                                    error={errors?.name}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            
                            {searchState === 'not_found' && (
                                <UserFieldsRegister register={register} errors={errors} />
                            )}

                            {searchState === 'found' && (
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        {...register('login')} label="Login"
                                        variant="outlined" size="small"
                                        fullWidth
                                        disabled
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12} sm={12} md={6}>
                                <AsyncRequest requestFunction={therapistService.getXpTypes} loaderChildren={<CircularProgress />}>
                                    {(xps) => (
                                        <SelectField
                                            title={'Tempo de experiência'}
                                            register={{ ...register('xp') }}
                                            required values={xps}
                                            disabled={searchState === 'found'}
                                        />
                                    )}
                                </AsyncRequest>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ marginTop: 10 }}>Contato</Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    {...register('emails.0')} label="E-mail preferencial"
                                    inputProps={inputProps.general}
                                    variant="outlined" size="small" required
                                    fullWidth
                                    disabled={searchState === 'found'}
                                    error={errors?.emails && errors?.emails[0]}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {searchState === 'not_found' && (
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        {...register('emails.1')} label="E-mail alternativo"
                                        inputProps={inputProps.general}
                                        variant="outlined" size="small"
                                        fullWidth
                                        error={errors?.emails && errors?.emails[1]}
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12} sm={12} md={6}>
                                <BrazilianPhoneField
                                    register={register} name="phones.0" error={errors?.phones && errors?.phones[0]}
                                    label="Telefone principal" variant="outlined" size="small" required
                                    disabled={searchState === 'found'}
                                />
                            </Grid>

                            {searchState === 'not_found' && (
                                <Grid item xs={12} sm={12} md={6}>
                                    <BrazilianPhoneField
                                        register={register} name="phones.1" error={errors?.phones && errors?.phones[1]}
                                        label="Telefone alternativo" variant="outlined" size="small"
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12} style={{ marginTop: 20 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    style={{ float: 'right', fontWeight: 'bold' }}
                                >
                                    Salvar Fonoaudiólogo
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{ float: 'right', marginRight: 10 }}
                                    onClick={() => navigate('/institucional/fonoaudiologos')}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </form>
        </Paper>
    );
};

export default RegisterTherapistByInstitution;
