import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './CourseItem.module.scss';
import TagsDrawer from '../TagsDrawer';

function CourseItem({ data }) {
    const cx = classNames.bind(styles);

    const handleEdit = () => {
        console.log('Edit course');
    };

    const handleDelete = () => {
        console.log('Delete course');
    };

    const { Meta } = Card;
    return (
        <Card
            bordered={false}
            className={cx('wrapper')}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[
                <Button type="text" onClick={handleEdit}>
                    <EditOutlined />
                </Button>,
                <Popconfirm
                    title="Delete the course"
                    description="Are you sure to delete this course?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="text">
                        <DeleteOutlined />
                    </Button>
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
