import React from 'react';
import { IconButton, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../dialogs/DeleteDialog';
import DownloadDialog from '../../dialogs/DownloadDialog';
import useGenericTableStyles from './useGenericTableStyles';

const ActionsButtons = ({ actions, onReload, row }) => {
    const styles = useGenericTableStyles();
    const navigate = useNavigate();

    return (
        <TableCell sx={styles.tableCell} >

            {(!actions.permissionField || row[actions.permissionField] !== null) &&

                <React.Fragment>
                    {
                        actions.view && 
                        <IconButton color={'primary'} onClick={() => navigate(`${actions.view.route}/${row.id}`)}>
                            <VisibilityIcon/>
                        </IconButton>
                    }

                    {
                        actions.edit && (!actions.edit.genericField || row[actions.edit.genericField] === null) &&
                        <IconButton color={'secondary'} onClick={() => navigate(`${actions.edit.route}/${row.id}`)}>
                            <EditIcon/>
                        </IconButton>
                    }

                    {actions.delete && row[actions.delete.genericField] === null &&
                        <DeleteDialog actions={actions.delete} row={row} onReload={onReload}/>
                    }

                    {actions.pdf &&
                        <DownloadDialog actions={actions.pdf} row={row} title={'Escolha o relatório para baixar'}/>
                    }

                </React.Fragment>

            }
        </TableCell>
    );
};
export default ActionsButtons;
