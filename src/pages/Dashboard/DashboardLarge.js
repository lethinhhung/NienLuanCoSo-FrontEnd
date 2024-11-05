import { Calendar, Card, Row, Col, Divider, Progress, Flex, Select, Input, Badge } from 'antd';
import classNames from 'classnames/bind';
import Doughnut from '~/components/Charts/Doughnut';
import Pie from '~/components/Charts/Pie';
import Line from '~/components/Charts/Line';
import { Chart, ArcElement } from 'chart.js';
import { DownOutlined } from '@ant-design/icons';

import styles from './Dashboard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import CustomBar from '~/components/Charts/Bar';
import CustomPie from '~/components/Charts/Pie';
import moment from 'moment';
import CustomCalendar from '~/components/CustomCalendar';
import { useState } from 'react';
import dayjs from 'dayjs';

Chart.register(ArcElement);
function DashboardLarge({ dateCellRender, testsInfo }) {
    const cx = classNames.bind(styles);

    const navigate = useNavigate();

    const { TextArea } = Input;
    const [eventDateTitle, setEventDateTitle] = useState('');
    const [event, setEvent] = useState([]);

    const data = {
        labels: ['Course 1', 'Course 2', 'Course 3'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        cutout: 70,
        borderRadius: 50,
        borderWidth: 0,
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

    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [{ type: 'warning' }];
                break;
            case 10:
                listData = [{ type: 'success' }];
                break;
            case 15:
                listData = [{ type: 'error' }];
                break;
            default:
                listData = [];
        }
        return listData || [];
    };

    const handleSelectTest = (e) => {
        navigate('/course/' + e.courseId + '/statistics/' + e.statisticsId);
    };

    return (
        <div className={cx('large-wrapper')}>
            <Row>
                <Col className={cx('large-col')} span={8}>
                    <Card hoverable className={cx('large-card')} title="Notes" bordered={false}>
                        <TextArea
                            placeholder="Notes..."
                            autoSize={{
                                minRows: 2,
                            }}
                        />
                    </Card>
                    <Card
                        hoverable
                        className={cx('large-card')}
                        title="Grade range percentage"
                        bordered={false}
                        style={{}}
                    >
                        <CustomPie data={data} />
                    </Card>
                    <Card hoverable className={cx('large-card')} title="Statistics" bordered={false}>
                        <p>Total courses</p>
                        <Divider></Divider>
                        <p>Total terms</p>
                        <Divider></Divider>
                        <p>Total projects</p>
                        <Divider></Divider>
                        <p>Total tests</p>
                    </Card>
                </Col>
                <Col className={cx('large-col')} span={8}>
                    <Card
                        hoverable
                        className={cx('large-card')}
                        title="Progression"
                        bordered={false}
                        extra={
                            <Select
                                placeholder="Term"
                                style={{ width: 120 }}
                                options={[
                                    { value: 'current', label: 'Current' },
                                    { value: 'incoming', label: 'Incoming' },
                                    { value: 'completed', label: 'Completed' },
                                ]}
                                defaultValue={'current'}
                            ></Select>
                        }
                    >
                        <p>Courses</p>
                        <Progress percent={75} />
                        <Divider />
                        <p>Terms</p>
                        <Progress percent={75} />
                        <Divider />
                        <p>Projects</p>
                        <Progress percent={75} />
                    </Card>
                    <Card hoverable className={cx('large-card')} title="Courses grade" bordered={false} style={{}}>
                        <Line></Line>
                    </Card>
                    <Card
                        hoverable
                        className={cx('large-card')}
                        title="Term grades"
                        bordered={false}
                        style={{}}
                        extra={
                            <Select
                                placeholder="Term"
                                style={{ width: 120 }}
                                options={[{ value: 'term1', label: 'Term1' }]}
                                defaultValue={'term1'}
                            ></Select>
                        }
                    >
                        <CustomBar data={data} />
                    </Card>

                    <Card
                        hoverable
                        className={cx('large-card')}
                        title="Incomplete projects"
                        bordered={false}
                        style={{}}
                    >
                        <p>Project 1</p>
                        <p>Project 2</p>
                        <p>Project 3</p>
                    </Card>
                </Col>

                <Col className={cx('large-col')} span={8}>
                    <Card
                        hoverable
                        className={cx('large-card')}
                        title={eventDateTitle === '' ? 'Select a date to view tests' : 'On ' + eventDateTitle}
                        bordered={false}
                    >
                        <div style={{ height: '130px', overflowY: 'auto' }}>
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
                    <Card hoverable className={cx('large-card')} title="Calendar" bordered={false}>
                        <div className={cx('calendar')} style={{ height: '500px', overflowY: 'auto' }}>
                            <Calendar cellRender={dateCellRender} onSelect={handleSelectDate} />
                            {/* <CustomCalendar cellRender={dateCellRender} onSelect={handleSelectDate} /> */}
                        </div>
                        <Flex justify="center">
                            <DownOutlined className={cx('scrollable')} />
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DashboardLarge;
