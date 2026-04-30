import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useInstitutionService from '../../useInstituionService';

const EditInstitution = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useInstitutionService();

    const loadData = React.useCallback(async () => {
        const response = await service.getMe();

        if (response && response.isSuccess && response.body) {
            const data = response.body;

            const email1 = Array.isArray(data.emails) && data.emails[0] ? data.emails[0].email : '';
            const email2 = Array.isArray(data.emails) && data.emails[1] ? data.emails[1].email : '';

            const phone1 = Array.isArray(data.phones) && data.phones[0] ? data.phones[0].phoneNumber : '';
            const phone2 = Array.isArray(data.phones) && data.phones[1] ? data.phones[1].phoneNumber : '';

            let formattedCnpj = data.institution?.cnpj || '';
            if (formattedCnpj) formattedCnpj = formattedCnpj.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

            response.body = {
                institutionName: data.institution?.institutionName || '',
                cnes: data.institution?.cnes || '',
                cnpj: formattedCnpj,
                institutionType: data.institution?.institutionType || '',
                email: email1,
                alternativeEmail: email2,
                institutionPhone: phone1,
                institutionCellphone: phone2,
                cep: data.institution?.address?.cep || '',
                publicArea: data.institution?.address?.street || '',
                state: data.institution?.address?.city?.stateUf || '',
                city: data.institution?.address?.city?.cityName || '',
                number: data.institution?.address?.number || '',
                complement: data.institution?.address?.adjunct || '',
                responsibleName: data.name || '',
                responsibleRole: data.role || '',
                password: '',
                passwordConfirm: ''
            };
        }

        return response;
    }, [service]);

    return (
        <BaseEditPaper
            title={'Instituição'}
            handleSubmit={handleSubmit}
            serviceFunction={service.updateMe}
            serviceGetFunction={loadData}
            setValue={setValue}
        >
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('institutionName')}
                    label="Nome instituição"
                    variant="outlined"
                    size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('password')}
                    label="Senha" type="password"
                    variant="outlined"
                    size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('passwordConfirm')}
                    label="Confirmação de senha"
                    type="password" variant="outlined"
                    size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('cnes')}
                    label="CNES" variant="outlined"
                    size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('cnpj')} label="CNPJ"
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={service.getTypes} loaderChildren={<CircularProgress />}>
                    {(institutionTypes) => (
                        <RadioField
                            title={'Tipo de instituição'}
                            register={{ ...register('institutionType') }}
                            values={institutionTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('email')}
                    label="E-mail preferencial"
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('alternativeEmail')}
                    label="E-mail alternativo"
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register}
                    name="institutionPhone"
                    formErrors={errors}
                    label="Telefone institucional" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register}
                    name="institutionCellphone"
                    formErrors={errors}
                    label="Telefone celular institucional"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Endereço
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('cep')} label="CEP"
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('publicArea')}
                    label="Logradouro" variant="outlined"
                    size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('state')} label="Estado"
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('city')} label="Cidade"
                    variant="outlined" size="small" required
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('number')} label="Número"
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('complement')}
                    label="Complemento" variant="outlined"
                    size="small" InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography  variant={'h6'}>
                    Dados do responsável da instituição
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('responsibleName')}
                    label="Nome do responsável"
                    variant="outlined" size="small"
                    required InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('responsibleRole')}
                    label="Cargo" variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </BaseEditPaper>
    );
};
export default EditInstitution;
