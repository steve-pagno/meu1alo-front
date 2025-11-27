import React from 'react';
import { Box, Typography } from '@mui/material';
import useTextParagraphStyles from './useTextParagraphStyles';

const TextParagraph = ({ children, title }) => {
    const styles = useTextParagraphStyles();

    return (
        <Box sx={styles.textBox}>
            <Typography variant="h4" color={'primary'} sx={styles.title}>
                {title}
            </Typography>
            <Typography variant="p">
                {children}
            </Typography>
        </Box>
    );
};

export default TextParagraph;
