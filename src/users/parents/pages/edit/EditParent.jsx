import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import useParentsService from '../../useParentsService';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';

const EditParent = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useParentsService();

    const loadFormattedData = React.useCallback(async () => {
        const response = await service.getMe();

        if (response && response.isSuccess && response.body) {
            const data = response.body;

            const email1 = Array.isArray(data.emails) && data.emails[0] ? data.emails[0].email : '';
            const email2 = Array.isArray(data.emails) && data.emails[1] ? data.emails[1].email : '';

            const phone1 = Array.isArray(data.phones) && data.phones[0] ? data.phones[0].phoneNumber : '';
            const phone2 = Array.isArray(data.phones) && data.phones[1] ? data.phones[1].phoneNumber : '';

            let formattedCpf = data.cpf || '';
            if (formattedCpf) formattedCpf = formattedCpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

            response.body = {
                name: data.name || '',
                cpf: formattedCpf,
                password: '',
                passwordConfirm: '',
                'emails.0': email1,
                'emails.1': email2,
                'phones.0': phone1,
                'phones.1': phone2
            };
        }

        return response;
    }, [service]);

    return (
        <BaseEditPaper
            title={'Editar Meu Perfil'}
            handleSubmit={handleSubmit}
            serviceFunction={service.updateMe}
            serviceGetFunction={loadFormattedData}
            setValue={setValue}
        >
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>Informações Básicas</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')}
                    label="Nome completo"
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
                    {...register('cpf')}
                    label="CPF"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled
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
                <BrazilianPhoneField
                    register={register}
                    name="phones.0"
                    formErrors={errors}
                    label="Telefone Principal"
                    required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register}
                    name="phones.1"
                    formErrors={errors}
                    label="Telefone Alternativo"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </BaseEditPaper>
    );
};

export default EditParent;
