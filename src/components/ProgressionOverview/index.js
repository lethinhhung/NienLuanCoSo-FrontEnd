import { Flex, Progress, Row, Button } from 'antd';
import classNames from 'classnames/bind';

import styles from './ProgressionOverview.module.scss';

import {
    createNewLessonApi,
    deleteLessonApi,
    getCourseInfoApi,
    getLessonsInfoByIdsApi,
    getProjectsInfoByIdsApi,
    getProjectStepsInfoByIdsApi,
    getStatisticsInfoApi,
    getTestsInfoByIdsApi,
} from '~/utils/api';
import { useEffect, useState } from 'react';

const ProgressionOverview = ({ statisticsId, courseStartDate, courseEndDate }) => {
    const cx = classNames.bind(styles);

    const startDate = new Date(courseStartDate);
    const endDate = new Date(courseEndDate);
    const [statisticsInfo, setStatisticsInfo] = useState({});
    const [testsInfo, setTestsInfo] = useState([]);
    const [projectsInfo, setProjectsInfo] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
            console.log(statisticsId);
            const statisticsData = await getStatisticsInfoApi(statisticsId);
            setStatisticsInfo(statisticsData);
            if (statisticsData.tests !== null) {
                const testsData = await getTestsInfoByIdsApi(statisticsData.tests);
                setTestsInfo(testsData);
            }
            if (statisticsData.projects !== null) {
                const projectsData = await getProjectsInfoByIdsApi(statisticsData.projects);
                setProjectsInfo(projectsData);
            }
        };

        fetchInfo();
    }, []);

    console.log(statisticsInfo);

    let data = {};
    let completedGradeWeight = 0;
    let completedScore = 0;
    let completedProjects = 0;
    let totalProjects = 0;

    return (
        <div className={cx('wrapper')}>
            <Flex wrap justify="space-evenly">
                <div className={cx('progression-wrapper')}>
                    <p>Progression</p>
                    <Flex justify="center">
                        <Progress type="circle" percent={10} />
                    </Flex>
                </div>
                <div className={cx('progression-wrapper')}>
                    <p>Tests</p>

                    <Flex justify="center">
                        <Progress type="circle" percent={75} />
                    </Flex>
                </div>
                <div className={cx('progression-wrapper')}>
                    <p>Projects</p>

                    <Flex justify="center">
                        <Progress type="circle" percent={75} />
                    </Flex>
                </div>
            </Flex>
            <Row>
                <Button>Edit/Add</Button>
            </Row>
        </div>
    );
};

export default ProgressionOverview;
