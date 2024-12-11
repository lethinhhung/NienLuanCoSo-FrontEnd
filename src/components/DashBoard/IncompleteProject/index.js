import { Badge, Button, Card, Divider, Flex, Progress, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIncompleteProjectApi } from '~/utils/api';
import truncateText from '~/utils/truncateText';

function IncompleteProject() {
    const [incompleteProject, setIncompleteProject] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchInfo = async () => {
        const incompleteProjectData = await getIncompleteProjectApi();
        setIncompleteProject(incompleteProjectData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <Card style={{ cursor: 'default' }} hoverable title="Incomplete projects" bordered={false} loading={loading}>
            {incompleteProject && incompleteProject.length > 0 ? (
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
