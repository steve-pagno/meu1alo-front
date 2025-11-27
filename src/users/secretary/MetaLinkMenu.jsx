import React from 'react';
import { GoGraph } from 'react-icons/go';
import { TbCheckupList } from 'react-icons/tb';
import { Home } from '@mui/icons-material';

const getData = (isState) => {
    return [
        ...(isState? [{
            options: [
                {
                    subOptions: [
                        {
                            icon: <TbCheckupList size={27}/>,
                            label: 'Gerenciar Regiões',
                            route: '/secretaria/gerenciar-regioes'
                        }
                    ],
                    subTitle: 'Cidades e Regiões'
                }
            ],
            title: 'Atualizar'
        }] : []),
        {
            options: [
                {
                    subOptions: [
                        {
                            icon: <GoGraph size={25}/>,
                            label: 'Gráficos',
                            route: '/secretaria/painel'
                        }
                    ],
                    subTitle: 'Painel'
                },
                {
                    subOptions: [
                        {
                            icon: <Home size={25}/>,
                            label: 'Início',
                            route: '/secretaria'
                        },
                    ],
                    subTitle: 'Página inicial'
                }
            ],
            title: 'Outros'
        }
    ];
};

export default getData;
