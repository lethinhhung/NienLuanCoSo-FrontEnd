import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { useWindowDimensions, useReRender } from '~/hooks';
import { useEffect, useState } from 'react';

function CustomLine() {
    const renderKey = useReRender();

    const data = {
        labels: [
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
            'Term 1',
        ],
        datasets: [
            {
                label: 'Completed',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
            {
                label: 'Failed',
                data: [60, 70, 50, 80, 80, 50, 50, 40],
                fill: false,
                borderColor: 'red',
                tension: 0.1,
            },
        ],
    };

    return <Line key={renderKey} data={data}></Line>;
}

export default CustomLine;
