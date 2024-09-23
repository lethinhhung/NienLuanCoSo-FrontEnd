import { Card, Flex, Divider, Progress, Select, Row, Col, List, Avatar } from 'antd';
import classNames from 'classnames/bind';

import styles from './LessionsList.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
function LessionsList() {
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
        <Card className={cx('lessions-list')} hoverable title="Lessions" bordered={false}>
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

export default LessionsList;
