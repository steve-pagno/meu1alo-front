import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    crfa: {
        maxLength: '8',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    }
};

const EditTherapist = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useTherapistService();
    const { id } = useParams();

    return (
        <BaseEditPaper title={'Fonoaudiólogo'}
            handleSubmit={handleSubmit}
            serviceFunction={service.update}
            serviceGetFunction={service.get}
            setValue={setValue} id={id}
        >
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')} label="Nome completo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('login')} label={'Login'}
                    variant="outlined" size="small"
                    inputProps={inputProps.general}
                    helperText={<p>Nome que será usado para acessar a plataforma junto a senha</p>}
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('crfa')} label="CRFa"
                    inputProps={inputProps.crfa}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={service.getXpTypes} loaderChildren={<CircularProgress />}>
                    {(xpTypes) => (
                        <SelectField
                            title={'Tempo de experiência'}
                            register={{ ...register('xp') }}
                            required values={xpTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={service.getAllInstitutions} loaderChildren={<CircularProgress />}>
                    {(institutions) => (
                        <SelectField
                            title={'Instituições'}
                            register={{ ...register('institutions') }}
                            required values={institutions} multiple
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.0')} label="E-mail preferencial"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.1')} label="E-mail alternativo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField  register={register} name="phones.0" formErrors={errors}
                    label="Telefone principal" variant="outlined" size="small"  InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField  register={register} name="phones.1" formErrors={errors}
                    label="Telefone alternativo" variant="outlined" size="small" InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </BaseEditPaper>
    );
};
export default EditTherapist;
