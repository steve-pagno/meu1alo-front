import { FormatterHelper } from './FormatterHelper';

export const FileHelper = (headers=[]) => {
    const convertJsonToCsv = (rows, fileName) => {
        const csv = getHeaderWithSeparator();

        rows.forEach(row => {
            csv.push(getRowWithSeparator(row));
        });

        downloadExcel(csv.join('\n'), fileName);
    };

    const convertJsonToCsvGraphic = (rows, fileName) => {
        const csv = getHeaderWithSeparatorGraphic();

        csv.push(rows.map(row => row).join(';'));

        downloadExcel(csv.join('\n'), fileName);
    };

    const getHeaderWithSeparator = () => {
        return [headers.map(header => getHeaderColumn(header)).join(';')];
    };

    const getHeaderWithSeparatorGraphic = () => {
        return [headers.map(header => getHeaderColumnGraphic(header)).join(';')];
    };

    const getRowWithSeparator = (row) => {
        return headers.map(header => getColumn(row, header)).join(';');
    };

    const getHeaderColumn = (header) => {
        return `"${header.title}"`;
    };

    const getHeaderColumnGraphic = (header) => {
        return `"${header}"`;
    };

    const getColumn = (row, header) => {
        return `"${FormatterHelper().formatValue(header.formatter, row[header.name])}"`;
    };

    const baseDownload = (data, fileName) => {
        const hiddenElement = document.createElement('a');
        hiddenElement.href = data;
        hiddenElement.target = '_blank';
        hiddenElement.download = fileName;
        hiddenElement.click();
    };

    const downloadExcel = (csv, fileName) => {
        baseDownload('data:text/csv;charset=UTF-8,%EF%BB%BF' + encodeURI(csv), fileName + '.csv');
    };

    const downloadPDF = (pdf, fileName) => {
        baseDownload(window.URL.createObjectURL(pdf), fileName + '.pdf');
    };

    return { convertJsonToCsv, convertJsonToCsvGraphic, downloadExcel, downloadPDF };
};
