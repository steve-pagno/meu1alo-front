import React, { Fragment, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import BaseRegisterResponsible from './BaseRegisterResponsible';
import useRegisterResponsibleStyles from './useRegisterResponsibleStyles';

const RegisterResponsible = ({ errors, register, setValue }) => { // ✅ mantemos apenas os props
    const styles = useRegisterResponsibleStyles();
    const [responsibleCount, setResponsibleCount] = useState(0);

    const addClick = () => {
        setResponsibleCount(responsibleCount + 1);
    };

    const removeClick = () => {
        setValue(`responsible.${responsibleCount}`, undefined);
        setResponsibleCount(responsibleCount - 1);
    };

    return (
        <Fragment>
            <Grid item xs={12}>
                <Typography variant="h6" style={styles.textTitle}>
                    Informações da Mãe
                </Typography>
            </Grid>

            <BaseRegisterResponsible
                register={register}
                setValue={setValue}
                errors={errors}
                prefixName={'baby.birthMother'}
            />

            {responsibleCount > 0 && (
                <Grid item xs={12}>
                    <Typography variant="h6" style={styles.textTitle}>
                        Informações do Responsável
                    </Typography>
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
                            prefixName={`baby.guardians.${index}`}
                        />
                    </Fragment>
                ))}

            <Grid item xs={12}>
                <Button
                    sx={styles.finalButton}
                    color="secondary"
                    variant="contained"
                    onClick={addClick}
                >
                    Adicionar outro responsável
                </Button>
            </Grid>

            {responsibleCount > 0 && (
                <Grid item xs={12}>
                    <Button
                        sx={styles.finalButton}
                        color="primary"
                        variant="contained"
                        onClick={removeClick}
                    >
                        Remover o último responsável
                    </Button>
                </Grid>
            )}
        </Fragment>
    );
};

export default RegisterResponsible;
