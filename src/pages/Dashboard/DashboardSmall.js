import { Calendar, Card, Row, Col, Divider, Progress, Flex, Select } from 'antd';
import classNames from 'classnames/bind';
import Doughnut from '~/components/Charts/Doughnut';
import Pie from '~/components/Charts/Pie';
import Line from '~/components/Charts/Line';
import { Chart, ArcElement } from 'chart.js';

import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import EventCalendar from '~/components/DashBoard/EventCalendar';

Chart.register(ArcElement);
function DashboardSmall() {
    const cx = classNames.bind(styles);

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: ['#EDF2F7', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className={cx('small-wrapper')}>
            <Row>
                <Col className={cx('small-col')} span={24}>
                    <EventCalendar />
                    <Card hoverable className={cx('small-card')} title="Progression" bordered={false}>
                        <Flex justify="space-between" align="center">
                            <p>Term:</p>
                            <Select
                                placeholder="Term"
                                style={{ width: 120 }}
                                options={[
                                    { value: '2023', label: '2023' },
                                    { value: '2024', label: '2025' },
                                    { value: '2026', label: '2026' },
                                ]}
                                defaultValue={2023}
                            ></Select>
                        </Flex>
                        <Divider></Divider>
                        <p>Courses</p>
                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>
                        <Divider />
                        <p>Tests</p>

                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>

                        <Divider />
                        <p>Projects</p>
                        <Pie data={data}></Pie>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className={cx('small-col')} span={24}>
                    <Card hoverable className={cx('small-card')} title="Incoming events" bordered={false}>
                        <p>Tests</p>
                        <Divider></Divider>
                        <p>Projects</p>
                        <Divider></Divider>
                        <p>More...t</p>
                    </Card>
                    <Card hoverable className={cx('small-card')} title="Statistics" bordered={false}>
                        <Link to="/courses">Total courses</Link>
                        <Divider />
                        <Link to="/terms">Total terms</Link>
                        <Divider />
                        <p>More...</p>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className={cx('small-col')} span={24}>
                    <Card hoverable className={cx('small-card')} title="Overall" bordered={false} style={{}}>
                        <Line></Line>
                    </Card>
                    <Card hoverable className={cx('small-card')} title="Calendar" bordered={false} style={{}}>
                        <Calendar fullscreen={true}></Calendar>
                    </Card>
                    <Card hoverable className={cx('small-card')} title="Card title" bordered={false} style={{}}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DashboardSmall;
