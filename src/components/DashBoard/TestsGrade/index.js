import { Card, Select } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { getAllTermGradesApi, getAllTestsInfoApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';
import { ArcElement, Chart } from 'chart.js';
import CustomLine from '~/components/Charts/Line';

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
            labels: testsInfo.filter((test) => test.score !== -1).map((test) => test.name),
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
                            return `${test.courseName}: ${tooltipItem.raw} `;
                        },
                    },
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Score',
                    },
                },
            },
        };

        setOptions(options);
    }, [testsInfo]);

    return (
        <Card hoverable title="Tests grade" bordered={false} loading={loading}>
            <CustomLine data={data} options={options} />
        </Card>
    );
}

export default TestsGrade;
