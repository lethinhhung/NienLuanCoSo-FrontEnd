import classNames from 'classnames/bind';
import { Card, Popconfirm, Button, Tooltip, Badge, Flex, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './CourseItemFake.module.scss';
import TagsDrawer from '../TagsDrawer';
import convertAvatarPath from '~/utils/convertAvatarPath';
import { deleteCourseApi } from '~/utils/api';
import defaultCourseCover from '../../assets/images/default-course-cover.png';
import moment from 'moment';
import fakeImage from '~/assets/images/default-course-cover.png';

function CourseItemFake({ data }) {
    const { Meta } = Card;

    const cx = classNames.bind(styles);

    return (
        <Card
            bordered={false}
            style={{ backgroundColor: data.color }}
            hoverable
            className={cx('wrapper')}
            cover={<img className={cx('cover-img')} src={data.img} alt="cover" />}
            actions={[
                <Tooltip title="Edit this course" placement="bottom">
                    <Button type="text">
                        <EditOutlined />
                    </Button>
                </Tooltip>,
                <Popconfirm
                    title="Delete the course"
                    description="Are you sure to delete this course?"
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
            <div style={{ minHeight: '150px' }}>
                <Flex wrap justify="flex-end" style={{ margin: '-10px -10px 20px 0' }}>
                    <Badge count={'In progress'} color={data.badgeColor}></Badge>
                </Flex>
                <Meta avatar={<h1>{data.emoji}</h1>} title={data.name} description={data.description} />
                <div className={cx('tags-drawer')}>
                    {/* <TagsDrawer tagsIds={data.tags} isDefault={false}></TagsDrawer> */}
                    <Flex justify="flex-end" wrap gap="5px 0">
                        <Tag style={{ cursor: 'pointer' }} color="blue">
                            Code
                        </Tag>
                        <Tag style={{ cursor: 'pointer' }} color="red">
                            React
                        </Tag>
                        <Tag style={{ cursor: 'pointer' }} color="yellow">
                            Web
                        </Tag>
                        <Tag style={{ cursor: 'pointer' }} color="green">
                            Javascript
                        </Tag>
                    </Flex>
                </div>
            </div>
        </Card>
    );
}

export default CourseItemFake;
