import { ColorPicker, Tag, Flex, Button, Input, Select, Switch, DatePicker, Divider } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import styles from './CreateObject.module.scss';
import ImageUpload from '~/components/ImageUpload';
import NewTag from '~/components/NewTag';
import { getTagsInfoApi, getTermsInfoApi, createNewCourseApi, createNewTermApi } from '~/utils/api';

function CreateObject({ type = 'course', action = 'create' }) {
    const cx = classNames.bind(styles);

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

    const [tagsOptions, setTagsOptions] = useState([]);
    const [termsOptions, setTermsOptions] = useState([]);
    const [reRender, setReRender] = useState('');
    const [tagsInfo, setTagsInfo] = useState([]);
    const [termsInfo, setTermsInfo] = useState([]);

    const reRenderTagsAndTerms = () => {
        setReRender(reRender + ' ');
    };

    useEffect(() => {
        const fetchTagsAndTermsInfo = async () => {
            const tagsData = await getTagsInfoApi();
            const termsData = await getTermsInfoApi();
            setTagsInfo(tagsData);
            setTermsInfo(termsData);

            const newTagsOptions = tagsInfo.map((tag) => ({
                id: tag._id,
                value: tag.name,
                color: tag.color,
            }));

            const newTermsOptions = termsInfo.map((term) => ({
                id: term._id,
                value: term.name,
            }));

            setTagsOptions(newTagsOptions);
            setTermsOptions(newTermsOptions);
            console.log(termsInfo);
        };

        fetchTagsAndTermsInfo();
    }, [reRender]);

    const tagRender = (props) => {
        const { value, closable, onClose } = props;
        let color = tagsOptions.find((option) => option.value === value)?.color;

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
    const [submitCover, setSubmitCover] = useState(null);
    const [submitName, setSubmitName] = useState('');
    const [submitDescription, setSubmitDescription] = useState('');
    const [submitTags, setSubmitTags] = useState([]);
    const [submitTerm, setSubmitTerm] = useState('');
    const [submitStartDate, setSubmitStartDate] = useState('0000-01-02');
    const [submitEndDate, setSubmitEndDate] = useState('0000-01-01');

    const handleSubmit = async () => {
        if (submitName === '') {
            alert('Enter name...');
            return;
        } else if ((submitStartDate === '' || submitEndDate === '') && !isTerm) {
            alert('Select time...');
            return;
        } else if (submitTerm === '' && isTerm && type === 'course') {
            alert('Select term...');
            return;
        }
        const formData = new FormData();
        formData.append('emoji', submitEmoji);
        formData.append('color', submitColor);
        formData.append('cover', submitCover);
        formData.append('name', submitName);
        formData.append('description', submitDescription);
        submitTags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        if (type === 'course') {
            formData.append('term', submitTerm);
        }
        formData.append('startDate', submitStartDate);
        formData.append('endDate', submitEndDate);

        //Goi API
        try {
            if (type === 'course') {
                const res = await createNewCourseApi(formData);

                console.log('Update successful:', res);
                alert('New ' + type + ' created!');
            } else {
                const res = await createNewTermApi(formData);

                console.log('Update successful:', res);
                alert('New ' + type + ' created!');
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Unkown error');
        }
    };
    // Select

    const handleSelectEmoji = (emoji) => {
        setSubmitEmoji(emoji.emoji);
    };

    const handleSelectColor = (value) => {
        setSubmitColor('#' + value.toHex());
    };

    const handleSelectName = (e) => {
        setSubmitName(e.target.value);
    };

    const handleSelectDescription = (e) => {
        setSubmitDescription(e.target.value);
    };

    const handleSelectTags = (value) => {
        setSubmitTags(value);
    };

    const handleSelectTerm = (value) => {
        console.log(value);
        setSubmitTerm(value);
    };

    const handleSelectTime = (date, dateString) => {
        const [startDate, endDate] = dateString.toString().split(',');
        setSubmitStartDate(startDate);
        setSubmitEndDate(endDate);
    };

    // On off
    const handleEmoji = (checked) => {
        if (!checked) {
            setIsEmojiDisabled(true);
            setSubmitEmoji('📘');
        } else {
            setIsEmojiDisabled(false);
        }
    };

    const handleColor = (checked) => {
        if (!checked) {
            setIsColorDisabled(true);
            setSubmitColor('#624e88');
        } else {
            setIsColorDisabled(false);
        }
    };

    const handleCover = (checked) => {
        if (!checked) {
            setIsCoverDisabled(true);
            setSubmitCover(null);
        } else {
            setIsCoverDisabled(false);
            if (holdSubmitImage) {
                setSubmitCover(holdSubmitImage);
            }
        }
    };

    const handleDuration = (checked) => {
        if (checked) {
            setIsTerm(true);
            setSubmitStartDate('');
            setSubmitEndDate('');
        } else {
            setIsTerm(false);
            setSubmitTerm('');
        }
    };

    const [imagePreview, setImagePreview] = useState(null);
    const [holdSubmitImage, setHoldSubmitImage] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setSubmitCover(selectedFile);
            setHoldSubmitImage(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.error('No file selected or file is not valid.');
        }
    };

    return (
        <Flex vertical className={cx('content')}>
            <div hidden={action === 'edit'}>
                <h1>{'Create a new ' + type}</h1>
                <Divider></Divider>
            </div>
            <Flex className={cx('title-switch')} align="center">
                <h2>Emoji</h2>
                <Switch onChange={handleEmoji} checkedChildren="Custom" unCheckedChildren="Default" />
                <h2>{submitEmoji}</h2>
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
                    <ColorPicker
                        value={submitColor}
                        disabledAlpha
                        defaultValue={'#624e88'}
                        onChange={handleSelectColor}
                    />
                </div>
            </Flex>
            <Flex justify="center"></Flex>

            <Flex className={cx('title-switch')} align="center">
                <h2>Cover</h2>

                <Switch onChange={handleCover} checkedChildren="Custom" unCheckedChildren="Default" />
            </Flex>
            <Flex justify="center">
                <div style={isCoverDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                    <div>
                        <h3 className={cx('title')}>Upload an image</h3>
                        {imagePreview && <img width={'100px'} src={imagePreview} alt="Preview" />}
                        <form>
                            <input
                                type="file"
                                alt="upload"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleFileChange}
                            />
                        </form>
                    </div>
                </div>
            </Flex>
            <h2 className={cx('title-alone')}>Name</h2>
            <Input required onChange={handleSelectName} value={submitName}></Input>
            <h2 className={cx('title-alone')}>Description</h2>
            <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder={'Enter ' + type + ' description...'}
                onChange={handleSelectDescription}
                value={submitDescription}
            ></TextArea>
            <div hidden={type === 'term'}>
                <h2 className={cx('title-alone')}>Tags</h2>
                <Flex justify="space-between" align="center">
                    <Select
                        onClick={reRenderTagsAndTerms}
                        style={{ width: '100%' }}
                        className={cx('tags-drawer')}
                        placeholder="Tags"
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={[]}
                        options={tagsOptions}
                        onChange={handleSelectTags}
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
                        <Select
                            options={termsOptions}
                            required
                            style={{ minWidth: '150px', marginTop: '5px' }}
                            onClick={reRenderTagsAndTerms}
                            defaultValue={[]}
                            onChange={handleSelectTerm}
                        ></Select>
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
                        <RangePicker required onChange={handleSelectTime} />
                    </Flex>
                </div>
            </div>

            <div hidden={type === 'course'}>
                <div className={cx('title-alone')}>
                    <h2>Duration</h2>
                </div>

                <Flex align="center">
                    <p style={{ minWidth: '80px', marginTop: '5px' }}>Pick a time</p>
                    <RangePicker required onChange={handleSelectTime} />
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
