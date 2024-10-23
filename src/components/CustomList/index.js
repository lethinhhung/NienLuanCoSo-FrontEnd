import { Modal, Card, List, Button, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './LessonsList.module.scss';
import { addCourseToTermApi, getCoursesInfoApi, getCoursesInfoByIdsApi, removeCourseFromTermApi } from '~/utils/api';

function CustomList({ title = '', data, id = '', isModalVisible, setIsModalVisible, fetchData, setFetchData }) {
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
        const result = await addCourseToTermApi(termId, courseId);
        if (fetchData === false) {
            setFetchData(true);
        } else setFetchData(false);
        console.log(result);
    };

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const coursesData = await getCoursesInfoByIdsApi(data);
            const allCoursesData = await getCoursesInfoApi();

            const filteredCoursesData = allCoursesData.filter((course) => course.term !== id && course.term === null);
            setTransformedCoursesData(transformData(filteredCoursesData));
            setTransformedData(transformData(coursesData));
        };

        fetchCourseInfo();
    }, [data, isModalVisible, fetchData, id]);

    const handleRemoveFromTerm = async (courseId) => {
        const termId = id;
        await removeCourseFromTermApi(termId, courseId);
        if (fetchData === false) {
            setFetchData(true);
        } else setFetchData(false);
    };

    return (
        <Card
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
