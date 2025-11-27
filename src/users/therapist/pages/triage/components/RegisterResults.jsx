import React, { Fragment } from 'react';
import { CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import RadioField from '../../../../../components/fileds/radio/RadioField';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';
import useRegisterResultsStyles from './useRegisterResultsStyles';

const inputProps = {
    maxLength: '255'
};

const RegisterResults = ({ register, setValue, watch }) => {
    const service = useTherapistService();
    const styles = useRegisterResultsStyles();
    const watchIndicators = watch('indicators', []);
    const watchRightEar = watch('rightEar');
    const watchLeftEar = watch('leftEar');
    const watchTestType = watch('testType');
    const [resultConduct, setResultConduct] = React.useState('');

    React.useEffect(() =>{
        const obj = {
            irda : watchIndicators !== undefined && watchIndicators.length !== 0 ? 1 : 0,
            leftEar: watchLeftEar !== undefined ? watchLeftEar : 1,
            rightEar: watchRightEar !== undefined ? watchRightEar : 1,
            testType: watchTestType !== undefined ? watchTestType : 1,
        };
        service.getConduct(obj).then(response => {
            setResultConduct(response.body);
            setValue('conduct', response.body.id);
        });
    }, [watchIndicators, watchRightEar, watchLeftEar, watchTestType, service]);

    //TODO: Revisar chamada de métodos pois está sendo chamada sem necessidade a consulta dos métodos
    return (
        <Fragment>
            <Grid item xs={12} sm={12} md={12}>
                <Typography
                    variant="h6"
                    sx={styles.textTitle}
                >
                    Registrar Resultado
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
                <TextField
                    {...register('evaluationDate')}
                    label="Data da avaliação"
                    variant="outlined"
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={9}>
                <AsyncRequest
                    requestFunction={service.getAllEquipmentsActives}
                    loaderChildren={<CircularProgress/>}
                >
                    {(values) => (
                        <SelectField
                            register={register('equipment.id')}
                            title={'Equipamento'}
                            values={values}
                            required
                        />
                    )}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest
                    requestFunction={service.getAllIndicators}
                    loaderChildren={<CircularProgress/>}
                >
                    {(values) => (
                        <SelectField
                            register={register('indicators')}
                            title={'IRDA'}
                            values={values}
                            multiple
                        />
                    )}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest
                    requestFunction={service.getTriageTypes}
                    loaderChildren={<CircularProgress/>}
                >
                    {(values) => (
                        <SelectField
                            register={register('type')}
                            title={'Tipo TAN'}
                            values={values}
                            required
                        />
                    )}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest
                    requestFunction={service.getAllInstitutions}
                    loaderChildren={<CircularProgress/>}
                >
                    {(values) => (
                        <SelectField
                            register={register('institution.id')}
                            title={'Insitituição do teste'}
                            values={values}
                            required
                        />
                    )}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('rightEar')}
                    title={'Orelha Direita'}
                    values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('leftEar')}
                    title={'Orelha Esquerda'}
                    values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <RadioField
                    register={register('testType')}
                    title={'Tipo de teste'}
                    values={[{ id: 1, name: 'Teste' },{ id: 2, name: 'Reteste' },{ id: 3, name: 'Teste e reteste' }]}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography
                    variant="h6"
                >
                    Informações adicionais
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    label="Conduta"
                    multiline
                    rows={6}
                    variant="outlined"
                    size="small"
                    required={true}
                    value={resultConduct.name}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest
                    requestFunction={service.getAllOrientationsActives}
                    loaderChildren={<CircularProgress/>}
                    isReloadAllowed
                >
                    {(values) => (
                        <SelectField
                            register={register('orientation.id')}
                            title={'Orientação'}
                            values={values}
                            nameOfDescription={'description'}
                            required
                        />
                    )}
                </AsyncRequest>
                <Link href={'/fono/orientacao/cadastro'} underline="hover" target={'_blank'} style={{ marginTop: '10px' }}>
                    Clique aqui para cadastrar uma nova orientação. (OBS: Após cadastrar clique no <ReplayIcon size={'small'} style={{ height: '20px', verticalAlign: 'top', width: '20px' }}/> )
                </Link>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('observation')}
                    label="Observação"
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                    inputProps={inputProps}
                />
            </Grid>
        </Fragment>
    );
};
export default RegisterResults;
