import { Card, Select } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import styles from './TermGrades.module.scss';
import { useEffect, useState } from 'react';
import { getAllTermGradesApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';

function TermGrades() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);
    const [termOptions, setTermOptions] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('-1');
    const [termGrades, setTermGrades] = useState([]);
    const [data, setData] = useState({
        labels: [''],
        datasets: [
            {
                label: 'Empty',
                data: [],
                backgroundColor: [],
                hoverOffset: 4,
            },
        ],
    });
    const [options, setOptions] = useState({
        plugins: {
            legend: {
                display: false, // Disable the legend
            },
        },
    });

    const fetchInfo = async () => {
        const termGradesData = await getAllTermGradesApi();

        setTermGrades(termGradesData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        if (termGrades[selectedTerm] && termGrades[selectedTerm].courses.length > 0) {
            setData({
                labels: termGrades[selectedTerm].courses.map((course) => course.courseName),
                datasets: [
                    {
                        label: termGrades[selectedTerm].termName,
                        data: termGrades[selectedTerm].courses.map((course) => course.score),
                        backgroundColor: termGrades[selectedTerm].courses.map((course) =>
                            getScoreColor(course.score / 10),
                        ),
                        hoverOffset: 4,
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
                                const course = termGrades[selectedTerm].courses[tooltipItem.dataIndex]; // Update to `dataIndex`
                                return `Current score: ${tooltipItem.raw}%`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Courses',
                        },
                    },
                },
            };

            setOptions(options);
        } else if (termGrades[selectedTerm] && termGrades[selectedTerm].courses.length === 0) {
            setData({
                labels: [],
                datasets: [
                    {
                        label: 'No course added',
                        data: [],
                        backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                        hoverOffset: 4,
                    },
                ],
            });
        } else {
            setData({
                labels: [],
                datasets: [
                    {
                        label: 'No term selected',
                        data: [],
                        backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [selectedTerm]);

    useEffect(() => {
        if (termGrades.length > 0) {
            const terms = [];
            for (let i = 0; i < termGrades.length; i++) {
                const term = termGrades[i];
                terms.push({
                    label: term.termName,
                    value: i,
                });
            }
            setTermOptions(terms);
        }
    }, [termGrades]);

    const handleSelectTerm = (value) => {
        setSelectedTerm(value);
    };

    return (
        <Card
            hoverable
            className={cx('large-card')}
            title="Term grades (%)"
            bordered={false}
            style={{}}
            extra={
                <Select
                    onChange={handleSelectTerm}
                    placeholder="Term"
                    style={{ width: 120 }}
                    options={termOptions}
                ></Select>
            }
            loading={loading}
        >
            <CustomBar data={data} options={options} />
        </Card>
    );
}

export default TermGrades;
