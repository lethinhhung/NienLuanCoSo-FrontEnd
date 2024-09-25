import { ColorPicker, Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './NewCourse.module.scss';
import ImageUpload from '~/components/ImageUpload';
import { useReRender } from '~/hooks';
import NewTag from '~/components/NewTag';

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
    const [isEmojiDisabled, setIsEmojiDisabled] = useState(true);
    const [isCoverDisabled, setIsCoverDisabled] = useState(true);
    const [isColorDisabled, setIsColorDisabled] = useState(true);

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

    const handleColor = (checked) => {
        if (!checked) {
            setIsColorDisabled(true);
        } else {
            setIsColorDisabled(false);
        }
    };

    const handleCover = (checked) => {
        if (!checked) {
            setIsCoverDisabled(true);
        } else {
            setIsCoverDisabled(false);
        }
    };

    const handleAddTags = () => {};

    const handleDuration = (checked) => {
        if (checked) {
            setIsTerm(true);
        } else setIsTerm(false);
    };

    return (
        <Flex vertical className={cx('content')}>
            <h1>Create a new course</h1>
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
            <Flex justify="center"></Flex>

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
                {/* <Button onClick={handleAddTags} type="dashed" style={{ marginLeft: '5px' }}>
                    <PlusOutlined />
                </Button> */}
                <div style={{ marginLeft: '5px' }}>
                    <NewTag />
                </div>
            </Flex>
            <Flex className={cx('title-switch')} align="center">
                <h2>Duration</h2>
                <Switch onChange={handleDuration} checkedChildren="Term" unCheckedChildren="Time" defaultChecked />
            </Flex>
            <div hidden={!isTerm}>
                <Flex wrap align="center">
                    <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a term</p>
                    <Select required style={{ minWidth: '150px', marginTop: '5px' }}></Select>
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
                    <RangePicker required />
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
