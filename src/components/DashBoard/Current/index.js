import { Badge, Card, Divider, Flex, Progress, Select, Tooltip } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { getAllCurrentApi, getAllTermGradesApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';

function Current() {
    const [current, setCurrent] = useState([]);

    const fetchInfo = async () => {
        const currentData = await getAllCurrentApi();
        setCurrent(currentData);
    };

    useEffect(() => {
        fetchInfo();
    }, []);
    const today = new Date();

    return (
        <div>
            <Card hoverable title="Current courses" bordered={false}>
                {current.courses ? (
                    current.courses.map((course, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <Tooltip title={course.name}>
                                <Badge color={'green'} count={course.name}></Badge>
                                <Progress
                                    percent={((new Date(course.endDate) - today) / 1000 / 60 / 60 / 24).toFixed(1)}
                                />
                            </Tooltip>
                        </div>
                    ))
                ) : (
                    <Flex justify="center" align="center">
                        <Badge count={'Empty'}></Badge>
                    </Flex>
                )}
            </Card>
            <Card style={{ marginTop: '10px' }} hoverable title="Current terms" bordered={false}>
                {current.terms ? (
                    current.terms.map((term, index) => (
                        <div key={index}>
                            <Tooltip title={term.name}>
                                <Badge color={'green'} count={term.name}></Badge>
                                <Progress
                                    percent={((new Date(term.endDate) - today) / 1000 / 60 / 60 / 24).toFixed(1)}
                                />
                            </Tooltip>
                        </div>
                    ))
                ) : (
                    <Flex justify="center" align="center">
                        <Badge count={'Empty'}></Badge>
                    </Flex>
                )}
            </Card>
        </div>
    );
}

export default Current;
