import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import Footer from '../../../users/site/components/Footer';
import Partners from '../../../users/site/components/Partners';
import PasswordField from '../../fileds/login/password/PasswordField';
import HtmlHead from '../../HtmlHead';
import useBaseLoginController from './useBaseLoginController';
import useBaseLoginStyles from './useBaseLoginStyles';

const inputProps = {
    login: {
        maxLength: '255',
    },
};

const BaseLoginPaper = ({ forgotPasswordRoute, registerRoute, title, userTypeTitle }) => {
    const styles = useBaseLoginStyles();
    const { onSubmit, register } = useBaseLoginController();

    return (
        <>
            <HtmlHead userType={userTypeTitle} subTitle={'Login'} />
            <Grid container sx={styles.container}>
                <Grid item xs={12} sm={12} md={6}>
                    <Paper sx={styles.paper}>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant={'h4'} color={'primary'}>{title}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant={'h6'} color={'primary'} style={styles.subtitle}>
                                        Para continuar é preciso que você se identifique, insira abaixo suas informações de acesso:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        {...register('login')} label="Login"
                                        inputProps={inputProps.login}
                                        variant="outlined" size="small" required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <PasswordField
                                        label="Senha" name="password"
                                        register={register}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button
                                        color="secondary"
                                        type="submit"
                                        variant="contained">
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <RouterLink to={forgotPasswordRoute}>
                                        Esqueci minha senha
                                    </RouterLink>
                                </Grid>
                                {registerRoute &&
                                    <>
                                        <Grid item xs={12}>
                                            <Divider><Typography variant={'h5'}>Ou</Typography></Divider>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <RouterLink to={registerRoute}>
                                                Clique aqui para se cadastrar
                                            </RouterLink>
                                        </Grid>
                                    </>
                                }
                                {/*<Grid item xs={12} sm={12} md={12} sx={styles.forgotPassword}>*/}
                                {/*    <RouterLink to={forgotPasswordRoute}>*/}
                                {/*        Esqueci minha senha*/}
                                {/*    </RouterLink>*/}
                                {/*</Grid>*/}
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

export default BaseLoginPaper;
