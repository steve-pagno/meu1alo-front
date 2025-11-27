import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useDraggableListAccordionController from './useDraggableListAccordionController';
import useDraggableListAccordionStyles from './useDraggableListAccordionStyles';

const DraggableListAccordion = ({ children, onDeleteValue, onEditValue, provided, value, valueIndex }) => {
    const styles = useDraggableListAccordionStyles();
    const {
        hasButtons, hasDelete, hasEdit,
        howManyItems, name,
        onChangeAccordion, onClickDelete, onClickEdit,
        onClosePopup, onSaveEdit, openAccordion,
        openPopup, register
    } = useDraggableListAccordionController(onEditValue, onDeleteValue, valueIndex, value);

    return (
        <>
            <Accordion sx={styles.listContainer} {...provided.droppableProps} ref={provided.innerRef} expanded={openAccordion}>
                <AccordionSummary sx={styles.accordionSummary}>
                    <Box sx={styles.headerPaperContainer}>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton onClick={onChangeAccordion}>
                                <ExpandMoreIcon fontSize={'small'} sx={styles.iconColor}/>
                            </IconButton>
                            <Typography variant='subtitle1' color={'white'} sx={styles.headerPaper} onClick={onChangeAccordion}>
                                { name } ({ howManyItems })
                            </Typography>
                        </Box>
                        {hasButtons &&
                            <Box>
                                {hasEdit &&
                                    <IconButton aria-label="edit" size="large" onClick={onClickEdit}>
                                        <EditIcon fontSize={'small'} sx={styles.iconColor}/>
                                    </IconButton>
                                }
                                {hasDelete &&
                                    <IconButton aria-label="delete" size="large" onClick={onClickDelete}>
                                        <DeleteIcon fontSize={'small'} sx={styles.iconColor}/>
                                    </IconButton>
                                }
                            </Box>
                        }
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {children}
                    {provided.placeholder}
                </AccordionDetails>
            </Accordion>
            <Dialog open={openPopup} onClose={onClosePopup}>
                <form onSubmit={onSaveEdit}>
                    <DialogTitle>Editar { name }</DialogTitle>
                    <DialogContent sx={styles.popup}>
                        <DialogContentText>
                            Insira abaixo o novo nome
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            label="Nome"
                            fullWidth
                            variant="standard"
                            {...register('name')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClosePopup} variant='outlined' color='secondary'>Cancel</Button>
                        <Button type='submit' variant='contained' color='secondary'>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default DraggableListAccordion;
