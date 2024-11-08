import { Card, Flex, Select } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import styles from './GradeRange.module.scss';
import { useEffect, useState } from 'react';
import { getAllTermGradesApi, getAllTestsInfoApi, getUserStatisticsApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';
import CustomPie from '~/components/Charts/Pie';

function GradeRange() {
    const cx = classNames.bind(styles);

    const [testsGrade, setTestsGrade] = useState([]);
    const [gradeRange, setGradeRange] = useState([]);
    const [data, setdata] = useState({
        labels: ['0 to 2', '2 to 4', '4 to 6', '6 to 8', '8 to 10'],
        datasets: [
            {
                label: 'Your grade range',
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    });
    const [options, setOptions] = useState({});

    const fetchInfo = async () => {
        const testsGradeData = await getAllTestsInfoApi();

        setTestsGrade(testsGradeData);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e = 0;
        for (const test of testsGrade) {
            if (test.score >= 0 && test.score <= 2) {
                a++;
            }
            if (test.score > 2 && test.score <= 4) {
                b++;
            }
            if (test.score > 4 && test.score <= 6) {
                c++;
            }
            if (test.score > 6 && test.score <= 8) {
                d++;
            }
            if (test.score > 8 && test.score <= 10) {
                e++;
            }
        }
        setdata({
            labels: ['0 to 2', '2 to 4', '4 to 6', '6 to 8', '8 to 10'],
            datasets: [
                {
                    label: 'Total',
                    data: [a, b, c, d, e],
                    backgroundColor: ['#f5222d', '#fa8c16', '#fadb14', '#1677ff', '#52c41a'],
                    hoverOffset: 4,
                },
            ],
        });
        const options = {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.raw} test(s)`;
                        },
                    },
                },
            },
        };

        setOptions(options);
    }, [testsGrade]);

    return (
        <Card hoverable className={cx('large-card')} title="Grade range percentage" bordered={false} style={{}}>
            <Flex justify="center" style={{ padding: '10px', height: '300px' }}>
                <CustomPie data={data} options={options} />
            </Flex>
        </Card>
    );
}

export default GradeRange;
