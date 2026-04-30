import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import { useAuth } from './Auth';

const MAX_IDLE_TIME_SECONDS = 3600; // 1 hour

const SessionTimer = () => {
    const auth = useAuth();
    const [remainingTime, setRemainingTime] = useState(MAX_IDLE_TIME_SECONDS);
    const lastActiveTime = useRef(Date.now());
    const intervalRef = useRef(null);

    // Formatter para o relógio (ex: 59:59)
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const resetTimer = () => {
        lastActiveTime.current = Date.now();
        // Não force setRemainingTime aqui para não sobrecarregar re-renders de UI ao mexer o mouse
    };

    useEffect(() => {
        // Escutadores de atividade
        const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'];
        
        events.forEach(event => {
            window.addEventListener(event, resetTimer, { passive: true });
        });

        // Intervalo de verificação a cada 1 segundo
        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - lastActiveTime.current) / 1000);
            const remaining = Math.max(0, MAX_IDLE_TIME_SECONDS - elapsedSeconds);

            setRemainingTime(remaining);

            if (remaining <= 0) {
                // Logout automático
                if (auth && auth.logout && auth.loginRoute) {
                    auth.logout(auth.loginRoute);
                }
            }
        }, 1000);

        return () => {
            // Limpa event listeners e intervalos quando o componente sair da tela (ex: ao deslogar)
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [auth]);

    // Oculta o timer se por algum motivo for injetado em rota livre, mas como usamos em RequireAuth sempre terá usuário.
    if (!auth || !auth.user) return null;

    const isExpiringSoon = remainingTime <= 300; // Últimos 5 minutos

    return (
        <Box 
            sx={{
                position: 'fixed',
                bottom: 24,
                left: 24,
                zIndex: 9999,
                opacity: isExpiringSoon ? 1 : 0.6,
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 1 }
            }}
        >
            <Chip
                icon={<TimerTwoToneIcon />}
                label={
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Sessão Expira em: {formatTime(remainingTime)}
                    </Typography>
                }
                color={isExpiringSoon ? 'error' : 'default'}
                variant={isExpiringSoon ? 'filled' : 'outlined'}
                sx={{
                    backgroundColor: isExpiringSoon ? undefined : 'background.paper',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                }}
            />
        </Box>
    );
};

export default SessionTimer;
