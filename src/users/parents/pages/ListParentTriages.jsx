import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import useParentsService from '../useParentsService';
import ParentTriagePortal from '../components/ParentTriagePortal';

const ListParentTriages = () => {
    const service = useParentsService();
    const [triages, setTriages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        service.getAllTriages()
            .then(res => {
                if (res && res.isSuccess) {
                    setTriages(res.body || []);
                }
            })
            .catch(err => console.error('Erro ao buscar triagens:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container maxWidth="xl" sx={{ padding: { md: '40px 36px', xs: '20px 16px' } }}>
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '32px', position: 'relative' }}>
                <Box sx={{
                    background: 'linear-gradient(180deg, #5D307A 0%, #E83268 100%)',
                    borderRadius: '3px',
                    height: '28px',
                    width: '6px'
                }} />
                <Typography
                    variant="h4"
                    sx={{
                        color: '#1a202c',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        letterSpacing: '-0.5px'
                    }}
                >
                    Histórico de Triagens
                </Typography>
            </Box>

            <ParentTriagePortal triages={triages} loading={loading} />
        </Container>
    );
};

export default ListParentTriages;