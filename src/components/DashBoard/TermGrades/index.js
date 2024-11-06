import { Card, Select } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import styles from './TermGrades.module.scss';
import { useEffect, useState } from 'react';
import { getAllTermGradesApi, getUserStatisticsApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';

function TermGrades() {
    const cx = classNames.bind(styles);

    const [termOptions, setTermOptions] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('-1');
    const [termGrades, setTermGrades] = useState([]);
    const [data, setData] = useState({
        // labels: termGrades[0].courses.map((course) => course.name),
        labels: ['1', '2', '3'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    });

    const fetchInfo = async () => {
        const termGradesData = await getAllTermGradesApi();

        setTermGrades(termGradesData);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        if (termGrades[selectedTerm] && termGrades[selectedTerm].courses.length > 0) {
            setData({
                labels: termGrades[0].courses.map((course) => course.courseName),
                datasets: [
                    {
                        label: termGrades[0].termName,
                        data: termGrades[0].courses.map((course) => course.score),
                        backgroundColor: termGrades[0].courses.map((course) => getScoreColor(course.score / 10)),
                        hoverOffset: 4,
                    },
                ],
            });
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
            title="Term grades"
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
        >
            <CustomBar data={data} />
        </Card>
    );
}

export default TermGrades;
