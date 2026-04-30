import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import AsyncRequest from '../../../../components/api/AsyncRequest';
import BaseEditPaper from '../../../../components/bases/edit/BaseEditPaper';
import BrazilianPhoneField from '../../../../components/fileds/phone/BrazilianPhoneField';
import SelectField from '../../../../components/fileds/select/SelectField';
import useTherapistService from '../../useTherapistService';

const inputProps = {
    crfa: {
        maxLength: '9', // Aumentado para 9 para suportar o hífen da máscara (0-000000)
    },
    general: {
        maxLength: '255'
    }
};

const EditTherapist = () => {
    const { formState: { errors }, handleSubmit, register, setValue, watch } = useForm({
        defaultValues: { institutions: [], xp: '' }
    });
    const service = useTherapistService();
    // Watch fields that require controlled values (Material-UI Select components)
    const xpValue = watch('xp');
    const institutionsValue = watch('institutions');

    const loadFormattedData = React.useCallback(async () => {
        const response = await service.getLoggedTherapist();

        if (response && response.isSuccess && response.body) {
            const data = response.body;

            const email1 = Array.isArray(data.emails) && data.emails[0] ? data.emails[0].email : '';
            const email2 = Array.isArray(data.emails) && data.emails[1] ? data.emails[1].email : '';

            const phone1 = Array.isArray(data.phones) && data.phones[0] ? data.phones[0].phoneNumber : '';
            const phone2 = Array.isArray(data.phones) && data.phones[1] ? data.phones[1].phoneNumber : '';

            let xp = '';
            if (data.xp) {
                if (typeof data.xp === 'object' && data.xp.id !== undefined) {
                    xp = String(data.xp.id);
                } else {
                    xp = String(data.xp);
                }
            }

            let insts = [];
            if (Array.isArray(data.institutions)) {
                insts = data.institutions.map(i => String(i.id));
            }

            let formattedCrfa = data.crfa || '';
            if (formattedCrfa && formattedCrfa.length > 0) {
                formattedCrfa = formattedCrfa.replace(/\D/g, '').replace(/(\d{1})(\d{1,})/, '$1-$2');
            }

            response.body = {
                name: data.name || '',
                login: data.login || '',
                crfa: formattedCrfa,
                xp: xp,
                institutions: insts,
                'emails.0': email1,
                'emails.1': email2,
                'phones.0': phone1,
                'phones.1': phone2
            };
        }

        return response;
    }, [service]);

    return (
        <BaseEditPaper
            title={'Meu Perfil'}
            handleSubmit={handleSubmit}
            serviceFunction={service.updateLoggedTherapist}
            serviceGetFunction={loadFormattedData}
            setValue={setValue}
        // Removido o ID, pois o backend identificará o usuário pelo Token JWT
        >
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('name')} label="Nome completo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.name}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('login')} label={'Login'}
                    variant="outlined" size="small"
                    inputProps={inputProps.general}
                    helperText="Nome usado para acessar a plataforma"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.login}
                    disabled
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('crfa', {
                        setValueAs: (v) => v.replace(/\D/g, ''), // Envia apenas números ao banco
                        onChange: (e) => {
                            const rawValue = e.target.value.replace(/\D/g, '');
                            if (rawValue.length > 0) {
                                e.target.value = rawValue.replace(/(\d{1})(\d{1,})/, '$1-$2');
                            }
                        }
                    })}
                    label="CRFa"
                    inputProps={inputProps.crfa}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                    error={errors?.crfa}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AsyncRequest requestFunction={service.getXpTypes} loaderChildren={<CircularProgress />}>
                    {(xpTypes) => (
                        <SelectField
                            title={'Tempo de experiência'}
                            register={{ ...register('xp') }}
                            value={xpValue}
                            required values={xpTypes}
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <AsyncRequest requestFunction={service.getAllInstitutions} loaderChildren={<CircularProgress />}>
                    {(institutions) => (
                        <SelectField
                            title={'Instituições'}
                            register={{ ...register('institutions') }}
                            value={institutionsValue}
                            required values={institutions} multiple
                        />
                    )}
                </AsyncRequest>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant={'h6'}>
                    Contato
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.0')} label="E-mail preferencial"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <TextField
                    {...register('emails.1')} label="E-mail alternativo"
                    inputProps={inputProps.general}
                    variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones.0" error={errors?.phones && errors?.phones[0]}
                    label="Telefone principal" variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }} required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <BrazilianPhoneField
                    register={register} name="phones.1" error={errors?.phones && errors?.phones[1]}
                    label="Telefone alternativo" variant="outlined" size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Segurança</Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    {...register('currentPassword')}
                    label="Senha atual"
                    type="password"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    {...register('newPassword')}
                    label="Nova senha"
                    type="password"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    {...register('confirmNewPassword')}
                    label="Confirmar nova senha"
                    type="password"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

        </BaseEditPaper>
    );
};

export default EditTherapist;