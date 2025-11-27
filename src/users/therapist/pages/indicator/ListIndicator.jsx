import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    maxLength: '255'
};

const headers = [
    { name: 'name', title: 'Nome' }
];

const ListIndicator = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return(
        <BaseConsult handleSubmit={handleSubmit} title={'Indicadores'}
            serviceFunction={service.getAllIndicators}
            headers={headers} fileName={'Indicadores'}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('name')} label="Nome"
                    inputProps={inputProps}
                    variant="outlined" size="small"
                />
            </Grid>
        </BaseConsult>
    );
};
export default ListIndicator;
