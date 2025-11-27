import React from 'react';
import { Box } from '@mui/material';
import useVideoParagraphStyles from './useVideoParagraphStyles';

const VideoParagraph = ({ title, url }) => {
    const styles = useVideoParagraphStyles();

    return (
        <Box sx={styles.textBox}>
            <iframe title={title}
                width={'100%'}
                height={'360px'}
                src={url}
                frameBorder="0"
                allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Box>
    );
};

export default VideoParagraph;
