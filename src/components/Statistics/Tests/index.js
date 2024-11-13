import { useState } from 'react';
import {
    Typography,
    Card,
    Flex,
    Divider,
    Progress,
    Row,
    Col,
    Button,
    Modal,
    Badge,
    Tooltip,
    Input,
    Popconfirm,
    InputNumber,
    Alert,
    DatePicker,
} from 'antd';
import classNames from 'classnames/bind';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './Tests.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';

import { createNewTestApi, deleteTestApi, updateTestInfoApi } from '~/utils/api';
import moment from 'moment';
import dayjs from 'dayjs';

function Tests({ statisticsInfo, testOptions, testsChartData, testsInfo, onTestsChange }) {
    const cx = classNames.bind(styles);

    const { Title } = Typography;
    const [isTestModalVisible, setIsTestModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [submitTest, setSubmitTest] = useState({
        name: '',
        gradeWeight: 0.1,
        maxScore: 0.1,
        score: -1,
        date: dayjs(),
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
        setSubmitTest({
            name: '',
            gradeWeight: 0.1,
            maxScore: 0.1,
            score: -1,
            date: dayjs(),
        });
    };

    const handleOk = async (test) => {
        //Goi API
        const testId = currentSubmitTest._id;
        const { name, gradeWeight, maxScore, score, date } = currentSubmitTest;
        await updateTestInfoApi(testId, name, gradeWeight, maxScore, score, date);

        setIsTestModalVisible(false);
        setCurrentTest({});
        setCurrentSubmitTest({});
        onTestsChange();
    };

    const handleAddOk = async () => {
        const { name, gradeWeight, maxScore, score, date } = submitTest;
        const statisticsId = statisticsInfo._id;
        await createNewTestApi(name, gradeWeight, maxScore, score, statisticsId, date);

        setIsModalVisible(false);
        setCurrentTest({});
        setCurrentSubmitTest({});
        setSubmitTest({
            name: '',
            gradeWeight: 0.1,
            maxScore: 0.1,
            score: -1,
            date: dayjs(),
        });
        onTestsChange();
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
        if ((value >= 0 && value <= 100 && value <= submitTest.maxScore) || value === -1) {
            setSubmitTest({
                ...submitTest,
                score: value,
            });
        } else {
            setSubmitTest(submitTest);
        }
    };

    const handleChangeAddDate = (date, dateString) => {
        if (dateString === '') {
            setSubmitTest({
                ...submitTest,
                date: dayjs(),
            });
            return;
        }

        setSubmitTest({
            ...submitTest,
            date: dateString,
        });
    };
    // Edit test

    const handleDeleteTest = async (test) => {
        await deleteTestApi(test);

        onTestsChange();
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
        if (value >= 0 && value <= 100 && value <= currentSubmitTest.maxScore) {
            setCurrentSubmitTest({
                ...currentSubmitTest,
                score: value,
            });
        } else {
            setCurrentSubmitTest(currentSubmitTest);
        }
    };

    const handleChangeDate = (date, dateString) => {
        if (dateString === '') {
            setCurrentSubmitTest({
                ...currentSubmitTest,
                date: dayjs(),
            });
            return;
        }
        setCurrentSubmitTest({
            ...currentSubmitTest,
            date: dateString,
        });
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
                        <Row>
                            <Col span={24}>
                                <Alert
                                    message="How to use Tests"
                                    description="The total 'Grade Weight' (GW) is the weight of the entire subject, and it must equal 100(%). The 'Max Score' (MS) is the maximum score of a test, and 'Score' (S) is the score you achieved, which cannot exceed the 'Max Score'. For example, Math has 2 tests. Test 1 has a GW of 30, an MS of 10, and an S of 9. Test 2 has a GW of 70, an MS of 10, and an S of 10. So the total score for the subject is (9/10)*30% + (10/10)*70% = 97%."
                                    type="info"
                                    showIcon
                                />
                            </Col>
                        </Row>
                        <p>Name</p>
                        <Input onChange={handleChangeAddName} value={submitTest.name}></Input>
                        <p>Grade weight (total = 100)</p>

                        <InputNumber
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
                        <Flex wrap align="center" gap={5}>
                            <InputNumber
                                onChange={handleChangeAddScore}
                                value={submitTest.score}
                                min={-1}
                                max={100}
                                step="0.1"
                                style={{ height: '32px' }}
                            />
                            <Alert
                                style={{ maxWidth: '270px' }}
                                message="Leave -1.0 if you haven't done yet."
                                type="info"
                                showIcon
                            ></Alert>
                        </Flex>
                        <p>Date</p>
                        <DatePicker
                            format={{
                                format: 'YYYY-MM-DD',
                                type: 'mask',
                            }}
                            onChange={handleChangeAddDate}
                            value={dayjs(submitTest.date)}
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
            <Row>
                <Col span={24} style={{ padding: '0 20px 20px 20px' }}>
                    <Alert
                        message={"If the current value is N, it means the test hasn't been graded yet"}
                        showIcon
                    ></Alert>
                </Col>
            </Row>
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
                                            <Flex justify="center" style={{ width: '100px', height: '50px' }}>
                                                <Title style={{ color: 'white' }}>
                                                    {test.score === -1 ? 'N' : test.score}
                                                </Title>
                                            </Flex>
                                            <p style={{ color: 'white' }}>{test.name}</p>
                                        </Flex>
                                        <Flex gap={5} align="center">
                                            <Badge count={moment(test.date).format('DD/MM/YYYY')}></Badge>
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
                                                    value={
                                                        currentSubmitTest.score === -1 ? 0.1 : currentSubmitTest.score
                                                    }
                                                    min={0}
                                                    max={100}
                                                    step="0.1"
                                                />
                                                <p>Date</p>
                                                <DatePicker
                                                    format={{
                                                        format: 'YYYY-MM-DD',
                                                        type: 'mask',
                                                    }}
                                                    onChange={handleChangeDate}
                                                    value={dayjs(currentSubmitTest.date)}
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
