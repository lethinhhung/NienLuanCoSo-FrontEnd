import { ColorPicker, Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './NewTerm.module.scss';
import ImageUpload from '~/components/ImageUpload';

function NewTermContent() {
    const cx = classNames.bind(styles);
    const { RangePicker } = DatePicker;

    const [isEmojiDisabled, setIsEmojiDisabled] = useState(true);
    const [isCoverDisabled, setIsCoverDisabled] = useState(true);
    const [isColorDisabled, setIsColorDisabled] = useState(true);

    const handleEmoji = (checked) => {
        if (!checked) {
            setIsEmojiDisabled(true);
        } else {
            setIsEmojiDisabled(false);
        }
    };

    const handleCover = (checked) => {
        if (!checked) {
            setIsCoverDisabled(true);
        } else {
            setIsCoverDisabled(false);
        }
    };
    const handleSelectEmoji = (emoji) => {
        console.log(emoji.emoji);
    };

    const handleColor = (checked) => {
        if (!checked) {
            setIsColorDisabled(true);
        } else {
            setIsColorDisabled(false);
        }
    };

    return (
        <Flex vertical className={cx('content')}>
            <h1>Create a new term</h1>
            <Divider></Divider>
            <Flex className={cx('title-switch')} align="center">
                <h2>Emoji</h2>

                <Switch onChange={handleEmoji} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">
                <div style={isEmojiDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                    <EmojiPicker onEmojiClick={handleSelectEmoji} width={'295px'}></EmojiPicker>
                </div>
            </Flex>
            <Flex className={cx('title-switch')} align="center">
                <h2>Card color</h2>

                <Switch
                    style={{ marginRight: '10px' }}
                    onChange={handleColor}
                    checkedChildren="Custom"
                    unCheckedChildren="Default"
                />
                <div style={isColorDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                    <ColorPicker defaultValue={'#624e88'} />
                </div>
            </Flex>
            <Flex className={cx('title-switch')} align="center">
                <h2>Cover</h2>

                <Switch onChange={handleCover} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">
                <div style={isCoverDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                    <ImageUpload />
                </div>
            </Flex>
            <h2 className={cx('title-alone')}>Name</h2>
            <Input required></Input>

            <h2>Duration</h2>

            <Flex align="center">
                <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a time</p>
                <RangePicker required />
            </Flex>

            <Flex style={{ marginTop: '30px' }} justify="flex-end">
                <Button size="large" style={{ backgroundColor: '#cb80ab', width: '100px' }}>
                    <CheckOutlined />
                </Button>
            </Flex>
        </Flex>
    );
}

export default NewTermContent;
