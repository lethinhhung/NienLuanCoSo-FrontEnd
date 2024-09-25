import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Spin, Tooltip, Row, Col, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './TermItem.module.scss';
import TagsDrawer from '../TagsDrawer';
import { useEffect, useState } from 'react';

function TermItem({ data, loading }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleEdit = () => {
        console.log('Edit term');
        navigate('/term/hehe');
    };

    const handleDelete = () => {
        console.log('Delete term');
    };

    const img = (
        <Spin
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className={cx('cover-img')}
            size="large"
        />
    );

    const [coverImg, setCoverImg] = useState(img);

    useEffect(() => {
        if (loading === false) {
            setCoverImg(
                <img
                    className={cx('cover-img')}
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />,
            );
        }
    }, [loading]);

    const { Meta } = Card;
    return (
        <Card
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
                <Col span={16}>
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Col>
                <Col span={8}>
                    <Image src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                </Col>
            </Row>
        </Card>
    );
}

export default TermItem;
