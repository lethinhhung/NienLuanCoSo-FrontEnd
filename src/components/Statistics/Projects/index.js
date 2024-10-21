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
    InputNumber,
    Popconfirm,
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

import styles from './Projects.module.scss';
import Bar from '~/components/Charts/Bar';
import getScoreColor from '~/utils/getScoreColor';
import {
    createNewProjectApi,
    createNewProjectStepApi,
    deleteProjectApi,
    deleteProjectStepApi,
    updateProjectStepApi,
} from '~/utils/api';

function Projects({ statisticsInfo, projectsInfo, onProjectsChange }) {
    const { Meta } = Card;
    const { Title } = Typography;
    const cx = classNames.bind(styles);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isAddStepModalVisible, setIsAddStepModalVisible] = useState(false);
    const [isEditStepModalVisible, setIsEditStepModalVisible] = useState(false);

    const [submitProject, setSubmitProject] = useState({
        name: '',
        totalSteps: 0,
        completedSteps: 0,
    });

    const [currentProject, setCurrentProject] = useState({});
    const [submitStep, setSubmitStep] = useState({
        name: '',
        status: false,
    });
    const [currentStep, setCurrentStep] = useState({});

    // Modal
    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const showAddStepModal = (project) => {
        setCurrentProject(project);
        setIsAddStepModalVisible(true);
    };

    const showEditStepModal = (step, project) => {
        setCurrentProject(project);
        setCurrentStep(step);
        setSubmitStep(step);
        setIsEditStepModalVisible(true);
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
        setIsAddStepModalVisible(false);
        setIsEditStepModalVisible(false);
        setCurrentProject({});
        setSubmitProject({
            name: '',
            totalSteps: 0,
            completedSteps: 0,
        });
        setSubmitStep({
            name: '',
            status: false,
        });
        setCurrentStep({});
    };

    // Add project
    const handleChangeAddName = (e) => {
        setSubmitProject({ ...submitProject, name: e.target.value });
    };

    const handleAddOk = async () => {
        //Goi API
        if (submitProject.name === '') {
            alert('Enter project name...');
            return;
        }
        const statisticsId = statisticsInfo._id;
        const { name, totalSteps, completedSteps } = submitProject;
        const result = await createNewProjectApi(name, totalSteps, completedSteps, statisticsId);
        console.log(result);
        setIsAddModalVisible(false);
        setCurrentProject({});
        setSubmitProject({
            name: '',
            totalSteps: 0,
            completedSteps: 0,
        });
        setSubmitStep({
            name: '',
            status: false,
        });
        setCurrentStep({});
        onProjectsChange();
    };

    // Add project step
    const handleChangeAddStepStatus = (value) => {
        setSubmitStep({
            ...submitStep,
            status: value,
        });
    };

    const handleChangeAddStepName = (e) => {
        setSubmitStep({
            ...submitStep,
            name: e.target.value,
        });
    };

    const handleAddStepOk = async () => {
        //Goi API
        if (submitStep.name === '') {
            alert('Enter project step name...');
            return;
        }
        const projectId = currentProject._id;
        const { name, status } = submitStep;
        const result = await createNewProjectStepApi(name, projectId, status);
        console.log(result);
        setIsAddStepModalVisible(false);
        setCurrentProject({});
        setSubmitProject({
            name: '',
            totalSteps: 0,
            completedSteps: 0,
        });
        setSubmitStep({
            name: '',
            status: false,
        });
        setCurrentStep({});
        onProjectsChange();
    };

    // Edit step

    const handleChangeEditStepName = async (e) => {
        setSubmitStep({
            ...submitStep,
            name: e.target.value,
        });
    };
    const handleChangeEditStepStatus = async (value) => {
        setSubmitStep({
            ...submitStep,
            status: value,
        });
    };

    const handleEditStepOk = async () => {
        //Goi API
        if (submitStep.name === '') {
            alert('Enter project step name...');
            return;
        }
        const projectStepId = currentStep._id;
        const { name, status } = submitStep;
        console.log(projectStepId);
        const result = await updateProjectStepApi(projectStepId, status, name);
        console.log(result);
        setIsEditStepModalVisible(false);
        setCurrentProject({});
        setSubmitProject({
            name: '',
            totalSteps: 0,
            completedSteps: 0,
        });
        setSubmitStep({
            name: '',
            status: false,
        });
        setCurrentStep({});
        onProjectsChange();
    };

    // Delete step

    const handleSelectDeleteStep = (step) => {
        setCurrentStep(step);
    };

    const handleDeleteStep = async () => {
        const projectStepId = currentStep._id;
        await deleteProjectStepApi(projectStepId);
        onProjectsChange();
    };

    // Delete project

    const handleSelectDeleteProject = (project) => {
        setCurrentProject(project);
    };

    const handleDeleteProject = async () => {
        const projectId = currentProject._id;
        await deleteProjectApi(projectId);
        onProjectsChange();
    };

    return (
        <Card
            className={cx('overview')}
            hoverable
            title="Projects"
            bordered={false}
            extra={
                <>
                    <Button onClick={showAddModal}>
                        <PlusOutlined />
                    </Button>
                    <Modal title="Add project" open={isAddModalVisible} onOk={handleAddOk} onCancel={handleCancel}>
                        <p>Name</p>
                        <Input onChange={handleChangeAddName} value={submitProject.name}></Input>
                    </Modal>
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
                                <Card
                                    style={{ marginBottom: '10px' }}
                                    key={index}
                                    hoverable
                                    title={project.name}
                                    extra={
                                        <>
                                            <Button onClick={() => showAddStepModal(project)}>
                                                <PlusOutlined />
                                            </Button>
                                            <Popconfirm
                                                title={'Delete ' + currentProject.name}
                                                onConfirm={handleDeleteProject}
                                            >
                                                <Button
                                                    style={{ marginLeft: '5px' }}
                                                    onClick={() => handleSelectDeleteProject(project)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Popconfirm>
                                            <Modal
                                                title={'Add step to ' + currentProject.name}
                                                open={isAddStepModalVisible}
                                                onCancel={handleCancel}
                                                onOk={handleAddStepOk}
                                            >
                                                <p>Name</p>
                                                <Input
                                                    onChange={handleChangeAddStepName}
                                                    value={submitStep.name}
                                                ></Input>
                                                <p>Status</p>
                                                <Select
                                                    defaultValue="false"
                                                    style={{ width: 120 }}
                                                    onChange={handleChangeAddStepStatus}
                                                    options={[
                                                        { value: 'true', label: 'Completed' },
                                                        { value: 'false', label: 'On working' },
                                                    ]}
                                                />
                                            </Modal>
                                        </>
                                    }
                                >
                                    <Tooltip
                                        title={
                                            project.totalSteps === 0
                                                ? '0 step added'
                                                : project.completedSteps === project.totalSteps
                                                ? 'Completed'
                                                : project.completedSteps +
                                                  '/' +
                                                  project.totalSteps +
                                                  ' step(s) completed'
                                        }
                                    >
                                        <Progress
                                            percent={((project.completedSteps / project.totalSteps) * 100).toFixed(1)}
                                        />
                                        <Divider></Divider>
                                        {project.steps.map((step, index) => (
                                            <Row key={index} style={{ marginTop: '2px' }}>
                                                <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                                                    <Badge
                                                        status={step.status === true ? 'success' : 'processing'}
                                                        text={step.name}
                                                    ></Badge>

                                                    <Flex align="center">
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
                                                        <Button
                                                            style={{ marginLeft: '5px' }}
                                                            size="small"
                                                            shape="circle"
                                                            onClick={() => showEditStepModal(step, project)}
                                                        >
                                                            <EditOutlined />
                                                        </Button>
                                                        <Popconfirm
                                                            title={'Delete ' + currentStep.name}
                                                            onConfirm={handleDeleteStep}
                                                        >
                                                            <Button
                                                                style={{ marginLeft: '5px' }}
                                                                size="small"
                                                                shape="circle"
                                                                onClick={() => handleSelectDeleteStep(step)}
                                                            >
                                                                <DeleteOutlined />
                                                            </Button>
                                                        </Popconfirm>
                                                        <Modal
                                                            open={isEditStepModalVisible}
                                                            onCancel={handleCancel}
                                                            title={
                                                                'Edit project ' +
                                                                currentProject.name +
                                                                ' | ' +
                                                                currentStep.name
                                                            }
                                                            onOk={handleEditStepOk}
                                                        >
                                                            <p>Name</p>
                                                            <Input
                                                                value={submitStep.name}
                                                                onChange={handleChangeEditStepName}
                                                            ></Input>
                                                            <p>Status</p>
                                                            <Select
                                                                value={submitStep.status}
                                                                style={{ width: 120 }}
                                                                onChange={handleChangeEditStepStatus}
                                                                options={[
                                                                    { value: 'true', label: 'Completed' },
                                                                    { value: 'false', label: 'On working' },
                                                                ]}
                                                            />
                                                        </Modal>
                                                    </Flex>
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
