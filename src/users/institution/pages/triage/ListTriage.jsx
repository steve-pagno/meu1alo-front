import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useInstitutionService from '../../useInstituionService';

const headers = [
    { name: 'babyName', title: 'Criança' },
    { name: 'responsibleName', title: 'Responsável' },
    { formatter: 'date', name: 'evaluationDate', title: 'Data avaliação' },
    { name: 'type', title: 'Tipo TAN' },
    { formatter: 'type-of-test', name: 'testType', title: 'Tipo teste' },
    { formatter: 'yes-or-no', name: 'leftEar', title: 'Passou esquerda' },
    { formatter: 'yes-or-no', name: 'rightEar', title: 'Passou direita' },
    { name: 'conduct', title: 'Conduta' },
    { name: 'therapistName', title: 'Fonoaudiólogo' },
];

const makeTableProperties = () => ({
    actions: {
        view: { route: '/institucional/triagem' },
    }
});

const ListTriage = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useInstitutionService();
    const tableProperties = React.useMemo(() => makeTableProperties(), []);

    return (
        <BaseConsult
            handleSubmit={handleSubmit}
            title={'Triagens Realizadas'}
            serviceFunction={service.getAllTriages}
            headers={headers}
            fileName={'Triagens'}
            tableProperties={tableProperties}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('babyName')}
                    label="Nome da Criança"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('responsibleName')}
                    label="Nome do Responsável"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('therapistName')}
                    label="Nome do Fonoaudiólogo"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('evaluationDate')}
                    label="Data da avaliação"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <RadioField
                    register={register('testType')}
                    title={'Tipo de teste'}
                    values={[{ id: 4, name: 'Todos' }, { id: 1, name: 'Teste' }, { id: 2, name: 'Reteste' }]}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField
                    register={register('rightEar')}
                    title={'Orelha Direita'}
                    values={[{ id: 4, name: 'Passou e Falhou' }, { id: 1, name: 'Passou' }, { id: 0, name: 'Falhou' }]}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField
                    register={register('leftEar')}
                    title={'Orelha Esquerda'}
                    values={[{ id: 4, name: 'Passou e Falhou' }, { id: 1, name: 'Passou' }, { id: 0, name: 'Falhou' }]}
                />
            </Grid>
        </BaseConsult>
    );
};

export default ListTriage;
