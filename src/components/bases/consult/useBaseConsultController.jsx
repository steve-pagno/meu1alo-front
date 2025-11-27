import React, { useState } from 'react';
import { FileHelper } from '../../../helpers/FileHelper';

const useBaseConsultController = (serviceFunction, headers, title, fileName) => {
    const [rows, setRows] = useState([]);

    const onSubmit = (data) => {
        serviceFunction(data).then((response) => {
            if(response.isSuccess){
                setRows(response.body);
            }
        });
    };

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
