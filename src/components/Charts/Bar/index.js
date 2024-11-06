import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useReRender } from '~/hooks';

function CustomBar({ data, options, style }) {
    const renderKey = useReRender();
    return <Bar key={renderKey} style={style} data={data} options={options}></Bar>;
}

export default CustomBar;
