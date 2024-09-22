import { Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './NewTerm.module.scss';
import ImageUpload from '~/components/ImageUpload';

function NewTermContent() {
    const cx = classNames.bind(styles);
    const { RangePicker } = DatePicker;

    const [emoji, setEmoji] = useState();
    const [cover, setCover] = useState();

    const handleSelectEmoji = (emoji) => {
        console.log(emoji.emoji);
    };

    const handleEmoji = (checked) => {
        if (checked) {
            setEmoji(<EmojiPicker onEmojiClick={handleSelectEmoji} width={'295px'}></EmojiPicker>);
        } else {
            setEmoji();
        }
    };

    const handleCover = (checked) => {
        if (checked) {
            setCover(<ImageUpload />);
        } else {
            setCover();
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
            <Flex justify="center">{emoji}</Flex>
            <Flex className={cx('title-switch')} align="center">
                <h2>Cover</h2>

                <Switch onChange={handleCover} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">{cover}</Flex>
            <h2 className={cx('title-alone')}>Name</h2>
            <Input></Input>

            <h2>Duration</h2>

            <Flex align="center">
                <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a time</p>
                <RangePicker />
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
