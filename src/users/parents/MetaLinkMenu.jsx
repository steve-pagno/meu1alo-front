import React from 'react';
import { TbCheckupList } from 'react-icons/tb';

const data = [
    {
        options: [
            {
                subOptions: [
                    {
                        icon: <TbCheckupList size={25}/>,
                        label: 'Resultados de triagens'
                    }
                ],
                title: 'triagens'
            }
        ],
        title: 'Consultar'
    }
];
export default data;
