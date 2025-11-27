import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import HtmlHead from '../../../components/HtmlHead';
import useBaseRegisterController from './useBaseRegisterController';
import useBaseRegisterStyles from './useBaseRegisterStyles';

const BaseRegisterPaper = ({ baseRoute, children, handleSubmit, notSubmitButton, serviceFunction, title }) => {
    const styles = useBaseRegisterStyles();
    const { onSubmit } = useBaseRegisterController(serviceFunction, baseRoute);

    return (
        <Paper sx={styles.paper}>
            <HtmlHead userType={title} subTitle={'Cadastro'}/>
            <Typography sx={styles.textTitle} variant={'h4'}>
                Cadastrar {title}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={styles.grid}>
                    <Grid container spacing={2}>
                        {children}
                        {!notSubmitButton && <Grid item xs={12} sm={12} md={12}>
                            <Button sx={styles.finalButton}
                                color="secondary"
                                type="submit"
                                variant="contained">
                                Finalizar cadastro
                            </Button>
                        </Grid>}
                    </Grid>
                </Box>
            </form>
        </Paper>
    );
};
export default BaseRegisterPaper;
