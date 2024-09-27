import { useEffect, useState } from 'react';
import { Button, Modal, Input, Flex, ColorPicker, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './NewTag.module.scss';
import defaultTagColor from '../DefaultTagColor';
import TagsDrawer from '../TagsDrawer';

function NewTag() {
    const cx = classNames.bind(styles);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('Saving...');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setTagPreviewColor('');
            setTagPreviewName('');
            setModalText('');
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    // const handleTagClick = (tag) => {
    //     console.log('real tag:', tag);
    // };

    const [tagPreviewName, setTagPreviewName] = useState('Preview');
    const [tagPreview, setTagPreview] = useState(<Tag>{tagPreviewName}</Tag>);
    const [tagPreviewColor, setTagPreviewColor] = useState('');

    const handleInput = (e) => {
        console.log(e.target.value);
        setTagPreviewName(e.target.value);
    };
    const handleTagClick = (tag) => {
        // setTagPreview(<Tag color={tag}>{tagPreviewName}</Tag>);
        setTagPreviewColor(tag);
    };

    const handleTagColorPick = (value) => {
        if (value.toHex() === 'ffffff') {
            // setTagPreview(<Tag>Preview</Tag>);
            setTagPreviewColor('');
        } else {
            setTagPreview(<Tag color={'#' + value.toHex()}>{tagPreviewName}</Tag>);
            setTagPreviewColor('#' + value);
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
                        <ColorPicker size="large" onChange={handleTagColorPick} />
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
