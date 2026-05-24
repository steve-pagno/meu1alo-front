import { useCallback, useEffect, useRef, useState } from 'react';
import AddressHelper from '../../../helpers/AddressHelper';

const useCEPFieldController = ({ name, onAddressFound, onChange, onError, onSearchStart, ...other }) => {
    const [data, setData] = useState(other.value || other.defaultValue || '');
    const lastSentValueRef = useRef(other.value || other.defaultValue || '');

    useEffect(() => {
        const val = other.value !== undefined ? other.value : other.defaultValue;
        if (val !== undefined && val !== lastSentValueRef.current) {
            lastSentValueRef.current = val || '';
            setData(val || '');
        }
    }, [other.value, other.defaultValue]);

    const onAccept = useCallback((value) => {
        lastSentValueRef.current = value;
        onChange({ target: { name: name, value: value } });
        setData(value);
    }, [name, onChange]);

    const onBlur = useCallback(async (event) => {
        const cepValue = event.target.value.replace(/\D/g, '');
        console.log('[DEBUG] 0. onBlur acionado no campo. Valor limpo:', cepValue);

        if (other.onBlur) { other.onBlur(event); }

        if (cepValue === '') { return; }

        if (cepValue.length !== 8) {
            console.log('[DEBUG] Tamanho incorreto.');
            if (onError) { onError('Formato de CEP inválido.'); }
            return;
        }

        if (onSearchStart) { onSearchStart(); }

        const result = await AddressHelper.getAddressByCep(cepValue);

        if (result.error) {
            console.log('[DEBUG] Erro identificado no controller:', result.error);
            if (onError) { onError(result.error); }
        } else if (onAddressFound) {
            console.log('[DEBUG] 3. Endereço encontrado, chamando callback do pai...');
            onAddressFound(result);
        }
    }, [other, onAddressFound, onSearchStart, onError]);

    return { data, name, onAccept, onBlur, other };
};

export default useCEPFieldController;