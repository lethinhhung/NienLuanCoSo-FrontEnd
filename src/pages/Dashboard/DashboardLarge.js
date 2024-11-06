import { Calendar, Card, Row, Col, Divider, Progress, Flex, Select, Input, Badge, Button } from 'antd';
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
import Note from '~/components/DashBoard/Note';
import EventCalendar from '~/components/DashBoard/EventCalendar';
import TermGrades from '~/components/DashBoard/TermGrades';
import Statistics from '~/components/DashBoard/Statistics';
import GradeRange from '~/components/DashBoard/GradeRange';
import Current from '~/components/DashBoard/Current';

Chart.register(ArcElement);
function DashboardLarge() {
    const cx = classNames.bind(styles);

    const navigate = useNavigate();

    const { TextArea } = Input;
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

    return (
        <div className={cx('large-wrapper')}>
            <Row>
                <Col className={cx('large-col')} span={8}>
                    <div className={cx('large-card')}>
                        <Note type="user" />
                    </div>
                    <div className={cx('large-card')}>
                        <GradeRange />
                    </div>

                    <div className={cx('large-card')}>
                        <Statistics />
                    </div>
                </Col>
                <Col className={cx('large-col')} span={8}>
                    <div className={cx('large-card')}>
                        <TermGrades />
                    </div>
                    <Card hoverable className={cx('large-card')} title="Courses grade" bordered={false} style={{}}>
                        <Line></Line>
                    </Card>
                    <div className={cx('large-card')}>
                        <Current />
                    </div>

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
                    <EventCalendar />
                </Col>
            </Row>
        </div>
    );
}

export default DashboardLarge;
