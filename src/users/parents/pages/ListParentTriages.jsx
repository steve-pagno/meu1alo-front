import React from 'react';
import { useForm } from 'react-hook-form';
import BaseConsult from '../../../components/bases/consult/BaseConsult';
import useParentsService from '../useParentsService';

const headers = [
    { formatter: 'date', name: 'evaluationDate', title: 'Data avaliação' },
    { name: 'babyName', title: 'Bebê' },
    { name: 'institution', title: 'Instituição' },
    { name: 'type', title: 'Tipo TAN' },
    { formatter: 'type-of-test', name: 'testType', title: 'Tipo teste' },
    { formatter: 'yes-or-no', name: 'leftEar', title: 'Passou esquerda' },
    { formatter: 'yes-or-no', name: 'rightEar', title: 'Passou direita' },
    { name: 'conduct', title: 'Conduta' },
];

const ListParentTriages = () => {
    const { handleSubmit } = useForm();
    const service = useParentsService();

    return (
        <BaseConsult
            handleSubmit={handleSubmit}
            title={'Resultados de Triagens'}
            serviceFunction={service.getAllTriages}
            headers={headers}
            fileName={'TriagensResponsavel'}
        >
            <></>
        </BaseConsult>
    );
};

export default ListParentTriages;