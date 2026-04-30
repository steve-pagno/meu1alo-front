import React from 'react';
import { TbCheckupList } from 'react-icons/tb';
import { Edit } from '@mui/icons-material';

const data = [
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <Edit sx={{ fontSize: 25 }}/>,
                        label: 'Editar Meu Perfil',
                        route: '/pais/minha-conta/editar'
                    }
                ],
                subTitle: 'Configurações'
            }
        ],
        title: 'Outros'
    },
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <TbCheckupList size={25}/>,
                        label: 'Resultados de triagens',
                        route: '/pais/triagens'
                    }
                ],
                title: 'triagens'
            }
        ],
        title: 'Consultar'
    }
];

export default data;