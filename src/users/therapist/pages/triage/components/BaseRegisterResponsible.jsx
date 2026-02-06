import React, { Fragment, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import BrazilianPhoneField from '../../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';
import CEPField from '../../../../../components/fileds/address/CEPField'; // ✅ import do seu campo customizado

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

const BaseRegisterResponsible = ({ errors, prefixName, register, setValue, states }) => { // ✅ adicionamos setValue
    const [state, setState] = useState(null);
    const service = useTherapistService();

    const getCities = () => {
        return service.getCities(state);
    };

    const onChangeState = (event) => {
        setState(event.target.value);
    };

    // ✅ 1. Função chamada quando começa a busca (coloca "..." nos campos)
    const handleSearchStart = () => {
        setValue(`${prefixName}.address.street`, '...');
        setValue(`${prefixName}.address.adjunct`, '...');
        setValue(`${prefixName}.address.state`, '...');
        setValue(`${prefixName}.address.city.id`, '...');
    };

    // ✅ 2. Função chamada quando o CEP é encontrado
    const handleAddressFound = (data) => {
        setValue(`${prefixName}.address.street`, data.logradouro);
        setValue(`${prefixName}.address.adjunct`, data.complemento);
        setValue(`${prefixName}.address.state`, data.uf);
        setValue(`${prefixName}.address.city.id`, data.localidade);

        // opcional: focar no campo de número
        const numberField = document.querySelector(`input[name="${prefixName}.address.number"]`);
        if (numberField) {
            numberField.focus();
        }
    };

    // ✅ 3. Função chamada em caso de erro
    const handleError = (msg) => {
        alert(msg);
        setValue(`${prefixName}.address.street`, '');
        setValue(`${prefixName}.address.adjunct`, '');
        setValue(`${prefixName}.address.state`, '');
        setValue(`${prefixName}.address.city.id`, '');
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

                {/* ==================== CONTATO ==================== */}
                <Grid item xs={12}>
                    <Typography variant="h6">Contato</Typography>
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
                    <BrazilianPhoneField
                        register={register} name={`${prefixName}.phones.0`} formErrors={errors}
                        label="Telefone residencial" variant="outlined" size="small" required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <BrazilianPhoneField
                        register={register} name={`${prefixName}.phones.1`} formErrors={errors}
                        label="Telefone celular" size="small" variant="outlined"
                    />
                </Grid>

                {/* ==================== ENDEREÇO ==================== */}
                <Grid item xs={12}>
                    <Typography variant="h6">Endereço</Typography>
                </Grid>

                {/* ✅ Campo de CEP customizado */}
                <Grid item xs={12} sm={12} md={6}>
                    <CEPField
                        register={register}
                        name={`${prefixName}.address.cep`}
                        setValue={setValue}
                        onSearchStart={handleSearchStart}
                        onAddressFound={handleAddressFound}
                        onError={handleError}
                        inputProps={inputProps.cep}
                        variant="outlined"
                        size="small"
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        {...register(`${prefixName}.address.street`)} label="Logradouro"
                        variant="outlined" size="small" inputProps={inputProps.general} required
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <SelectField
                        register={register(`${prefixName}.address.state`)}
                        values={states}
                        title={'Estado'}
                        onChange={onChangeState}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <AsyncRequest requestFunction={state ? getCities : null} watch={state}>
                        {(values) => (
                            <SelectField
                                register={register(`${prefixName}.address.city.id`)}
                                values={values}
                                title={'Cidade'}
                                disabled={!state}
                                required
                            />
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
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default BaseRegisterResponsible;
