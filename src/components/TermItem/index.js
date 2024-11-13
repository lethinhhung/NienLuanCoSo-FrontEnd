import classNames from 'classnames/bind';
import { Card, Popconfirm, Button, Tooltip, Row, Col, Divider, Badge } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './TermItem.module.scss';

import convertAvatarPath from '~/utils/convertAvatarPath';
import { deleteTermApi } from '~/utils/api';

import defaultCourseCover from '../../assets/images/default-term-cover.jpg';
import NotificationContext from '~/contexts/NotificationContext';
import { useContext } from 'react';

function TermItem({ data, loading, onDelete }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const { showNotification } = useContext(NotificationContext);
    const currentDate = new Date();
    const termStartDate = new Date(data.startDate);
    const termEndDate = new Date(data.endDate);
    let status = {
        status: '',
        color: '',
    };
    if (currentDate > termEndDate) {
        status = {
            status: 'Completed',
            color: 'blue',
        };
    } else if (currentDate <= termEndDate && currentDate >= termStartDate) {
        status = {
            status: 'In progress',
            color: 'red',
        };
    } else {
        status = {
            status: 'Incoming',
            color: 'green',
        };
    }

    const handleEdit = () => {
        navigate('/term/' + data._id);
    };

    const handleDelete = async () => {
        await deleteTermApi(data._id);
        if (onDelete) {
            onDelete();
        }
        showNotification('Term Deleted Successfully', '', 'success');
    };

    const { Meta } = Card;

    const startDate = new Date(data.startDate).toLocaleDateString() + ' -';
    const endDate = new Date(data.endDate).toLocaleDateString();

    const truncateDescription = (description) => {
        return description.length > 60 ? description.substring(0, 60) + '...' : description;
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Badge.Ribbon text={`${startDate} ${endDate}`}>
                <Card
                    style={{ backgroundColor: data.color, marginBottom: '1px' }}
                    hoverable
                    loading={loading}
                    bordered={false}
                    className={cx('wrapper')}
                    actions={[
                        <Tooltip title="Edit this term" placement="bottom">
                            <Button type="text" onClick={handleEdit}>
                                <EditOutlined />
                            </Button>
                        </Tooltip>,
                        <Popconfirm
                            title="Delete the term"
                            description="Are you sure to delete this term?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip title="Delete this term" placement="bottom">
                                <Button type="text">
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                        </Popconfirm>,
                    ]}
                >
                    <Row style={{ marginTop: '10px', minHeight: '80px' }}>
                        <Col span={20}>
                            <Meta
                                avatar={<h1>{data.emoji}</h1>}
                                title={<h3>{data.name}</h3>}
                                description={truncateDescription(data.description)}
                            />
                        </Col>
                        <Col span={4}>
                            <Badge count={status.status} color={status.color}></Badge>
                        </Col>
                    </Row>

                    <Divider orientation="left"></Divider>

                    <Row>
                        <Col span={24}>
                            <img
                                style={{ borderRadius: '10px', aspectRatio: '16/9', objectFit: 'cover' }}
                                width={'100%'}
                                src={data.cover === '' ? defaultCourseCover : convertAvatarPath(data.cover)}
                                alt="cover"
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}></Col>
                    </Row>

                    <Row>
                        <Col span={24}></Col>
                    </Row>
                </Card>
            </Badge.Ribbon>
        </div>
    );
}

export default TermItem;
