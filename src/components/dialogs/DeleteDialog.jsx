import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteDialog = ({ actions, onReload, row }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChooseDelete = () => {
        actions.method(row.id).then(r => r.body).then(onReload);
        handleClose();
    };

    return (

        <React.Fragment>
            <IconButton color={'secondary'} onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Deseja realmente deletar este registro?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button  color="primary" onClick={handleChooseDelete}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
export default DeleteDialog;
