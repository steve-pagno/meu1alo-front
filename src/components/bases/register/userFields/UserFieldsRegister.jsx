import React from 'react';
import { Grid, TextField } from '@mui/material';
import PasswordField from '../../../fileds/login/password/PasswordField';

const validationsListConfirmation = [{ funcName: 'matchConfirmation', text: 'A confirmação de senha deve ser igual a senha' }];

const validate = {
    hasMoreSix: (value) => value.length >= 6,
    hasNumber: (value) => /\d/.test(value),
    hasSpecial: (value) => /\p{P}/u.test(value) || /[$+=|]/.test(value),
    hasUpper: (value) => /[A-Z]/.test(value),
};

const validationsList = [
    { funcName: 'hasUpper', text: 'Deve existir uma letra maiúscula' },
    { funcName: 'hasNumber', text: 'Deve existir pelo menos um número' },
    { funcName: 'hasSpecial', text: 'Deve existir pelo menos um simbolo especial' },
    { funcName: 'hasMoreSix', text: 'Deve ter no mínimo 6 digitos e no máximo 8' },
];

const UserFieldsRegister = ({ errors, register }) => {
    const [focused, setFocused] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocused(false);
    }, []);

    const onChangePassword = React.useCallback((event) => {
        setPassword(event.target.value);
    }, []);

    const validateConfirmation = { matchConfirmation: (value) => value && password && value === password };

    return (
        <>
            <Grid item xs={12} sm={12} md={6} onFocus={onFocus} onBlur={onBlur}>
                <TextField
                    label={'Login'} variant="outlined" size="small" required
                    {...register('login')}
                    inputProps={{ maxLength: '255' }}
                    helperText={focused && <p>Nome que será usado para acessar a plataforma junto a senha</p>}
                    error={errors?.login}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} onFocus={onFocus} onBlur={onBlur}>
                <PasswordField
                    label="Senha" name="password"
                    register={register} focused={focused}
                    validate={validate} validationsList={validationsList}
                    error={errors?.password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} onFocus={onFocus} onBlur={onBlur}>
                <PasswordField
                    label="Confirmação de senha" name="passwordConfirm"
                    register={register} focused={focused}
                    validate={validateConfirmation} validationsList={validationsListConfirmation}
                    error={errors?.passwordConfirm}
                />
            </Grid>
        </>
    );
};

export default UserFieldsRegister;
