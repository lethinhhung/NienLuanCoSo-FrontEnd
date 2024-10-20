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
import { CheckCircleOutlined, CloseCircleOutlined, StarOutlined } from '@ant-design/icons';

import styles from './Statistics.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';
import moment from 'moment';

import {
    getContentFromLessonApi,
    getCourseInfoApi,
    getLessonInfoApi,
    getProjectsInfoByIdsApi,
    getProjectStepsInfoByIdsApi,
    getStatisticsInfoApi,
    getTestsInfoByIdsApi,
} from '~/utils/api';
import Projects from '~/components/Statistics/Projects';
import Tests from '~/components/Statistics/Tests';

function Statistics({}) {
    const { courseId, statisticsId } = useParams();
    const [statisticsInfo, setStatisticsInfo] = useState({});
    const [projectsInfo, setProjectsInfo] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const [testsInfo, setTestsInfo] = useState([]);
    const [testsChartData, setTestsChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
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
            setTestsInfo(testsData);

            // Update data object with testsInfo
            const updatedLabels = testsData.map((test) => test.name + ' (' + test.gradeWeight + '%)');
            const updatedData = testsData.map((test) => {
                return test.score === -1 ? 0 : test.score;
            });
            const updatedBackgroundColor = testsData.map((test) => {
                return getScoreColor(test.score);
            });

            setTestsChartData((prevData) => ({
                ...prevData,
                labels: updatedLabels,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: updatedData,
                        backgroundColor: updatedBackgroundColor,
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

            <Tests
                testsInfo={testsInfo}
                testOptions={testOptions}
                testsChartData={testsChartData}
                statisticsInfo={statisticsInfo}
            />

            <Projects statisticsInfo={statisticsInfo} projectsInfo={projectsInfo} />
        </Flex>
    );
}

export default Statistics;
