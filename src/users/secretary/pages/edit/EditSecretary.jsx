import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import useSecretaryService from '../../useSecretaryService';

const EditSecretary = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useSecretaryService();
    const { id } = useParams();

    const loadFormattedData = async (fetchId) => {
        const response = await service.get(fetchId);

        if (response && response.isSuccess && response.body) {
            const data = response.body;

            const email1 = Array.isArray(data.emails) ? (data.emails[0] || '') : '';
            const email2 = Array.isArray(data.emails) ? (data.emails[1] || '') : '';

            const phone1 = Array.isArray(data.phones) ? (data.phones[0] || '') : '';
            const phone2 = Array.isArray(data.phones) ? (data.phones[1] || '') : '';

            response.body = {
                name: data.name || '',
                password: '',
                passwordConfirm: '',
                'emails.0': email1,
                'emails.1': email2,
                'phones.0': phone1,
                'phones.1': phone2
            };
        }

        return response;
    };

    return (
        <BaseEditPaper
            title={'Editar Dados da Secretaria'}
            handleSubmit={handleSubmit}
            serviceFunction={service.update}
            serviceGetFunction={loadFormattedData}
            setValue={setValue}
            id={id}
        >
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>Informações Básicas</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('name')}
                    label="Nome da secretaria"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    error={!!errors?.name}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('password')}
                    label="Nova Senha (deixe em branco para manter)"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('passwordConfirm')}
                    label="Confirmação da nova senha"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <Typography variant={'h6'}>Contato</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.0')}
                    label="E-mail preferencial"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.1')}
                    label="E-mail alternativo"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('phones.0')}
                    label="Telefone Principal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('phones.1')}
                    label="Telefone Alternativo"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </BaseEditPaper>
    );
};

export default EditSecretary;