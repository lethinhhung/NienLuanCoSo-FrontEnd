import { Button, Card, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import { getAccountInfoApi, getCourseInfoApi, updateCourseNoteApi, updateUserNoteApi } from '~/utils/api';
import classNames from 'classnames/bind';

import styles from './Note.module.scss';
import NotificationContext from '~/contexts/NotificationContext';

function Note({ type = 'course', courseId }) {
    const { TextArea } = Input;
    const cx = classNames.bind(styles);
    const { showNotification } = useContext(NotificationContext);

    const [note, setNote] = useState('');
    const [noteIcon, setNoteIcon] = useState(<CheckOutlined />);
    const [noteColor, setNoteColor] = useState('#1677ff');
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async () => {
        const userData = await getAccountInfoApi();

        setNote(userData.info.note);
        setLoading(false);
    };

    const fetchCourseInfo = async () => {
        const courseData = await getCourseInfoApi(courseId);

        setNote(courseData.note);
        setLoading(false);
    };

    useEffect(() => {
        if (type === 'user') {
            fetchUserInfo();
        }
        if (type === 'course') {
            fetchCourseInfo();
        }
    }, [courseId]);

    const handleChangeNote = (e) => {
        setNoteColor('#F5222D');
        setNoteIcon(<SaveOutlined />);
        setNote(e.target.value);
    };

    const handleSaveNote = async () => {
        const newNote = note;
        if (type === 'course') {
            await updateCourseNoteApi(courseId, newNote);
        } else if (type === 'user') {
            await updateUserNoteApi(newNote);
        }
        setNoteColor('#1677ff');
        setNoteIcon(<CheckOutlined />);
        showNotification('Saved', '', 'success');
    };
    return (
        <Card
            className={cx('notes')}
            hoverable
            title="Notes"
            bordered={false}
            extra={
                <Button
                    shape="circle"
                    size="large"
                    style={{ backgroundColor: noteColor, color: 'white' }}
                    onClick={handleSaveNote}
                    icon={noteIcon}
                ></Button>
            }
            loading={loading}
        >
            <TextArea
                placeholder="Notes..."
                autoSize={{
                    minRows: 2,
                }}
                value={note}
                onChange={handleChangeNote}
            />
        </Card>
    );
}

export default Note;
