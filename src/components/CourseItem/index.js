import classNames from 'classnames/bind';
import { Card, Popconfirm, Button, Tooltip, Badge, Flex } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './CourseItem.module.scss';
import TagsDrawer from '../TagsDrawer';
import convertAvatarPath from '~/utils/convertAvatarPath';
import { deleteCourseApi } from '~/utils/api';
import defaultCourseCover from '../../assets/images/default-course-cover.png';
import moment from 'moment';
import truncateText from '~/utils/truncateText';

function CourseItem({ data, loading, onDelete, termsInfo }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/course/' + data._id);
    };

    const handleDelete = async () => {
        await deleteCourseApi(data._id);
        if (onDelete) {
            onDelete(data._id);
        }
        console.log('Delete course');
    };

    const { Meta } = Card;

    let startDate;
    let endDate;

    const termInfo = termsInfo.find((term) => term._id === data.term);

    if (data.term) {
        startDate = '';
        endDate = termInfo.name;
    } else {
        startDate = new Date(data.startDate).toLocaleDateString() + ' -';
        endDate = new Date(data.endDate).toLocaleDateString();
        startDate = moment(data.startDate).format('DD/MM/YYYY') + ' -';
        endDate = moment(data.endDate).format('DD/MM/YYYY');
    }

    const currentDate = new Date();
    const courseStartDate = new Date(data.startDate);
    const courseEndDate = new Date(data.endDate);
    let termStartDate;
    let termEndDate;
    if (termInfo !== undefined) {
        termStartDate = new Date(termInfo.startDate);
        termEndDate = new Date(termInfo.endDate);
    }
    let status = {
        status: '',
        color: '',
    };

    if (data.term === null) {
        if (currentDate > courseEndDate) {
            status = {
                status: 'Completed',
                color: 'blue',
            };
        } else if (currentDate <= courseEndDate && currentDate >= courseStartDate) {
            status = {
                status: 'On progress',
                color: 'red',
            };
        } else {
            status = {
                status: 'Incoming',
                color: 'green',
            };
        }
    } else {
        if (currentDate > termEndDate) {
            status = {
                status: 'Completed',
                color: 'blue',
            };
        } else if (currentDate <= termEndDate && currentDate >= termStartDate) {
            status = {
                status: 'On progress',
                color: 'red',
            };
        } else {
            status = {
                status: 'Incoming',
                color: 'green',
            };
        }
    }

    return (
        <Badge.Ribbon text={`${startDate} ${endDate}`}>
            <Card
                bordered={false}
                style={{ backgroundColor: data.color }}
                hoverable
                loading={loading}
                className={cx('wrapper')}
                cover={
                    <img
                        className={cx('cover-img')}
                        src={data.cover === '' ? defaultCourseCover : convertAvatarPath(data.cover)}
                        alt="cover"
                    />
                }
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
                <div style={{ minHeight: '150px' }}>
                    <Flex wrap justify="flex-end" style={{ margin: '-10px -10px 20px 0' }}>
                        <Badge count={status.status} color={status.color}></Badge>
                    </Flex>
                    <Meta
                        avatar={<h1>{data.emoji}</h1>}
                        title={data.name}
                        description={truncateText(data.description, 55)}
                    />
                    <div className={cx('tags-drawer')}>
                        <TagsDrawer tagsIds={data.tags} isDefault={false}></TagsDrawer>
                    </div>
                </div>
            </Card>
        </Badge.Ribbon>
    );
}

export default CourseItem;
