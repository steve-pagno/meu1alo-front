import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { FileHelper } from '../../helpers/FileHelper';
import { getGraphicColors } from '../../Theme';

Chart.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

export function GraphicBar({ isVertical, labels, onClickElement, quantities, title }) {
    const options = {
        indexAxis: isVertical ? 'y' : 'x',
        maintainAspectRatio: false,
        onClick: (_event, element) => {
            if (element && element.length > 0) {
                onClickElement(element[0].index);
            }
        },
        plugins: {
            legend: {
                display: false
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
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#4a5568',
                    font: {
                        family: 'Outfit, Inter, sans-serif',
                        size: 11,
                        weight: '600'
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.04)',
                    drawBorder: false
                },
                ticks: {
                    color: '#4a5568',
                    font: {
                        family: 'Outfit, Inter, sans-serif',
                        size: 11,
                        weight: '600'
                    }
                }
            }
        }
    };

    const data = {
        datasets: [
            {
                backgroundColor: getGraphicColors(0.85),
                borderColor: 'transparent',
                borderWidth: 0,
                data: quantities,
                hoverBackgroundColor: getGraphicColors(1),
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.5,
                maxBarThickness: 32,
            },
        ],
        labels: labels.map(value => {
            if (value.length > 22) {
                return value.substr(0, 22) + '...';
            }
            return value;
        }),
    };
    const onClickExportExcelButton = React.useCallback(() => {
        FileHelper(labels).convertJsonToCsvGraphic(data.datasets[0].data, 'Relatorio ' + options.plugins.title.text);
    }, [labels, data]);

    return (
        <div style={{ height: '360px', position: 'relative', width: '100%' }}>
            <Bar type={'bar'} data={data} options={options}/>
        </div>
    );
}
