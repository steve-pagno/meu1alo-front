import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';

const HeroSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: 'url(/hero_banner.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Soft overlay to ensure readability
                    backdropFilter: 'blur(3px)',
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        maxWidth: '650px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(12px)',
                        padding: { xs: 4, md: 6 },
                        borderRadius: '24px',
                        boxShadow: '0px 10px 40px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.6)'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocalHospitalTwoToneIcon color="primary" fontSize="large" />
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 1.5, fontSize: '1rem' }}>
                            Atenção Neonatal
                        </Typography>
                    </Box>

                    <Typography 
                        variant="h3" 
                        color="text.primary" 
                        sx={{ 
                            fontWeight: 800, 
                            mb: 3, 
                            lineHeight: 1.2,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Cuidando da audição e do amanhã dos nossos bebês.
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
                        O Meu Primeiro Alô é a plataforma completa de rastreamento do Teste da Orelhinha. 
                        Tecnologia, agilidade e segurança na identificação de diagnósticos auditivos neonatais.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            onClick={() => navigate('/fono/login')}
                            sx={{ borderRadius: '12px', paddingX: 4, paddingY: 1.5, fontWeight: 'bold' }}
                        >
                            Área do Fonoaudiólogo
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            size="large"
                            startIcon={<AssignmentIcon />}
                            onClick={() => navigate('/pais/login')}
                            sx={{ borderRadius: '12px', paddingX: 4, paddingY: 1.5, fontWeight: 'bold', borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}
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
