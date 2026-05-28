import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BaseConsult from '../../../../components/bases/consult/BaseConsult';
import useInstitutionService from '../../useInstituionService';

const headers = [
    { name: 'name', title: 'Nome Completo' },
    { name: 'crfa', title: 'CRFa' },
    { name: 'login', title: 'Login' },
    { name: 'xpLabel', title: 'Experiência' },
    { name: 'email', title: 'E-mail' },
    { name: 'phone', title: 'Telefone' }
];

const ListTherapists = () => {
    const { handleSubmit, register } = useForm();
    const service = useInstitutionService();
    const navigate = useNavigate();

    const tableProperties = {
        actions: {
            delete: {
                genericField: 'dateOfDeactivation',
                method: service.removeTherapist,
                route: ''
            }
        }
    };

    return (
        <BaseConsult
            handleSubmit={handleSubmit}
            title={'Fonoaudiólogos Associados'}
            serviceFunction={service.getTherapists}
            headers={headers}
            fileName={'Fonoaudiologos'}
            tableProperties={tableProperties}
        >
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/institucional/fonoaudiologos/cadastro')}
                    style={{ marginBottom: 10, fontWeight: 'bold' }}
                >
                    Vincular / Cadastrar Fono
                </Button>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    {...register('name')}
                    label="Nome do Fonoaudiólogo"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled
                    helperText="Filtros indisponíveis nesta versão"
                />
            </Grid>
        </BaseConsult>
    );
};

export default ListTherapists;
