import { Image, Card, Flex, Divider, Row, Input, Popconfirm, Button, List, Modal, Badge } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import styles from './Course.module.scss';
import TagsDrawer from '~/components/TagsDrawer';
import EditDescription from '~/components/EditDescription';

import {
    createNewLessonApi,
    deleteCourseApi,
    deleteLessonApi,
    getCourseInfoApi,
    getLessonsInfoByIdsApi,
    getStatisticsInfoApi,
    getTermInfoApi,
} from '~/utils/api';

import convertAvatarPath from '~/utils/convertAvatarPath';
import defaultCourseCover from '../../assets/images/default-course-cover.png';
import StatisticsOverview from '~/components/StatisticsOverview';
import LoadingSpin from '~/components/LoadingSpin';
import PageTitle from '~/components/PageTitle';
import Note from '~/components/DashBoard/Note';
import NotificationContext from '~/contexts/NotificationContext';

function Course() {
    const cx = classNames.bind(styles);
    const { courseId } = useParams();
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    // Lesson list
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputLessonName, setInputLessonName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [loading, setLoading] = useState(true);

    const { Meta } = Card;

    const { TextArea } = Input;

    const [courseInfo, setCourseInfo] = useState({});
    const [transformedData, setTransformedData] = useState();
    const [statisticsInfo, setStatisticsInfo] = useState({});
    const [termInfo, setTermInfo] = useState({});

    const transformData = (inputData) => {
        return inputData.map((item) => ({
            title: item.name,
            description: item.description,
            _id: item._id,
        }));
    };
    const fetchCourseInfo = async () => {
        const courseData = await getCourseInfoApi(courseId);
        const lessonsData = await getLessonsInfoByIdsApi(courseData.lessons);
        const statisticsData = await getStatisticsInfoApi(courseData.statistics);
        if (courseData.term) {
            const termData = await getTermInfoApi(courseData.term);
            setTermInfo(termData);
        }
        setCourseInfo(courseData);
        setTransformedData(transformData(lessonsData));
        setStatisticsInfo(statisticsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchCourseInfo();
    }, [isModalVisible, courseId, deleteTrigger]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        //Goi API
        if (inputLessonName === '') {
            showNotification('Missing information', 'Enter lesson name', 'warning');
            return;
        } else if (inputDescription === '') {
            showNotification('Missing information', 'Enter lesson description', 'warning');
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

        const result = await createNewLessonApi(formData);
        if (result && result.result) {
            navigate('/course/' + courseId + '/' + result.result._id);
        }
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
            showNotification('Lesson delete successfully', '', 'success');
            setDeleteTrigger(!deleteTrigger);
        }
    };

    const handleUpdated = async () => {
        fetchCourseInfo();
    };

    const handleDelete = async () => {
        await deleteCourseApi(courseId);
        showNotification('Course Deleted Successfully', '', 'success');
        navigate('/courses');
    };

    return (
        <>
            <PageTitle title={courseInfo.name ? courseInfo.name : 'Course'} />
            <LoadingSpin loading={loading}></LoadingSpin>
            <div hidden={loading}>
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
                        style={{ cursor: 'default' }}
                        className={cx('overview')}
                        hoverable
                        title="Course overview"
                        bordered={false}
                        extra={
                            <Flex wrap gap={5}>
                                <EditDescription type="course" editData={courseInfo} onUpdated={handleUpdated} />

                                <Popconfirm
                                    title="Delete the course"
                                    description="Are you sure to delete this course?"
                                    onConfirm={handleDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button>
                                        <DeleteOutlined style={{ color: 'red' }} />
                                    </Button>
                                </Popconfirm>
                            </Flex>
                        }
                    >
                        <Meta
                            avatar={<h1>{courseInfo.emoji}</h1>}
                            title="Description"
                            description={courseInfo.description}
                        />

                        <Divider />
                        <Row style={{ marginBottom: '10px' }}>
                            <h4>Infomations</h4>
                        </Row>
                        <Row>
                            <Flex
                                style={{ width: '100%', marginBottom: '5px' }}
                                wrap
                                justify="space-between"
                                align="center"
                            >
                                Durration:
                                {courseInfo.term ? (
                                    <Badge count={termInfo.name}></Badge>
                                ) : (
                                    <Badge
                                        count={
                                            moment(courseInfo.startDate).format('DD/MM/YYYY') +
                                            ' - ' +
                                            moment(courseInfo.endDate).format('DD/MM/YYYY')
                                        }
                                    ></Badge>
                                )}
                            </Flex>
                        </Row>

                        <Row>
                            <Flex style={{ width: '100%' }} wrap justify="space-between" align="center">
                                Tags:
                                <TagsDrawer tagsIds={courseInfo.tags} isDefault={false} />
                            </Flex>
                        </Row>
                        <Row></Row>
                        <Divider />

                        <StatisticsOverview data={statisticsInfo} courseInfo={courseInfo}></StatisticsOverview>
                    </Card>

                    <div className={cx('notes-wrapper')}>
                        {/* <Card
                            hoverable
                            className={cx('notes')}
                            title="Notes"
                            extra={
                                <Button
                                    shape="circle"
                                    size="large"
                                    style={{ backgroundColor: noteColor, color: 'white' }}
                                    onClick={handleSaveNote}
                                    icon={noteIcon}
                                ></Button>
                            }
                        >
                            <TextArea
                                onChange={handleChangeNote}
                                value={note}
                                placeholder="Course notes..."
                                autoSize={{
                                    minRows: 2,
                                }}
                            />
                        </Card> */}
                        <Note type="course" courseId={courseInfo._id} />
                    </div>

                    <div className={cx('lessions-list-wrapper')}>
                        <List
                            header={
                                <Flex wrap justify="space-between">
                                    <h3>Lessons</h3>
                                    <Button onClick={showModal}>
                                        <PlusOutlined />
                                    </Button>
                                    <Modal
                                        title="Add new lesson"
                                        open={isModalVisible}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
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
                                        title={
                                            <Link to={'/course/' + courseInfo._id + '/' + item._id}>{item.title}</Link>
                                        }
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        ></List>
                    </div>
                </Flex>
            </div>
        </>
    );
}

export default Course;
