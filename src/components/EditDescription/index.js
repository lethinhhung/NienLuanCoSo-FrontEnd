import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import styles from './EditDescription.module.scss';
import CreateObject from '~/components/CreateObject';

function EditDescription({ type = 'course', editData }) {
    const cx = classNames.bind(styles);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //Goi API
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button onClick={showModal}>
                <EditOutlined />
            </Button>
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
                    <CreateObject editData={editData} type={type} action="edit" isEdit={true} />
                </div>
            </Modal>
        </div>
    );
}

export default EditDescription;
