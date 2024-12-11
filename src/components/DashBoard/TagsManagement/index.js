import { Badge, Button, Card, Flex, List, Popconfirm, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './TagsManagement.module.scss';
import { deleteTagByIdApi, getTagsStatisticsApi } from '~/utils/api';
import NotificationContext from '~/contexts/NotificationContext';
import NewTag from '~/components/NewTag';

function TagsManagement() {
    const cx = classNames.bind(styles);
    const { showNotification } = useContext(NotificationContext);

    const [loading, setLoading] = useState(true);
    const [tagsInfo, setTagsInfo] = useState();

    const fetchInfo = async () => {
        const tagsData = await getTagsStatisticsApi();
        setTagsInfo(tagsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchInfo();
    }, [loading]);

    const handleDeleteTag = async (tagId) => {
        const rs = await deleteTagByIdApi(tagId);
        if (rs._id) {
            showNotification('Tag Delete Successfully', '', 'success');
        } else showNotification('Tag Delete Failed', '', 'error');
        setLoading(true);
    };

    const onModalClose = () => {
        fetchInfo();
    };

    return (
        <Card
            style={{ cursor: 'default' }}
            extra={<NewTag onModalClose={onModalClose} />}
            hoverable
            className={cx('large-card')}
            title={'Tags'}
            bordered={false}
            loading={loading}
        >
            <List
                itemLayout="horizontal"
                dataSource={tagsInfo}
                renderItem={(item) => (
                    <List.Item>
                        <Flex style={{ width: '100%' }} wrap align="center" justify="space-between">
                            <Flex wrap gap={10} align="center">
                                <Tag color={item.tag.color}>{item.tag.name}</Tag>
                                <Badge count={item.tagNumber}></Badge>
                            </Flex>
                            <Popconfirm
                                onConfirm={() => handleDeleteTag(item.tag._id)}
                                title={'Delete this tag'}
                                description={'Are you sure to remove this tag?'}
                                okText="Delete"
                                cancelText={'Cancel'}
                            >
                                <Button>
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
                        </Flex>
                    </List.Item>
                )}
            ></List>
        </Card>
    );
}

export default TagsManagement;
