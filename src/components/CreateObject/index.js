import { ColorPicker, Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './CreateObject.module.scss';
import ImageUpload from '~/components/ImageUpload';
import NewTag from '~/components/NewTag';
import { getTagsInfoApi, createNewCourseApi } from '~/utils/api';

function CreateObject({ type = 'course', action = 'create' }) {
    const cx = classNames.bind(styles);

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

    const [options, setOptions] = useState([]);
    const [reRender, setReRender] = useState('');

    const reRenderTags = () => {
        setReRender(reRender + ' ');
    };

    useEffect(() => {
        const fetchTagsInfo = async () => {
            const tagsInfo = await getTagsInfoApi();

            const newOptions = tagsInfo.map((tag) => ({
                value: tag.name,
                color: tag.color,
            }));
            setOptions(newOptions);
        };

        fetchTagsInfo();
    }, [reRender]);

    const tagRender = (props) => {
        const { value, closable, onClose } = props;
        let color = options.find((option) => option.value === value)?.color;

        if (color === '#ffffff') {
            color = '';
        }

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {value}
            </Tag>
        );
    };

    //Duration
    const [isTerm, setIsTerm] = useState(true);
    const [isEmojiDisabled, setIsEmojiDisabled] = useState(true);
    const [isCoverDisabled, setIsCoverDisabled] = useState(true);
    const [isColorDisabled, setIsColorDisabled] = useState(true);

    //FormData
    const [submitEmoji, setSubmitEmoji] = useState('📘');
    const [submitColor, setSubmitColor] = useState('#624e88');
    const [submitCover, setSubmitCover] = useState('');
    const [submitName, setSubmitName] = useState('');
    const [submitDescription, setSubmitDescription] = useState('');
    const [submitTags, setSubmitTags] = useState([]);
    const [submitTerm, setSubmitTerm] = useState('');
    const [submitStartDate, setSubmitStartDate] = useState('');
    const [submitEndDate, setSubmitEndDate] = useState('');

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

    const handleDuration = (checked) => {
        if (checked) {
            setIsTerm(true);
        } else setIsTerm(false);
    };

    const handleSubmit = () => {};

    return (
        <Flex vertical className={cx('content')}>
            <div hidden={action === 'edit'}>
                <h1>{'Create a new ' + type}</h1>
                <Divider></Divider>
            </div>
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
            <h2 className={cx('title-alone')}>Description</h2>
            <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder={'Enter ' + type + ' description...'}
            ></TextArea>
            <div hidden={type === 'term'}>
                <h2 className={cx('title-alone')}>Tags</h2>
                <Flex justify="space-between" align="center">
                    <Select
                        onClick={reRenderTags}
                        style={{ width: '100%' }}
                        className={cx('tags-drawer')}
                        placeholder="Tags"
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={[]}
                        options={options}
                    />

                    <div style={{ marginLeft: '5px' }}>
                        <NewTag />
                    </div>
                </Flex>
            </div>

            <div hidden={type === 'term'}>
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
            </div>

            <div hidden={type === 'course'}>
                <div className={cx('title-alone')}>
                    <h2>Duration</h2>
                </div>

                <Flex align="center">
                    <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a time</p>
                    <RangePicker required />
                </Flex>
            </div>
            <div hidden={action === 'edit'}>
                <Flex style={{ marginTop: '30px' }} justify="flex-end">
                    <Button onClick={handleSubmit} size="large" style={{ backgroundColor: '#cb80ab', width: '100px' }}>
                        <CheckOutlined />
                    </Button>
                </Flex>
            </div>
        </Flex>
    );
}

export default CreateObject;
