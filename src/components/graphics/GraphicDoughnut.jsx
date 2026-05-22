import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Title, Tooltip } from 'chart.js';
import { getGraphicColors } from '../../Theme';

Chart.register(ArcElement, Tooltip, Legend, Title);

export function GraphicDoughnut({ labels, onClickElement, quantities, title }) {
    const options = {
        maintainAspectRatio: false,
        onClick: (_event, element) => {
            if (element && element.length > 0) {
                onClickElement(element[0].index);
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#4a5568',
                    font: {
                        family: 'Outfit, Inter, sans-serif',
                        size: 12,
                        weight: '600'
                    },
                    padding: 20,
                    usePointStyle: true
                },
                position: 'bottom'
            },
            title: {
                color: '#1a202c',
                display: true,
                font: {
                    family: 'Outfit, Inter, sans-serif',
                    size: 16,
                    weight: '800'
                },
                padding: {
                    bottom: 25
                },
                text: title
            },
        },
        responsive: true
    };

    const data = {
        datasets: [
            {
                backgroundColor: getGraphicColors(0.85),
                borderColor: '#ffffff',
                borderWidth: 2.5,
                data: quantities,
                hoverOffset: 10,
                borderRadius: 8,
                spacing: 5,
                cutout: '72%'
            },
        ],
        labels: labels,
    };

    return (
        <div style={{ height: '360px', position: 'relative', width: '100%' }}>
            <Doughnut type={'doughnut'} data={data} options={options}/>
        </div>
    );
}
