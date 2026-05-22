import React, { Fragment } from 'react';
import { Box, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import AsyncRequest from '../../../../../components/api/AsyncRequest';
import RadioField from '../../../../../components/fileds/radio/RadioField';
import SelectField from '../../../../../components/fileds/select/SelectField';
import useTherapistService from '../../../useTherapistService';
import { buildConductPreview, resolveRiskCategory, shouldUsePeateA } from '../triageFlowHelper';
import useRegisterResultsStyles from './useRegisterResultsStyles';

const inputProps = {
    maxLength: '255'
};

const RegisterResults = ({ errors, register, setValue, watch }) => {
    const service = useTherapistService();
    const styles = useRegisterResultsStyles();
    const watchIndicators = watch('indicators', []);
    const watchTestType = watch('testType');
    const watchEoaRightEar = watch('eoaRightEar');
    const watchEoaLeftEar = watch('eoaLeftEar');
    const watchPeateaRightEar = watch('peateaRightEar');
    const watchPeateaLeftEar = watch('peateaLeftEar');
    const watchConductDescription = watch('conductDescription');

    const [resultConduct, setResultConduct] = React.useState({ name: '' });
    const [indicators, setIndicators] = React.useState([]);
    const [isConductEdited, setIsConductEdited] = React.useState(false);

    // Track if there's already an existing value prefilled (on edit record)
    React.useEffect(() => {
        if (watchConductDescription) {
            setIsConductEdited(true);
        }
    }, [watchConductDescription]);

    const riskCategory = React.useMemo(
        () => resolveRiskCategory(watchIndicators || [], indicators),
        [watchIndicators, indicators]
    );

    const usesPeateA = shouldUsePeateA(riskCategory);

    React.useEffect(() => {
        const preview = buildConductPreview({
            eoaLeftEar: watchEoaLeftEar !== undefined ? Number(watchEoaLeftEar) === 1 : true,
            eoaRightEar: watchEoaRightEar !== undefined ? Number(watchEoaRightEar) === 1 : true,
            peateaLeftEar: watchPeateaLeftEar !== undefined ? Number(watchPeateaLeftEar) === 1 : true,
            peateaRightEar: watchPeateaRightEar !== undefined ? Number(watchPeateaRightEar) === 1 : true,
            riskCategory,
            testType: watchTestType || 1,
        });

        setResultConduct(preview);
        setValue('leftEar', preview.finalLeftEar ? 1 : 0);
        setValue('rightEar', preview.finalRightEar ? 1 : 0);
        setValue('type', preview.type);

        // Autofill conduct description ONLY if the user hasn't typed in it manually
        if (!isConductEdited) {
            setValue('conductDescription', preview.name);
        }

        if (!usesPeateA) {
            setValue('peateaLeftEar', null);
            setValue('peateaRightEar', null);
        }
    }, [
        riskCategory,
        setValue,
        usesPeateA,
        watchEoaLeftEar,
        watchEoaRightEar,
        watchPeateaLeftEar,
        watchPeateaRightEar,
        watchTestType,
        isConductEdited,
    ]);

    return (
        <Fragment>
            <input type="hidden" {...register('leftEar')} />
            <input type="hidden" {...register('rightEar')} />
            <input type="hidden" {...register('type')} />

            <Grid item xs={12} sm={12} md={12} sx={{ mb: 2, mt: 2 }}>
                <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                    <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                    <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                        Registrar Resultado
                    </Typography>
                </Box>
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
                    fullWidth
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
                    {(values) => {
                        if (JSON.stringify(values) !== JSON.stringify(indicators)) {
                            setTimeout(() => setIndicators(values), 0);
                        }

                        const decoratedValues = values.map((item) => ({
                            ...item,
                            name: `${item.name} (${item.riskType || 'IRDA1'})`
                        }));

                        return (
                            <SelectField
                                register={register('indicators')}
                                title={'IRDA'}
                                values={decoratedValues}
                                multiple
                            />
                        );
                    }}
                </AsyncRequest>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    label="Protocolo TAN"
                    variant="outlined"
                    size="small"
                    value={usesPeateA ? 'EOA + PEATE-A' : 'EOA'}
                    InputLabelProps={{ shrink: true }}
                    disabled
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('testType')}
                    title={'Etapa'}
                    values={[{ id: 1, name: 'Teste' },{ id: 2, name: 'Reteste' }]}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ mb: 2, mt: 4 }}>
                <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                    <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                    <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                        Resultados do Teste
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('eoaRightEar')}
                    title={'EOA - Orelha Direita'}
                    values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                    required
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <RadioField
                    register={register('eoaLeftEar')}
                    title={'EOA - Orelha Esquerda'}
                    values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                    required
                />
            </Grid>

            {usesPeateA && (
                <>
                    <Grid item xs={12} sm={12} md={12} sx={{ mb: 2, mt: 4 }}>
                        <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                            <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                            <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                                Resultados do PEATE-A
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <RadioField
                            register={register('peateaRightEar')}
                            title={'PEATE-A - Orelha Direita'}
                            values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <RadioField
                            register={register('peateaLeftEar')}
                            title={'PEATE-A - Orelha Esquerda'}
                            values={[{ id: 1, name: 'Passou' },{ id: 0, name: 'Falhou' }]}
                            required
                        />
                    </Grid>
                </>
            )}

            <Grid item xs={12} sm={12} md={12} sx={{ mb: 2, mt: 4 }}>
                <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                    <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                    <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                        Informações adicionais
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <TextField
                    {...register('conductDescription', { required: true })}
                    label="Conduta"
                    multiline
                    rows={6}
                    variant="outlined"
                    size="small"
                    required
                    onChange={(e) => {
                        setIsConductEdited(true);
                        setValue('conductDescription', e.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
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
                    Clique aqui para cadastrar uma nova orientação. (OBS: Após cadastrar clique no{' '}
                    <ReplayIcon size={'small'} style={{ height: '20px', verticalAlign: 'top', width: '20px' }}/>{' '}
                    )
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
                    fullWidth
                />
            </Grid>
        </Fragment>
    );
};

export default RegisterResults;