import classNames from 'classnames/bind';
import { Card, Avatar, Popconfirm, Button, Tag, Flex } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './TagsDrawer.module.scss';

function TagsDrawer(data) {
    const cx = classNames.bind(styles);

    const tags = [
        {
            key: '1',
            name: 'English',
            color: 'red',
        },
        {
            key: '2',
            name: 'Math',
            color: 'green',
        },
        {
            key: '3',
            name: 'Physic',
            color: 'blue',
        },
        {
            key: '4',
            name: 'Science',
            color: 'yellow',
        },
        {
            key: '5',
            name: 'History',
            color: 'grey',
        },
        {
            key: '6',
            name: 'Music',
            color: 'black',
        },
    ];
    return (
        <Flex justify="flex-end" wrap gap="5px 0" className={cx('wrapper')}>
            {tags.map((result) => (
                <Tag key={result.key} color={result.color}>
                    {result.name}
                </Tag>
            ))}
        </Flex>
    );
}

export default TagsDrawer;
