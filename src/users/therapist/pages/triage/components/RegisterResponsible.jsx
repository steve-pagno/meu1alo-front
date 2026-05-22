import React, { Fragment, useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import BaseRegisterResponsible from './BaseRegisterResponsible';
import useRegisterResponsibleStyles from './useRegisterResponsibleStyles';

const RegisterResponsible = ({ errors, register, setValue, watch }) => {
    const styles = useRegisterResponsibleStyles();
    const [responsibleCount, setResponsibleCount] = useState(0);

    const addClick = () => {
        setResponsibleCount(responsibleCount + 1);
    };

    const removeClick = () => {
        setValue(`baby.guardians.${responsibleCount - 1}`, undefined);
        setResponsibleCount(responsibleCount - 1);
    };

    return (
        <Fragment>
            <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
                <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                    <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                    <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                        Informações da Mãe
                    </Typography>
                </Box>
            </Grid>

            <BaseRegisterResponsible
                register={register}
                setValue={setValue}
                errors={errors}
                watch={watch}
                prefixName={'baby.birthMother'}
            />

            {responsibleCount > 0 && (
                <Grid item xs={12} sx={{ mb: 2, mt: 4 }}>
                    <Box sx={{ alignItems: 'center', borderBottom: '2px solid rgba(93, 48, 122, 0.12)', display: 'flex', gap: 1.5, pb: 1 }}>
                        <Box sx={{ background: 'linear-gradient(#5D307A, #E83268)', borderRadius: 2, height: 24, width: 8 }} />
                        <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
                            Informações do Responsável
                        </Typography>
                    </Box>
                </Grid>
            )}

            {Array(responsibleCount)
                .fill(0)
                .map((_, index) => (
                    <Fragment key={`responsible-${index}`}>
                        <Grid sx={styles.grid} item md={12} xs={12}>
                            <Divider />
                        </Grid>
                        <BaseRegisterResponsible
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            watch={watch}
                            prefixName={`baby.guardians.${index}`}
                        />
                    </Fragment>
                ))}

            <Grid item xs={12} sx={{ mt: 3 }}>
                <Button
                    sx={styles.addButton}
                    color="secondary"
                    variant="contained"
                    onClick={addClick}
                >
                    + Adicionar outro responsável
                </Button>
            </Grid>

            {responsibleCount > 0 && (
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Button
                        sx={styles.removeButton}
                        color="primary"
                        variant="contained"
                        onClick={removeClick}
                    >
                        - Remover o último responsável
                    </Button>
                </Grid>
            )}
        </Fragment>
    );
};

export default RegisterResponsible;