import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    crfa: {
        maxLength: '9', // Aumentado para 9 para suportar o hífen da máscara (0-000000)
    },
    general: {
        maxLength: '255'
    }
};

const EditTherapist = () => {
    const { formState: { errors }, handleSubmit, register, setValue } = useForm();
    const service = useTherapistService();

    return (
        <BaseEditPaper 
            title={'Meu Perfil'}
            handleSubmit={handleSubmit}
            serviceFunction={service.update}
            // Alterado para a função que busca os dados do usuário logado
            serviceGetFunction={service.getLoggedTherapist} 
            setValue={setValue} 
            // Removido o ID, pois o backend identificará o usuário pelo Token JWT
        >
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')} label="Nome completo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.name}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('login')} label={'Login'}
                    variant="outlined" size="small"
                    inputProps={inputProps.general}
                    helperText="Nome usado para acessar a plataforma"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.login}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('crfa', {
                        setValueAs: (v) => v.replace(/\D/g, ''), // Envia apenas números ao banco
                        onChange: (e) => {
                            const rawValue = e.target.value.replace(/\D/g, '');
                            if (rawValue.length > 0) {
                                e.target.value = rawValue.replace(/(\d{1})(\d{1,})/, '$1-$2');
                            }
                        }
                    })} 
                    label="CRFa"
                    inputProps={inputProps.crfa}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.crfa}
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
                <BrazilianPhoneField  
                    register={register} name="phones.0" formErrors={errors}
                    label="Telefone principal" variant="outlined" size="small" 
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField  
                    register={register} name="phones.1" formErrors={errors}
                    label="Telefone alternativo" variant="outlined" size="small" 
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </BaseEditPaper>
    );
};

export default EditTherapist;