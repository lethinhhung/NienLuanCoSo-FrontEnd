import { Flex, Progress, Row, Button, Tooltip, Col } from 'antd';
import classNames from 'classnames/bind';

import { useNavigate } from 'react-router-dom';
import { BarChartOutlined } from '@ant-design/icons';

import styles from './StatisticsOverview.module.scss';
import moment from 'moment';
import { format } from 'path-browserify';

const StatisticsOverview = ({ data, courseInfo }) => {
    const cx = classNames.bind(styles);
    const currentDate = new Date();
    const courseStartDate = new Date(courseInfo.startDate);
    const courseEndDate = new Date(courseInfo.endDate);
    const progression = (courseEndDate - currentDate) / 1000 / 60 / 60 / 24;

    const navigate = useNavigate();

    const handleEditStatistics = () => {
        navigate('/course/' + courseInfo._id + '/statistics/' + courseInfo.statistics);
    };

    return (
        <div className={cx('wrapper')}>
            <Flex wrap justify="space-evenly">
                <div className={cx('progression-wrapper')}>
                    <p>Progression</p>
                    <Flex justify="center">
                        <Tooltip
                            title={
                                currentDate < courseStartDate
                                    ? 'Incoming'
                                    : currentDate > courseEndDate
                                    ? 'Completed'
                                    : moment(courseStartDate).format('DD/MM/YYYY') +
                                      ' - ' +
                                      moment(courseEndDate).format('DD/MM/YYYY')
                            }
                        >
                            <Progress
                                type="circle"
                                percent={
                                    currentDate < courseStartDate
                                        ? '0'
                                        : currentDate > courseEndDate
                                        ? '100'
                                        : progression.toFixed(1)
                                }
                            />
                        </Tooltip>
                    </Flex>
                </div>
                <div className={cx('progression-wrapper')}>
                    <p>Tests</p>

                    <Flex justify="center">
                        <Tooltip title={data.completedScore + '%/' + data.completedGradeWeight + '% completed'}>
                            <Progress
                                percent={data.completedGradeWeight}
                                success={{ percent: data.completedScore }}
                                type="circle"
                            />
                        </Tooltip>
                    </Flex>
                </div>

                <div className={cx('progression-wrapper')}>
                    <p>Projects</p>

                    <Flex justify="center">
                        <Tooltip title={data.completedProjects + '/' + data.totalProjects + ' project(s) completed'}>
                            <Progress
                                type="circle"
                                steps={{
                                    count: data.totalProjects,
                                    gap: 2,
                                }}
                                percent={
                                    data.totalProjects === 0
                                        ? '0'
                                        : ((data.completedProjects / data.totalProjects) * 100).toFixed(1)
                                }
                                trailColor="rgba(0, 0, 0, 0.06)"
                            />
                        </Tooltip>
                    </Flex>
                </div>
            </Flex>
            <Row>
                <Col span={24}>
                    <Flex wrap justify="flex-end">
                        <Button onClick={handleEditStatistics}>
                            <BarChartOutlined />
                            More details
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsOverview;
