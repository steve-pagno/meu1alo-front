import React, { useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Snackbar, Typography } from '@mui/material';
import HtmlHead from '../../../components/HtmlHead';
import useBaseRegisterController from './useBaseRegisterController';
import useBaseRegisterStyles from './useBaseRegisterStyles';

const BaseRegisterPaper = ({ baseRoute, children, handleSubmit, notSubmitButton, serviceFunction, title }) => {
    const styles = useBaseRegisterStyles();
    const [notify, setNotify] = useState({
        message: '',
        open: false,
        severity: 'info'
    });

    const { onSubmit } = useBaseRegisterController(serviceFunction, baseRoute, setNotify);

    const handleCloseNotify = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({ ...notify, open: false });
    };

    return (
        <Paper sx={styles.paper}>
            <Snackbar
                open={notify.open}
                autoHideDuration={4000}
                onClose={handleCloseNotify}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert onClose={handleCloseNotify} severity={notify.severity} variant="filled" sx={{ width: '100%' }}>
                    {notify.message}
                </Alert>
            </Snackbar>

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
