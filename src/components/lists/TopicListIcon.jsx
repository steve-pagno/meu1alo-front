import React from 'react';
import { Box } from '@mui/material';

const createStyle = (theme) => {
    return {
        container: {
            margin: '15px 0 0 20px',
        },
        icon: {
            '& svg':{
                fontSize: '1rem',
            },
            margin: '2px 10px 0 0',
        },
        itemContainer: {
            display: 'flex',
            margin: '5px 0 5px 0',
        }
    };
};

const TopicListIcon = ({ icon, topics, topicsAndIcons }) => {
    const style = createStyle();

    if(topics && icon) {
        return (
            <Box sx={style.container}>
                {topics.map((topic, index) => (
                    <Box sx={style.itemContainer} key={`topic-${index}`}>
                        <Box sx={style.icon}>{icon}</Box>
                        {topic}
                    </Box>
                ))}
            </Box>
        );
    }

    if(topicsAndIcons) {
        return (
            <Box sx={style.container}>
                {topicsAndIcons.map((topicAndIcon, index) => (
                    <Box sx={style.itemContainer} key={`topic-${index}`}>
                        <Box sx={style.icon}>{topicAndIcon.icon}</Box>
                        {topicAndIcon.topic}
                    </Box>
                ))}
            </Box>
        );
    }

    return (<></>);
};

export default TopicListIcon;
