import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    maxLength: '255'
};

const headers = [
    { name: 'description', title: 'Descrição' },
    { formatter: 'date', name: 'dateOfDeactivation', title: 'Data desativação' }
];

const ListOrientation = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    const tableProperties = {
        actions: {
            delete: {
                genericField: 'dateOfDeactivation',
                method: service.deleteOrientation,
                route: '',
            },
            // edit: {
            //     genericField: 'dateOfDeactivation',
            //     route: '',
            // },
            permissionField: 'therapist'
        }
    };

    return(
        <BaseConsult handleSubmit={handleSubmit} title={'Orientações'}
            serviceFunction={service.getAllOrientations} headers={headers}
            tableProperties={tableProperties} fileName={'Orientacoes'}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('description')} label="Descrição"
                    inputProps={inputProps}
                    variant="outlined" size="small"
                />
            </Grid>
        </BaseConsult>
    );
};
export default ListOrientation;
