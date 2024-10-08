import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Spin, Tooltip, Row, Col, Image, Divider, Badge } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './TermItem.module.scss';
import { useEffect, useState } from 'react';
import { useConvertAvatarPath, useReRender } from '~/hooks';
import { deleteTermApi } from '~/utils/api';
import CustomList from '../CustomList';

function TermItem({ data, loading }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const [renderKey, setRenderKey] = useState(false);

    const handleEdit = () => {
        console.log('Edit term');
        navigate('/term/' + data._id);
    };

    const handleDelete = () => {
        deleteTermApi(data._id);
        console.log('Delete term');
        window.location.reload();
    };

    const { Meta } = Card;

    const startDate = new Date(data.startDate).toLocaleDateString() + ' -';
    const endDate = new Date(data.endDate).toLocaleDateString();
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
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={24}>
                            {' '}
                            <Meta
                                avatar={<h1>{data.emoji}</h1>}
                                title={<h3>{data.name}</h3>}
                                description={data.description}
                            />
                        </Col>
                    </Row>
                    <Divider orientation="left"></Divider>

                    <Row>
                        <Col span={24}>
                            <img
                                style={{ borderRadius: '10px' }}
                                width={'100%'}
                                src={useConvertAvatarPath(data.cover)}
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
                    {/* <CustomList title="Courses" data={data.courses} /> */}
                </Card>
            </Badge.Ribbon>
        </div>
    );
}

export default TermItem;
