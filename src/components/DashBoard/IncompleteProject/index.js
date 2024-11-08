import { Badge, Button, Card, Col, Divider, Flex, Progress, Row, Select, Tooltip } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { getAllCurrentApi, getAllTermGradesApi, getIncompleteProjectApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';
import { useNavigate } from 'react-router-dom';
import truncateText from '~/utils/truncateText';

function IncompleteProject() {
    const [incompleteProject, setIncompleteProject] = useState();
    const navigate = useNavigate();

    const fetchInfo = async () => {
        const incompleteProjectData = await getIncompleteProjectApi();
        setIncompleteProject(incompleteProjectData);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <Card hoverable title="Incomplete projects" bordered={false} style={{}}>
            {incompleteProject ? (
                incompleteProject.map((data, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <Tooltip title={data.course.name}>
                            <Flex
                                wrap
                                style={{ width: '100%', padding: '10px 10px 0 10px' }}
                                justify="left"
                                align="center"
                            >
                                <Button
                                    style={{ marginLeft: '-10px' }}
                                    onClick={() =>
                                        navigate('/course/' + data.course._id + '/statistics/' + data.course.statistics)
                                    }
                                    type="text"
                                >
                                    <Badge color={'green'} count={truncateText(data.project.name, 30)}></Badge>
                                </Button>
                            </Flex>
                            <Flex
                                wrap
                                style={{ width: '100%', padding: '0 10px 10px 10px' }}
                                justify="space-between"
                                align="center"
                            >
                                <p>{data.project.completedSteps + '/' + data.project.totalSteps + ' Done'}</p>
                                <Progress
                                    type="circle"
                                    steps={{
                                        count: data.project.totalSteps,
                                        gap: 2,
                                    }}
                                    percent={((data.project.completedSteps / data.project.totalSteps) * 100).toFixed(1)}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                />
                            </Flex>
                        </Tooltip>
                        <Divider></Divider>
                    </div>
                ))
            ) : (
                <Flex justify="center" align="center">
                    <Badge count={'Empty'}></Badge>
                </Flex>
            )}
        </Card>
    );
}

export default IncompleteProject;
