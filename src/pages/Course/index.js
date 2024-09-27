import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './Course.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import CustomList from '~/components/CustomList';
import TagsDrawer from '~/components/TagsDrawer';
import EditDiscription from '~/components/EditDiscription';
import ProgressionOverview from '~/components/ProgressionOverview';

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

    const data = [
        // {
        //     title: 'Ant Design Title 1',
        // },
        // {
        //     title: 'Ant Design Title 2',
        // },
        // {
        //     title: 'Ant Design Title 3',
        // },
        // {
        //     title: 'Ant Design Title 4',
        // },
    ];
    return (
        <Flex className={cx('wrapper')} wrap vertical align="center">
            <div className={cx('image-wrapper')}>
                <div className={cx('image')}>
                    <Image
                        style={{
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            borderRadius: '20px',
                            boxShadow: 'rgba(99, 99, 99, 0.8) 0px 2px 8px 0px',
                            border: 'solid #624e88',
                        }}
                        width={'100%'}
                        preview={false}
                        src="https://images.unsplash.com/photo-1693590229281-6a78deecd122?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </div>
            </div>
            <Card
                className={cx('overview')}
                hoverable
                title="Course overview"
                bordered={false}
                extra={<EditDiscription type="course" />}
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
                    <Flex style={{ width: '100%' }} wrap justify="space-between" align="center">
                        <p style={{ padding: '10px' }}>Term</p>
                        <TagsDrawer />
                    </Flex>
                </Row>
                <Divider />

                {/* <Flex wrap justify="space-evenly">
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
                </Row> */}
                <ProgressionOverview></ProgressionOverview>
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
                <CustomList title="Lessons" data={data} type="course" />
            </div>
        </Flex>
    );
}

export default Course;
