import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useTherapistService from '../../useTherapistService';

const headers = [
    { formatter: 'date', name: 'evaluationDate', title: 'Data avaliação' },
    { name: 'institution', title: 'Instituição' },
    { name: 'type', title: 'Tipo TAN' },
    { formatter: 'type-of-test',name: 'testType', title: 'Tipo teste' },
    { formatter: 'yes-or-no', name: 'leftEar', title: 'Passou esquerda' },
    { formatter: 'yes-or-no', name: 'rightEar', title: 'Passou direita' },
    { name: 'conduct', title: 'Conduta' },
];

const makeTableProperties = (service) => ({
    actions: {
        pdf: {
            options: [
                // {
                //     href: '',
                //     name: 'detalhado da triagem'
                // },
                {
                    requestFunction: service.getFileTriageReportsOrientations,
                    title: 'Orientações fonoaudiológicas',
                },
                {
                    requestFunction: service.getFileTriageReportsTest,
                    title: 'Relatório do teste',
                },
                {
                    requestFunction: service.getFileTriageReportsRetest,
                    title: 'Relatório do reteste',
                }
            ]
        },
    }
});

const ListTriage = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();
    const tableProperties = React.useMemo(() => makeTableProperties(service), [service]);

    return(
        <BaseConsult
            handleSubmit={handleSubmit}
            title={'Triagens'}
            serviceFunction={service.getAllTriages}
            headers={headers}
            fileName={'Triagens'}
            tableProperties={tableProperties}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('evaluationDate')}
                    label="Data da avaliação"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <RadioField
                    register={register('testType')}
                    title={'Tipo de teste'}
                    values={[{ id: 4, name: 'Todos' },{ id: 1, name: 'Teste' },{ id: 2, name: 'Reteste' },{ id: 3, name: 'Teste e reteste' }] }
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField
                    register={register('rightEar')}
                    title={'Orelha Direita'}
                    values={[{ id: 4, name: 'Passou e Falhou' },{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
                <RadioField
                    register={register('leftEar')}
                    title={'Orelha Esquerda'}
                    values={[{ id: 4, name: 'Passou e Falhou' },{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                />
            </Grid>
        </BaseConsult>
    );
};
export default ListTriage;
