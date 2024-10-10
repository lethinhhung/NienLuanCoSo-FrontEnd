import { Image, Avatar, Card, Flex, Divider, Row, Input, Popconfirm, Button, List } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './Course.module.scss';
import CustomList from '~/components/CustomList';
import TagsDrawer from '~/components/TagsDrawer';
import EditDescription from '~/components/EditDescription';
import ProgressionOverview from '~/components/ProgressionOverview';
import { getCourseInfoApi, getCoursesInfoApi } from '~/utils/api';
import defaultTagsData from '~/components/DefaultTagColor';
import { useConvertAvatarPath } from '~/hooks';

function Course() {
    const cx = classNames.bind(styles);
    const { courseId } = useParams();

    const { Meta } = Card;

    const { TextArea } = Input;

    const [courseInfo, setCourseInfo] = useState({});

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const courseData = await getCourseInfoApi(courseId);

            setCourseInfo(courseData);
        };

        fetchCourseInfo();
    }, []);

    const data = [
        {
            key: 1,
            title: 'hehe',
        },
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
                        src={useConvertAvatarPath(courseInfo.cover)}
                    />
                </div>
            </div>
            <Card
                className={cx('overview')}
                hoverable
                title="Course overview"
                bordered={false}
                extra={<EditDescription type="course" />}
            >
                <Meta avatar={<h1>{courseInfo.emoji}</h1>} title="Description" description={courseInfo.description} />

                <Divider />
                <Row>
                    <h4>Infomations</h4>
                </Row>
                <Row>
                    <Flex style={{ width: '100%' }} wrap justify="space-between" align="center">
                        <p style={{ padding: '10px' }}>Term</p>
                        <TagsDrawer tagsIds={courseInfo.tags} isDefault={false} />
                    </Flex>
                </Row>
                <Divider />

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
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{
                                backgroundColor: item.color,
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '5px',
                                padding: '10px',
                            }}
                            actions={[
                                <Popconfirm
                                    title={'Remove this '}
                                    description={'Are you sure to remove this '}
                                    okText="Delete"
                                    cancelText={'Remove from this '}
                                >
                                    <Button>
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<h1>{item.emoji}</h1>}
                                title={<Link to="/course/hehe/lesson">{item.title}</Link>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                ></List>
            </div>
        </Flex>
    );
}

export default Course;
