import { Calendar, Card, Row, Col, Divider, Progress, Flex, Select, Input, Badge } from 'antd';
import classNames from 'classnames/bind';
import Doughnut from '~/components/Charts/Doughnut';
import Pie from '~/components/Charts/Pie';
import Line from '~/components/Charts/Line';
import { Chart, ArcElement } from 'chart.js';

import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import CustomBar from '~/components/Charts/Bar';
import CustomPie from '~/components/Charts/Pie';
import moment from 'moment';

Chart.register(ArcElement);
function DashboardLarge() {
    const cx = classNames.bind(styles);

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

    const handleSelectDate = (value) => {
        console.log(moment(value.$d).format('DD/MM/YYYY'));
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

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} />
                    </li>
                ))}
            </ul>
        );
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
                    <Card hoverable className={cx('large-card')} title="Calendar" bordered={false}>
                        <Calendar
                            cellRender={dateCellRender}
                            onSelect={handleSelectDate}
                            fullscreen={true}
                            style={{ height: '500px' }}
                        ></Calendar>
                    </Card>
                </Col>

                <Col className={cx('large-col')} span={8}>
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
            </Row>
        </div>
    );
}

export default DashboardLarge;
