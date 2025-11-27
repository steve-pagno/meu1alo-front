import React from 'react';
import { ArcElement, Chart, Legend, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getGraphicColors } from '../../Theme';

Chart.register(ArcElement, Tooltip, Legend, Title);

export function GraphicDoughnut({ labels, onClickElement, quantities, title }) {
    const options = {
        onClick: (_event, element) => {
            onClickElement(element[0].index);
        },
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                font: {
                    size: 14
                },
                text: title
            },
        }
    };

    const data = {
        datasets: [
            {
                backgroundColor: getGraphicColors(0.5),
                borderColor: getGraphicColors(1),
                borderWidth: 1,
                data: quantities,
                hoverOffset: 4,
            },
        ],
        labels: labels,
    };

    return (
        <Doughnut type={'doughnut'} data={data} options={options}/>
    );
}
