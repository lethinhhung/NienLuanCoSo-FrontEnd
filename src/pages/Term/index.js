import { Image, Card, Flex, Input, Progress, Tooltip, Badge, Button, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import styles from './Term.module.scss';
import convertAvatarPath from '~/utils/convertAvatarPath';
import CustomList from '~/components/CustomList';
import EditDescription from '~/components/EditDescription';
import { deleteTermApi, getTermInfoApi, updateCourseNoteApi, updateTermNoteApi } from '~/utils/api';
import defaultCourseCover from '../../assets/images/default-term-cover.jpg';
import LoadingSpin from '~/components/LoadingSpin';
import moment from 'moment';
import PageTitle from '~/components/PageTitle';
import NotificationContext from '~/contexts/NotificationContext';

function Term() {
    const cx = classNames.bind(styles);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    const { termId } = useParams();

    const { Meta } = Card;

    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);
    const [termInfo, setTermInfo] = useState({});
    const [fetchData, setFetchData] = useState(false);

    const currentDate = new Date();
    const termStartDate = new Date(termInfo.startDate);
    const termEndDate = new Date(termInfo.endDate);
    const progression = (termEndDate - currentDate) / 1000 / 60 / 60 / 24;

    const [note, setNote] = useState('');
    const [noteIcon, setNoteIcon] = useState(<CheckOutlined />);
    const [noteColor, setNoteColor] = useState('#1677ff');

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const fetchTermInfo = async () => {
        const termData = await getTermInfoApi(termId);

        setTermInfo(termData);
        setLoading(false);
        setNote(termData.note);
    };
    useEffect(() => {
        fetchTermInfo();
    }, [isModalVisible, fetchData, termId]);

    const handleChangeNote = (e) => {
        setNoteColor('#F5222D');
        setNoteIcon(<SaveOutlined />);
        setNote(e.target.value);
    };

    const handleSaveNote = async () => {
        const newNote = note;
        await updateTermNoteApi(termId, newNote);
        showNotification('Saved', '', 'success');
        setNoteColor('#1677ff');
        setNoteIcon(<CheckOutlined />);
    };

    const handleUpdated = async () => {
        fetchTermInfo();
    };

    const handleDelete = async () => {
        await deleteTermApi(termId);
        showNotification('Term Deleted Successfully', '', 'success');
        navigate('/terms');
    };

    return (
        <>
            <PageTitle title={termInfo.name ? termInfo.name : 'Term'} />
            <LoadingSpin loading={loading} />
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
                                    border: '10px solid ' + termInfo.color,
                                }}
                                width={'100%'}
                                preview={false}
                                src={termInfo.cover === '' ? defaultCourseCover : convertAvatarPath(termInfo.cover)}
                            />
                        </div>
                    </div>

                    <div className={cx('lessions-list-wrapper')}>
                        <CustomList
                            title="Courses"
                            data={termInfo.courses}
                            id={termInfo._id}
                            isModalVisible={isModalVisible}
                            setIsModalVisible={setIsModalVisible}
                            fetchData={fetchTermInfo}
                        />
                    </div>
                    <div className={cx('component-wrapper')}>
                        <Card className={cx('notes')} hoverable title="Progession" bordered={false}>
                            <Flex justify="space-between">
                                <Badge
                                    color={currentDate > termEndDate ? 'blue' : 'red'}
                                    count={moment(termInfo.startDate).format('DD/MM/YYYY')}
                                ></Badge>
                                <Badge
                                    color={currentDate > termEndDate ? 'blue' : 'red'}
                                    count={moment(termInfo.endDate).format('DD/MM/YYYY')}
                                ></Badge>
                            </Flex>
                            <Tooltip
                                title={
                                    currentDate < termStartDate
                                        ? 'Incoming'
                                        : currentDate > termEndDate
                                        ? 'Completed'
                                        : progression.toFixed(1) + '%'
                                }
                            >
                                <Progress
                                    percent={
                                        currentDate < termStartDate
                                            ? '0'
                                            : currentDate > termEndDate
                                            ? '100'
                                            : progression.toFixed(1)
                                    }
                                />
                            </Tooltip>
                        </Card>
                    </div>
                    <div className={cx('component-wrapper')}>
                        <Card
                            className={cx('notes')}
                            hoverable
                            title="Term overview"
                            bordered={false}
                            extra={
                                <Flex wrap gap={5}>
                                    <EditDescription
                                        type="term"
                                        editData={termInfo}
                                        isEdit={true}
                                        onUpdated={handleUpdated}
                                    />
                                    <Popconfirm
                                        title="Delete the term"
                                        description="Are you sure to delete this term?"
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
                                avatar={<h1>{termInfo.emoji}</h1>}
                                title={termInfo.name}
                                description={termInfo.description}
                            />
                        </Card>
                    </div>

                    <div className={cx('component-wrapper')}>
                        <Card
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
                                placeholder="Term notes..."
                                autoSize={{
                                    minRows: 2,
                                }}
                            />
                        </Card>
                    </div>
                </Flex>
            </div>
        </>
    );
}

export default Term;
