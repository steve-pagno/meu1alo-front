import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useTherapistService from '../../useTherapistService';

const headers = [
    { name: 'babyName', title: 'Criança' },
    { name: 'responsibleName', title: 'Responsável' },
    { name: 'irda', title: 'IRDA' },
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
        edit: { route: '/fono/triagem/editar' },
        pdf: {
            options: [
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
        view: { route: '/fono/triagem' },
    }
});

const ListTriage = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const service = useTherapistService();
    const tableProperties = React.useMemo(() => makeTableProperties(service), [service]);

    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        service.getAllInstitutions().then((response) => {
            if (response.isSuccess) {
                setInstitutions(response.body || []);
            }
        });
    }, [service]);

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
                    values={[{ id: 4, name: 'Todos' },{ id: 1, name: 'Teste' },{ id: 2, name: 'Reteste' }] }
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
            {institutions.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                        Filtrar por Instituição:
                    </Typography>
                    <FormGroup>
                        {institutions.map((inst) => (
                            <FormControlLabel
                                key={inst.id}
                                control={
                                    <Checkbox
                                        {...register(`institution_${inst.id}`)}
                                        size="small"
                                    />
                                }
                                label={inst.institutionName || inst.name}
                            />
                        ))}
                    </FormGroup>
                </Grid>
            )}
        </BaseConsult>
    );
};
export default ListTriage;
