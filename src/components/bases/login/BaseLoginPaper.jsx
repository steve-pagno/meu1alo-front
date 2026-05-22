import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
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

            {/* Estilos Globais Injetados para as Ondas e Blobs Animados */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float-blob {
                    0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
                    33% { transform: translate(40px, -60px) scale(1.15) rotate(120deg); }
                    66% { transform: translate(-30px, 30px) scale(0.9) rotate(240deg); }
                    100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
                }
                .bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.35;
                    mix-blend-mode: screen;
                    pointer-events: none;
                    z-index: 1;
                }
                .waves-wrapper {
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 240px; /* Taller and larger waves! */
                    min-height: 180px;
                    max-height: 300px;
                    z-index: 1;
                    pointer-events: none;
                    overflow: hidden;
                }
                .waves {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .parallax > use {
                    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
                }
                .parallax > use:nth-of-type(1) {
                    animation-delay: -2s;
                    animation-duration: 9s;
                }
                .parallax > use:nth-of-type(2) {
                    animation-delay: -3s;
                    animation-duration: 13s;
                }
                .parallax > use:nth-of-type(3) {
                    animation-delay: -4s;
                    animation-duration: 17s;
                }
                .parallax > use:nth-of-type(4) {
                    animation-delay: -5s;
                    animation-duration: 25s;
                }
                @keyframes move-forever {
                    0% {
                        transform: translate3d(-90px, 0, 0);
                    }
                    100% {
                        transform: translate3d(85px, 0, 0);
                    }
                }
            ` }} />

            <Box sx={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Seção Superior de Login com Fundo Roxo e Ondas Animadas */}
                <Box sx={{
                    ...styles.container,
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                    minHeight: 'auto',
                    padding: { md: '60px 16px', xs: '40px 16px' },
                    position: 'relative'
                }}>
                    {/* Blobs de Gradiente Mesh Fluídos */}
                    <Box className="bg-blob" sx={{
                        animation: 'float-blob 22s infinite alternate ease-in-out',
                        background: '#E83268',
                        height: { md: '600px', xs: '300px' },
                        left: '-10%',
                        top: '-10%',
                        width: { md: '600px', xs: '300px' }
                    }} />
                    <Box className="bg-blob" sx={{
                        animation: 'float-blob 28s infinite alternate ease-in-out',
                        animationDelay: '-6s',
                        background: '#a855f7',
                        bottom: '-15%',
                        height: { md: '650px', xs: '350px' },
                        right: '-10%',
                        width: { md: '650px', xs: '350px' }
                    }} />
                    <Box className="bg-blob" sx={{
                        animation: 'float-blob 18s infinite alternate ease-in-out',
                        animationDelay: '-3s',
                        background: '#2db7bc',
                        height: { md: '450px', xs: '250px' },
                        left: '45%',
                        top: '35%',
                        width: { md: '450px', xs: '250px' }
                    }} />

                    {/* Ondas Parallax Infinitas Sem Costura e Mais Altas */}
                    <Box className="waves-wrapper">
                        <svg
                            className="waves"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 24 150 28"
                            preserveAspectRatio="none"
                            shapeRendering="auto"
                        >
                            <defs>
                                <path
                                    id="gentle-wave"
                                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                />
                            </defs>
                            <g className="parallax">
                                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.06)" />
                                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.04)" />
                                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.02)" />
                                <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.05)" />
                            </g>
                        </svg>
                    </Box>

                    {/* Formulário de Login */}
                    <Paper sx={styles.paper}>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={3.5} justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h4" sx={styles.title}>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" sx={styles.subtitle}>
                                        Para continuar é preciso que você se identifique, insira abaixo suas informações de acesso:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('login')}
                                        label="Login"
                                        inputProps={inputProps.login}
                                        variant="outlined"
                                        size="medium"
                                        required
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '14px',
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordField
                                        label="Senha"
                                        name="password"
                                        register={register}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            '&:hover': {
                                                boxShadow: '0 12px 30px rgba(232, 50, 104, 0.4)',
                                                transform: 'translateY(-2px)'
                                            },
                                            background: 'linear-gradient(135deg, #5D307A 0%, #E83268 100%)',
                                            borderRadius: '14px',
                                            boxShadow: '0 8px 25px rgba(232, 50, 104, 0.25)',
                                            fontFamily: 'Outfit, Inter, sans-serif',
                                            fontSize: '0.95rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.5px',
                                            padding: '12px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <RouterLink
                                        to={forgotPasswordRoute}
                                        style={{
                                            color: '#5D307A',
                                            fontFamily: 'Outfit, Inter, sans-serif',
                                            fontSize: '0.85rem',
                                            fontWeight: '700',
                                            textDecoration: 'none'
                                        }}
                                        onMouseOver={(e) => { e.target.style.color = '#E83268'; e.target.style.textDecoration = 'underline'; }}
                                        onMouseOut={(e) => { e.target.style.color = '#5D307A'; e.target.style.textDecoration = 'none'; }}
                                    >
                                        Esqueci minha senha
                                    </RouterLink>
                                </Grid>
                                {registerRoute && (
                                    <>
                                        <Grid item xs={12} sx={{ py: '0 !important' }}>
                                            <Divider sx={{ my: 1 }}>
                                                <Typography sx={{
                                                    color: '#a0aec0',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase'
                                                }}>
                                                    Ou
                                                </Typography>
                                            </Divider>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <RouterLink
                                                to={registerRoute}
                                                style={{
                                                    color: '#E83268',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '700',
                                                    textDecoration: 'none'
                                                }}
                                                onMouseOver={(e) => { e.target.style.color = '#5D307A'; e.target.style.textDecoration = 'underline'; }}
                                                onMouseOut={(e) => { e.target.style.color = '#E83268'; e.target.style.textDecoration = 'none'; }}
                                            >
                                                Clique aqui para se cadastrar
                                            </RouterLink>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </form>
                    </Paper>
                </Box>

                {/* Rodapé e Parceiros com fundo original preservado */}
                <Box sx={{ mt: 'auto', width: '100%' }}>
                    <Partners color="#f4f5f7" />
                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default BaseLoginPaper;
