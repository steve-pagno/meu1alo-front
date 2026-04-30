import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import CNPqIcon from '../../../components/icons/CNPqIcon';
import CrefonoIcon from '../../../components/icons/CrefonoIcon';
import FapescIcon from '../../../components/icons/FapescIcon';
import NascerIcon from '../../../components/icons/NascerIcon';
import SecretaryIcon from '../../../components/icons/SecretaryIcon';
import UnieduIcon from '../../../components/icons/UgIcon';
import UnivaliIcon from '../../../components/icons/UnivaliIcon';
import usePartnersStyles from './usePartnersStyles';
import UgIcon from '../../../components/icons/UgIcon';

const Partners = () => {
    const styles = usePartnersStyles();
    const partners = [
        {
            element: <UnivaliIcon size={'90px'}/>,
            url: 'https://univali.br'
        },
        {
            element: <FapescIcon size={'175px'}/>,
            url: 'https://fapesc.sc.gov.br/programa-nascer/'
        },
        {
            element: <CNPqIcon size={'130px'}/>,
            url: 'https://cnpq.br'
        },
        {
            element: <CrefonoIcon size={'165px'}/>,
            url: 'https://crefono3.org.br/'
        },
        {
            element: <NascerIcon size={'160px'}/>,
            url: 'https://fapesc.sc.gov.br/programa-nascer/'
        },
        {
            element: <UgIcon size={'85px'}/>,
            url: 'https://universidadegratuita.sc.gov.br/'
        },
        {
            element: <SecretaryIcon size={'180px'}/>,
            url: 'https://saude.sc.gov.br/'
        }
    ];

    return (
        <Box sx={styles.box}>
            <Typography variant="h4" color={'primary'} sx={styles.margin}>
                Parceiros
            </Typography>
            <Grid container spacing={5} justifyContent={'center'} alignItems={'center'}>
                {partners.map((partner, key) => (
                    <Grid item key={'partners-' + key}>
                        <Link href={partner.url} underline="hover" target={'_blank'} color={'white'}>
                            {partner.element}
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Partners;
