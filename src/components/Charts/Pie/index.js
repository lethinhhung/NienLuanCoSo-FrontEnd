import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function CustomPie({ data, option }) {
    return <Pie data={data} options={option}></Pie>;
}

export default CustomPie;
