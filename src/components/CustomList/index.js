import { Modal, Card, List, Avatar, Button, Popconfirm, Input } from 'antd';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LessonsList.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';

function CustomList({ title = '', data, type = 'term' }) {
    const cx = classNames.bind(styles);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { width } = useWindowDimensions();

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
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
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
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<Link to="/course/hehe/lesson">{item.title}</Link>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            ></List>
        </Card>
    );
}

export default CustomList;
