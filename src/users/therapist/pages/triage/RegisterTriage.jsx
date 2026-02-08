import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';
import RegisterBaby from './components/RegisterBaby';
import RegisterResponsible from './components/RegisterResponsible';
import RegisterResults from './components/RegisterResults';
import useRegisterTriageController from './useRegisterTriageController';
import useRegisterTriageStyles from './useRegisterTriageStyles';

const RegisterTriage = () => {
    const service = useTherapistService();
    const styles = useRegisterTriageStyles();
    const { activeStep, handleOnNext, setActiveStep } = useRegisterTriageController();

    const { formState: { errors }, handleSubmit, register, setValue, watch } = useForm();

    const steps = [
        {
            element: <RegisterResponsible errors={errors} register={register} setValue={setValue}/>,
            label: 'Cadastrar Responsáveis'
        },
        {
            element: <RegisterBaby register={register} errors={errors}/>,
            label: 'Cadastrar Bebê'
        },
        {
            element: <RegisterResults register={register} errors={errors} watch={watch} setValue={setValue}/>,
            label: 'Registrar Resultados'
        }
    ];

    // TODO: Steper não está salvando os dados ao retornar para o passo anterior
    return (
        <BaseRegisterPaper title={'Resultado da Triagem'} handleSubmit={handleSubmit} serviceFunction={service.consultationRegister} notSubmitButton={true} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(({ label }) => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
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
                        activeStep === steps.length - 1?
                            <Button type="submit">Finalizar Cadastro</Button>
                            :
                            <Button onClick={handleOnNext}>Próximo</Button>
                    }
                </Box>
            </Grid>
        </BaseRegisterPaper>
    );
};

export default RegisterTriage;
