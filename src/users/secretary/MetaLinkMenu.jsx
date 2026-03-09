import React from 'react';
import { GoGraph } from 'react-icons/go';
import { TbCheckupList } from 'react-icons/tb';
import { Home, AddCircleOutline, Edit } from '@mui/icons-material';

const getData = (isState, userId) => {
    return [
        ...(isState ? [{
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
                },
                {
                    subOptions: [
                        {
                            icon: <AddCircleOutline sx={{ fontSize: 27 }}/>,
                            label: 'Cadastrar Secretaria',
                            route: '/secretaria/novo-cadastro'
                        }
                    ],
                    subTitle: 'Secretarias Municipais'
                }
            ],
            title: 'Atualizar'
        }] : []),
        {
            options: [
                {
                    subOptions: [
                        {
                            icon: <Edit sx={{ fontSize: 25 }}/>,
                            label: 'Editar Meu Perfil',
                            route: `/secretaria/minha-conta/${userId}`
                        }
                    ],
                    subTitle: 'Configurações'
                },
                {
                    subOptions: [
                        {
                            icon: <AddCircleOutline sx={{ fontSize: 27 }}/>,
                            label: 'Cadastrar Instituição',
                            route: '/secretaria/instituicao/cadastro'
                        }
                    ],
                    subTitle: 'Instituições'
                },
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
                            icon: <Home sx={{ fontSize: 25 }}/>,
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