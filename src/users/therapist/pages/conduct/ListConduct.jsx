import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useTherapistService from '../../useTherapistService';

const headers = [
    { name: 'resultDescription', title: 'Descrição resultado' },
    { name: 'accompanyDescription', title: 'Descrição acompanhamento' },
    { formatter: 'yes-or-no', name: 'leftEar', title: 'Passou esquerda' },
    { formatter: 'yes-or-no', name: 'rightEar', title: 'Passou direita' },
    { formatter: 'yes-or-no', name: 'irda', title: 'Com irda' },
    { formatter: 'type-of-test', name: 'testType', title: 'Tipo teste' }
];

const ListConduct = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();

    return(
        <BaseConsult handleSubmit={handleSubmit} title={'Condutas'}
            serviceFunction={service.getAllConducts} headers={headers}
            fileName={'Condutas'}
        >
            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('testType')} title={'Tipo de teste'}
                    values={[{ id: 4, name: 'Todos' },{ id: 1, name: 'Teste' },{ id: 2, name: 'Reteste' },{ id: 3, name: 'Teste e reteste' }] }
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('irda')} title={'IRDA'}
                    values={[{ id: 4, name: 'Possui e Não Possui' },{ id: 1, name: 'Possui' },{ id: 0, name: 'Não Possui' }]}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField register={register('rightEar')}
                    title={'Orelha Direita'}
                    values={[{ id: 4, name: 'Passou e Falhou' },{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]} />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField register={register('leftEar')}
                    title={'Orelha Esquerda'}
                    values={[{ id: 4, name: 'Passou e Falhou' },{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]} />
            </Grid>
        </BaseConsult>
    );
};
export default ListConduct;
