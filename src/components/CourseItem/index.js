import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Spin, Tooltip, Badge, Flex } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './CourseItem.module.scss';
import TagsDrawer from '../TagsDrawer';
import { useConvertAvatarPath } from '~/hooks';
import { useEffect, useState } from 'react';
import { deleteCourseApi } from '~/utils/api';

function CourseItem({ data, loading, onDelete, termsInfo }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const handleEdit = () => {
        console.log('Edit course');
        navigate('/course/' + data._id);
    };

    const handleDelete = () => {
        deleteCourseApi(data._id);
        if (onDelete) {
            onDelete(data._id);
        }
        console.log('Delete course');
        window.location.reload();
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
    }

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
    } else if (currentDate < termEndDate && currentDate > termStartDate) {
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

    return (
        <Badge.Ribbon text={`${startDate} ${endDate}`}>
            <Card
                style={{ backgroundColor: data.color }}
                hoverable
                loading={loading}
                bordered={false}
                className={cx('wrapper')}
                cover={<img className={cx('cover-img')} src={useConvertAvatarPath(data.cover)} alt="cover" />}
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
                <Flex wrap justify="flex-end" style={{ margin: '-10px -10px 20px 0' }}>
                    <Badge count={status.status} color={status.color}></Badge>
                </Flex>
                <Meta avatar={<h1>{data.emoji}</h1>} title={data.name} description={data.description} />
                <div className={cx('tags-drawer')}>
                    <TagsDrawer tagsIds={data.tags} isDefault={false}></TagsDrawer>
                </div>
            </Card>
        </Badge.Ribbon>
    );
}

export default CourseItem;
