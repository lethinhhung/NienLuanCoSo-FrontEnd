import { ConfigProvider, Card, Row, Col, Divider, Progress, Flex } from 'antd';
import classNames from 'classnames/bind';
import Doughnut from '~/components/Charts/Doughnut';
import Pie from '~/components/Charts/Pie';
import { Chart, ArcElement } from 'chart.js';

import styles from './Dashboard.module.scss';

Chart.register(ArcElement);
function DashboardLarge() {
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

    const options = {
        cutout: 70,
        borderRadius: 50,
        borderWidth: 0,
    };

    return (
        <div className={cx('large-wrapper')}>
            <Row>
                <Col className={cx('large-col')} span={8}>
                    <Card hoverable className={cx('large-card')} title="Progression" bordered={false}>
                        <p>Courses</p>
                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>
                        <Divider />
                        <p>Tests</p>

                        <Doughnut data={data} options={options}></Doughnut>

                        <Divider />
                        <p>Card content</p>
                        <Pie data={data}></Pie>
                    </Card>
                </Col>
                <Col className={cx('large-col')} span={8}>
                    <Card hoverable className={cx('large-card')} title="Statistics" bordered={false}>
                        <p>Total courses</p>
                        <Divider />
                        <p>Total terms</p>
                        <Divider />
                        <p>More...</p>
                    </Card>
                    <Card hoverable className={cx('large-card')} title="Card title" bordered={false}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col className={cx('large-col')} span={8}>
                    <Card hoverable className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card hoverable className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card hoverable className={cx('large-card')} title="Card title" bordered={false} style={{}}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DashboardLarge;
