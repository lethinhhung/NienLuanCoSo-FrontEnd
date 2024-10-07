import { Modal, Card, List, Avatar, Button, Popconfirm, Input } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LessonsList.module.scss';
import { getCourseInfoApi, getCoursesInfoApi, getCoursesInfoByIdsApi } from '~/utils/api';

function CustomList({ title = '', data, type = 'term' }) {
    const cx = classNames.bind(styles);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const transformData = (inputData) => {
        return inputData.map((item) => ({
            emoji: item.emoji,
            title: item.name,
            color: item.color,
            description: item.description,
        }));
    };

    const [transformedData, setTransformedData] = useState();

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

    let childType = '';
    if (type === 'term') {
        childType = 'course';
    } else {
        childType = 'lesson';
    }

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const coursesData = await getCoursesInfoByIdsApi(data);

            setTransformedData(transformData(coursesData));
        };

        fetchCourseInfo();
    }, [data]);

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
                    <Button onClick={handleAdd}>Add</Button>
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
                            <Popconfirm
                                title={'Remove this ' + childType}
                                description={'Are you sure to remove this ' + childType + '?'}
                                okText="Delete"
                                cancelText={'Remove from this ' + type}
                            >
                                <Button>
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>,
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
