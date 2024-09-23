import { Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './NewCourse.module.scss';
import ImageUpload from '~/components/ImageUpload';

function NewCourseContent() {
    const cx = classNames.bind(styles);
    const { RangePicker } = DatePicker;

    const options = [
        {
            value: 'gold',
        },
        {
            value: 'lime',
        },
        {
            value: 'green',
        },
        {
            value: 'cyan',
        },
    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {label}
            </Tag>
        );
    };

    //Duration
    const [isTerm, setIsTerm] = useState(true);
    const [emoji, setEmoji] = useState();
    const [cover, setCover] = useState();

    const handleSelectEmoji = (emoji) => {
        console.log(emoji.emoji);
    };

    const handleDuration = (checked) => {
        if (checked) {
            setIsTerm(true);
        } else setIsTerm(false);
        console.log(isTerm);
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
            <h1>Create a new course</h1>
            <Divider></Divider>
            <Flex className={cx('title-switch')} align="center">
                <h2>Emoji</h2>

                <Switch onChange={handleEmoji} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">{emoji}</Flex>
            {/* Color picker */}
            <Flex className={cx('title-switch')} align="center">
                <h2>Cover</h2>

                <Switch onChange={handleCover} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">{cover}</Flex>
            <h2 className={cx('title-alone')}>Name</h2>
            <Input></Input>
            <h2 className={cx('title-alone')}>Tags</h2>
            <Flex justify="space-between" align="center">
                <Select
                    style={{ width: '100%' }}
                    className={cx('tags-drawer')}
                    placeholder="Tags"
                    mode="multiple"
                    tagRender={tagRender}
                    defaultValue={[]}
                    options={options}
                />
                <Button type="dashed" style={{ marginLeft: '5px' }}>
                    <PlusOutlined />
                </Button>
            </Flex>
            <Flex className={cx('title-switch')} align="center">
                <h2>Duration</h2>
                <Switch onChange={handleDuration} checkedChildren="Term" unCheckedChildren="Time" defaultChecked />
            </Flex>
            <div hidden={!isTerm}>
                <Flex wrap align="center">
                    <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a term</p>
                    <Select style={{ minWidth: '150px', marginTop: '5px' }}></Select>
                    <Flex align="center" style={{ marginTop: '5px' }}>
                        <p>or</p>
                        <Button>
                            <Link to="/create-new-term">Create a new Term</Link>
                        </Button>
                    </Flex>
                </Flex>
            </div>

            <div hidden={isTerm}>
                <Flex align="center">
                    <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a time</p>
                    <RangePicker />
                </Flex>
            </div>
            <Flex style={{ marginTop: '30px' }} justify="flex-end">
                <Button size="large" style={{ backgroundColor: '#cb80ab', width: '100px' }}>
                    <CheckOutlined />
                </Button>
            </Flex>
        </Flex>
    );
}

export default NewCourseContent;
