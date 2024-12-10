import { Badge, Button, Card, Divider, Flex, Progress, Select, Tooltip } from 'antd';
import CustomBar from '~/components/Charts/Bar';
import classNames from 'classnames/bind';
import { DownOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { getAllCurrentApi, getAllTermGradesApi } from '~/utils/api';
import getScoreColor from '~/utils/getScoreColor';
import { useNavigate } from 'react-router-dom';
import truncateText from '~/utils/truncateText';
import LoadingSpin from '~/components/LoadingSpin';

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
                                        percent={((new Date(course.endDate) - today) / 1000 / 60 / 60 / 24).toFixed(1)}
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
                                        percent={((new Date(term.endDate) - today) / 1000 / 60 / 60 / 24).toFixed(1)}
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
