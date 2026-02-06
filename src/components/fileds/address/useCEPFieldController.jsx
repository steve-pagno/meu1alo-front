import { useCallback, useState } from 'react';
import AddressHelper from '../../../helpers/AddressHelper';

const useCEPFieldController = ({ name, onChange, onAddressFound, onSearchStart, onError, ...other }) => {
    const [data, setData] = useState(other.value || other.defaultValue || '');

    const onAccept = useCallback((value) => {
        onChange({ target: { name: name, value: value } });
        setData(value);
    }, [name, onChange]);

    const onBlur = useCallback(async (event) => {
        const cepValue = event.target.value.replace(/\D/g, '');
        console.log('[DEBUG] 0. onBlur acionado no campo. Valor limpo:', cepValue);

        if (other.onBlur) other.onBlur(event);

        if (cepValue === "") return;

        if (cepValue.length !== 8) {
            console.log('[DEBUG] Tamanho incorreto.');
            if (onError) onError("Formato de CEP inválido.");
            return;
        }

        if (onSearchStart) onSearchStart();

        const result = await AddressHelper.getAddressByCep(cepValue);

        if (result.error) {
            console.log('[DEBUG] Erro identificado no controller:', result.error);
            if (onError) onError(result.error);
        } else if (onAddressFound) {
            console.log('[DEBUG] 3. Endereço encontrado, chamando callback do pai...');
            onAddressFound(result);
        }
    }, [other, onAddressFound, onSearchStart, onError]);

    return { data, name, onAccept, onBlur, other };
};

export default useCEPFieldController;