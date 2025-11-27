import React, { Fragment } from 'react';
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';
import useRegisterBabyStyles from './useRegisterBabyStyles';

const inputProps = {
    circumference: {
        maxLength: '4',
        pattern: '[0-9]+'
    },
    general: {
        maxLength: '255'
    },
    gestationalAge: {
        maxLength: '2',
        pattern: '[0-9]+'
    },
    height: {
        maxLength: '4',
        pattern: '[0-9]+'
    },
    weight: {
        maxLength: '4',
        pattern: '[0-9]+'
    }
};

const RegisterBaby = ({ register }) => {
    const service = useTherapistService();
    const styles = useRegisterBabyStyles();

    return (
        <Fragment>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" sx={styles.textTitle}>
                    Informações do Bebê
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('baby.name')} label="Nome do bebê"
                    inputProps={inputProps.general}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('baby.weight')} label="Peso"
                    inputProps={inputProps.weight}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('baby.height')} label="Altura"
                    inputProps={inputProps.height}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('baby.circumference')} label="Perímetro cefálico"
                    inputProps={inputProps.circumference}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('baby.birthDate')} label="Data de nascimento"
                    variant="outlined" size="small" type="date"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('baby.gestationalAge')} label="Idade gestacional"
                    inputProps={inputProps.gestationalAge}
                    variant="outlined" size="small" required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={service.getChildBirthType} loaderChildren={<CircularProgress />}>
                    {(values) => (
                        <SelectField
                            register={register('baby.childBirthType')} values={values}
                            title={'Tipo de parto'} required
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <FormGroup {...register('baby.maternalDeath')}>
                    <FormControlLabel
                        control={<Checkbox />} label="Óbito materno"
                        size="small" {...register('baby.maternalDeath')}
                    />
                </FormGroup>
            </Grid>
        </Fragment>
    );
};

export default RegisterBaby;
