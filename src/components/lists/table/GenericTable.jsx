import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ActionsButtons from './ActionsButtons';
import useGenericTableController from './useGenericTableController';
import useGenericTableStyles from './useGenericTableStyles';

const GenericTable = ({ headers, onReloadRow, properties, rows }) => {
    const styles = useGenericTableStyles();
    const { formatValue } = useGenericTableController();

    return (
        <Paper style={{ padding: '10px' }}>
            <TableContainer>
                <Table sx={styles.tableContainer} size="small">
                    <TableHead sx={styles.tableHead}>
                        <TableRow>
                            {headers.map((header, key) => (
                                <TableCell key={key} sx={styles.tableCellHead}>
                                    {header.title}
                                </TableCell>
                            ))}

                            { properties && properties.actions &&
                                <TableCell sx={styles.tableCellHead}>
                                    Ações
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row, key) => (
                            <TableRow key={key} sx={styles.tableRow(key)}>
                                {headers.map((header, key) => (
                                    <TableCell key={key} sx={styles.tableCell} align="left">
                                        { formatValue(header.formatter, row[header.name]) }
                                    </TableCell>
                                ))}
                                { properties && properties.actions &&
                                    <ActionsButtons actions={properties.actions} row={row} onReload={onReloadRow}/>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
export default GenericTable;
