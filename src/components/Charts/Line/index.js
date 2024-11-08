import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import { useWindowDimensions, useReRender } from '~/hooks';
import { useEffect, useState } from 'react';

function CustomLine({ data, options }) {
    const renderKey = useReRender();

    return <Line key={renderKey} data={data} options={options}></Line>;
}

export default CustomLine;
