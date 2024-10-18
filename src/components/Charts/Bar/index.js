import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function CustomBar({ data, options, style }) {
    return <Bar style={style} data={data} options={options}></Bar>;
}

export default CustomBar;
