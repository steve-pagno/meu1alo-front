import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import useInstitutionService from '../../useInstituionService';

const ViewTriage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = useInstitutionService();
    const [triage, setTriage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            service.getTriageById(id)
                .then((response) => {
                    setTriage(response.body || response.result || response);
                })
                .catch((error) => {
                    console.error('Erro ao carregar os detalhes da triagem:', error);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!triage) {
        return (
            <Box padding={3}>
                <Typography variant="h5" color="error">Triagem não encontrada.</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Voltar
                </Button>
            </Box>
        );
    }

    const { baby, conduct, equipment, orientation } = triage;
    const responsible = baby?.birthMother || baby?.guardians?.[0];

    const formatDate = (dateString) => {
        if (!dateString) { return 'N/A'; }
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    };

    const formatBoolean = (val) => val === true || val === 1 ? 'Sim/Passou' : (val === false || val === 0 ? 'Não/Falhou' : 'N/A');

    return (
        <Box sx={{ padding: 2 }}>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #print-section, #print-section * {
                        visibility: visible;
                    }
                    #print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .MuiPaper-root {
                        box-shadow: none !important;
                        border: 1px solid #ddd !important;
                        margin-bottom: 15px !important;
                        page-break-inside: avoid;
                    }
                }
            `}</style>

            <Box display="flex" alignItems="center" mb={3} className="no-print">
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mr: 2 }} variant="outlined">
                    Voltar
                </Button>
                <Typography variant="h4" color="primary">
                    Detalhes da Triagem (Consulta)
                </Typography>
                <Button 
                    startIcon={<PrintIcon />} 
                    onClick={() => window.print()} 
                    variant="contained" 
                    color="secondary" 
                    sx={{ ml: 'auto' }}
                >
                    Imprimir Laudo
                </Button>
            </Box>

            <Box id="print-section">
                {/* Cabeçalho Clínico para Impressão */}
                <Box sx={{ display: 'none', displayPrint: 'block', mb: 4, textAlign: 'center', borderBottom: '2px solid #5D2A68', pb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#5D2A68' }}>
                        LAUDO DE TRIAGEM AUDITIVA NEONATAL
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Programa de Triagem Auditiva Neonatal - Meu 1 Alô
                    </Typography>
                    {triage.institution && (
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                            Unidade: {triage.institution.institutionName || triage.institution.name}
                        </Typography>
                    )}
                </Box>

                <Grid container spacing={3}>
                    {/* Informações da Criança e Responsável */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="secondary" gutterBottom>Dados da Criança</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography><strong>Nome:</strong> {baby?.name || 'N/A'}</Typography>
                                <Typography><strong>Data de Nascimento:</strong> {formatDate(baby?.birthDate)}</Typography>
                                <Typography><strong>Peso:</strong> {baby?.weight ? `${baby.weight} kg` : 'N/A'}</Typography>
                                <Typography><strong>Altura:</strong> {baby?.height ? `${baby.height} cm` : 'N/A'}</Typography>
                                <Typography><strong>Semanas de Gestação:</strong> {baby?.gestationalAge || 'N/A'}</Typography>

                                <Typography variant="h6" color="secondary" sx={{ mt: 3 }} gutterBottom>Dados do Responsável</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography><strong>Nome:</strong> {responsible?.name || 'N/A'}</Typography>
                                <Typography><strong>CPF:</strong> {responsible?.cpf || 'N/A'}</Typography>
                                <Typography><strong>RG:</strong> {responsible?.rg || 'N/A'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Informações do Teste */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="secondary" gutterBottom>Informações do Teste</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography><strong>Data da Avaliação:</strong> {formatDate(triage.evaluationDate)}</Typography>
                                <Typography><strong>Tipo da Triagem:</strong> {triage.type || 'N/A'}</Typography>
                                <Typography><strong>Orelha Esquerda:</strong> {formatBoolean(triage.leftEar)}</Typography>
                                <Typography><strong>Orelha Direita:</strong> {formatBoolean(triage.rightEar)}</Typography>
                                <Typography><strong>IRDA:</strong> {triage.indicators && triage.indicators.length > 0 ? triage.indicators.map(ind => `${ind.name}`).join(', ') : 'Nenhum'}</Typography>

                                <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>Detalhes EOA</Typography>
                                <Typography><strong>Esquerda:</strong> {formatBoolean(triage.eoaLeftEar)}</Typography>
                                <Typography><strong>Direita:</strong> {formatBoolean(triage.eoaRightEar)}</Typography>

                                {triage.type && triage.type.includes('PEATE') && (
                                    <>
                                        <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>Detalhes PEATE-A</Typography>
                                        <Typography><strong>Esquerda:</strong> {formatBoolean(triage.peateaLeftEar)}</Typography>
                                        <Typography><strong>Direita:</strong> {formatBoolean(triage.peateaRightEar)}</Typography>
                                    </>
                                )}

                                <Typography sx={{ mt: 2 }}><strong>Observação:</strong> {triage.observation || 'Nenhuma'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Conduta e Equipamento */}
                    <Grid item xs={12}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" color="secondary" gutterBottom>Parâmetros Utilizados e Resultados</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Typography color="primary" sx={{ fontWeight: 'bold' }}>Equipamento</Typography>
                                        <Typography><strong>Modelo:</strong> {equipment?.model || 'N/A'}</Typography>
                                        <Typography><strong>Marca:</strong> {equipment?.brand || 'N/A'}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography color="primary" sx={{ fontWeight: 'bold' }}>Conduta</Typography>
                                        <Typography>{conduct?.resultDescription || 'N/A'}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography color="primary" sx={{ fontWeight: 'bold' }}>Orientação</Typography>
                                        <Typography>{orientation?.description || 'N/A'}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Rodapé Clínico para Impressão */}
                <Box sx={{ display: 'none', displayPrint: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                    <Box sx={{ width: '300px', borderTop: '1px solid #000', pt: 1, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {triage.therapist?.name || 'Fonoaudiólogo(a)'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            CRFa: {triage.therapist?.crfa || 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ViewTriage;
