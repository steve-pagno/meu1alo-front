import { useForm } from 'react-hook-form';
import { useAuth } from '../../../providers/auth/Auth';

const useBasePasswordForgottenController = () => {
    const { handleSubmit, register } = useForm();
    const auth = useAuth();

    // A função onSubmit agora recebe apenas os dados do formulário
    const onSubmit = async (formData) => {
        try {
            // Chama a função correta do contexto, passando o e-mail do formulário
            await auth.sendPasswordResetEmail(formData.email);

            // Dá um feedback para o usuário
            alert('Se este e-mail estiver cadastrado, um link de recuperação foi enviado!');
        } catch (error) {
            // Lida com possíveis erros da API
            console.error("Falha ao enviar e-mail de recuperação:", error);
            alert('Ocorreu um erro. Por favor, tente novamente mais tarde.');
        }
    };

    // O handleSubmit do react-hook-form já previne o comportamento padrão do formulário
    return { onSubmit: handleSubmit(onSubmit), register };
};

export default useBasePasswordForgottenController;