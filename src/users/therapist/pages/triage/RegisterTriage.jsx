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

    const { formState: { errors }, handleSubmit, register, setValue, watch, reset } = useForm();

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
                        setValue('baby.birthMother.name', triage.baby.birthMother.name);
                        setValue('baby.birthMother.cpf', triage.baby.birthMother.cpf);
                        setValue('baby.birthMother.rg', triage.baby.birthMother.rg);
                    }
                    if (triage.baby?.guardians?.length > 0) {
                        triage.baby.guardians.forEach((g, idx) => {
                            setValue(`baby.guardians[${idx}].name`, g.name);
                            setValue(`baby.guardians[${idx}].cpf`, g.cpf);
                            setValue(`baby.guardians[${idx}].rg`, g.rg);
                        });
                    }
                    if (triage.evaluationDate) {
                        setValue('evaluationDate', triage.evaluationDate.split('T')[0]);
                    }
                    setValue('testType', triage.conduct?.testType || 2); // 2: Reteste por padrão ao editar
                    if (triage.equipment) setValue('equipment.id', triage.equipment.id);
                    if (triage.institution) setValue('institution.id', triage.institution.id);
                    if (triage.orientation) setValue('orientation.id', triage.orientation.id);
                    if (triage.indicators) {
                        setValue('indicators', triage.indicators);
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
                }
            }).finally(() => setLoading(false));
        }
    }, [id, setValue, service]);

    const steps = [
        {
            element: <RegisterResponsible errors={errors} register={register} setValue={setValue} watch={watch} />,
            label: 'Cadastrar Responsáveis'
        },
        {
            element: <RegisterBaby register={register} errors={errors} />,
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
        <BaseRegisterPaper title={id ? 'Edição da Triagem (Reteste)' : 'Resultado da Triagem'} handleSubmit={handleSubmit} serviceFunction={serviceFunction} notSubmitButton={true} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(({ label }) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>

            {steps[activeStep].element}

            <Grid item xs={12} sm={12} md={12}>
                <Box sx={styles.box}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                        sx={styles.button}
                    >
                        Anterior
                    </Button>
                    {
                        activeStep === steps.length - 1
                            ? <Button type="submit">{id ? 'Salvar Edição' : 'Finalizar Cadastro'}</Button>
                            : <Button onClick={handleOnNext}>Próximo</Button>
                    }
                </Box>
            </Grid>
        </BaseRegisterPaper>
    );
};

export default RegisterTriage;