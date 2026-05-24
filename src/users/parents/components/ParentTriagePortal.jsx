import React from 'react';
import { 
    Avatar, 
    Box, 
    Card, 
    Chip, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    Divider, 
    Grid, 
    IconButton, 
    Typography,
    Button,
    Slide
} from '@mui/material';
import { 
    ChildCare as BabyIcon, 
    Close as CloseIcon, 
    CalendarMonth as CalendarIcon, 
    LocalHospital as HospitalIcon, 
    Person as DoctorIcon, 
    Hearing as HearingIcon, 
    Description as DescriptionIcon,
    MedicalServices as MedicalIcon,
    Info as InfoIcon,
    Biotech as BiotechIcon
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ParentTriagePortal = ({ triages, loading }) => {
    const [selectedBaby, setSelectedBaby] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState(0);

    const currentTriage = selectedBaby ? selectedBaby.allTriages[activeTab] : null;

    const chronologicalTriages = React.useMemo(() => {
        if (!selectedBaby) return [];
        return [...selectedBaby.allTriages].sort((a, b) => {
            return (Number(a.testType) || 0) - (Number(b.testType) || 0);
        });
    }, [selectedBaby]);

    // Group triages by babyName
    const babies = React.useMemo(() => {
        const groups = {};
        triages.forEach(t => {
            if (!groups[t.babyName]) {
                groups[t.babyName] = [];
            }
            groups[t.babyName].push(t);
        });
        return Object.entries(groups).map(([name, items]) => {
            // Sort triages: Reteste (testType=2) first, then Teste (testType=1), then by date/ID descending
            const sortedItems = [...items].sort((a, b) => {
                const typeA = Number(a.testType) || 0;
                const typeB = Number(b.testType) || 0;
                if (typeB !== typeA) {
                    return typeB - typeA;
                }
                const dateA = a.evaluationDate ? new Date(a.evaluationDate).getTime() : 0;
                const dateB = b.evaluationDate ? new Date(b.evaluationDate).getTime() : 0;
                if (dateB !== dateA) {
                    return dateB - dateA;
                }
                return Number(b.id) - Number(a.id);
            });
            return {
                name,
                latestTriage: sortedItems[0],
                allTriages: sortedItems
            };
        });
    }, [triages]);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatEarResult = (passed) => {
        const hasPassed = Number(passed) === 1;
        return {
            label: hasPassed ? 'Passou' : 'Falhou',
            color: hasPassed ? '#2e7d32' : '#c62828',
            bgColor: hasPassed ? 'rgba(46, 125, 50, 0.08)' : 'rgba(198, 40, 40, 0.08)',
            borderColor: hasPassed ? 'rgba(46, 125, 50, 0.25)' : 'rgba(198, 40, 40, 0.25)',
            badgeBg: hasPassed 
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                : 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
        };
    };

    const getTriageOverallStatus = (triage) => {
        const leftPassed = Number(triage.leftEar) === 1;
        const rightPassed = Number(triage.rightEar) === 1;
        
        if (leftPassed && rightPassed) {
            return {
                label: 'Resultado Aprovado (Passou)',
                desc: 'Excelente! A triagem auditiva neonatal está dentro dos padrões de normalidade esperados.',
                bg: 'linear-gradient(135deg, #e6f4ea 0%, #c2e7d9 100%)',
                color: '#137333',
                iconBg: '#137333'
            };
        } else {
            return {
                label: 'Acompanhamento Recomendado',
                desc: 'Atenção: É sugerido realizar novas consultas de acordo com as condutas informadas pelo fonoaudiólogo.',
                bg: 'linear-gradient(135deg, #fce8e6 0%, #fad2cf 100%)',
                color: '#c5221f',
                iconBg: '#c5221f'
            };
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
                <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif' }}>
                    Carregando informações das triagens...
                </Typography>
            </Box>
        );
    }

    if (babies.length === 0) {
        return (
            <Box sx={{ 
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '24px', 
                padding: '48px 24px', 
                textAlign: 'center',
                boxShadow: '0px 10px 30px rgba(100, 110, 140, 0.02)'
            }}>
                <BabyIcon sx={{ fontSize: 56, color: '#a0aec0', marginBottom: 2 }} />
                <Typography variant="h6" sx={{ color: '#2d3748', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 700, marginBottom: 1 }}>
                    Nenhuma triagem encontrada
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
                    Ainda não há registros de triagem auditiva neonatal vinculados ao seu CPF. Caso tenha realizado o exame recentemente, por favor aguarde o fonoaudiólogo finalizar o cadastro.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Grid container spacing={3}>
                {babies.map((baby) => {
                    const { name, latestTriage, allTriages } = baby;
                    const status = getTriageOverallStatus(latestTriage);
                    const leftRes = formatEarResult(latestTriage.leftEar);
                    const rightRes = formatEarResult(latestTriage.rightEar);
                    const hasRetest = allTriages.length > 1;

                    return (
                        <Grid item xs={12} md={6} key={name}>
                            <Card sx={{
                                background: '#ffffff',
                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                borderRadius: '24px',
                                boxShadow: '0px 15px 35px rgba(93, 48, 122, 0.04)',
                                padding: { xs: '24px', sm: '32px' },
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0px 25px 50px rgba(93, 48, 122, 0.08)',
                                    borderColor: 'rgba(93, 48, 122, 0.12)'
                                }
                            }}>
                                {/* Child Info Header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '24px' }}>
                                    <Avatar sx={{ 
                                        background: 'linear-gradient(135deg, #5D307A 0%, #E83268 100%)', 
                                        width: 56, 
                                        height: 56,
                                        boxShadow: '0 8px 20px rgba(93, 48, 122, 0.2)'
                                    }}>
                                        <BabyIcon sx={{ fontSize: 32, color: '#ffffff' }} />
                                    </Avatar>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ 
                                            color: '#1a202c', 
                                            fontFamily: 'Outfit, Inter, sans-serif', 
                                            fontSize: '1.25rem', 
                                            fontWeight: 800, 
                                            letterSpacing: '-0.3px',
                                            lineHeight: 1.2
                                        }}>
                                            {name}
                                        </Typography>
                                        <Typography sx={{ 
                                            color: '#718096', 
                                            fontFamily: 'Outfit, Inter, sans-serif', 
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            marginTop: '2px'
                                        }}>
                                            Filho(a) Cadastrado(a)
                                        </Typography>
                                    </Box>
                                    {hasRetest && (
                                        <Chip 
                                            label="Possui Reteste" 
                                            sx={{ 
                                                background: 'linear-gradient(135deg, #2db7bc 0%, #4dd1d6 100%)',
                                                color: '#ffffff',
                                                fontWeight: 800,
                                                fontSize: '0.7rem',
                                                fontFamily: 'Outfit, Inter, sans-serif'
                                            }} 
                                        />
                                    )}
                                </Box>

                                {/* Overall Alert Box */}
                                <Box sx={{ 
                                    background: status.bg, 
                                    borderRadius: '16px', 
                                    padding: '16px',
                                    marginBottom: '24px',
                                    border: '1px solid rgba(0,0,0,0.02)'
                                }}>
                                    <Typography sx={{ 
                                        color: status.color, 
                                        fontFamily: 'Outfit, Inter, sans-serif', 
                                        fontSize: '0.9rem', 
                                        fontWeight: 800,
                                        marginBottom: '4px'
                                    }}>
                                        {status.label}
                                    </Typography>
                                    <Typography sx={{ 
                                        color: 'rgba(0,0,0,0.7)', 
                                        fontFamily: 'Outfit, Inter, sans-serif', 
                                        fontSize: '0.8rem',
                                        lineHeight: 1.4
                                    }}>
                                        {status.desc}
                                    </Typography>
                                </Box>

                                {/* Triage Date & Institution */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, marginBottom: '24px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <CalendarIcon sx={{ color: '#718096', fontSize: 20 }} />
                                        <Typography sx={{ color: '#4a5568', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                                            Último exame: <span style={{ fontWeight: 700, color: '#1a202c' }}>{formatDate(latestTriage.evaluationDate)}</span>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <HospitalIcon sx={{ color: '#718096', fontSize: 20 }} />
                                        <Typography sx={{ color: '#4a5568', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                                            Local: <span style={{ fontWeight: 700, color: '#1a202c' }}>{latestTriage.institution || 'Maternidade Padrão'}</span>
                                        </Typography>
                                    </Box>
                                    {hasRetest && (
                                        <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.78rem', fontStyle: 'italic', marginLeft: '26px' }}>
                                            Histórico com {allTriages.length} exames (exibindo o reteste mais recente).
                                        </Typography>
                                    )}
                                </Box>

                                {/* Ear Visual Badges */}
                                <Grid container spacing={2} sx={{ marginBottom: '28px', marginTop: 'auto' }}>
                                    <Grid item xs={6}>
                                        <Box sx={{ 
                                            background: leftRes.bgColor,
                                            border: `1px solid ${leftRes.borderColor}`,
                                            borderRadius: '16px',
                                            padding: '12px 8px',
                                            textAlign: 'center'
                                        }}>
                                            <HearingIcon sx={{ color: leftRes.color, fontSize: 20, marginBottom: '4px' }} />
                                            <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700 }}>
                                                Orelha Esquerda
                                            </Typography>
                                            <Typography sx={{ color: leftRes.color, fontFamily: 'Outfit, Inter, sans-serif', fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                                                {leftRes.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ 
                                            background: rightRes.bgColor,
                                            border: `1px solid ${rightRes.borderColor}`,
                                            borderRadius: '16px',
                                            padding: '12px 8px',
                                            textAlign: 'center'
                                        }}>
                                            <HearingIcon sx={{ color: rightRes.color, fontSize: 20, marginBottom: '4px' }} />
                                            <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700 }}>
                                                Orelha Direita
                                            </Typography>
                                            <Typography sx={{ color: rightRes.color, fontFamily: 'Outfit, Inter, sans-serif', fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                                                {rightRes.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                {/* Interactive consultation button */}
                                <Button 
                                    onClick={() => {
                                        setSelectedBaby(baby);
                                        setActiveTab(0);
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #5D307A 0%, #7D3C98 100%)',
                                        color: '#ffffff',
                                        borderRadius: '14px',
                                        padding: '12px',
                                        fontFamily: 'Outfit, Inter, sans-serif',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        boxShadow: '0 8px 20px rgba(93, 48, 122, 0.15)',
                                        textTransform: 'none',
                                        letterSpacing: '0.3px',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #E83268 0%, #F35E8E 100%)',
                                            boxShadow: '0 8px 20px rgba(232, 50, 104, 0.25)'
                                        }
                                    }}
                                >
                                    Consulta Detalhada
                                </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Detailed Consultation Modal */}
            <Dialog
                open={Boolean(selectedBaby)}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setSelectedBaby(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '28px',
                        padding: '16px',
                        boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.8)'
                    }
                }}
            >
                {selectedBaby && currentTriage && (
                    <Box>
                        {/* Header */}
                        <DialogTitle sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '16px 24px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontWeight: 800,
                            color: '#1a202c',
                            fontSize: '1.4rem'
                        }}>
                            Detalhamento do Exame
                            <IconButton onClick={() => setSelectedBaby(null)} sx={{ color: '#718096' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent sx={{ padding: '0 24px 24px' }}>
                            {/* Summary header */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '20px', background: 'rgba(93, 48, 122, 0.03)', borderRadius: '20px', padding: '16px' }}>
                                <Avatar sx={{ background: 'linear-gradient(135deg, #5D307A 0%, #E83268 100%)', width: 48, height: 48 }}>
                                    <BabyIcon sx={{ fontSize: 26, color: '#ffffff' }} />
                                </Avatar>
                                <Box>
                                    <Typography sx={{ color: '#1a202c', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '1.1rem', fontWeight: 800 }}>
                                        {selectedBaby.name}
                                    </Typography>
                                    <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>
                                        Exame selecionado: {Number(currentTriage.testType) === 2 ? 'Reteste' : '1º Teste'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Retest Navigation Tabs */}
                            {selectedBaby.allTriages.length > 1 && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    background: 'rgba(93, 48, 122, 0.05)', 
                                    borderRadius: '12px', 
                                    padding: '4px',
                                    marginBottom: '24px',
                                    gap: 1
                                }}>
                                    {chronologicalTriages.map((t) => {
                                        const originalIndex = selectedBaby.allTriages.findIndex(item => item.id === t.id);
                                        const isActive = activeTab === originalIndex;
                                        return (
                                            <Button
                                                key={t.id}
                                                onClick={() => setActiveTab(originalIndex)}
                                                fullWidth
                                                sx={{
                                                    borderRadius: '10px',
                                                    textTransform: 'none',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontWeight: isActive ? 800 : 500,
                                                    fontSize: '0.8rem',
                                                    color: isActive ? '#ffffff' : '#5D307A',
                                                    background: isActive 
                                                        ? 'linear-gradient(135deg, #5D307A 0%, #7D3C98 100%)' 
                                                        : 'transparent',
                                                    boxShadow: isActive ? '0 4px 12px rgba(93, 48, 122, 0.2)' : 'none',
                                                    '&:hover': {
                                                        background: isActive 
                                                            ? 'linear-gradient(135deg, #5D307A 0%, #7D3C98 100%)' 
                                                            : 'rgba(93, 48, 122, 0.08)'
                                                    }
                                                }}
                                            >
                                                {Number(t.testType) === 2 ? 'Reteste' : '1º Teste'} ({formatDate(t.evaluationDate)})
                                            </Button>
                                        );
                                    })}
                                </Box>
                            )}

                            {/* Section: Clinical details */}
                            <Typography variant="subtitle2" sx={{ color: '#5D307A', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '16px' }}>
                                Parâmetros Técnicos & Resultados ({Number(currentTriage.testType) === 2 ? 'Reteste' : 'Teste'})
                            </Typography>

                            <Grid container spacing={2.5} sx={{ marginBottom: '28px' }}>
                                <Grid item xs={6}>
                                    <Box sx={{ border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '14px' }}>
                                        <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
                                            Orelha Esquerda
                                        </Typography>
                                        <Chip 
                                            label={formatEarResult(currentTriage.leftEar).label} 
                                            sx={{ 
                                                background: formatEarResult(currentTriage.leftEar).badgeBg, 
                                                color: '#ffffff', 
                                                fontWeight: 800,
                                                fontFamily: 'Outfit, Inter, sans-serif',
                                                fontSize: '0.8rem',
                                                borderRadius: '8px',
                                                height: '28px'
                                            }} 
                                        />
                                        <Box sx={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography sx={{ color: '#4a5568', fontSize: '0.75rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                                EOA: <strong>{currentTriage.eoaLeftEar === null ? 'Não Realizado' : (Number(currentTriage.eoaLeftEar) === 1 ? 'Presente' : 'Ausente')}</strong>
                                            </Typography>
                                            <Typography sx={{ color: '#4a5568', fontSize: '0.75rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                                PEATE-A: <strong>{currentTriage.peateaLeftEar === null ? 'Não Realizado' : (Number(currentTriage.peateaLeftEar) === 1 ? 'Passou' : 'Falhou')}</strong>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Box sx={{ border: '1px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '14px' }}>
                                        <Typography sx={{ color: '#718096', fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
                                            Orelha Direita
                                        </Typography>
                                        <Chip 
                                            label={formatEarResult(currentTriage.rightEar).label} 
                                            sx={{ 
                                                background: formatEarResult(currentTriage.rightEar).badgeBg, 
                                                color: '#ffffff', 
                                                fontWeight: 800,
                                                fontFamily: 'Outfit, Inter, sans-serif',
                                                fontSize: '0.8rem',
                                                borderRadius: '8px',
                                                height: '28px'
                                            }} 
                                        />
                                        <Box sx={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography sx={{ color: '#4a5568', fontSize: '0.75rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                                EOA: <strong>{currentTriage.eoaRightEar === null ? 'Não Realizado' : (Number(currentTriage.eoaRightEar) === 1 ? 'Presente' : 'Ausente')}</strong>
                                            </Typography>
                                            <Typography sx={{ color: '#4a5568', fontSize: '0.75rem', fontFamily: 'Outfit, Inter, sans-serif' }}>
                                                PEATE-A: <strong>{currentTriage.peateaRightEar === null ? 'Não Realizado' : (Number(currentTriage.peateaRightEar) === 1 ? 'Passou' : 'Falhou')}</strong>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ marginBottom: '24px' }} />

                            {/* Section: Clinical Metadata */}
                            <Typography variant="subtitle2" sx={{ color: '#5D307A', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '16px' }}>
                                Equipe & Aparelhos
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '28px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <DoctorIcon sx={{ color: '#E83268', fontSize: 22 }} />
                                    <Box>
                                        <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Fonoaudiólogo Responsável
                                        </Typography>
                                        <Typography sx={{ color: '#1a202c', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Outfit, Inter, sans-serif' }}>
                                            {currentTriage.therapistName || 'Dr(a). Fonoaudiólogo'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <BiotechIcon sx={{ color: '#E83268', fontSize: 22 }} />
                                    <Box>
                                        <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Equipamento Utilizado
                                        </Typography>
                                        <Typography sx={{ color: '#1a202c', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Outfit, Inter, sans-serif' }}>
                                            {currentTriage.equipmentName || 'Equipamento Padrão TAN'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <CalendarIcon sx={{ color: '#E83268', fontSize: 22 }} />
                                    <Box>
                                        <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Tipo & Fluxo do Exame
                                        </Typography>
                                        <Typography sx={{ color: '#1a202c', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Outfit, Inter, sans-serif' }}>
                                            {currentTriage.type} ({Number(currentTriage.testType) === 2 ? 'Reteste' : 'Teste'})
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ marginBottom: '24px' }} />

                            {/* Section: Medical conduct & orientations */}
                            <Typography variant="subtitle2" sx={{ color: '#5D307A', fontFamily: 'Outfit, Inter, sans-serif', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '16px' }}>
                                Diagnóstico & Recomendações
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <MedicalIcon sx={{ color: '#2db7bc', fontSize: 22, marginTop: '2px' }} />
                                    <Box>
                                        <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Conduta Clínica Recomendada
                                        </Typography>
                                        <Typography sx={{ color: '#1a202c', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.4 }}>
                                            {currentTriage.conduct}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <DescriptionIcon sx={{ color: '#2db7bc', fontSize: 22, marginTop: '2px' }} />
                                    <Box>
                                        <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Orientações Clínicas
                                        </Typography>
                                        <Typography sx={{ color: '#1a202c', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.4 }}>
                                            {currentTriage.orientation || 'Sem orientações adicionais.'}
                                        </Typography>
                                    </Box>
                                </Box>

                                {currentTriage.observation && (
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <InfoIcon sx={{ color: '#fbbc43', fontSize: 22, marginTop: '2px' }} />
                                        <Box>
                                            <Typography sx={{ color: '#718096', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                Observações Adicionais
                                            </Typography>
                                            <Typography sx={{ color: '#4a5568', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'Outfit, Inter, sans-serif', lineHeight: 1.4 }}>
                                                {currentTriage.observation}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </DialogContent>
                    </Box>
                )}
            </Dialog>
        </Box>
    );
};

export default ParentTriagePortal;
