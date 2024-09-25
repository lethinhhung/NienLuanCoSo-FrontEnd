import { TextArea, Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './EditDiscription.module.scss';
function EditDiscription({ type = 'Empty' }) {
    const { TextArea } = Input;

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
            <Modal title={'Edit this ' + type} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Flex vertical wrap gap="small">
                    <h4>Name</h4>
                    <Input required placeholder={'Enter ' + type + ' name...'} />
                    <h4>Description</h4>
                    <TextArea
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        placeholder={'Enter ' + type + 'discription...'}
                    ></TextArea>
                </Flex>
            </Modal>
        </div>
    );
}

export default EditDiscription;
