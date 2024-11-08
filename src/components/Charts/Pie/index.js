import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function CustomPie({ data, options }) {
    return <Pie data={data} options={options}></Pie>;
}

export default CustomPie;
