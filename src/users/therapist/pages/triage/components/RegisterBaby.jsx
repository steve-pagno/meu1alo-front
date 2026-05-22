import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';
import useRegisterBabyStyles from './useRegisterBabyStyles';

const inputProps = {
    circumference: {
        maxLength: '4',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    },
    gestationalAge: {
        maxLength: '2',
        pattern: '[0-9]+'
    },
    height: {
        maxLength: '4',
        pattern: '[0-9]+'
    },
    weight: {
        maxLength: '4',
        pattern: '[0-9]+'
    }
};

const RegisterBaby = ({ errors, register, setValue, watch }) => {
    const service = useTherapistService();
    const styles = useRegisterBabyStyles();

    const existingBabies = watch('existingBabies') || [];
    const [selectedBabyId, setSelectedBabyId] = useState(null);
    const [showBabyForm, setShowBabyForm] = useState(existingBabies.length === 0);

    useEffect(() => {
        if (existingBabies.length === 0) {
            setShowBabyForm(true);
        } else {
            setShowBabyForm(false);
        }
        setSelectedBabyId(null);
    }, [existingBabies]);

    const handleSelectForRetest = (baby) => {
        setSelectedBabyId(baby.id);
        setValue('baby.id', baby.id);
        setValue('baby.name', baby.name);
        setValue('baby.weight', baby.weight);
        setValue('baby.height', baby.height);
        setValue('baby.circumference', baby.circumference);
        setValue('baby.birthDate', baby.birthDate?.split('T')[0]);
        setValue('baby.gestationalAge', baby.gestationalAge);
        setValue('baby.childBirthType', baby.childBirthType);
        setValue('baby.maternalDeath', baby.maternalDeath);
        setValue('testType', 2); // Reteste
        setShowBabyForm(true);
    };

    const handleCreateNewBaby = () => {
        setSelectedBabyId(null);
        setValue('baby.id', undefined);
        setValue('baby.name', '');
        setValue('baby.weight', '');
        setValue('baby.height', '');
        setValue('baby.circumference', '');
        setValue('baby.birthDate', '');
        setValue('baby.gestationalAge', '');
        setValue('baby.childBirthType', '');
        setValue('baby.maternalDeath', false);
        setShowBabyForm(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) { return 'N/A'; }
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    };

    return (
        <Fragment>
            <input type="hidden" {...register('baby.id')} />

            {existingBabies.length > 0 && (
                <Grid item xs={12} sx={{ mb: 3 }}>
                    <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                        <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                        <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                            Crianças já cadastradas para este responsável
                        </Typography>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 1.5 }}>
                        {existingBabies.map((baby) => (
                            <Grid item xs={12} sm={6} key={baby.id}>
                                <Card variant="outlined" sx={{
                                    backgroundColor: selectedBabyId === baby.id ? 'rgba(93, 48, 122, 0.04)' : 'inherit',
                                    borderColor: selectedBabyId === baby.id ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
                                    borderRadius: '16px',
                                    borderWidth: selectedBabyId === baby.id ? 2 : 1,
                                    boxShadow: selectedBabyId === baby.id ? '0 8px 24px rgba(93, 48, 122, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                                    transition: 'all 0.3s ease-in-out'
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="subtitle1" sx={{ color: selectedBabyId === baby.id ? 'primary.main' : 'text.primary', fontWeight: 800, mb: 0.5 }}>
                                            {baby.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Data de Nascimento: {formatDate(baby.birthDate)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                                            Peso: {baby.weight} kg | Altura: {baby.height} cm
                                        </Typography>
                                        <Button
                                            variant={selectedBabyId === baby.id ? 'contained' : 'outlined'}
                                            color="primary"
                                            size="small"
                                            onClick={() => handleSelectForRetest(baby)}
                                            sx={{
                                                borderRadius: '10px',
                                                fontWeight: 700,
                                                px: 2.5,
                                                py: 0.8,
                                                textTransform: 'none',
                                                ...(selectedBabyId === baby.id ? {
                                                    boxShadow: '0 4px 10px rgba(93, 48, 122, 0.25)'
                                                } : {})
                                            }}
                                        >
                                            {selectedBabyId === baby.id ? 'Selecionado para Reteste' : 'Selecionar para Reteste'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCreateNewBaby}
                            sx={{
                                '&:hover': {
                                    borderWidth: '2px'
                                },
                                borderRadius: '12px',
                                borderWidth: '2px',
                                fontWeight: 700,
                                px: 3,
                                py: 1,
                                textTransform: 'none'
                            }}
                        >
                            Cadastrar Novo Bebê
                        </Button>
                        {existingBabies.length > 0 && !showBabyForm && (
                            <Alert severity="info" sx={{ borderRadius: '12px', flexGrow: 1 }}>
                                Escolha uma das crianças acima para realizar o reteste ou clique para cadastrar um novo bebê.
                            </Alert>
                        )}
                    </Box>
                </Grid>
            )}

            {showBabyForm && (
                <Fragment>
                    <Grid item xs={12} sm={12} md={12} sx={{ mb: 2, mt: 2 }}>
                        <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                            <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                            <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                                {selectedBabyId ? `Dados de Reteste do Bebê: ${watch('baby.name')}` : 'Informações do Bebê'}
                            </Typography>
                        </Box>
                        {selectedBabyId && (
                            <Alert severity="success" sx={{ borderRadius: '12px', mb: 2, mt: 2 }}>
                                Você está realizando um <strong>Reteste</strong> para o bebê selecionado.
                                Os dados originais foram carregados abaixo para sua conveniência e podem ser atualizados se necessário.
                            </Alert>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            {...register('baby.name')} label="Nome do bebê"
                            inputProps={inputProps.general}
                            variant="outlined" size="small" required
                            fullWidth
                            InputLabelProps={{ shrink: !!watch('baby.name') }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            {...register('baby.weight')} label="Peso (kg)"
                            inputProps={inputProps.weight}
                            variant="outlined" size="small" required
                            fullWidth
                            InputLabelProps={{ shrink: !!watch('baby.weight') }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            {...register('baby.height')} label="Altura (cm)"
                            inputProps={inputProps.height}
                            variant="outlined" size="small" required
                            fullWidth
                            InputLabelProps={{ shrink: !!watch('baby.height') }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            {...register('baby.circumference')} label="Perímetro cefálico (cm)"
                            inputProps={inputProps.circumference}
                            variant="outlined" size="small" required
                            fullWidth
                            InputLabelProps={{ shrink: !!watch('baby.circumference') }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            {...register('baby.birthDate')} label="Data de nascimento"
                            variant="outlined" size="small" type="date"
                            InputLabelProps={{ shrink: true }} required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            {...register('baby.gestationalAge')} label="Idade gestacional (semanas)"
                            inputProps={inputProps.gestationalAge}
                            variant="outlined" size="small" required
                            fullWidth
                            InputLabelProps={{ shrink: !!watch('baby.gestationalAge') }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <AsyncRequest requestFunction={service.getChildBirthType} loaderChildren={<CircularProgress />}>
                            {(values) => (
                                <SelectField
                                    register={register('baby.childBirthType')} values={values}
                                    value={watch('baby.childBirthType')}
                                    title={'Tipo de parto'} required
                                />
                            )}
                        </AsyncRequest>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={!!watch('baby.maternalDeath')} onChange={(e) => setValue('baby.maternalDeath', e.target.checked)} />} label="Óbito materno"
                                size="small"
                            />
                        </FormGroup>
                    </Grid>
                </Fragment>
            )}
        </Fragment>
    );
};

export default RegisterBaby;
