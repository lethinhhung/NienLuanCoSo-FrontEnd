import { Modal, Card, List, Avatar, Button, Popconfirm, Input, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LessonsList.module.scss';
import {
    addCourseToTerm,
    addCourseToTermApi,
    getCourseInfoApi,
    getCoursesInfoApi,
    getCoursesInfoByIdsApi,
    removeCourseFromTermApi,
} from '~/utils/api';

function CustomList({
    title = '',
    data,
    type = 'term',
    id = '',
    isModalVisible,
    setIsModalVisible,
    fetchData,
    setFetchData,
}) {
    const cx = classNames.bind(styles);

    const transformData = (inputData) => {
        return inputData.map((item) => ({
            id: item._id,
            emoji: item.emoji,
            title: item.name,
            color: item.color,
            description: item.description,
        }));
    };

    const [transformedData, setTransformedData] = useState();
    const [transformedCoursesData, setTransformedCoursesData] = useState();

    const navigate = useNavigate();

    let handleAdd = () => {
        if (type === 'term') {
            navigate('/create-new-course');
        } else {
            //goi API
            navigate('/course/lesson/:name');
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //Goi API
        setIsModalVisible(false);
        handleAdd();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddCourse = async (value) => {
        const courseId = value;
        const termId = id;
        const result = await addCourseToTermApi(termId, courseId);
        if (fetchData === false) {
            setFetchData(true);
        } else setFetchData(false);
        console.log(result);
    };

    let childType = '';
    if (type === 'term') {
        childType = 'course';
    } else {
        childType = 'lesson';
    }

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const coursesData = await getCoursesInfoByIdsApi(data);
            const allCoursesData = await getCoursesInfoApi();

            const filteredCoursesData = allCoursesData.filter((course) => course.term !== id);
            setTransformedCoursesData(transformData(filteredCoursesData));
            setTransformedData(transformData(coursesData));
        };

        fetchCourseInfo();
    }, [data, isModalVisible, fetchData]);

    const handleRemoveFromTerm = async (courseId) => {
        const termId = id;
        const result = await removeCourseFromTermApi(termId, courseId);
        if (fetchData === false) {
            setFetchData(true);
        } else setFetchData(false);
    };

    const hanldeDeleteCourse = () => {};

    return (
        <Card
            className={cx('lessons-list')}
            hoverable
            title={title}
            bordered={false}
            extra={
                type === 'course' ? (
                    <>
                        <Button onClick={showModal}>Add</Button>
                        <Modal title="Add new lesson" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Input placeholder="Enter lesson name..." />
                        </Modal>
                    </>
                ) : (
                    <>
                        <Button onClick={showModal}>Add</Button>
                        <Modal
                            title="Add current course to this term"
                            open={isModalVisible}
                            footer={[
                                <Button key="cancel" onClick={handleCancel}>
                                    Done
                                </Button>,
                            ]}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={transformedCoursesData}
                                renderItem={(item, index) => (
                                    <List.Item
                                        style={{
                                            backgroundColor: item.color,
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            marginBottom: '5px',
                                            padding: '10px',
                                        }}
                                        actions={[
                                            <Button onClick={() => handleAddCourse(item.id)}>
                                                <PlusOutlined />
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<h1>{item.emoji}</h1>}
                                            title={<Link to={'/course/' + item.id}>{item.title}</Link>}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            ></List>
                        </Modal>
                    </>
                )
            }
        >
            <List
                itemLayout="horizontal"
                dataSource={transformedData}
                renderItem={(item, index) => (
                    <List.Item
                        style={{
                            backgroundColor: item.color,
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginBottom: '5px',
                            padding: '10px',
                        }}
                        actions={[
                            <>
                                <Tooltip title="Delete this course">
                                    <Button style={{ marginRight: '2px' }}>
                                        <DeleteOutlined />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Remove this course from this term">
                                    <Button onClick={() => handleRemoveFromTerm(item.id)}>
                                        <CloseOutlined />
                                    </Button>
                                </Tooltip>
                            </>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<h1>{item.emoji}</h1>}
                            title={<Link to="/course/hehe/lesson">{item.title}</Link>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            ></List>
        </Card>
    );
}

export default CustomList;
