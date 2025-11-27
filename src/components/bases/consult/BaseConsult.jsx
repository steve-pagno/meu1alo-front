import React from 'react';
import { BsDownload } from 'react-icons/all';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import GenericTable from '../../lists/table/GenericTable';
import useBaseConsultController from './useBaseConsultController';
import useBaseConsultStyles from './useBaseConsultStyles';

const BaseConsult = ({ children, fileName, handleSubmit, headers, serviceFunction, tableProperties, title }) => {
    const styles = useBaseConsultStyles();
    const { onClickExportExcelButton, onReloadRow, onSubmit, rows } = useBaseConsultController(serviceFunction, headers, title, fileName);

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography component='h4' variant='h4' style={{ marginBottom: 15 }}>
                        Consultar {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography style={{ fontSize: '22px', fontWeight: 'bold' }} color={'primary'}>
                            Filtros
                        </Typography>
                        <Paper sx={styles.paper}>
                            <Box>
                                <Grid container spacing={2}>
                                    {children}

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button sx={styles.finalButton}
                                            color="secondary"
                                            type="submit"
                                            variant="contained">
                                            Aplicar Filtros
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </form>

                </Grid>

                <Grid  item xs={12} sm={12} md={9}>
                    <Typography style={{ fontSize: '22px', fontWeight: 'bold' }} color={'primary'}>
                        {title}
                    </Typography>

                    <div>
                        <div style={{ float: 'right', margin: 10 }}>
                            <Button sx={{ marginRight: 1 }}
                                startIcon={<BsDownload/>}
                                color="secondary"
                                onClick={onClickExportExcelButton}
                                variant="contained"
                                disabled={rows.length === 0}>
                                Excel
                            </Button>
                            {/*<Button startIcon={<BsDownload/>}*/}
                            {/*    color="secondary"*/}
                            {/*    // onClick={}*/}
                            {/*    variant="contained">*/}
                            {/*    PDF*/}
                            {/*</Button>*/}
                        </div>

                        <GenericTable headers={headers} rows={rows} properties={tableProperties} onReloadRow={onReloadRow} />
                    </div>

                </Grid>
            </Grid>
        </Box>
    );
};
export default BaseConsult;
