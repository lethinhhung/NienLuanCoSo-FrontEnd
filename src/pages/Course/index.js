import { Image, Avatar, Card, Flex, Divider, Row, Input, Popconfirm, Button, List, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './Course.module.scss';
import CustomList from '~/components/CustomList';
import TagsDrawer from '~/components/TagsDrawer';
import EditDescription from '~/components/EditDescription';
import ProgressionOverview from '~/components/ProgressionOverview';
import {
    createNewLessonApi,
    deleteLessonApi,
    getCourseInfoApi,
    getLessonsInfoByIdsApi,
    getProjectsInfoByIdsApi,
    getStatisticsInfoApi,
    getTestsInfoByIdsApi,
} from '~/utils/api';
import defaultTagsData from '~/components/DefaultTagColor';
import convertAvatarPath from '~/utils/convertAvatarPath';
import defaultCourseCover from '../../assets/images/default-course-cover.png';
import { statistic } from 'antd/es/theme/internal';
import { useProcessData } from '~/hooks';

function Course() {
    const cx = classNames.bind(styles);
    const { courseId } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputLessonName, setInputLessonName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const { Meta } = Card;

    const { TextArea } = Input;

    const [courseInfo, setCourseInfo] = useState({});
    const [transformedData, setTransformedData] = useState();
    const [statisticsInfo, setStatisticsInfo] = useState({});
    const [testsInfo, setTestsInfo] = useState([]);
    const [projectsInfo, setProjectsInfo] = useState([]);
    const [data, setData] = useState({});

    const transformData = (inputData) => {
        return inputData.map((item) => ({
            title: item.name,
            description: item.description,
            _id: item._id,
        }));
    };

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const courseData = await getCourseInfoApi(courseId);
            const lessonsData = await getLessonsInfoByIdsApi(courseData.lessons);
            setCourseInfo(courseData);

            setTransformedData(transformData(lessonsData));
        };

        const fetchInfo = async () => {
            const statisticsData = await getStatisticsInfoApi(courseInfo.statistics);
            setStatisticsInfo(statisticsData);
            if (statisticsData.tests !== null) {
                const testsData = await getTestsInfoByIdsApi(statisticsData.tests);
                setTestsInfo(testsData);
            }
            if (statisticsData.projects !== null) {
                const projectsData = await getProjectsInfoByIdsApi(statisticsData.projects);
                setProjectsInfo(projectsData);
            }
        };

        fetchInfo();

        fetchCourseInfo();
    }, [isModalVisible, courseId, deleteTrigger]);

    // setData(useProcessData(statisticsInfo, testsInfo, projectsInfo));

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        //Goi API
        if (inputLessonName === '') {
            alert('Enter lesson name!');
            return;
        } else if (inputDescription === '') {
            alert('Enter lesson description!');
            return;
        }
        const content = '<p><br></p>';
        const blob = new Blob([content], { type: 'text/html' });

        // Step 2: Create a File from the Blob
        const file = new File([blob], 'content.html', { type: 'text/html' });
        const formData = new FormData();
        formData.append('name', inputLessonName);
        formData.append('content', file);
        formData.append('description', inputDescription);
        formData.append('course', courseInfo._id);

        await createNewLessonApi(formData);
        setInputLessonName('');
        setInputDescription('');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputLessonName = (e) => {
        setInputLessonName(e.target.value);
    };

    const handleInputDescription = (e) => {
        setInputDescription(e.target.value);
    };

    const handleDeleteLesson = async (id) => {
        const lessonId = id;
        const result = await deleteLessonApi(lessonId);
        if (result._id) {
            alert('Lesson deleted');
            setDeleteTrigger(!deleteTrigger);
        }
    };
    console.log(data);

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
                        src={courseInfo.cover === '' ? defaultCourseCover : convertAvatarPath(courseInfo.cover)}
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

                {/* <ProgressionOverview
                    statisticsId={courseInfo.statistics}
                    courseStartDate={courseInfo.startDate}
                    courseEndDate={courseInfo.endDate}
                ></ProgressionOverview> */}
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
                    header={
                        <Flex wrap justify="space-between">
                            <h3>Lessons</h3>
                            <Button onClick={showModal}>Add</Button>
                            <Modal title="Add new lesson" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <Input
                                    value={inputLessonName}
                                    onChange={handleInputLessonName}
                                    placeholder="Enter lesson name..."
                                />
                                <p>Description</p>
                                <TextArea
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    placeholder={'Enter lesson description...'}
                                    onChange={handleInputDescription}
                                    value={inputDescription}
                                ></TextArea>
                            </Modal>
                        </Flex>
                    }
                    style={{ width: '100%', backgroundColor: '#ffffff', padding: '24px', borderRadius: '7px' }}
                    itemLayout="horizontal"
                    dataSource={transformedData}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginBottom: '5px',
                                padding: '15px',
                            }}
                            actions={[
                                <Popconfirm
                                    onConfirm={() => handleDeleteLesson(item._id)}
                                    title={'Delete this lesson'}
                                    description={'Are you sure to remove this lesson?'}
                                    okText="Delete"
                                    cancelText={'Cancel '}
                                >
                                    <Button>
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<Link to={'/course/' + courseInfo._id + '/' + item._id}>{item.title}</Link>}
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
