import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    maxLength: '255'
};

const RegisterOrientation = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return(
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'Orientação'} serviceFunction={service.orientationRegister} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('description')} label="Descrição" inputProps={inputProps}
                    variant="outlined" size="small" multiline rows={4} required
                />
            </Grid>
        </BaseRegisterPaper>
    );
};
export default RegisterOrientation;
