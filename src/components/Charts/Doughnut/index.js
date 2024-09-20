import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function CustomDoughnut({ data, options }) {
    return <Doughnut data={data} options={options}></Doughnut>;
}

export default CustomDoughnut;
