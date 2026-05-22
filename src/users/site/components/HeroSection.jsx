import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';

const HeroSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                '&::before': {
                    // Soft overlay to ensure readability
                    backdropFilter: 'blur(3px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    content: '""',
                    height: '100%',
                    left: 0,
                    position: 'absolute',
                    top: 0, width: '100%',
                },
                alignItems: 'center',
                backgroundImage: 'url(/hero_banner.png)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                minHeight: '80vh',
                position: 'relative'
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        backdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        borderRadius: '24px',
                        boxShadow: '0px 10px 40px rgba(0,0,0,0.08)',
                        maxWidth: '650px',
                        padding: { md: 6, xs: 4 }
                    }}
                >
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, mb: 2 }}>
                        <LocalHospitalTwoToneIcon color="primary" fontSize="large" />
                        <Typography variant="overline" color="primary" sx={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: 1.5 }}>
                            Atenção Neonatal
                        </Typography>
                    </Box>

                    <Typography
                        variant="h3"
                        color="text.primary"
                        sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            mb: 3,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Cuidando da audição e do amanhã dos nossos bebês.
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6, mb: 4 }}>
                        O Meu Primeiro Alô é a plataforma completa de rastreamento do Teste da Orelhinha.
                        Tecnologia, agilidade e segurança na identificação de diagnósticos auditivos neonatais.
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/fono/login')}
                            sx={{ borderRadius: '12px', fontWeight: 'bold', paddingX: 4, paddingY: 1.5 }}
                        >
                            Área do Fonoaudiólogo
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            startIcon={<AssignmentIcon />}
                            onClick={() => navigate('/pais/login')}
                            sx={{ '&:hover': { borderWidth: '2px' }, borderRadius: '12px', borderWidth: '2px', fontWeight: 'bold', paddingX: 4, paddingY: 1.5 }}
                        >
                            Área dos Pais/Responsáveis
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;
