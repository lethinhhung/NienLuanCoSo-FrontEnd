import { useEffect, useRef, useState } from 'react';
import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Modal, Badge } from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import {
    getContentFromLessonApi,
    getLessonInfoApi,
    getProjectsInfoByIdsApi,
    getProjectStepsInfoByIdsApi,
    getStatisticsInfoApi,
    getTestsInfoByIdsApi,
} from '~/utils/api';

function Statistics({}) {
    const { courseId, statisticsId } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            const statisticsData = await getStatisticsInfoApi(statisticsId);
            const projectData = await getProjectsInfoByIdsApi(statisticsData.projects);
            const testData = await getTestsInfoByIdsApi(statisticsData.tests);
            const projectStepData = await getProjectStepsInfoByIdsApi(projectData[0].steps);
            console.log(projectStepData);
        };

        fetchInfo();
    }, []);

    return <div></div>;
}

export default Statistics;
