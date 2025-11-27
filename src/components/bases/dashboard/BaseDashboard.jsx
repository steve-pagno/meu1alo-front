import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import AsyncRequest from '../../api/AsyncRequest';
import { GraphicBar } from '../../graphics/GraphicBar';
import { GraphicDoughnut } from '../../graphics/GraphicDoughnut';
import HtmlHead from '../../HtmlHead';
import useBaseDashboardController from './useBaseDashboardController';
import useBaseDashboardStyles from './useBaseDashboardStyles';

const RecommendedGraphic = ({ isSmall, labels, onClickElement, quantities, title }) => {
    if(isSmall) {
        return (
            <GraphicDoughnut
                title={title}
                labels={labels}
                quantities={quantities}
                onClickElement={onClickElement}
            />
        );
    }

    return (
        <GraphicBar
            title={title}
            labels={labels}
            quantities={quantities}
            onClickElement={onClickElement}
        />
    );
};

const BaseDashboard = ({ getDashboard, getReport, title, userTypeTitle }) => {
    const { getSizes, isTypeSmall, onClickElement } = useBaseDashboardController();
    const styles = useBaseDashboardStyles();

    return (
        <>
            <HtmlHead userType={userTypeTitle} subTitle={'Painel'}/>
            <Grid container sx={styles.container} >
                <Grid item xs={12}>
                    <Typography component='h3' variant='h3' sx={styles.title}>
                        {title}
                    </Typography>
                </Grid>
                <AsyncRequest requestFunction={getDashboard} loaderChildren={<CircularProgress />}>
                    {(dashboard) => (
                        dashboard.map((value, index) => (
                            <AsyncRequest
                                key={'graphic-'+index}
                                requestFunction={() => getReport(value.type)}
                                defaultValue={null}
                                loaderChildren={
                                    <Grid item {...getSizes(0, true)} sx={styles.grid}>
                                        <CircularProgress />
                                    </Grid>
                                }
                            >
                                {(data) => {
                                    if(!data || !data.labels) {
                                        return (<></>);
                                    }
                                    const isSmall = isTypeSmall(data.labels.length);
                                    return (
                                        <Grid item {...getSizes(data.title.length, isSmall)} sx={styles.grid}>
                                            <RecommendedGraphic
                                                isSmall={isSmall}
                                                title={data.title}
                                                labels={data.labels}
                                                quantities={data.quantities}
                                                onClickElement={(e) => onClickElement(e, value.type)}
                                            />
                                            <Typography sx={{ marginTop: '10px', textAlign: 'center' }}>{data.description || ''}</Typography>
                                        </Grid>
                                    );
                                }}
                            </AsyncRequest>
                        ))
                    )}
                </AsyncRequest>
            </Grid>
        </>
    );
};

export default BaseDashboard;
