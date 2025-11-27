import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import TopicListIcon from '../../components/lists/TopicListIcon';
import TopBar from '../../components/TopBar';
import Footer from './components/Footer';
import Partners from './components/Partners';
import TextParagraph from './components/TextParagraph';
import VideoAndText from './components/VideoAndText';
import VideoParagraph from './components/VideoParagraph';

const Site = () => {
    const navigate = useNavigate();

    return (
        <TopBar
            baseRoute={'/'}
            rightElement={
                <Button color="secondary"
                    type="submit"
                    variant="contained"
                    onClick={() => navigate('/pais')}
                >
                    área dos pais
                </Button>
            }
        >
            <TextParagraph title={'Bem-Vindo ao Meu Primeiro Alô!'}>
                Uma plataforma de rastreamento do teste da orelhinha sob LEI Nº 18.267, de 9 de dezembro de 2021.
                Dispõe sobre a notificação compulsória do teste de triagem neonatal, para todas as crianças no Estado de Santa Catarina.
                A plataforma foi então desenvolvida a partir do programa de pesquisa para o SUS (PPSUS edital FAPESC 16/2020).
                O desenvolvimento foi realizado por acadêmicos e docentes dos cursos de ciência da computação, fonoaudiologia
                e mestrado profissional em Gestão de Políticas Públicas da UNIVALI, em parceria com a Secretaria de Estado da Saúde
                de Santa Catarina e apoio do Conselho Regional de Fonoaudiologia 3ª Região.
            </TextParagraph>
            <VideoParagraph title={'Bem-vindo'} url={'https://www.youtube.com/embed/I7CnUPAMajs'} />

            <TextParagraph title={'O que é?'}>
                <div style={{ textAlign: 'left' }}>
                    <Typography variant={'h6'} color={'secondary'}>
                        Objetivos
                    </Typography>
                    <Typography variant={'body1'}>
                        Nosso objetivo é implementar um sistema de <Typography variant={'subtitle1'} component={'b'} color={'secondary'}>rastreamento </Typography>
                        para bebês que tenham passado pelo <Typography variant={'subtitle1'} component={'b'} color={'secondary'}>teste da orelhinha</Typography>,
                        com o propósito de <Typography variant={'subtitle1'} component={'b'} color={'secondary'}>identificar</Typography> qualquer resultado
                        que indique uma possível <Typography variant={'subtitle1'} component={'b'} color={'secondary'}>deficiência auditiva</Typography>.
                        Essa iniciativa visa informatizar o processo e estabelecer um acompanhamento dedicado para bebês que apresentem
                        suspeita de deficiência auditiva, assegurando uma intervenção precoce e eficaz, quando necessário.
                    </Typography>
                    <br/>
                    <Typography variant={'h6'} color={'secondary'}>
                        Para quem é?
                    </Typography>
                    <TopicListIcon icon={<FavoriteTwoToneIcon color='secondary'/>} topics={[
                        'Todos os fonoaudiólogos poderão acessar e incluir informações do teste da orelhinha.',
                        'A maternidade registrará os dados do recém-nascido.',
                        'O Estado de Santa Catarina terá o registro dos bebês.',
                        'Os pais acessarão  informações, resultados e encaminhamentos.',
                    ]}
                    />
                    <br/>
                    <Typography variant={'h6'} color={'secondary'}>
                        Como participar
                    </Typography>
                    <Typography variant={'body1'}>
                        Para acessar a plataforma, faça o seu cadastro e da instituição onde realiza o teste da orelhinha.
                    </Typography>
                    <br/>
                    <Typography variant={'h6'} color={'secondary'}>
                        O que esperamos?
                    </Typography>
                    <TopicListIcon icon={<FavoriteTwoToneIcon color='secondary'/>} topics={[
                        'Que seja uma ferramenta ágil e segura.',
                        'Que tenha informações atualizadas dos encaminhamentos.',
                        'Que gere relatórios de gestão dos dados.',
                    ]}
                    />
                </div>
            </TextParagraph>

            <VideoAndText title={'Dicas para os pais'} videoUrl={'https://www.youtube.com/embed/TF0xR6EiHEg'}>
                <Typography variant={'subtitle1'} component={'b'} color={'primary'}>Olá, </Typography> mamães e papais
                <TopicListIcon icon={<FavoriteTwoToneIcon color='primary'/>} topics={[
                    'Antes de seu bebê sair da maternidade ele deverá realizar o teste da orelhinha.',
                    'Para realizar este exame o fonoaudiólogo irá colocar uma borrachinha (oliva) ligada a um aparelho na orelha do seu bebê.',
                    'O teste da orelhinha é realizado de forma rápida e indolor.',
                    'Com o teste é possível identificar como está a audição de seu filho.',
                    'Caso não seja obtido o resultado esperado, o fonoaudiólogo irá solicitar o reteste, dentro do primeiro mês de vida do recém-nascido.',
                    'O reteste é de extrema importância para sabermos como está a audição do seu bebê.',
                ]}
                />
            </VideoAndText>
            <Partners />
            <Footer/>
        </TopBar>
    );
};

export default Site;
