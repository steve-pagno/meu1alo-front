import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Dialog, DialogContent, Grid, Typography, Alert } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import PasswordField from '../fileds/login/password/PasswordField';
import { useAuth } from '../../providers/auth/Auth';

const validate = {
    hasMoreSix: (value) => value.length >= 6,
    hasNumber: (value) => /\d/.test(value),
    hasSpecial: (value) => /\p{P}/u.test(value) || /[$+=|]/.test(value),
    hasUpper: (value) => /[A-Z]/.test(value),
};

const validationsList = [
    { funcName: 'hasUpper', text: 'Deve existir uma letra maiúscula' },
    { funcName: 'hasNumber', text: 'Deve existir pelo menos um número' },
    { funcName: 'hasSpecial', text: 'Deve existir pelo menos um símbolo especial' },
    { funcName: 'hasMoreSix', text: 'Deve ter no mínimo 6 dígitos' },
];

const validationsListConfirmation = [{ funcName: 'matchConfirmation', text: 'A confirmação de senha deve ser igual à senha' }];

const ForcePasswordResetModal = () => {
    const auth = useAuth();
    const { formState: { errors }, handleSubmit, register, watch } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const passwordVal = watch('password', '');
    const validateConfirmation = { matchConfirmation: (value) => value && passwordVal && value === passwordVal };

    const showModal = auth?.user && Boolean(auth.user.forcePasswordReset);

    if (!showModal) {
        return null;
    }

    const onSubmit = async (data) => {
        setSubmitting(true);
        setErrorMessage('');
        try {
            const response = await auth.forcePasswordResetSubmit(data.password);
            if (!response.isSuccess) {
                setErrorMessage(response.body?.message || 'Falha ao redefinir a senha.');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            setErrorMessage('Ocorreu um erro ao redefinir sua senha.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={true}
            disableEscapeKeyDown
            onClose={() => {}}
            maxWidth="xs"
            fullWidth
            SlotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(16px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    }
                }
            }}
            PaperProps={{
                sx: {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '24px',
                    boxShadow: '0 24px 64px rgba(93, 48, 122, 0.18)',
                    p: 2,
                    overflow: 'visible'
                }
            }}
        >
            <DialogContent sx={{ px: 3, py: 4, textAlign: 'center' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: '22px',
                    background: 'linear-gradient(135deg, #5D307A, #E83268)',
                    boxShadow: '0 12px 30px rgba(93, 48, 122, 0.3)',
                    mx: 'auto',
                    mb: 3
                }}>
                    <LockResetIcon sx={{ fontSize: '2.5rem', color: '#FFF' }} />
                </Box>

                <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 900, mb: 1, letterSpacing: '-0.5px' }}>
                    Nova Senha Necessária
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 1, lineHeight: 1.6 }}>
                    Sua senha foi redefinida recentemente. Por segurança, é obrigatório cadastrar uma nova senha forte antes de acessar a plataforma.
                </Typography>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', textAlign: 'left' }}>
                        {errorMessage}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}>
                            <PasswordField
                                label="Nova Senha"
                                name="password"
                                register={register}
                                focused={focusedField === 'password'}
                                validate={validate}
                                validationsList={validationsList}
                                error={errors?.password}
                            />
                        </Grid>

                        <Grid item xs={12} onFocus={() => setFocusedField('passwordConfirm')} onBlur={() => setFocusedField(null)}>
                            <PasswordField
                                label="Confirmação da Nova Senha"
                                name="passwordConfirm"
                                register={register}
                                focused={focusedField === 'passwordConfirm'}
                                validate={validateConfirmation}
                                validationsList={validationsListConfirmation}
                                error={errors?.passwordConfirm}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={submitting}
                                sx={{
                                    background: 'linear-gradient(90deg, #5D307A, #E83268)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #4A2562, #D12557)',
                                        boxShadow: '0 8px 24px rgba(93, 48, 122, 0.4)'
                                    },
                                    borderRadius: '14px',
                                    fontWeight: 800,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 6px 20px rgba(93, 48, 122, 0.25)',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            >
                                {submitting ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : 'Atualizar e Acessar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ForcePasswordResetModal;
