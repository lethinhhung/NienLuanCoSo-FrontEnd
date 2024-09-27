import {
    Switch,
    TextArea,
    Image,
    Avatar,
    Card,
    Flex,
    Divider,
    Progress,
    Select,
    Row,
    Col,
    Button,
    Input,
    Modal,
} from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './EditDiscription.module.scss';
import EmojiPicker from 'emoji-picker-react';
function EditDiscription({ type = 'Empty' }) {
    const cx = classNames.bind(styles);
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

    const [isEmojiDisabled, setIsEmojiDisabled] = useState(true);
    const handleSelectEmoji = (emoji) => {
        console.log(emoji.emoji);
    };
    const handleEmoji = (checked) => {
        if (!checked) {
            setIsEmojiDisabled(true);
        } else {
            setIsEmojiDisabled(false);
        }
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
                        placeholder={'Enter ' + type + ' discription...'}
                    ></TextArea>
                    <Flex className={cx('title-switch')} align="center">
                        <h2>Emoji</h2>

                        <Switch onChange={handleEmoji} checkedChildren="Custom" unCheckedChildren="Default" />
                    </Flex>
                    <Flex justify="center">
                        <div style={isEmojiDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                            <EmojiPicker onEmojiClick={handleSelectEmoji} width={'295px'}></EmojiPicker>
                        </div>
                    </Flex>
                </Flex>
            </Modal>
        </div>
    );
}

export default EditDiscription;
