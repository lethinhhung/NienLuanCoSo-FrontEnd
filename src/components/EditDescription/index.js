import { Button, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import styles from './EditDescription.module.scss';
import CreateObject from '~/components/CreateObject';
import { updateLessonInfoApi } from '~/utils/api';
import NotificationContext from '~/contexts/NotificationContext';

function EditDescription({ type = 'course', editData, onUpdated }) {
    const cx = classNames.bind(styles);
    const { showNotification } = useContext(NotificationContext);
    const [lessonName, setLessonName] = useState('');
    const [lessonDescription, setLessonDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        //Goi API

        if (type === 'lesson') {
            const result = await updateLessonInfoApi(editData._id, lessonName, lessonDescription);
            onUpdated();
            showNotification('Lesson info updated', '', 'success');
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleNameChange = (e) => {
        setLessonName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setLessonDescription(e.target.value);
    };

    return (
        <div>
            <Button onClick={showModal}>
                <EditOutlined />
            </Button>
            {type === 'lesson' ? (
                <Modal
                    title={<h2>Edit lesson info</h2>}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" onClick={handleOk}>
                            Ok
                        </Button>,
                    ]}
                >
                    <h3>Name</h3>
                    <Input onChange={handleNameChange} defaultValue={editData.name} />
                    <h3>Description</h3>
                    <Input onChange={handleDescriptionChange} defaultValue={editData.description} />
                </Modal>
            ) : (
                <Modal
                    title={<h2>{'Edit this ' + type}</h2>}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <div className={cx('panel')}>
                        <CreateObject
                            editData={editData}
                            type={type}
                            action="edit"
                            isEdit={true}
                            onUpdated={() => {
                                onUpdated();
                                setIsModalVisible(false);
                            }}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default EditDescription;
