import { useForm } from 'react-hook-form';
import HttpHelper from '../../../helpers/HttpHelper';
import { toast } from 'react-toastify';

const useBasePasswordForgottenController = (userType) => {
    const { handleSubmit, register, formState: { isSubmitting } } = useForm();

    const onSubmit = async (formData) => {
        try {
            if (!userType) {
                toast.error('Erro: Tipo de usuário não identificado.');
                return;
            }

            const response = await HttpHelper.post('/user/recover-password', {
                email: formData.email,
                userType: userType 
            });

            if (response.isSuccess || response.status === 200) {
                 if(toast) toast.success('Se o e-mail estiver cadastrado, você receberá a nova senha em instantes.');
                 else alert('Solicitação enviada! Verifique seu e-mail.');
                 
            } else {
                 const msg = response.body?.message || 'Erro ao solicitar senha.';
                 if(toast) toast.warning(msg);
                 else alert(msg);
            }

        } catch (error) {
            console.error("Erro na recuperação:", error);
            if(toast) toast.error('Não foi possível conectar ao servidor.');
            else alert('Erro de conexão.');
        }
    };

    return { 
        onSubmit: handleSubmit(onSubmit), 
        register,
        loading: isSubmitting
    };
};

export default useBasePasswordForgottenController;