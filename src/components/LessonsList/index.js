import { Card, List, Avatar } from 'antd';
import classNames from 'classnames/bind';

import styles from './LessonsList.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
function LessonsList() {
    const cx = classNames.bind(styles);

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const { width } = useWindowDimensions();
    return (
        <Card className={cx('lessons-list')} hoverable title="Lessons" bordered={false}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default LessonsList;
