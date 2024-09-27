import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './EditDiscription.module.scss';
import CreateObject from '~/components/CreateObject';

function EditDiscription({ type = 'course' }) {
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
            <Button onClick={showModal}>Edit</Button>
            <Modal title={<h2>{'Edit this ' + type}</h2>} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className={cx('panel')}>
                    <CreateObject type={type} action="edit" />
                </div>
            </Modal>
        </div>
    );
}

export default EditDiscription;
