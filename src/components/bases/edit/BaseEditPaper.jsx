import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import HtmlHead from '../../../components/HtmlHead';
import useBaseEditController from './useBaseEditController';
import useBaseEditStyles from './useBaseEditStyles';

const BaseEditPaper = ({ children, handleSubmit, id, notSubmitButton, serviceFunction, serviceGetFunction, setValue, title }) => {
    const styles = useBaseEditStyles();
    const { onSubmit } = useBaseEditController(serviceGetFunction, serviceFunction, id, setValue);

    return (
        <Paper sx={styles.paper}>
            <HtmlHead userType={title} subTitle={'Editar'}/>
            <Typography sx={styles.textTitle} variant={'h4'}>
                Editar {title}
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
                                Finalizar edição
                            </Button>
                        </Grid>}
                    </Grid>
                </Box>
            </form>
        </Paper>
    );
};
export default BaseEditPaper;
