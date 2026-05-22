import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import TopBar from '../../components/TopBar';
import Footer from './components/Footer';

import HeroSection from './components/HeroSection';
import Partners from './components/Partners';
import PublicHeaderActions from './components/PublicHeaderActions';

const Site = () => {
    return (
        <React.Fragment>
            <TopBar
                baseRoute={'/'}
                rightElement={<PublicHeaderActions />}
            />

            <HeroSection />

            <Box sx={{ backgroundColor: '#f9fafc', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Como funciona o Meu Primeiro Alô?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: '700px', mx: 'auto' }}>
                            Oferecemos um sistema inovador para acompanhamento neonatal.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', p: 2, textAlign: 'center' }}>
                                <CardContent>
                                    <SupportAgentTwoToneIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Acompanhamento Ativo
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Nossa plataforma conecta pais e fonoaudiólogos de forma transparente, permitindo visualizar exames e agendar retestes se necessário.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', p: 2, textAlign: 'center' }}>
                                <CardContent>
                                    <SpeedTwoToneIcon color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Mais Agilidade
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Os dados das maternidades sobem direto para o sistema, eliminando o papel e centralizando todo o histórico de triagem.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', p: 2, textAlign: 'center' }}>
                                <CardContent>
                                    <TimelineTwoToneIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Gestão Estadual
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Integrado em tempo real com as Secretarias de Saúde para permitir ações e políticas públicas diretas e baseadas em estatísticas.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Partners />
            <Footer/>
        </React.Fragment>
    );
};

export default Site;
