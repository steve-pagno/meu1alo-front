import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material';

const HtmlHead = ({ subTitle, userType }) => {
    const theme = useTheme();

    const titleFull = React.useMemo(() => {
        let titleFull = '';
        if(subTitle) {
            titleFull += subTitle + ' - ';
        }
        if(userType){
            titleFull += userType + ' - ';
        }
        return titleFull + import.meta.env.REACT_APP_PROJECT_NAME;
    }, [subTitle, userType]);

    return (
        <Helmet>
            <title>{titleFull}</title>
            <meta name="theme-color" content={theme.palette.primary.main}/>
            <meta name="description" content={'Web site '+import.meta.env.REACT_APP_PROJECT_NAME}/>
            <link rel="canonical" href={import.meta.env.REACT_APP_HOST_NAME} />
        </Helmet>
    );
};

export default HtmlHead;
