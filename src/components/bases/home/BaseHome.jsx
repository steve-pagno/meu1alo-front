import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../../../providers/auth/Auth';

const BaseHome = ({ meta }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Container style={{ padding: '30px' }}>
            <Typography component='h4' variant='h4'>
                Olá {auth.user.name}
            </Typography>

            {meta && meta.map((item, key) => (
                <React.Fragment key={'home'+key}>
                    <Typography style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '5px', marginTop: '25px' }} color={'primary'}>
                        {item.title}
                    </Typography>

                    <Paper sx={{ padding: '5px 20px 20px 20px'  }} >
                        <Box>
                            <Grid container>
                                {item.options && item.options.map((option, key2) => (
                                    <React.Fragment key={'home-item-'+key2}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography style={{ fontWeight: 'bold', marginTop: '25px' }}>
                                                {option.subTitle}
                                            </Typography>
                                        </Grid>
                                        {option.subOptions.map((subOption) => (
                                            <Grid item xs={12} sm={6} md={3} key={`${item.title}-${option.subTitle}-${subOption.label}`}>
                                                <Button color={'secondary'} startIcon={subOption.icon}
                                                    onClick={() => { navigate(subOption.route); }}
                                                >
                                                    {subOption.label}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default BaseHome;
