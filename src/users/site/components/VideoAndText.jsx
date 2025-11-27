import React from 'react';
import { Grid, Typography } from '@mui/material';
import useVideoAndTextStyles from './useVideoAndTextStyles';

const VideoAndText = ({ children, title, videoUrl }) => {
    const styles = useVideoAndTextStyles();

    return (
        <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={6} sx={styles.textBox}>
                <Typography variant="h4" color={'primary'} sx={styles.margin}>
                    {title}
                </Typography>
                <Typography variant="p">
                    {children}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={styles.videoBox}>
                <iframe title={title}
                    width={'100%'}
                    height={'360px'}
                    src={videoUrl}
                    frameBorder="0"
                    allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Grid>
        </Grid>
    );
};

export default VideoAndText;
