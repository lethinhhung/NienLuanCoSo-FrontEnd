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
    InputNumber,
} from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    StarOutlined,
} from '@ant-design/icons';

import styles from './Tests.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';
import moment from 'moment';
import { createNewTestApi, deleteTestApi } from '~/utils/api';

function Tests({ statisticsInfo, testOptions, testsChartData, testsInfo }) {
    const cx = classNames.bind(styles);
    const { Meta } = Card;
    const { Title } = Typography;
    const [isTestModalVisible, setIsTestModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [submitTest, setSubmitTest] = useState({
        name: '',
        gradeWeight: 0,
        maxScore: 0,
        score: -1,
    });

    const [currentTest, setCurrentTest] = useState({});
    const [currentSubmitTest, setCurrentSubmitTest] = useState({});

    const showTestModal = (test) => {
        setCurrentTest(test);
        setCurrentSubmitTest(test);
        setIsTestModalVisible(true);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsTestModalVisible(false);
        setIsModalVisible(false);
        setCurrentTest({});
        setCurrentSubmitTest({});
    };

    const handleOk = async (test) => {
        //Goi API
        setIsTestModalVisible(false);
        setCurrentTest({});
        setCurrentSubmitTest({});
    };

    const handleAddOk = async () => {
        const { name, gradeWeight, maxScore, score } = submitTest;
        const statisticsId = statisticsInfo._id;
        const result = await createNewTestApi(name, gradeWeight, maxScore, score, statisticsId);
        console.log(result);
        setIsModalVisible(false);
    };

    // Add test

    const handleChangeAddName = (e) => {
        setSubmitTest({
            ...submitTest,
            name: e.target.value,
        });
    };

    const handleChangeAddGradeWeight = (value) => {
        if (value > 0 && value <= 100) {
            setSubmitTest({
                ...submitTest,
                gradeWeight: value,
            });
        } else {
            setSubmitTest(submitTest);
        }
    };

    const handleChangeAddMaxScore = (value) => {
        if (value > 0 && value <= 100) {
            setSubmitTest({
                ...submitTest,
                maxScore: value,
            });
        } else {
            setSubmitTest(submitTest);
        }
    };

    const handleChangeAddScore = (value) => {
        // if (value > 0 && value <= 100 && value <= submitTest.maxScore) {
        //     setSubmitTest({
        //         ...submitTest,
        //         score: -1,
        //     });
        // } else {
        //     setSubmitTest(submitTest);
        // }
    };

    // Edit test

    const handleDeleteTest = async (test) => {
        const result = await deleteTestApi(test);
        if (result.success) {
            alert('Success');
        } else alert('Failed');
        console.log(result);
    };

    const handleChangeName = (e) => {
        setCurrentSubmitTest({
            ...currentSubmitTest,
            name: e.target.value,
        });
    };

    const handleChangeGradeWeight = (value) => {
        if (value > 0 && value <= 100) {
            setCurrentSubmitTest({
                ...currentSubmitTest,
                gradeWeight: value,
            });
        } else {
            setCurrentSubmitTest(currentSubmitTest);
        }
    };

    const handleChangeMaxScore = (value) => {
        if (value > 0 && value <= 100) {
            setCurrentSubmitTest({
                ...currentSubmitTest,
                maxScore: value,
            });
        } else {
            setCurrentSubmitTest(currentSubmitTest);
        }
    };

    const handleChangeScore = (value) => {
        if (value > 0 && value <= 100 && value <= currentSubmitTest.maxScore) {
            setCurrentSubmitTest({
                ...currentSubmitTest,
                score: value,
            });
        } else {
            setCurrentSubmitTest(currentSubmitTest);
        }
    };

    return (
        <Card
            className={cx('overview')}
            hoverable
            title="Tests"
            bordered={false}
            extra={
                <>
                    <Button onClick={showModal}>
                        <PlusOutlined />
                    </Button>
                    <Modal title={'Add test'} open={isModalVisible} onOk={handleAddOk} onCancel={handleCancel}>
                        <p>Name</p>
                        <Input onChange={handleChangeAddName} value={submitTest.name}></Input>
                        <p>Grade weight</p>
                        <InputNumber
                            readOnly
                            onChange={handleChangeAddGradeWeight}
                            addonAfter="%"
                            value={submitTest.gradeWeight}
                            min={0.1}
                            max={100}
                            step="0.1"
                        />
                        <p>Max score</p>
                        <InputNumber
                            onChange={handleChangeAddMaxScore}
                            value={submitTest.maxScore}
                            min={0.1}
                            max={100}
                            step="0.1"
                        />
                        <p>Your score</p>
                        <InputNumber
                            onChange={handleChangeAddScore}
                            value={submitTest.score}
                            min={0.1}
                            max={100}
                            step="0.1"
                        />
                    </Modal>
                </>
            }
        >
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
                                            <Button size="small" onClick={() => showTestModal(test)}>
                                                <EditOutlined />
                                            </Button>
                                            <Modal
                                                title={'Edit ' + (currentTest ? currentTest.name : '')}
                                                open={isTestModalVisible}
                                                onOk={() => handleOk(currentSubmitTest)}
                                                onCancel={handleCancel}
                                            >
                                                <p>Name</p>
                                                <Input
                                                    onChange={handleChangeName}
                                                    value={currentSubmitTest.name}
                                                ></Input>
                                                <p>Grade weight</p>
                                                <InputNumber
                                                    onChange={handleChangeGradeWeight}
                                                    addonAfter="%"
                                                    value={currentSubmitTest.gradeWeight}
                                                    min={0.1}
                                                    max={100}
                                                    step="0.1"
                                                />
                                                <p>Max score</p>
                                                <InputNumber
                                                    onChange={handleChangeMaxScore}
                                                    value={currentSubmitTest.maxScore}
                                                    min={0.1}
                                                    max={100}
                                                    step="0.1"
                                                />
                                                <p>Your score</p>
                                                <InputNumber
                                                    onChange={handleChangeScore}
                                                    value={currentSubmitTest.score}
                                                    min={0.1}
                                                    max={100}
                                                    step="0.1"
                                                />
                                            </Modal>
                                            <Popconfirm
                                                onConfirm={() => handleDeleteTest(test._id)}
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
