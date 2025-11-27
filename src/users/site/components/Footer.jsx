import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Divider, Grid, Link, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import MPAWhiteIcon from '../../../components/icons/MPAWhiteIcon';
import useFooterStyles from './useFooterStyles';

const links = [
    { route: '/institucional', title: 'Área Instituicional' },
    { route: '/pais', title: 'Área dos Pais' },
    { route: '/secretaria', title: 'Área da Secretaria' },
    { route: '/fono', title: 'Área do Fonoaudiólogo' }
];

const email = 'meuprimeiroalo@univali.br';
const currentYear = new Date().getFullYear();

const Footer = () => {
    const styles = useFooterStyles();
    
    return (
        <Grid container sx={styles.container} spacing={1} justifyContent={'center'}>
            {links.map((link, key) => (
                <Grid item xs={12} md={'auto'} sx={styles.toCenter} key={'footer-link-'+key}>
                    <Link href={link.route} underline="hover" target={'_blank'} color={'white'}>
                        <Typography variant="p" color='white' sx={styles.link}>{link.title}</Typography>
                    </Link>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Divider sx={styles.divider} />
            </Grid>
            <Grid item xs={12} sx={styles.toCenter}>
                <LinkRouter to={'/'}>
                    <MPAWhiteIcon size="180rem"/>
                </LinkRouter>
            </Grid>
            <Grid item xs={12} sx={{ ...styles.toCenter, display: 'block' }}>
                <Link href={'mailTo:'+email} underline="hover" target={'_blank'} color={'white'}>
                    <MailIcon sx={styles.mail}/>
                    <Typography variant="p" color='white' sx={styles.padding} >
                        {email}
                    </Typography>
                </Link>
            </Grid>
            <Grid item xs={12} sx={styles.toCenter}>
                <Typography variant="p" color='white' sx={styles.padding} >
                    {currentYear} - Univali - Equipe PPSUS
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;
