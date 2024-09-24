import { useEffect, useRef, useState } from 'react';
import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './Lesson.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import Editor from '~/components/Editor';

function Lesson() {
    const cardColor = '#624e88';
    const cx = classNames.bind(styles);

    const { Meta } = Card;

    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();

    return (
        <Flex className={cx('wrapper')} wrap vertical align="center">
            <Flex wrap justify="center" className={cx('overview-wrapper')}>
                <Card
                    className={cx('overview')}
                    hoverable
                    title={<h2>Lesson title</h2>}
                    bordered={false}
                    extra={<a href="#">Edit description</a>}
                >
                    <Meta title="Description" description="This is the description" />
                </Card>
            </Flex>
            <Flex wrap justify="center">
                <div style={{ backgroundColor: cardColor }} className={cx('editor-wrapper')}>
                    <Editor className={cx('editor')} />
                </div>
            </Flex>
        </Flex>
    );
}

export default Lesson;
