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
    const [statisticsInfo, setStatisticsInfo] = useState({});

    useEffect(() => {
        const fetchInfo = async () => {
            const statisticsData = await getStatisticsInfoApi(statisticsId);
            setStatisticsInfo(statisticsData);
        };

        fetchInfo();
    }, []);

    return <div>{statisticsInfo.completedScore}</div>;
}

export default Statistics;
