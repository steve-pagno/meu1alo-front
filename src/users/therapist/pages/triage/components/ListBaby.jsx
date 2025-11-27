import React from 'react';
import { useForm } from 'react-hook-form';
import BaseConsult from '../../../../../components/bases/consult/BaseConsult';
import useTherapistService from '../../../useTherapistService';

const headers = [
    { name: 'name', title: 'Nome' },
    { name: 'weight', title: 'Peso' },
    { name: 'height', title: 'Altura' },
    { name: 'circumference', title: 'Circunferência' },
    { formatter: 'date', name: 'birthDate', title: 'Data nascimento' },
    { name: 'childBirthType', title: 'Tipo parto' },
    { name: 'birthMother', title: 'Mãe' }
];

const ListBaby = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return(
        <BaseConsult handleSubmit={handleSubmit} title={'Bebês'} serviceFunction={service.getAllBabies} headers={headers}>
            {/*<Grid item xs={12} sm={12} md={12}>*/}
            {/*    <TextField  {...register('description')} label="Descrição" variant="outlined" size="small"/>*/}
            {/*</Grid>*/}
        </BaseConsult>
    );
};
export default ListBaby;
