import { Card } from 'antd';
import { useEffect, useState } from 'react';

import { getAllTestsInfoApi } from '~/utils/api';
import CustomLine from '~/components/Charts/Line';
import truncateText from '~/utils/truncateText';

function TestsGrade() {
    const [loading, setLoading] = useState(true);
    const [testsInfo, setTestsInfo] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Empty',
                data: [],
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    });

    const [options, setOptions] = useState({});

    const fetchInfo = async () => {
        const testsInfoData = await getAllTestsInfoApi();
        setTestsInfo(testsInfoData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        setData({
            labels: testsInfo.filter((test) => test.score !== -1).map((test) => truncateText(test.name, 10)),
            datasets: [
                {
                    label: 'Score',
                    data: testsInfo.filter((test) => test.score !== -1).map((test) => test.score),
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.1,
                },
            ],
        });

        const options = {
            plugins: {
                legend: {
                    display: false, // Disable the legend
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const test = testsInfo[tooltipItem.dataIndex]; // Update to `dataIndex`
                            return `${test.name} - ${test.courseName}: ${tooltipItem.raw} `;
                        },
                    },
                },
            },
        };

        setOptions(options);
    }, [testsInfo]);

    return (
        <Card style={{ cursor: 'default' }} hoverable title="Tests score" bordered={false} loading={loading}>
            <CustomLine data={data} options={options} />
        </Card>
    );
}

export default TestsGrade;
