import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import BaseRegisterPaper from '../../../../components/bases/register/BaseRegisterPaper';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    maxLength: '255'
};

const RegisterEquipment = () => {
    const { id } = useParams();
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useTherapistService();

    useEffect(() => {
        if (id) {
            service.getAllEquipments().then((response) => {
                if (response && response.body) {
                    const list = Array.isArray(response.body) ? response.body : (response.body.result || []);
                    const equipment = list.find(item => item.id === Number(id));
                    if (equipment) {
                        setValue('model', equipment.model, { shouldValidate: true, shouldDirty: true });
                        setValue('brand', equipment.brand, { shouldValidate: true, shouldDirty: true });
                        setValue('dateOfLastCalibration', equipment.dateOfLastCalibration ? equipment.dateOfLastCalibration.split('T')[0] : '', { shouldValidate: true, shouldDirty: true });
                    }
                }
            });
        }
    }, [id, setValue, service]);

    const serviceFunction = (data) => {
        if (id) {
            return service.updateEquipment(id, data);
        }
        return service.equipmentRegister(data);
    };

    return(
        <BaseRegisterPaper handleSubmit={handleSubmit} title={id ? 'Editar Equipamento' : 'Equipamento'} serviceFunction={serviceFunction} baseRoute={'/fono/equipamento'}>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('model')} label="Modelo"
                    inputProps={inputProps}
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('brand')} label="Marca"
                    inputProps={inputProps}
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
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
