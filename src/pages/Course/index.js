import { Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './Course.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import LessionsList from '~/components/LessionsList';

function Course() {
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
            <Card
                className={cx('overview')}
                hoverable
                title="Course overview"
                bordered={false}
                extra={<a href="#">Edit description</a>}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Description"
                    description="This is the description"
                />

                <Divider />
                <Row>
                    <h4>Infomations</h4>
                </Row>
                <Row>
                    <p style={{ padding: '10px' }}>Term, Tags</p>
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

            <div className={cx('notes-wrapper')}>
                <Card hoverable className={cx('notes')} title="Notes">
                    <TextArea
                        placeholder="Course notes..."
                        autoSize={{
                            minRows: 2,
                        }}
                    />
                </Card>
            </div>

            <div className={cx('lessions-list-wrapper')}>
                <LessionsList />
            </div>
        </Flex>
    );
}

export default Course;
