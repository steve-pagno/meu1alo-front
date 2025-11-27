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
    const { id } = useParams();

    return (
        <BaseEditPaper
            title={'Instituição'}
            handleSubmit={handleSubmit}
            serviceFunction={service.update}
            serviceGetFunction={service.get}
            setValue={setValue} id={id}
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
