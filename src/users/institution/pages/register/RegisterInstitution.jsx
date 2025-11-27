import React from 'react';
import { CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import CNPJField from '../../../../components/fileds/documents/CNPJField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useRegisterInstitutionController from './useRegisterInstitutionController';

const inputProps = {
    cep: {
        maxLength: '8',
        pattern: '[0-9]+'
    },
    cnes: {
        maxLength: '11',
        pattern: '[0-9]+'
    },
    cnpj: {
        maxLength: '14',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    },
    number: {
        maxLength: '4',
        pattern: '[0-9]+'
    }
};

const RegisterInstitution = ({ register }) => {
    const { getCities, getStates, getTypes, onChangeState, state } = useRegisterInstitutionController();

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Informações sobre a Instituição
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('institution.institutionName')} label="Nome da instituição"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.cnes')} label="CNES"
                    inputProps={inputProps.cnes}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <CNPJField register={register} name="institution.cnpj" label="CNPJ"/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={getTypes} loaderChildren={<CircularProgress />}>
                    {(institutionTypes) => (
                        <RadioField
                            title={'Tipo de instituição'} register={{ ...register('institution.institutionType') }}
                            required values={institutionTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Endereço
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.cep')} label="CEP"
                    inputProps={inputProps.cep}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.street')} label="Logradouro"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={getStates} loaderChildren={<CircularProgress />}>
                    {(states) => (
                        <SelectField
                            title={'Estado'} register={{ ...register('institution.address.state') }}
                            onChange={onChangeState} required values={states}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={state ? getCities : null} loaderChildren={<CircularProgress />}>
                    {(cities) => (
                        <SelectField
                            title={'Cidade'} register={register('institution.address.city.id')}
                            disabled={!state} required values={cities}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.number')} label="Número"
                    inputProps={inputProps.number}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.adjunct')} label="Complemento"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                />
            </Grid>
        </React.Fragment>
    );
};
export default RegisterInstitution;
