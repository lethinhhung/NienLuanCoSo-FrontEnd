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
    Input,
    Popconfirm,
} from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    StarOutlined,
} from '@ant-design/icons';

import styles from './Tests.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';
import moment from 'moment';

function Tests({ statisticsInfo, testOptions, testsChartData, testsInfo }) {
    const cx = classNames.bind(styles);
    const { Meta } = Card;
    const { Title } = Typography;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {
        //Goi API

        setIsModalVisible(false);
    };

    const handleDeleteLesson = async () => {};

    return (
        <Card className={cx('overview')} hoverable title="Tests" bordered={false}>
            <Row>
                <Flex style={{ width: '100%' }} justify="space-between" align="center">
                    <div>
                        <Title level={3}>Achieved</Title>
                        <Badge
                            color={getScoreColor(
                                (statisticsInfo.completedScore / statisticsInfo.completedGradeWeight) * 10,
                            )}
                            count={statisticsInfo.completedScore + '%/' + statisticsInfo.completedGradeWeight + '%'}
                        ></Badge>
                    </div>
                    <Tooltip
                        title={
                            statisticsInfo.completedScore + '%/' + statisticsInfo.completedGradeWeight + '% completed'
                        }
                    >
                        <Progress
                            percent={statisticsInfo.completedGradeWeight}
                            success={{ percent: statisticsInfo.completedScore }}
                            type="circle"
                        />
                    </Tooltip>
                </Flex>
            </Row>
            <Divider></Divider>
            <Row>
                <Flex style={{ width: '100%' }} justify="center">
                    <div style={{ maxWidth: '700px', width: '100%' }}>
                        {statisticsInfo.tests && statisticsInfo.tests.length === 0 ? (
                            <Flex justify="center" style={{ marginTop: '20px' }}>
                                <Badge count={'Empty'}></Badge>
                            </Flex>
                        ) : (
                            <Bar data={testsChartData} options={testOptions}></Bar>
                        )}
                    </div>
                </Flex>
            </Row>
            <Divider />
            {testsInfo.map((test, index) => (
                <Row key={index}>
                    <Col span={24}>
                        <Flex wrap justify="center">
                            <Row
                                style={{
                                    width: '100%',
                                    maxWidth: '700px',
                                    backgroundColor: getScoreColor(test.score),
                                    marginBottom: '5px',
                                    padding: '5px 15px 5px 5px',
                                    borderRadius: '10px',
                                }}
                            >
                                <Col span={24}>
                                    <Flex justify="space-between" align="center">
                                        <Flex wrap>
                                            <Flex justify="center" style={{ width: '50px', height: '50px' }}>
                                                <Title style={{ color: 'white' }}>{test.score}</Title>
                                            </Flex>
                                            <p style={{ color: 'white' }}>{test.name}</p>
                                        </Flex>
                                        <Flex gap={5}>
                                            <Button size="small" onClick={showModal}>
                                                <EditOutlined />
                                            </Button>
                                            <Modal
                                                title={'Edit ' + test.name}
                                                open={isModalVisible}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                            >
                                                {test.name}
                                            </Modal>
                                            <Popconfirm
                                                onConfirm={() => handleDeleteLesson()}
                                                title={'Delete this test'}
                                                description={'Are you sure to remove this test?'}
                                                okText="Delete"
                                                cancelText={'Cancel '}
                                            >
                                                <Button size="small">
                                                    <DeleteOutlined />
                                                </Button>
                                            </Popconfirm>
                                        </Flex>
                                    </Flex>
                                </Col>
                            </Row>
                        </Flex>
                    </Col>
                </Row>
            ))}
        </Card>
    );
}

export default Tests;
