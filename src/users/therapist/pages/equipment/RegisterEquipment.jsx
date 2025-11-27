import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    maxLength: '255'
};

const RegisterEquipment = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return(
        <BaseRegisterPaper handleSubmit={handleSubmit} title={'Equipamento'} serviceFunction={service.equipmentRegister} baseRoute={'/fono'}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('model')} label="Modelo"
                    inputProps={inputProps}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('brand')} label="Marca"
                    inputProps={inputProps}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('dateOfLastCalibration')} label="Data última calibração"
                    variant="outlined" size="small"  type="date" InputLabelProps={{ shrink: true }} required
                />
            </Grid>
        </BaseRegisterPaper>
    );
};
export default RegisterEquipment;
