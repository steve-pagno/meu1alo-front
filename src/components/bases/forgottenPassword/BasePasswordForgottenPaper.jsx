import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography, Link } from '@mui/material';
import Footer from '../../../users/site/components/Footer';
import Partners from '../../../users/site/components/Partners';
import HtmlHead from '../../HtmlHead';
import useBasePasswordForgottenController from './useBasePasswordForgottenController';
import useBasePasswordForgottenStyles from './useBasePasswordForgottenStyles';

const BasePasswordForgottenPaper = ({ userTypeTitle, userType }) => {

    const styles = useBasePasswordForgottenStyles();
    
    const { onSubmit, register, loading } = useBasePasswordForgottenController(userType);

    return (
        <>
            <HtmlHead userType={userTypeTitle} subTitle={'Esqueci minha senha'} />
            <Grid container sx={styles.container}>
                <Grid item xs={12} sm={12} md={6}>
                    <Paper sx={styles.paper}>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'} color={'primary'}>
                                        Recuperar Acesso
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={'h6'} color={'primary'} style={styles.subtitle}>
                                        Digite seu e-mail abaixo para enviarmos uma nova senha.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('email')}
                                        label="E-mail de cadastro"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        required
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        color="secondary"
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? 'Enviando...' : 'Enviar'} 
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Link component={RouterLink} to={'../login'} variant="body2">
                                        Lembrou a senha? Voltar para o login
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Partners color={styles.partnersColor} />
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
};

export default BasePasswordForgottenPaper;