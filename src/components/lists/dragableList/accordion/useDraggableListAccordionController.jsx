import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const useDraggableListAccordionController = (onEditValue, onDeleteValue, valueIndex, value) => {
    const { handleSubmit, register } = useForm({ defaultValues: { name: value.name } });

    const [openPopup, setOpenPopup] = useState(false);

    const [openAccordion, setOpenAccordion] = useState(true);

    const onChangeAccordion = () => {
        setOpenAccordion(!openAccordion);
    };

    const onOpenClose = () => {
        setOpenPopup(!openPopup);
    };

    const onSaveEdit = (values) => {
        onEditValue(valueIndex, values);
        onOpenClose();
    };

    const onClickDelete = (event) => {
        event.preventDefault();

        onDeleteValue(valueIndex);
    };

    return {
        hasButtons: Boolean(value && value.id) > 0,
        hasDelete: Boolean(onDeleteValue),
        hasEdit: Boolean(onEditValue),
        howManyItems: value.values.length,
        name: value.name,
        onChangeAccordion,
        onClickDelete,
        onClickEdit: onOpenClose,
        onClosePopup: onOpenClose,
        onSaveEdit: handleSubmit(onSaveEdit),
        openAccordion,
        openPopup,
        register
    };
};

export default useDraggableListAccordionController;
