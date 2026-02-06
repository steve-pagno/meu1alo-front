export const getAddressByCep = async (cep) => {
    const cleanCep = cep?.replace(/\D/g, '');
    console.log('[DEBUG] 1. Helper chamado com CEP:', cleanCep);

    if (!cleanCep || cleanCep.length !== 8) {
        console.warn('[DEBUG] CEP inválido ou incompleto.');
        return { error: 'Formato de CEP inválido.' };
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        
        console.log('[DEBUG] 2. Resposta do ViaCEP:', data); // <--- AQUI VOCÊ VÊ O RESULTADO
        
        if (data.erro) {
            return { error: 'CEP não encontrado.' };
        }
        
        return data;
    } catch (error) {
        console.error('[DEBUG] Erro na requisição:', error);
        return { error: 'Erro ao buscar CEP.' };
    }
};

export default { getAddressByCep };