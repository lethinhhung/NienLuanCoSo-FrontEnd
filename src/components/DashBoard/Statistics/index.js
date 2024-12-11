import { Badge, Button, Card, Flex, Typography } from 'antd';
import classNames from 'classnames/bind';
import { ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import styles from './Statistics.module.scss';
import { getUserStatisticsApi } from '~/utils/api';

function Statistics() {
    const cx = classNames.bind(styles);

    const { Title } = Typography;

    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState();

    const fetchInfo = async () => {
        const statisticsData = await getUserStatisticsApi();
        setStatistics(statisticsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <Card
            style={{ cursor: 'default' }}
            extra={
                <Button shape="circle" onClick={fetchInfo}>
                    <ReloadOutlined />
                </Button>
            }
            hoverable
            className={cx('large-card')}
            title="Total"
            bordered={false}
            loading={loading}
        >
            <Flex justify="space-between" align="center">
                <Title level={5}>📚Courses </Title>
                <Badge
                    count={statistics && statistics.courses > 0 ? statistics.courses : 'None'}
                    color={statistics && statistics.courses > 0 ? 'blue' : 'red'}
                ></Badge>
            </Flex>
            <Flex justify="space-between" align="center">
                <Title level={5}>⌛Terms </Title>
                <Badge
                    count={statistics && statistics.terms > 0 ? statistics.terms : 'None'}
                    color={statistics && statistics.terms > 0 ? 'blue' : 'red'}
                ></Badge>
            </Flex>
            <Flex justify="space-between" align="center">
                <Title level={5}>✍🏻Tests </Title>
                <Badge
                    count={statistics && statistics.tests > 0 ? statistics.tests : 'None'}
                    color={statistics && statistics.tests > 0 ? 'blue' : 'red'}
                ></Badge>
            </Flex>
            <Flex justify="space-between" align="center">
                <Title level={5}>🗂️Projects </Title>
                <Badge
                    count={statistics && statistics.projects > 0 ? statistics.projects : 'None'}
                    color={statistics && statistics.projects > 0 ? 'blue' : 'red'}
                ></Badge>
            </Flex>
            <Flex justify="space-between" align="center">
                <Title level={5}>🏷️Tags </Title>
                <Badge
                    count={statistics && statistics.tags > 0 ? statistics.tags : 'None'}
                    color={statistics && statistics.tags > 0 ? 'blue' : 'red'}
                ></Badge>
            </Flex>
        </Card>
    );
}

export default Statistics;
