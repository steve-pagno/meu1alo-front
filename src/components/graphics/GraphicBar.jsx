import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { FileHelper } from '../../helpers/FileHelper';
import { getGraphicColors } from '../../Theme';

Chart.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

export function GraphicBar({ isVertical, labels, onClickElement, quantities, title }) {
    const options = {
        indexAxis: isVertical? 'y' : 'x',
        onClick: (_event, element) => {
            onClickElement(element[0].index);
        },
        plugins: {
            legend: {
                display: false,
                // position: 'false'
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
                barPercentage: 0.75,
                borderColor: getGraphicColors(1),
                borderWidth: 1,
                data: quantities,
                hoverOffset: 4,
                // label: [labels]
            },
        ],
        labels: labels.map(value =>{
            if(value.length > 22){
                return value.substr(0, 22) + '...';
            }
            return value;
        }),
    };
    const onClickExportExcelButton = React.useCallback(() =>{
        FileHelper(labels).convertJsonToCsvGraphic(data.datasets[0].data, 'Relatorio ' + options.plugins.title.text);
    }, [labels, data]);

    return (
        <div style={{ alignItems: 'center', display: 'flex', height: '300px', justifyContent: 'center' }}>
            <Bar type={'bar'} data={data} options={options}/>
            {/*<Button sx={{ marginRight: 1 }}*/}
            {/*    startIcon={<BsDownload/>}*/}
            {/*    color="secondary"*/}
            {/*    onClick={onClickExportExcelButton}*/}
            {/*    variant="contained"*/}
            {/*    // disabled={rows.length === 0}*/}
            {/*/>*/}
        </div>

    );
}
