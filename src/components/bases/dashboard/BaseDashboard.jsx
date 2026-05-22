import React from 'react';
import { GoGraph } from 'react-icons/go';
import { Avatar, Box, Card, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import AsyncRequest from '../../api/AsyncRequest';
import { GraphicBar } from '../../graphics/GraphicBar';
import { GraphicDoughnut } from '../../graphics/GraphicDoughnut';
import HtmlHead from '../../HtmlHead';
import useBaseDashboardController from './useBaseDashboardController';
import useBaseDashboardStyles from './useBaseDashboardStyles';

const RecommendedGraphic = ({ isSmall, labels, onClickElement, quantities, title }) => {
    if(isSmall) {
        return (
            <GraphicDoughnut
                title={title}
                labels={labels}
                quantities={quantities}
                onClickElement={onClickElement}
            />
        );
    }

    return (
        <GraphicBar
            title={title}
            labels={labels}
            quantities={quantities}
            onClickElement={onClickElement}
        />
    );
};

const BaseDashboard = ({ getDashboard, getReport, title, userTypeTitle }) => {
    const { getSizes, isTypeSmall, onClickElement } = useBaseDashboardController();
    const styles = useBaseDashboardStyles();

    return (
        <>
            <HtmlHead userType={userTypeTitle} subTitle={'Painel'}/>
            <Grid container spacing={4} sx={{ ...styles.container, padding: { md: '40px 36px', xs: '20px 16px' } }} >
                <Grid item xs={12}>
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
                        marginBottom: '16px',
                        overflow: 'hidden',
                        padding: { md: '40px 48px', xs: '32px 24px' },
                        position: 'relative'
                    }}>
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
                            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2, marginBottom: '12px' }}>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.15)', height: 44, width: 44 }}>
                                    <GoGraph size={22} color="#ffffff" />
                                </Avatar>
                                <Chip
                                    label="Painel Interativo"
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        color: '#ffffff',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.5px'
                                    }}
                                />
                            </Box>
                            <Typography variant="h4" sx={{ color: '#ffffff', fontSize: { md: '2.4rem', xs: '1.8rem' }, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                                {title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', fontWeight: '400', lineHeight: 1.5, maxWidth: '600px' }}>
                                Monitore o status das triagens e analise os principais indicadores de risco e equipamentos em tempo real.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <AsyncRequest requestFunction={getDashboard} loaderChildren={<CircularProgress />}>
                    {(dashboard) => (
                        dashboard.map((value, index) => (
                            <AsyncRequest
                                key={'graphic-'+index}
                                requestFunction={() => getReport(value.type)}
                                defaultValue={null}
                                loaderChildren={
                                    <Grid item {...getSizes(0, true)}>
                                        <Card sx={{
                                            alignItems: 'center',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid rgba(0, 0, 0, 0.04)',
                                            borderRadius: '24px',
                                            boxShadow: '0px 10px 40px rgba(93, 48, 122, 0.04)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            minHeight: '360px',
                                            padding: '28px'
                                        }}>
                                            <CircularProgress color="primary" />
                                        </Card>
                                    </Grid>
                                }
                            >
                                {(data) => {
                                    if(!data || !data.labels) {
                                        return (<></>);
                                    }
                                    const isSmall = isTypeSmall(data.labels.length);
                                    return (
                                        <Grid item {...getSizes(data.title.length, isSmall)}>
                                            <Card sx={{
                                                '&::before': {
                                                    background: 'linear-gradient(90deg, #5D307A 0%, #E83268 100%)',
                                                    content: '""',
                                                    height: '4px',
                                                    left: 0,
                                                    opacity: 0.8,
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: 0,
                                                    transition: 'opacity 0.3s ease'
                                                },
                                                '&:hover': {
                                                    '&::before': {
                                                        opacity: 1
                                                    },
                                                    borderColor: 'rgba(93, 48, 122, 0.15)',
                                                    boxShadow: '0px 20px 40px rgba(93, 48, 122, 0.08)',
                                                    transform: 'translateY(-6px)'
                                                },
                                                backgroundColor: '#ffffff',
                                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                                borderRadius: '24px',
                                                boxShadow: '0px 10px 40px rgba(93, 48, 122, 0.04)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                                justifyContent: 'space-between',
                                                overflow: 'hidden',
                                                padding: '28px',
                                                position: 'relative',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}>
                                                <RecommendedGraphic
                                                    isSmall={isSmall}
                                                    title={data.title}
                                                    labels={data.labels}
                                                    quantities={data.quantities}
                                                    onClickElement={(e) => onClickElement(e, value.type)}
                                                />
                                                {data.description && (
                                                    <Box sx={{
                                                        alignItems: 'center',
                                                        bgcolor: 'rgba(93, 48, 122, 0.03)',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        gap: 1,
                                                        justifyContent: 'center',
                                                        marginTop: '20px',
                                                        padding: '12px'
                                                    }}>
                                                        <Typography sx={{
                                                            color: '#5D307A',
                                                            fontFamily: 'Outfit, Inter, sans-serif',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '600',
                                                            textAlign: 'center'
                                                        }}>
                                                            {data.description}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Card>
                                        </Grid>
                                    );
                                }}
                            </AsyncRequest>
                        ))
                    )}
                </AsyncRequest>
            </Grid>
        </>
    );
};

export default BaseDashboard;
