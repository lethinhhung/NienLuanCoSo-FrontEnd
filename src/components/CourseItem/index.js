import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Spin, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './CourseItem.module.scss';
import TagsDrawer from '../TagsDrawer';
import { useEffect, useState } from 'react';

function CourseItem({ data, loading }) {
    const cx = classNames.bind(styles);

    const handleEdit = () => {
        console.log('Edit course');
    };

    const handleDelete = () => {
        console.log('Delete course');
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
            cover={coverImg}
            actions={[
                <Tooltip title="Edit this course" placement="bottom">
                    <Button type="text" onClick={handleEdit}>
                        <EditOutlined />
                    </Button>
                </Tooltip>,
                <Popconfirm
                    title="Delete the course"
                    description="Are you sure to delete this course?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title="Delete this course" placement="bottom">
                        <Button type="text">
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                </Popconfirm>,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="Card title"
                description="This is the description"
            />
            <div className={cx('tags-drawer')}>
                <TagsDrawer></TagsDrawer>
            </div>
        </Card>
    );
}

export default CourseItem;
