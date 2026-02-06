import React from 'react';
import { CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import CNPJField from '../../../../components/fileds/documents/CNPJField';
import RadioField from '../../../../components/fileds/radio/RadioField';
import useRegisterInstitutionController from './useRegisterInstitutionController';
import CEPField from '../../../../components/fileds/address/CEPField';

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
    state: {
        maxLength: '2'
    },
    number: {
        maxLength: '4',
        pattern: '[0-9]+'
    }
};

const RegisterInstitution = ({ register, setValue }) => {
    const { getTypes } = useRegisterInstitutionController();

    // 1. Função chamada quando começa a busca (coloca "..." nos campos)
    const handleSearchStart = () => {
        console.log('[DEBUG] Iniciando busca... preenchendo com "..."');
        setValue('institution.address.street', '...');
        setValue('institution.address.adjunct', '...');
        setValue('institution.address.state', '...');
        setValue('institution.address.city', '...');
        setValue('institution.address.district', '...'); // Caso use bairro
    };

    // 2. Função chamada quando o CEP é encontrado com sucesso
    const handleAddressFound = (data) => {
        console.log('[DEBUG] Endereço encontrado! Dados:', data);

        // Preenche os campos
        setValue('institution.address.street', data.logradouro);
        setValue('institution.address.adjunct', data.complemento);
        setValue('institution.address.state', data.uf);
        setValue('institution.address.city', data.localidade);
        setValue('institution.address.district', data.bairro);

        // Foca no campo de número para agilizar
        const numberField = document.querySelector('input[name="institution.address.number"]');
        if (numberField) {
            numberField.focus();
        }
    };

    // 3. Função chamada em caso de erro (limpa e avisa)
    const handleError = (msg) => {
        console.warn('[DEBUG] Erro ao buscar CEP:', msg);
        alert(msg);
        
        // Limpa os campos
        setValue('institution.address.street', '');
        setValue('institution.address.adjunct', '');
        setValue('institution.address.state', '');
        setValue('institution.address.city', '');
        setValue('institution.address.district', '');
    };

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

            {/* Início da Seção de Endereço */}
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Endereço
                </Typography>
            </Grid>

            {/* Campo de CEP Customizado */}
            <Grid item xs={12} sm={12} md={6}>
                <CEPField
                    register={register}
                    name="institution.address.cep"
                    setValue={setValue}
                    onSearchStart={handleSearchStart}
                    onAddressFound={handleAddressFound}
                    onError={handleError}
                    inputProps={inputProps.cep}
                    variant="outlined" size="small" required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.street')} label="Logradouro"
                    inputProps={inputProps.general}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined" size="small" required
                />
            </Grid>

            {/* Estado (UF) agora é Texto Simples */}
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.state')} label="Estado (UF)"
                    inputProps={inputProps.state}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined" size="small" required
                />
            </Grid>

            {/* Cidade agora é Texto Simples */}
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('institution.address.city')} label="Cidade"
                    inputProps={inputProps.general}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined" size="small" required
                />
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
                    InputLabelProps={{ shrink: true }}
                    variant="outlined" size="small"
                />
            </Grid>
        </React.Fragment>
    );
};

export default RegisterInstitution;