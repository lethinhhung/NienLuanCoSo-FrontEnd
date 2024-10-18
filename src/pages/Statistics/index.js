import { useEffect, useRef, useState } from 'react';
import {
    Typography,
    Image,
    Avatar,
    Card,
    Flex,
    Divider,
    Progress,
    Select,
    Row,
    Col,
    Button,
    Modal,
    Badge,
    Tooltip,
} from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined, StarOutlined } from '@ant-design/icons';

import styles from './Statistics.module.scss';
import Bar from '~/components/Charts/Bar';

import {
    getContentFromLessonApi,
    getCourseInfoApi,
    getLessonInfoApi,
    getProjectsInfoByIdsApi,
    getProjectStepsInfoByIdsApi,
    getStatisticsInfoApi,
    getTestsInfoByIdsApi,
} from '~/utils/api';
import moment from 'moment';

function Statistics({}) {
    const { courseId, statisticsId } = useParams();
    const [statisticsInfo, setStatisticsInfo] = useState({});
    const [projectsInfo, setProjectsInfo] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const [testsChartData, setTestsChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                ],
            },
        ],
    });

    const cx = classNames.bind(styles);
    const { Meta } = Card;
    const { Title } = Typography;
    const testOptions = {
        scales: {
            y: {
                max: 10,
            },
        },
    };

    const currentDate = new Date();
    const courseStartDate = new Date(courseInfo.startDate);
    const courseEndDate = new Date(courseInfo.endDate);
    const progression = (courseEndDate - currentDate) / 1000 / 60 / 60 / 24;

    useEffect(() => {
        const fetchInfo = async () => {
            const statisticsData = await getStatisticsInfoApi(statisticsId);
            const testsData = await getTestsInfoByIdsApi(statisticsData.tests);
            const projectsData = await getProjectsInfoByIdsApi(statisticsData.projects);
            const courseData = await getCourseInfoApi(courseId);

            const projectsWithSteps = await Promise.all(
                projectsData.map(async (project) => {
                    const steps = await getProjectStepsInfoByIdsApi(project.steps);
                    return { ...project, steps };
                }),
            );

            setStatisticsInfo(statisticsData);
            setProjectsInfo(projectsWithSteps);
            setCourseInfo(courseData);

            // Update data object with testsInfo
            const updatedLabels = testsData.map((test) => test.name + ' (' + test.gradeWeight + '%)');
            const updatedData = testsData.map((test) => {
                return test.score === -1 ? 0 : test.score;
            });
            setTestsChartData((prevData) => ({
                ...prevData,
                labels: updatedLabels,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: updatedData,
                    },
                ],
            }));
        };

        fetchInfo();
    }, []);

    return (
        <Flex className={cx('wrapper')} wrap vertical align="center">
            <Card className={cx('overview')} hoverable title="Progression" bordered={false}>
                <Row>
                    <Flex justify="space-between" style={{ width: '100%' }}>
                        <p>{moment(courseInfo.startDate).format('DD/MM/YYYY')}</p>
                        <p>{moment(courseInfo.endDate).format('DD/MM/YYYY')}</p>
                    </Flex>
                </Row>
                <Row>
                    <Tooltip
                        title={
                            currentDate < courseStartDate
                                ? 'Incoming'
                                : currentDate > courseEndDate
                                ? 'Completed'
                                : progression.toFixed(1)
                        }
                    >
                        <Progress
                            percent={
                                currentDate < courseStartDate
                                    ? '0'
                                    : currentDate > courseEndDate
                                    ? '100'
                                    : progression.toFixed(1)
                            }
                        />
                    </Tooltip>
                </Row>
            </Card>

            <Card className={cx('overview')} hoverable title="Tests" bordered={false}>
                <Row>
                    <Flex style={{ width: '100%' }} justify="space-between" align="center">
                        <Title level={3}>Achieved: {statisticsInfo.completedScore + '%'}</Title>
                        <Tooltip
                            title={
                                statisticsInfo.completedScore +
                                '%/' +
                                statisticsInfo.completedGradeWeight +
                                '% completed'
                            }
                        >
                            <Progress
                                percent={statisticsInfo.completedGradeWeight}
                                success={{ percent: statisticsInfo.completedScore }}
                                type="circle"
                            />
                        </Tooltip>
                    </Flex>
                </Row>
                <Divider></Divider>
                <Row>
                    <Flex style={{ width: '100%' }} justify="center">
                        <div style={{ maxWidth: '700px', width: '100%' }}>
                            {statisticsInfo.tests && statisticsInfo.tests.length === 0 ? (
                                <Flex justify="center" style={{ marginTop: '20px' }}>
                                    <Badge count={'Empty'}></Badge>
                                </Flex>
                            ) : (
                                <Bar data={testsChartData} options={testOptions}></Bar>
                            )}
                        </div>
                    </Flex>
                </Row>
            </Card>

            <Card className={cx('overview')} hoverable title="Projects" bordered={false}>
                <Row>
                    <Flex style={{ width: '100%' }} justify="space-between" align="center">
                        <Title level={3}>Completed project(s): {statisticsInfo.completedProjects}</Title>
                        <Tooltip
                            title={
                                statisticsInfo.completedProjects +
                                '/' +
                                statisticsInfo.totalProjects +
                                ' project(s) completed'
                            }
                        >
                            <Progress
                                type="circle"
                                steps={{
                                    count: statisticsInfo.totalProjects,
                                    gap: 2,
                                }}
                                percent={
                                    statisticsInfo.totalProjects === 0
                                        ? '0'
                                        : (
                                              (statisticsInfo.completedProjects / statisticsInfo.totalProjects) *
                                              100
                                          ).toFixed(1)
                                }
                                trailColor="rgba(0, 0, 0, 0.06)"
                            />
                        </Tooltip>
                    </Flex>
                </Row>
                <Divider></Divider>
                <Row style={{ marginBottom: '10px' }}>
                    <Title level={3}>Projects progression</Title>
                </Row>
                <Row>
                    <Flex style={{ width: '100%' }} justify="center">
                        <Flex vertical style={{ maxWidth: '700px', width: '100%' }}>
                            {statisticsInfo.totalProjects !== 0 ? (
                                projectsInfo.map((project, index) => (
                                    <Card style={{ marginBottom: '10px' }} key={index} hoverable title={project.name}>
                                        <Tooltip
                                            title={
                                                project.completedSteps === project.totalSteps
                                                    ? 'Completed'
                                                    : project.completedSteps +
                                                      '/' +
                                                      project.totalSteps +
                                                      ' step(s) completed'
                                            }
                                        >
                                            <Progress percent={(project.completedSteps / project.totalSteps) * 100} />
                                            <Divider></Divider>
                                            {project.steps.map((step, index) => (
                                                <Row key={index} style={{ marginTop: '2px' }}>
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        style={{ width: '100%' }}
                                                    >
                                                        <p>
                                                            <CheckCircleOutlined /> {step.name}
                                                        </p>
                                                        {step.status === true ? (
                                                            <Badge
                                                                style={{ marginLeft: '5px' }}
                                                                color="blue"
                                                                count={'Done'}
                                                            ></Badge>
                                                        ) : (
                                                            <Badge
                                                                style={{ marginLeft: '2px' }}
                                                                count={'On working'}
                                                            ></Badge>
                                                        )}
                                                    </Flex>
                                                </Row>
                                            ))}
                                        </Tooltip>
                                    </Card>
                                ))
                            ) : (
                                <Flex justify="center" style={{ marginTop: '20px' }}>
                                    <Badge count={'Empty'}></Badge>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Row>
            </Card>
        </Flex>
    );
}

export default Statistics;
