import React from 'react';
import { GoGraph } from 'react-icons/go';
import { TbCheckupList } from 'react-icons/tb';
import { Home, Edit } from '@mui/icons-material';

const data = [
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <TbCheckupList size={27}/>,
                        label: 'Serviço de referencia',
                        route: '/institucional/servico-referencia/cadastro'
                    }
                ],
                subTitle: '',
            },
        ],
        title: 'Cadastrar'
    },
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <Edit sx={{ fontSize: 25 }}/>,
                        label: 'Editar Meu Perfil',
                        route: '/institucional/minha-conta/editar'
                    }
                ],
                subTitle: 'Configurações'
            },
            {
                subOptions: [
                    {
                        icon: <GoGraph size={25}/>,
                        label: 'Gráficos',
                        route: '/institucional/painel'
                    }
                ],
                subTitle: 'Painel'
            },
            {
                subOptions: [
                    {
                        icon: <Home size={25}/>,
                        label: 'Início',
                        route: '/institucional'
                    },
                ],
                subTitle: 'Página inicial'
            }
        ],
        title: 'Outros'
    }
];
export default data;
