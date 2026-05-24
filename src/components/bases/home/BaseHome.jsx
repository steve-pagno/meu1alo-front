import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Card, Container, Grid, Typography } from '@mui/material';
import { AccountCircle as AccountCircleIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../../providers/auth/Auth';

const getOptionDescription = (label) => {
    switch (label) {
    case 'Triagem':
        return 'Realize uma nova triagem auditiva neonatal';
    case 'Orientação':
        return 'Cadastre recomendações e orientações clínicas';
    case 'Equipamento':
        return 'Adicione novos aparelhos auditivos ao sistema';
    case 'Triagens':
        return 'Consulte e gerencie todas as triagens realizadas';
    case 'Indicadores':
        return 'Acompanhe os indicadores de risco e diagnósticos';
    case 'Orientações':
        return 'Visualize e edite as orientações cadastradas';
    case 'Condutas':
        return 'Gerencie as condutas clínicas do sistema';
    case 'Equipamentos':
        return 'Veja a lista de equipamentos cadastrados';
    case 'Gráficos':
        return 'Acesse o painel analítico com gráficos interativos';
    case 'Início Fonoaudiólogo':
        return 'Volte para a página inicial da área';
    default:
        return 'Acesse e gerencie esta funcionalidade do sistema';
    }
};

const getOptionColors = (label) => {
    switch (label) {
    case 'Triagem':
    case 'Triagens':
        return {
            bg: 'linear-gradient(135deg, #5D307A 0%, #7D3C98 100%)',
            color: '#ffffff'
        };
    case 'Orientação':
    case 'Orientações':
        return {
            bg: 'linear-gradient(135deg, #E83268 0%, #F35E8E 100%)',
            color: '#ffffff'
        };
    case 'Equipamento':
    case 'Equipamentos':
        return {
            bg: 'linear-gradient(135deg, #2db7bc 0%, #4dd1d6 100%)',
            color: '#ffffff'
        };
    case 'Indicadores':
    case 'Condutas':
        return {
            bg: 'linear-gradient(135deg, #fbbc43 0%, #ffd47a 100%)',
            color: '#ffffff'
        };
    case 'Gráficos':
        return {
            bg: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
            color: '#ffffff'
        };
    default:
        return {
            bg: 'linear-gradient(135deg, #718096 0%, #a0aec0 100%)',
            color: '#ffffff'
        };
    }
};

import useParentsService from '../../../users/parents/useParentsService';
import ParentTriagePortal from '../../../users/parents/components/ParentTriagePortal';

const BaseHome = ({ meta }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const isParent = auth.baseRoute === '/pais';
    const parentService = useParentsService();
    const [parentTriages, setParentTriages] = React.useState([]);
    const [parentLoading, setParentLoading] = React.useState(false);

    React.useEffect(() => {
        if (isParent) {
            setParentLoading(true);
            parentService.getAllTriages()
                .then(res => {
                    if (res && res.isSuccess) {
                        setParentTriages(res.body || []);
                    }
                })
                .catch(err => console.error('Erro ao buscar triagens:', err))
                .finally(() => setParentLoading(false));
        }
    }, [isParent]);

    return (
        <Container maxWidth="xl" sx={{ padding: { md: '40px 36px', xs: '20px 16px' } }}>
            {/* Cabeçalho de Boas-Vindas */}
            <Box sx={{
                alignItems: { md: 'center', xs: 'flex-start' },
                background: 'linear-gradient(135deg, #5D307A 0%, #7D3C98 60%, #E83268 100%)',
                borderRadius: '24px',
                boxShadow: '0 12px 30px rgba(93, 48, 122, 0.15)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                gap: 3,
                justifyContent: 'space-between',
                marginBottom: '32px',
                overflow: 'hidden',
                padding: { md: '40px 48px', xs: '32px 24px' },
                position: 'relative'
            }}>
                {/* Elementos Decorativos */}
                <Box sx={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '50%',
                    filter: 'blur(30px)',
                    height: '200px',
                    pointerEvents: 'none',
                    position: 'absolute',
                    right: '-50px',
                    top: '-50px',
                    width: '200px'
                }} />
                <Box sx={{
                    background: 'rgba(232, 50, 104, 0.12)',
                    borderRadius: '50%',
                    bottom: '-100px',
                    filter: 'blur(50px)',
                    height: '300px',
                    left: '10%',
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: '300px'
                }} />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h4" sx={{ color: '#ffffff', fontSize: { md: '2.4rem', xs: '1.8rem' }, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                        Olá, {auth.user.name}!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', fontWeight: '400', lineHeight: 1.5, maxWidth: '600px' }}>
                        Seja bem-vindo de volta. O que você gostaria de realizar hoje na plataforma Meu Primeiro Alô?
                    </Typography>
                </Box>
            </Box>

            {/* Seção de Triagens dos Filhos para Pais */}
            {isParent && (
                <Box sx={{ marginBottom: '48px' }}>
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '24px', position: 'relative' }}>
                        <Box sx={{
                            background: 'linear-gradient(180deg, #5D307A 0%, #E83268 100%)',
                            borderRadius: '3px',
                            height: '28px',
                            width: '6px'
                        }} />
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#1a202c',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                fontSize: '1.4rem',
                                fontWeight: 800,
                                letterSpacing: '-0.3px'
                            }}
                        >
                            Triagens do(s) meu(s) filho(s)
                        </Typography>
                    </Box>
                    <ParentTriagePortal triages={parentTriages} loading={parentLoading} />
                </Box>
            )}

            {/* Loop das Categorias */}
            {meta && meta.map((item, key) => (
                <Box key={'home-section-' + key} sx={{ marginBottom: '40px' }}>
                    {/* Título da Seção */}
                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '24px', position: 'relative' }}>
                        <Box sx={{
                            background: 'linear-gradient(180deg, #5D307A 0%, #E83268 100%)',
                            borderRadius: '3px',
                            height: '28px',
                            width: '6px'
                        }} />
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#1a202c',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                fontSize: '1.4rem',
                                fontWeight: 800,
                                letterSpacing: '-0.3px'
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Box>

                    {/* Conteúdo das Subcategorias */}
                    {item.options && item.options.map((option, key2) => {
                        // Filtrar se todas as subopções são de início redundante
                        const visibleSubOptions = option.subOptions.filter((subOption) => {
                            const label = subOption.label.toLowerCase();
                            return !(
                                subOption.route === auth.baseRoute ||
                                label.includes('início') ||
                                label.includes('inicio') ||
                                label.includes('página inicial') ||
                                label.includes('pagina inicial')
                            );
                        });

                        if (visibleSubOptions.length === 0) {
                            return null;
                        }

                        return (
                            <Box key={'home-group-' + key2} sx={{ marginBottom: '24px' }}>
                                {option.subTitle && (
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: '#718096',
                                            fontFamily: 'Outfit, Inter, sans-serif',
                                            fontSize: '0.85rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.5px',
                                            marginBottom: '16px',
                                            paddingLeft: '4px',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {option.subTitle}
                                    </Typography>
                                )}

                                <Grid container spacing={3}>
                                    {visibleSubOptions.map((subOption) => {
                                        const colors = getOptionColors(subOption.label);
                                        return (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.title}-${option.subTitle}-${subOption.label}`}>
                                                <Card
                                                    onClick={() => navigate(subOption.route)}
                                                    sx={{
                                                        '&:hover': {
                                                            '& .arrow-icon': {
                                                                color: '#E83268',
                                                                transform: 'translateX(4px)'
                                                            },
                                                            borderColor: 'rgba(93, 48, 122, 0.12)',
                                                            boxShadow: '0px 20px 40px rgba(93, 48, 122, 0.06)',
                                                            transform: 'translateY(-4px)'
                                                        },
                                                        backgroundColor: '#ffffff',
                                                        border: '1px solid rgba(0, 0, 0, 0.04)',
                                                        borderRadius: '20px',
                                                        boxShadow: '0px 10px 30px rgba(100, 110, 140, 0.03)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100%',
                                                        padding: '24px',
                                                        position: 'relative',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                    }}
                                                >
                                                    <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '16px' }}>
                                                        <Avatar
                                                            sx={{
                                                                background: colors.bg,
                                                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                                                                color: colors.color,
                                                                height: 48,
                                                                width: 48
                                                            }}
                                                        >
                                                            {subOption.icon}
                                                        </Avatar>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                color: '#2d3748',
                                                                fontFamily: 'Outfit, Inter, sans-serif',
                                                                fontSize: '1.05rem',
                                                                fontWeight: '700',
                                                                lineHeight: 1.3
                                                            }}
                                                        >
                                                            {subOption.label}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#718096',
                                                            flexGrow: 1,
                                                            fontFamily: 'Outfit, Inter, sans-serif',
                                                            fontSize: '0.85rem',
                                                            lineHeight: 1.5,
                                                            marginBottom: '20px'
                                                        }}
                                                    >
                                                        {getOptionDescription(subOption.label)}
                                                    </Typography>

                                                    <Box sx={{
                                                        alignItems: 'center',
                                                        borderTop: '1px solid rgba(0,0,0,0.03)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginTop: 'auto',
                                                        paddingTop: '8px'
                                                    }}>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                color: '#5D307A',
                                                                fontFamily: 'Outfit, Inter, sans-serif',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '800',
                                                                letterSpacing: '0.5px'
                                                            }}
                                                        >
                                                            ACESSAR
                                                        </Typography>
                                                        <Box
                                                            className="arrow-icon"
                                                            sx={{
                                                                alignItems: 'center',
                                                                color: '#5D307A',
                                                                display: 'flex',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <BsArrowRight size={16} />
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        );
                    })}
                </Box>
            ))}

            {/* Seção Exclusiva de Perfil e Logout */}
            <Box sx={{ marginBottom: '40px' }}>
                <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '24px', position: 'relative' }}>
                    <Box sx={{
                        background: 'linear-gradient(180deg, #5D307A 0%, #E83268 100%)',
                        borderRadius: '3px',
                        height: '28px',
                        width: '6px'
                    }} />
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#1a202c',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            letterSpacing: '-0.3px'
                        }}
                    >
                        Configurações da Conta
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Card de Editar Perfil */}
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            onClick={() => navigate(`${auth.baseRoute}/perfil`)}
                            sx={{
                                '&:hover': {
                                    '& .arrow-icon': {
                                        color: '#E83268',
                                        transform: 'translateX(4px)'
                                    },
                                    borderColor: 'rgba(93, 48, 122, 0.12)',
                                    boxShadow: '0px 20px 40px rgba(93, 48, 122, 0.06)',
                                    transform: 'translateY(-4px)'
                                },
                                backgroundColor: '#ffffff',
                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                borderRadius: '20px',
                                boxShadow: '0px 10px 30px rgba(100, 110, 140, 0.03)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: '24px',
                                position: 'relative',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '16px' }}>
                                <Avatar
                                    sx={{
                                        background: 'linear-gradient(135deg, #5D307A 0%, #E83268 100%)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                                        color: '#ffffff',
                                        height: 48,
                                        width: 48
                                    }}
                                >
                                    <AccountCircleIcon style={{ fontSize: 26 }} />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#2d3748',
                                        fontFamily: 'Outfit, Inter, sans-serif',
                                        fontSize: '1.05rem',
                                        fontWeight: '700',
                                        lineHeight: 1.3
                                    }}
                                >
                                    Meu Perfil
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#718096',
                                    flexGrow: 1,
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5,
                                    marginBottom: '20px'
                                }}
                            >
                                Visualize e altere suas informações cadastrais e dados de contato
                            </Typography>

                            <Box sx={{
                                alignItems: 'center',
                                borderTop: '1px solid rgba(0,0,0,0.03)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 'auto',
                                paddingTop: '8px'
                            }}>
                                <Typography
                                    variant="button"
                                    sx={{
                                        color: '#5D307A',
                                        fontFamily: 'Outfit, Inter, sans-serif',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    EDITAR DADOS
                                </Typography>
                                <Box
                                    className="arrow-icon"
                                    sx={{
                                        alignItems: 'center',
                                        color: '#5D307A',
                                        display: 'flex',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <BsArrowRight size={16} />
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Card de Logout */}
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            onClick={() => auth.logout(auth.baseRoute)}
                            sx={{
                                '&:hover': {
                                    '& .arrow-icon': {
                                        color: '#E83268',
                                        transform: 'translateX(4px)'
                                    },
                                    borderColor: 'rgba(229, 62, 62, 0.12)',
                                    boxShadow: '0px 20px 40px rgba(229, 62, 62, 0.06)',
                                    transform: 'translateY(-4px)'
                                },
                                backgroundColor: '#ffffff',
                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                borderRadius: '20px',
                                boxShadow: '0px 10px 30px rgba(100, 110, 140, 0.03)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: '24px',
                                position: 'relative',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '16px' }}>
                                <Avatar
                                    sx={{
                                        background: 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                                        color: '#ffffff',
                                        height: 48,
                                        width: 48
                                    }}
                                >
                                    <LogoutIcon style={{ fontSize: 24 }} />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#2d3748',
                                        fontFamily: 'Outfit, Inter, sans-serif',
                                        fontSize: '1.05rem',
                                        fontWeight: '700',
                                        lineHeight: 1.3
                                    }}
                                >
                                    Sair do Sistema
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#718096',
                                    flexGrow: 1,
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.5,
                                    marginBottom: '20px'
                                }}
                            >
                                Encerre sua sessão atual com segurança no Meu Primeiro Alô
                            </Typography>

                            <Box sx={{
                                alignItems: 'center',
                                borderTop: '1px solid rgba(0,0,0,0.03)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 'auto',
                                paddingTop: '8px'
                            }}>
                                <Typography
                                    variant="button"
                                    sx={{
                                        color: '#e53e3e',
                                        fontFamily: 'Outfit, Inter, sans-serif',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    SAIR
                                </Typography>
                                <Box
                                    className="arrow-icon"
                                    sx={{
                                        alignItems: 'center',
                                        color: '#e53e3e',
                                        display: 'flex',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <BsArrowRight size={16} />
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default BaseHome;
