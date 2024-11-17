import { Modal, Card, List, Button, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './LessonsList.module.scss';
import { addCourseToTermApi, getCoursesInfoApi, getCoursesInfoByIdsApi, removeCourseFromTermApi } from '~/utils/api';
import NotificationContext from '~/contexts/NotificationContext';

function CustomList({ title = '', data, id = '', isModalVisible, setIsModalVisible, fetchData }) {
    const cx = classNames.bind(styles);
    const { showNotification } = useContext(NotificationContext);

    const transformData = (inputData) => {
        return inputData.map((item) => ({
            id: item._id,
            emoji: item.emoji,
            title: item.name,
            color: item.color,
            description: item.description,
        }));
    };

    const [loading, setLoading] = useState(true);

    const [transformedData, setTransformedData] = useState();
    const [transformedCoursesData, setTransformedCoursesData] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddCourse = async (value) => {
        const courseId = value;
        const termId = id;
        await addCourseToTermApi(termId, courseId);
        showNotification('Course added', '', 'success');
        fetchData();
        // if (fetchData === false) {
        //     setFetchData(true);
        // } else setFetchData(false);
    };

    const fetchCourseInfo = async () => {
        setLoading(true);
        const coursesData = await getCoursesInfoByIdsApi(data);
        const allCoursesData = await getCoursesInfoApi();

        const filteredCoursesData = allCoursesData.filter((course) => course.term !== id && course.term === null);
        setTransformedCoursesData(transformData(filteredCoursesData));
        setTransformedData(transformData(coursesData));
        setLoading(false);
    };
    useEffect(() => {
        fetchCourseInfo();
    }, [data, isModalVisible, fetchData, id]);

    const handleRemoveFromTerm = async (courseId) => {
        const termId = id;
        await removeCourseFromTermApi(termId, courseId);
        showNotification('Course removed', '', 'success');
        fetchData();
    };

    return (
        <Card
            loading={loading}
            className={cx('lessons-list')}
            hoverable
            title={title}
            bordered={false}
            extra={
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
                        onCancel={handleCancel}
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
                                        <DeleteOutlined style={{ color: 'red' }} />
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
                            title={<Link to={'/course/' + item.id}>{item.title}</Link>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            ></List>
        </Card>
    );
}

export default CustomList;
