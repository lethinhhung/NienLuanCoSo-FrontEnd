import { Card, Flex, Divider, Progress, Select, Row, Col, Button } from 'antd';
import classNames from 'classnames/bind';

import styles from './Course.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import LessionsList from '~/components/LessionsList';

function Course() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();

    return (
        <Flex className={cx('wrapper')} wrap vertical align="center">
            <Card
                className={cx('overview')}
                hoverable
                title="Course overview"
                bordered={false}
                extra={<a href="#">Edit description</a>}
            >
                <Row>
                    <h4>Description</h4>
                </Row>
                <Row>
                    <p style={{ padding: '10px' }}>This is the description...</p>
                </Row>
                <Divider />

                <Flex wrap justify="space-evenly">
                    <div className={cx('progression-wrapper')}>
                        <p>Progression</p>
                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>
                    </div>
                    <div className={cx('progression-wrapper')}>
                        <p>Tests</p>

                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>
                    </div>
                    <div className={cx('progression-wrapper')}>
                        <p>Projects</p>

                        <Flex justify="center">
                            <Progress type="circle" percent={75} />
                        </Flex>
                    </div>
                </Flex>
                <Row>
                    <Button>Edit/Add</Button>
                </Row>
            </Card>

            <div className={cx('lessions-list-wrapper')}>
                <LessionsList />
            </div>
        </Flex>
    );
}

export default Course;
