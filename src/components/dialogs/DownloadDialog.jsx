import React from 'react';
import { BsDownload } from 'react-icons/all';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Typography } from '@mui/material';
import { FileHelper } from '../../helpers/FileHelper';

const styles = {
    actionLink: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px 0',
        width: '100%',
    },
    actionText: {
        marginRight: '10px',
    },
};

const DownloadDialog = ({ actions, row, title }) => {
    const [open, setOpen] = React.useState(false);
    const [actionsOnLoad, setActionsOnLoad] = React.useState([]);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleAction = React.useCallback((key) => {
        if(actionsOnLoad.includes(key)) { return; }

        setActionsOnLoad([...actionsOnLoad, key]);

        actions.options[key].requestFunction(row.id).then((response) => {
            setActionsOnLoad(actionsOnLoad.filter(v => v !== key));
            if(response.isSuccess) {
                FileHelper().downloadPDF(response.body, actions.options[key].title);
            } else {
                handleClose();
            }
        });
    }, [actions, actionsOnLoad, handleClose, row]);

    return (
        <React.Fragment>
            <IconButton color={'secondary'} onClick={handleOpen}>
                <BsDownload />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    {actions.options && actions.options.map((option, key) => (
                        <Link
                            underline="hover"
                            component="button"
                            sx={styles.actionLink}
                            onClick={() => handleAction(key)}
                            color={'secondary'}
                            key={key}
                            download
                        >
                            <Typography gutterBottom sx={styles.actionText} color={'secondary'}>
                                {option.title}
                            </Typography>
                            {actionsOnLoad.includes(key)? (<CircularProgress size={20} color={'secondary'}/>) : (<BsDownload size={20} color={'secondary'}/>)}
                        </Link>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
export default DownloadDialog;
