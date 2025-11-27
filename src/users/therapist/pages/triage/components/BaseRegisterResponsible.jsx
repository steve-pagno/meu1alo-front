import React, { Fragment, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import BrazilianPhoneField from '../../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';

const inputProps = {
    cep: {
        maxLength: '8',
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

const BaseRegisterResponsible = ({ errors, prefixName, register, states }) => {
    const [state, setState] = useState(null);
    const service = useTherapistService();

    const getCities = () => {
        return service.getCities(state);
    };

    const onChangeState = (event) => {
        setState(event.target.value);
    };


    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                    <TextField
                        {...register(`${prefixName}.name`)} label="Nome completo"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <TextField
                        {...register(`${prefixName}.birthDate`)} label="Data de nascimento"
                        variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6" >
                        Contato
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.emails.0`)} label="E-mail preferencial"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.emails.1`)} label="E-mail alternativo"
                        variant="outlined" size="small" inputProps={inputProps.general}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BrazilianPhoneField register={register} name={`${prefixName}.phones.0`} formErrors={errors}
                        label="Telefone residencial" variant="outlined" size="small" required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BrazilianPhoneField register={register} name={`${prefixName}.phones.1`} formErrors={errors}
                        label="Telefone celular" size="small" variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6" >
                        Endereço
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.cep`)} label="CEP"
                        variant="outlined" size="small" inputProps={inputProps.cep} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.street`)} label="Logradouro"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <SelectField register={register(`${prefixName}.address.state`)} values={states} title={'Estado'} onChange={onChangeState} required />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <AsyncRequest requestFunction={state ? getCities : null} watch={state}>
                        {(values) => (
                            <SelectField register={register(`${prefixName}.address.city.id`)} values={values} title={'Cidade'} disabled={!state} required />
                        )}
                    </AsyncRequest>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.number`)} label="Número"
                        variant="outlined" size="small" inputProps={inputProps.number} required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.adjunct`)} label="Complemento"
                        variant="outlined" size="small" inputProps={inputProps.general}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default BaseRegisterResponsible;
