import React from 'react';
import { AiOutlineTool } from 'react-icons/ai';
import { BsFileEarmarkText } from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';
import { TbCheckupList, TbPresentation } from 'react-icons/tb';
import { Home, AccountCircle } from '@mui/icons-material'; // Adicionado AccountCircle

const data = [
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <TbCheckupList size={27}/>,
                        label: 'Triagem',
                        route: '/fono/triagem/cadastro'
                    }
                ],
                subTitle: 'Resultados',
            },
            {
                subOptions: [
                    {
                        icon: <BsFileEarmarkText size={25}/>,
                        label: 'Orientação',
                        route: '/fono/orientacao/cadastro'
                    },
                    {
                        icon: <AiOutlineTool size={27}/>,
                        label: 'Equipamento',
                        route: '/fono/equipamento/cadastro'
                    },
                ],
                subTitle: 'Parâmetros',
            }
        ],
        title: 'Cadastrar'
    },
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <TbCheckupList size={27}/>,
                        label: 'Triagens',
                        route: '/fono/triagem'
                    },
                ],
                subTitle: 'Resultados',
            },
            {
                subOptions: [
                    {
                        icon: <TbPresentation size={25}/>,
                        label: 'Indicadores',
                        route: '/fono/indicador'
                    },
                    {
                        icon: <BsFileEarmarkText size={25}/>,
                        label: 'Orientações',
                        route: '/fono/orientacao'
                    },
                    {
                        icon: <BsFileEarmarkText size={25}/>,
                        label: 'Condutas',
                        route: '/fono/conduta'
                    },
                    {
                        icon: <AiOutlineTool size={27}/>,
                        label: 'Equipamentos',
                        route: '/fono/equipamento'
                    },
                ],
                subTitle: 'Parâmetros',
            }
        ],
        title: 'Consultar'
    },
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <GoGraph size={25}/>,
                        label: 'Gráficos',
                        route: '/fono/painel'
                    }
                ],
                subTitle: 'Painel'
            },
            {
                subOptions: [
                    {
                        icon: <Home size={25}/>,
                        label: 'Início Fonoaudiólogo',
                        route: '/fono'
                    },
                    // {
                    //     icon: <AccountCircle size={25}/>,
                    //     label: 'Meu Perfil',
                    //     route: '/fono/perfil'
                    // },
                ],
                subTitle: 'Página inicial'
            }
        ],
        title: 'Outros'
    }
];

export default data;