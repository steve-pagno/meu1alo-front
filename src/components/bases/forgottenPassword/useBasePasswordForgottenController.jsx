import { useForm } from 'react-hook-form';
import HttpHelper  from '../../../helpers/HttpHelper';
import { toast } from 'react-toastify';

// Recebemos 'userType' como parâmetro na inicialização do hook
const useBasePasswordForgottenController = (userType) => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (formData) => {
        try {
            // Validação de segurança simples no front
            if (!userType) {
                alert('Erro: Tipo de usuário não identificado.');
                return;
            }

            // Chamada direta para a API Node.js que criamos
            // Payload: { email: "...", userType: "therapist" }
            const response = await HttpHelper.post('/users/recover-password', {
                email: formData.email,
                userType: userType 
            });

            if (response.httpStatus === 200) {
                 // Sucesso
                 alert('Se o e-mail estiver cadastrado, você receberá a nova senha em instantes.');
                 // Se quiser redirecionar para login:
                 // window.location.href = `/${userType}/login`;
            } else {
                 alert(response.result?.message || 'Erro ao solicitar senha.');
            }

        } catch (error) {
            console.error("Erro na recuperação:", error);
            alert('Não foi possível conectar ao servidor. Tente novamente.');
        }
    };

    return { 
        onSubmit: handleSubmit(onSubmit), 
        register,
        loading: isSubmitting
    };
};

export default useBasePasswordForgottenController;