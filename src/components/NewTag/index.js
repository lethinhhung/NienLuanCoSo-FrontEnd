import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Input, Flex, ColorPicker, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './NewTag.module.scss';
import defaultTagColor from '../DefaultTagColor';
import TagsDrawer from '../TagsDrawer';
import { createNewTagApi } from '~/utils/api';
import NotificationContext from '~/contexts/NotificationContext';

function NewTag() {
    const cx = classNames.bind(styles);

    const { showNotification } = useContext(NotificationContext);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        if (tagPreviewName === 'Preview') {
            showNotification('Missing information', 'Enter tag name', 'warning');

            return;
        }

        setModalText('Saving...');
        setConfirmLoading(true);
        const result = await createNewTagApi(tagPreviewName, tagPreviewColor);
        if (result.EC === 0) {
            showNotification('Failed', 'Duplicate tag name', 'error');

            setModalText('');
            setConfirmLoading(false);
        } else {
            console.log(result);

            setOpen(false);
            setConfirmLoading(false);
            setTagPreviewColor('');
            setTagPreviewName('');
            setModalText('');
        }
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const [tagPreviewName, setTagPreviewName] = useState('Preview');
    const [tagPreview, setTagPreview] = useState(<Tag>{tagPreviewName}</Tag>);
    const [tagPreviewColor, setTagPreviewColor] = useState('');

    const handleInput = (e) => {
        setTagPreviewName(e.target.value);
    };
    const handleTagClick = (tag) => {
        setTagPreviewColor(tag);
    };

    const handleTagColorPick = (value) => {
        if (value.toHex() === 'ffffff') {
            setTagPreviewColor('');
        } else {
            setTagPreview(<Tag color={'#' + value.toHex()}>{tagPreviewName}</Tag>);
            setTagPreviewColor('#' + value.toHex());
        }
    };

    useEffect(() => {
        if (tagPreviewName === '') setTagPreviewName('Preview');
        setTagPreview(<Tag color={tagPreviewColor}>{tagPreviewName}</Tag>);
    }, [tagPreviewName, tagPreviewColor]);

    return (
        <>
            <Button type="dashed" onClick={showModal}>
                <PlusOutlined />
            </Button>
            <Modal
                title="Add a new Tag"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input required onChange={handleInput} />
                <Flex vertical className={cx('component')}>
                    <h4>Color</h4>
                    <Flex align="center" justify="space-between">
                        <ColorPicker disabledAlpha size="large" onChange={handleTagColorPick} />
                        <TagsDrawer onTagClick={handleTagClick} isClickable={true} data={defaultTagColor} />
                    </Flex>
                </Flex>
                <div className={cx('component')}>
                    <h4>Preview</h4>
                    {tagPreview}
                </div>
                <p>{modalText}</p>
            </Modal>
        </>
    );
}

export default NewTag;
