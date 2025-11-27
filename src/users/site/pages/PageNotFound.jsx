import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import TextParagraph from '../components/TextParagraph';
import usePageNotFoundStyles from './usePageNotFoundStyles';

const PageNotFound = ({ baseRoute }) => {
    const location = useLocation();
    const styles = usePageNotFoundStyles();

    const from = location.state?.from?.pathname || baseRoute || '/';

    return (
        <div style={styles.div}>
            <TextParagraph title={'Página não encontrada'}>
                Seja muito bem-vindo à plataforma Meu primeiro alô, infelizmente não encontramos a página solicitada,
                por favor verifique se o link que você está acessando está correto,
                caso tenha chegado aqui pela propria plataforma por favor informar ao suporte.
            </TextParagraph>
            <Box sx={styles.linksContainer}>
                <Link href={from} underline="hover" color={'white'} sx={{ ...styles.toCenter, ...styles.firstLinkBox }}>
                    <Typography variant="p" color='secondary' sx={styles.link}>
                        Clique aqui para voltar a página anterior
                    </Typography>
                </Link>
                <Link href={'/'} underline="hover" color={'white'} sx={styles.toCenter}>
                    <Typography variant="p" color='secondary' sx={styles.link}>
                        Clique aqui para visitar nosso site
                    </Typography>
                </Link>
            </Box>
            <Partners/>
            <Footer/>
        </div>
    );
};

export default PageNotFound;
