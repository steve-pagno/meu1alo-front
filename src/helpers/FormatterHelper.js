
export const FormatterHelper = () => {
    const formatterOfDate = (value) => {
        if(value){
            const date = new Date(value);
            return date.toLocaleDateString('pt-BR');
        }
        return '';
    };

    const formatterOfYesOrNo = (value) => {
        return value === 0 ? 'Não' : 'Sim';
    };

    const formatterTypeOfTest = (value) => {
        if(value === 1){
            return 'Teste';
        }
        if(value === 2){
            return 'Reteste';
        }
        return 'Teste e reteste';
    };

    const formatValue = (name, value) => {
        if(!name){
            return value;
        }

        const formattersStrategy = {
            'date': formatterOfDate,
            'type-of-test': formatterTypeOfTest,
            'yes-or-no': formatterOfYesOrNo
        };

        return formattersStrategy[name](value);
    };

    return { formatValue };
};