import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

const DraggableListSubListItem = ({ hiddenOnMarked, isMarked, names, onClickMark, provided, snapshot, ...props }) => {
    const theme = useTheme();
    const styles = {
        itemPaper: {
            border: 'solid',
            borderColor: isMarked? theme.palette.primary.light : theme.palette.background.default,
            margin: '10px',
            padding: '4px 8px'
        }
    };

    const hidden = hiddenOnMarked && isMarked;

    return (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} {...props}>
            {!hidden && names.map((name) => (
                <Paper sx={styles.itemPaper} onClick={onClickMark} key={name}>
                    <Typography variant="body2">{name}</Typography>
                </Paper>
            ))}
            {provided.placeholder}
        </Box>
    );
};

export default DraggableListSubListItem;
