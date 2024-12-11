import { Badge, Button, Card, Flex, Progress, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getAllCurrentApi } from '~/utils/api';
import { useNavigate } from 'react-router-dom';

import truncateText from '~/utils/truncateText';

function Current() {
    const [current, setCurrent] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchInfo = async () => {
        const currentData = await getAllCurrentApi();
        setCurrent(currentData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, []);
    const today = new Date();

    return (
        <div>
            <Card style={{ cursor: 'default' }} hoverable title="Current courses" bordered={false} loading={loading}>
                {current.courses && current.courses.length > 0 ? (
                    current.courses.map((course, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <Tooltip title={'Click to view'}>
                                <Button
                                    style={{ marginLeft: '-10px' }}
                                    onClick={() => navigate('/course/' + course._id)}
                                    type="text"
                                >
                                    <Badge color={'green'} count={truncateText(course.name, 30)}></Badge>
                                </Button>

                                <div style={{ padding: '0 15px' }}>
                                    <Progress
                                        percent={(
                                            ((today - new Date(course.startDate)) /
                                                (new Date(course.endDate) - new Date(course.startDate))) *
                                            100
                                        ).toFixed(1)}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    ))
                ) : (
                    <Flex justify="center" align="center">
                        <Badge count={'Empty'}></Badge>
                    </Flex>
                )}
            </Card>
            <Card
                style={{ marginTop: '10px', cursor: 'default' }}
                hoverable
                title="Current terms"
                bordered={false}
                loading={loading}
            >
                {current.terms && current.terms.length > 0 ? (
                    current.terms.map((term, index) => (
                        <div key={index}>
                            <Tooltip title={term.name}>
                                <Button
                                    style={{ marginLeft: '-10px' }}
                                    onClick={() => navigate('/term/' + term._id)}
                                    type="text"
                                >
                                    <Badge color={'green'} count={truncateText(term.name)}></Badge>
                                </Button>
                                <div style={{ padding: '0 15px' }}>
                                    <Progress
                                        percent={(
                                            ((today - new Date(term.startDate)) /
                                                (new Date(term.endDate) - new Date(term.startDate))) *
                                            100
                                        ).toFixed(1)}
                                    />
                                </div>
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
