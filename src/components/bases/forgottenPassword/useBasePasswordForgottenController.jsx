import { useForm } from 'react-hook-form';
import HttpHelper from '../../../helpers/HttpHelper';
import { toast } from 'react-toastify';

const useBasePasswordForgottenController = (userType) => {
    const { handleSubmit, register, formState: { isSubmitting } } = useForm();

    const onSubmit = async (formData) => {
        try {
            // Verifique se o userType está chegando aqui
            if (!userType) {
                toast.error('Erro: Tipo de usuário não identificado.');
                return;
            }

            const response = await HttpHelper.post('/user/recover-password', {
                email: formData.email,
                userType: userType // Certifique-se de que o backend espera este campo exato
            });

            if (response.isSuccess || response.status === 200) {
                toast.success('Se o e-mail estiver cadastrado, você receberá a nova senha em instantes.');
            } else {
                const msg = response.body?.message || 'Erro ao solicitar senha.';
                toast.warning(msg);
            }
        } catch (error) {
            console.error("Erro na recuperação:", error);
            toast.error('Não foi possível conectar ao servidor.');
        }
    };

    return { 
        onSubmit: handleSubmit(onSubmit), 
        register,
        loading: isSubmitting
    };
};

export default useBasePasswordForgottenController;