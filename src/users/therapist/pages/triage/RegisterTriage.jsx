import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';
import RegisterBaby from './components/RegisterBaby';
import RegisterResponsible from './components/RegisterResponsible';
import RegisterResults from './components/RegisterResults';
import useRegisterTriageController from './useRegisterTriageController';
import useRegisterTriageStyles from './useRegisterTriageStyles';

const RegisterTriage = () => {
    const { id } = useParams();
    const service = useTherapistService();
    const styles = useRegisterTriageStyles();
    const { activeStep, handleOnNext, setActiveStep } = useRegisterTriageController();
    const [loading, setLoading] = useState(!!id);

    const { formState: { errors }, handleSubmit, register, reset, setValue, watch } = useForm();

    useEffect(() => {
        if (id) {
            service.getTriageById(id).then((response) => {
                const triage = response.body || response.result || response;
                if (triage) {
                    if (triage.baby) {
                        setValue('baby.name', triage.baby.name);
                        setValue('baby.birthDate', triage.baby.birthDate?.split('T')[0]);
                        setValue('baby.weight', triage.baby.weight);
                        setValue('baby.height', triage.baby.height);
                        setValue('baby.gestationalWeeks', triage.baby.gestationalWeeks);
                        setValue('baby.childBirthType', triage.baby.childBirthType);
                    }
                    if (triage.baby?.birthMother) {
                        setValue('baby.birthMother.id', triage.baby.birthMother.id);
                        setValue('baby.birthMother.name', triage.baby.birthMother.name);
                        setValue('baby.birthMother.cpf', triage.baby.birthMother.cpf);
                        setValue('baby.birthMother.rg', triage.baby.birthMother.rg);
                        setValue('baby.birthMother.birthDate', triage.baby.birthMother.birthDate?.split('T')[0]);
                        setValue('baby.birthMother.emails.0', triage.baby.birthMother.emails?.[0]?.email || triage.baby.birthMother.emails?.[0] || '');
                        setValue('baby.birthMother.emails.1', triage.baby.birthMother.emails?.[1]?.email || triage.baby.birthMother.emails?.[1] || '');
                        setValue('baby.birthMother.phones.0', triage.baby.birthMother.phones?.[0]?.phoneNumber || triage.baby.birthMother.phones?.[0] || '');
                        setValue('baby.birthMother.phones.1', triage.baby.birthMother.phones?.[1]?.phoneNumber || triage.baby.birthMother.phones?.[1] || '');
                        if (triage.baby.birthMother.address) {
                            setValue('baby.birthMother.address.cep', triage.baby.birthMother.address.cep);
                            setValue('baby.birthMother.address.street', triage.baby.birthMother.address.street);
                            setValue('baby.birthMother.address.state_uf', triage.baby.birthMother.address.state_uf || triage.baby.birthMother.address.city?.state?.uf || '');
                            setValue('baby.birthMother.address.city_name', triage.baby.birthMother.address.city_name || triage.baby.birthMother.address.city?.name || '');
                            setValue('baby.birthMother.address.number', triage.baby.birthMother.address.number);
                            setValue('baby.birthMother.address.adjunct', triage.baby.birthMother.address.adjunct || '');
                        }
                    }
                    if (triage.baby?.guardians?.length > 0) {
                        triage.baby.guardians.forEach((g, idx) => {
                            setValue(`baby.guardians[${idx}].id`, g.id);
                            setValue(`baby.guardians[${idx}].name`, g.name);
                            setValue(`baby.guardians[${idx}].cpf`, g.cpf);
                            setValue(`baby.guardians[${idx}].rg`, g.rg);
                            setValue(`baby.guardians[${idx}].birthDate`, g.birthDate?.split('T')[0]);
                            setValue(`baby.guardians[${idx}].emails.0`, g.emails?.[0]?.email || g.emails?.[0] || '');
                            setValue(`baby.guardians[${idx}].emails.1`, g.emails?.[1]?.email || g.emails?.[1] || '');
                            setValue(`baby.guardians[${idx}].phones.0`, g.phones?.[0]?.phoneNumber || g.phones?.[0] || '');
                            setValue(`baby.guardians[${idx}].phones.1`, g.phones?.[1]?.phoneNumber || g.phones?.[1] || '');
                            if (g.address) {
                                setValue(`baby.guardians[${idx}].address.cep`, g.address.cep);
                                setValue(`baby.guardians[${idx}].address.street`, g.address.street);
                                setValue(`baby.guardians[${idx}].address.state_uf`, g.address.state_uf || g.address.city?.state?.uf || '');
                                setValue(`baby.guardians[${idx}].address.city_name`, g.address.city_name || g.address.city?.name || '');
                                setValue(`baby.guardians[${idx}].address.number`, g.address.number);
                                setValue(`baby.guardians[${idx}].address.adjunct`, g.address.adjunct || '');
                            }
                        });
                    }
                    if (triage.evaluationDate) {
                        setValue('evaluationDate', triage.evaluationDate.split('T')[0]);
                    }
                    setValue('testType', triage.conduct?.testType || 1);
                    if (triage.conduct?.resultDescription) {
                        setValue('conductDescription', triage.conduct.resultDescription);
                    }
                    if (triage.equipment) { setValue('equipment.id', triage.equipment.id); }
                    if (triage.institution) { setValue('institution.id', triage.institution.id); }
                    if (triage.orientation) { setValue('orientation.id', triage.orientation.id); }
                    if (triage.indicators) {
                        setValue('indicators', triage.indicators.map((ind) => ind.id));
                    }
                    setValue('observation', triage.observation);
                    if (triage.eoaLeftEar !== null && triage.eoaLeftEar !== undefined) {
                        setValue('eoaLeftEar', triage.eoaLeftEar ? 1 : 0);
                    }
                    if (triage.eoaRightEar !== null && triage.eoaRightEar !== undefined) {
                        setValue('eoaRightEar', triage.eoaRightEar ? 1 : 0);
                    }
                    if (triage.peateaLeftEar !== null && triage.peateaLeftEar !== undefined) {
                        setValue('peateaLeftEar', triage.peateaLeftEar ? 1 : 0);
                    }
                    if (triage.peateaRightEar !== null && triage.peateaRightEar !== undefined) {
                        setValue('peateaRightEar', triage.peateaRightEar ? 1 : 0);
                    }
                    setActiveStep(2);
                }
            }).finally(() => setLoading(false));
        }
    }, [id, setValue, service, setActiveStep]);

    const steps = [
        {
            element: <RegisterResponsible errors={errors} register={register} setValue={setValue} watch={watch} />,
            label: 'Cadastrar Responsáveis'
        },
        {
            element: <RegisterBaby register={register} errors={errors} setValue={setValue} watch={watch} />,
            label: 'Cadastrar Bebê'
        },
        {
            element: <RegisterResults register={register} errors={errors} watch={watch} setValue={setValue} />,
            label: 'Registrar Resultados'
        }
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    const serviceFunction = id ? (data) => service.updateTriage(id, data) : service.consultationRegister;

    return (
        <BaseRegisterPaper
            title={id ? 'Edição da Triagem (Reteste)' : 'Resultado da Triagem'}
            handleSubmit={handleSubmit}
            serviceFunction={serviceFunction}
            notSubmitButton={true}
            baseRoute={'/fono'}
        >
            <Grid item xs={12} sm={12} md={12}>
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                        '& .MuiStepIcon-root.Mui-active': { color: 'primary.main', scale: '1.15', transition: 'all 0.3s' },
                        '& .MuiStepIcon-root.Mui-completed': { color: 'secondaryBlue.main' },
                        '& .MuiStepLabel-label.Mui-active': { color: 'primary.main', fontWeight: 700, transition: 'all 0.3s' },
                        '& .MuiStepLabel-label.Mui-completed': { color: 'secondaryBlue.main', fontWeight: 600 },
                        mb: 5,
                        mt: 1
                    }}
                >
                    {steps.map(({ label }) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>

            {steps[activeStep].element}

            <Grid item xs={12} sm={12} md={12}>
                <Box sx={{
                    alignItems: 'center',
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 4,
                    pt: 4
                }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                        variant="outlined"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                borderColor: 'rgba(0, 0, 0, 0.25)'
                            },
                            '&.Mui-disabled': {
                                borderColor: 'rgba(0, 0, 0, 0.06)',
                                color: 'rgba(0, 0, 0, 0.25)'
                            },
                            borderColor: 'rgba(0, 0, 0, 0.15)',
                            borderRadius: '12px',
                            fontWeight: 600,
                            px: 4,
                            py: 1,
                            textTransform: 'none'
                        }}
                    >
                        Anterior
                    </Button>
                    {
                        activeStep === steps.length - 1
                            ? <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #cc2354 0%, #E83268 100%)',
                                        boxShadow: '0 6px 20px rgba(232, 50, 104, 0.5)',
                                        transform: 'translateY(-1px)'
                                    },
                                    background: 'linear-gradient(45deg, #E83268 0%, #ff5c8c 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 14px rgba(232, 50, 104, 0.35)',
                                    fontWeight: 700,
                                    px: 5,
                                    py: 1.2,
                                    textTransform: 'none',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {id ? 'Salvar Edição' : 'Finalizar Cadastro'}
                            </Button>
                            : <Button
                                onClick={handleOnNext}
                                variant="contained"
                                color="primary"
                                sx={{
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #441f5c 0%, #5D307A 100%)',
                                        boxShadow: '0 6px 20px rgba(93, 48, 122, 0.45)',
                                        transform: 'translateY(-1px)'
                                    },
                                    background: 'linear-gradient(45deg, #5D307A 0%, #8247ab 100%)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 14px rgba(93, 48, 122, 0.3)',
                                    fontWeight: 700,
                                    px: 5,
                                    py: 1.2,
                                    textTransform: 'none',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                Próximo
                            </Button>
                    }
                </Box>
            </Grid>
        </BaseRegisterPaper>
    );
};

export default RegisterTriage;