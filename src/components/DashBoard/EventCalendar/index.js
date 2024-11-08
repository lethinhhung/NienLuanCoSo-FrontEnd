import { Calendar, Card, Row, Col, Divider, Progress, Flex, Select, Input, Badge, Button } from 'antd';
import classNames from 'classnames/bind';
import Doughnut from '~/components/Charts/Doughnut';
import Pie from '~/components/Charts/Pie';
import Line from '~/components/Charts/Line';
import { Chart, ArcElement } from 'chart.js';
import { DownOutlined } from '@ant-design/icons';

import styles from './EventCalendar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import CustomBar from '~/components/Charts/Bar';
import CustomPie from '~/components/Charts/Pie';
import moment from 'moment';
import CustomCalendar from '~/components/CustomCalendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getAllTestsInfoApi } from '~/utils/api';
import LoadingSpin from '~/components/LoadingSpin';

function EventCalendar({ size = 'large' }) {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    const [eventDateTitle, setEventDateTitle] = useState('');
    const [event, setEvent] = useState([]);
    const [testsInfo, setTestsInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInfo = async () => {
        const testsData = await getAllTestsInfoApi();

        setTestsInfo(testsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const dateCellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        const testDates = testsInfo.map((test) => {
            return moment(test.date).format('YYYY-MM-DD');
        });

        return testDates.includes(date) ? (
            <Flex justify="center" align="center">
                <Badge color="red" />
            </Flex>
        ) : null;
    };

    const handleSelectDate = (value) => {
        const selectedDate = moment(value.$d).format('DD/MM/YYYY');
        setEventDateTitle(selectedDate);
        const events = [];
        for (const test of testsInfo) {
            if (moment(test.date).format('DD/MM/YYYY') === selectedDate) {
                events.push(test);
            }
        }
        if (events) {
            setEvent(events);
        }
    };

    const handleSelectTest = (e) => {
        navigate('/course/' + e.courseId + '/statistics/' + e.statisticsId);
    };

    return (
        <>
            <Card
                className={cx('large-card')}
                hoverable
                title={eventDateTitle === '' ? 'Select a date to view tests' : 'On ' + eventDateTitle}
                bordered={false}
            >
                <div style={{ height: size === 'large' ? '130px' : '80px', overflowY: 'auto' }}>
                    <ul style={{ listStyleType: 'none' }}>
                        {event.length === 0 ? (
                            <Flex justify="center">
                                <Badge count={'Empty'}></Badge>
                            </Flex>
                        ) : (
                            event.map((e, index) => (
                                <li key={index}>
                                    <div
                                        onClick={() => handleSelectTest(e)}
                                        style={{
                                            borderRadius: '5px',
                                            padding: '5px 10px',
                                            marginBottom: '5px',
                                            backgroundColor: e.score === -1 ? '#FF4D4F' : '#1677FF',
                                        }}
                                    >
                                        <Flex justify="space-between">
                                            <div>
                                                <h3>{e.name}</h3>
                                                {e.courseName}
                                            </div>
                                            <h1>{e.score === -1 ? '' : e.score}</h1>
                                        </Flex>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </Card>

            <Card hoverable className={cx('large-card')} title="Calendar" bordered={false} loading={loading}>
                <>
                    <div
                        hidden={loading}
                        className={cx('calendar')}
                        style={{ height: size === 'large' ? '500px' : '300px', overflowY: 'auto' }}
                    >
                        <Calendar cellRender={dateCellRender} onSelect={handleSelectDate} />
                    </div>

                    <Flex justify="center">
                        <DownOutlined className={cx('scrollable')} />
                    </Flex>
                </>
            </Card>
        </>
    );
}

export default EventCalendar;
