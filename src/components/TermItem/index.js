import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Spin, Tooltip, Row, Col, Image, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './TermItem.module.scss';
import { useEffect, useState } from 'react';
import { useConvertAvatarPath } from '~/hooks';
import { deleteTermApi } from '~/utils/api';

function TermItem({ data, loading }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleEdit = () => {
        console.log('Edit term');
        navigate('/term/hehe');
    };

    const handleDelete = () => {
        deleteTermApi(data._id);
        console.log('Delete term');
    };

    const { Meta } = Card;
    return (
        <Card
            style={{ backgroundColor: data.color }}
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
            <Row>
                <Col span={24}>
                    <img width={'100%'} src={useConvertAvatarPath(data.cover)} alt="cover" />
                </Col>
            </Row>
            <Divider></Divider>
            <Row>
                <Col span={24}>
                    <Meta avatar={<h1>{data.emoji}</h1>} title={data.name} description={data.description} />
                </Col>
            </Row>
        </Card>
    );
}

export default TermItem;
