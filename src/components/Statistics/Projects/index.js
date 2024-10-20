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
} from 'antd';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';

import styles from './Projects.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';

function Projects({ statisticsInfo, projectsInfo }) {
    const { Meta } = Card;
    const { Title } = Typography;
    const cx = classNames.bind(styles);
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

    return (
        <Card
            className={cx('overview')}
            hoverable
            title="Projects"
            bordered={false}
            extra={
                <>
                    <Button onClick={showModal}>
                        <EditOutlined />
                    </Button>
                    <Modal title="Edit projects" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}></Modal>
                </>
            }
        >
            <Row>
                <Flex style={{ width: '100%' }} justify="space-between" align="center">
                    <Flex gap={10} justify="flex-start" align="center">
                        <Title level={3}>Completed</Title>
                        <Badge
                            style={{ marginTop: '-7px' }}
                            count={statisticsInfo.completedProjects + ' project(s)'}
                        ></Badge>
                    </Flex>
                    <Tooltip
                        title={
                            statisticsInfo.completedProjects +
                            '/' +
                            statisticsInfo.totalProjects +
                            ' project(s) completed'
                        }
                    >
                        <Progress
                            type="circle"
                            steps={{
                                count: statisticsInfo.totalProjects,
                                gap: 2,
                            }}
                            percent={
                                statisticsInfo.totalProjects === 0
                                    ? '0'
                                    : ((statisticsInfo.completedProjects / statisticsInfo.totalProjects) * 100).toFixed(
                                          1,
                                      )
                            }
                            trailColor="rgba(0, 0, 0, 0.06)"
                        />
                    </Tooltip>
                </Flex>
            </Row>
            <Divider></Divider>
            <Row style={{ marginBottom: '10px' }}>
                <Title level={3}>Projects progression</Title>
            </Row>
            <Row>
                <Flex style={{ width: '100%' }} justify="center">
                    <Flex vertical style={{ maxWidth: '700px', width: '100%' }}>
                        {statisticsInfo.totalProjects !== 0 ? (
                            projectsInfo.map((project, index) => (
                                <Card style={{ marginBottom: '10px' }} key={index} hoverable title={project.name}>
                                    <Tooltip
                                        title={
                                            project.completedSteps === project.totalSteps
                                                ? 'Completed'
                                                : project.completedSteps +
                                                  '/' +
                                                  project.totalSteps +
                                                  ' step(s) completed'
                                        }
                                    >
                                        <Progress percent={(project.completedSteps / project.totalSteps) * 100} />
                                        <Divider></Divider>
                                        {project.steps.map((step, index) => (
                                            <Row key={index} style={{ marginTop: '2px' }}>
                                                <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                                                    <Badge
                                                        status={step.status === true ? 'success' : 'processing'}
                                                        text={step.name}
                                                    ></Badge>
                                                    {step.status === true ? (
                                                        <Badge
                                                            style={{ marginLeft: '5px' }}
                                                            color="green"
                                                            count={'Done'}
                                                        ></Badge>
                                                    ) : (
                                                        <Badge
                                                            style={{ marginLeft: '2px' }}
                                                            color="blue"
                                                            count={'On working'}
                                                        ></Badge>
                                                    )}
                                                </Flex>
                                            </Row>
                                        ))}
                                    </Tooltip>
                                </Card>
                            ))
                        ) : (
                            <Flex justify="center" style={{ marginTop: '20px' }}>
                                <Badge count={'Empty'}></Badge>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Row>
        </Card>
    );
}

export default Projects;
