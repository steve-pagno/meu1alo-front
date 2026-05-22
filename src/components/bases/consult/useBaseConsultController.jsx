import React, { useEffect, useState } from 'react';
import { FileHelper } from '../../../helpers/FileHelper';

const useBaseConsultController = (serviceFunction, headers, title, fileName) => {
    const [rows, setRows] = useState([]);

    const onSubmit = React.useCallback((data) => {
        serviceFunction(data).then((response) => {
            console.log('Resposta da consulta:', response);

            if (response.isSuccess) {
                console.log('Body da consulta:', response.body);
                setRows(response.body || []);
            }
        });
    }, [serviceFunction]);

    useEffect(() => {
        onSubmit({});
    }, [onSubmit]);

    const onClickExportExcelButton = React.useCallback(() =>{
        FileHelper(headers).convertJsonToCsv(rows, 'Relatorio ' + fileName);
    }, [fileName, headers, rows]);

    const onReloadRow = React.useCallback((newValues) => {
        const index = rows.findIndex((row) => row.id === newValues.id);
        rows.splice(index, 1, newValues);
        setRows([...rows]);
    }, [rows]);

    return { onClickExportExcelButton, onReloadRow, onSubmit, rows, setRows };
};

export default useBaseConsultController;