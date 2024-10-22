import { Card, Row, Col, Flex, Image, Button, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import defaultAvatar from '~/assets/images/default-avatar.png';
import { useConvertAvatarPath } from '~/hooks';
import { updateUserApi, getAccountInfoApi } from '~/utils/api';
import styles from './Profile.module.scss';
import LoadingSpin from '~/components/LoadingSpin';

function Profile() {
    const cx = classNames.bind(styles);
    const { TextArea } = Input;

    // edit const
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // fetch info
    const [info, setInfo] = useState({ name: '', description: '' });

    useEffect(() => {
        setLoading(true);
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfoApi();

            setInfo(accountInfo.info);
            setLoading(false);
        };

        fetchAccountInfo();
    }, [isModalVisible]);

    const avatarPath = useConvertAvatarPath(info.avatarPath);

    // functions
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.error('No file selected or file is not valid.');
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (!file) {
            alert('Please upload an avatar!');
            return;
        }
        const formData = new FormData();
        formData.append('description', description);

        formData.append('avatar', file);

        //Goi API
        try {
            const res = await updateUserApi(formData);

            console.log('Update successful:', res);
            alert('Update successfully!');
            setFile();
            setImagePreview();
            setDescription();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Unkown error');
        }

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <Flex vertical>
            <Row style={{ height: '20px' }}></Row>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Card
                        title="Account information"
                        bordered={false}
                        extra={
                            <div>
                                <Button onClick={showModal}>Edit</Button>
                                <Modal
                                    title={<h2>{'Edit profile'}</h2>}
                                    open={isModalVisible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                >
                                    <Flex vertical className={cx('panel')}>
                                        <h3 className={cx('title')}>Upload an avatar</h3>
                                        {imagePreview && <img width={'100px'} src={imagePreview} alt="Preview" />}
                                        <form>
                                            <input
                                                type="file"
                                                alt="upload"
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={handleFileChange}
                                            />
                                        </form>
                                        <h3 className={cx('title')}>Description</h3>
                                        <TextArea
                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                            placeholder={'Enter description...'}
                                            onChange={handleDescriptionChange}
                                            value={description}
                                        ></TextArea>
                                    </Flex>
                                </Modal>
                            </div>
                        }
                        style={{
                            width: '100%',
                        }}
                    >
                        <Row>
                            <Col span={6}>
                                <LoadingSpin loading={loading} />
                                <div hidden={loading}>
                                    <Image width={'100%'} src={avatarPath || defaultAvatar} />
                                </div>
                            </Col>
                            <Col span={18} style={{ paddingLeft: '20px' }}>
                                <Card
                                    title={'Name: ' + info.name}
                                    bordered
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {info.description}
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={2}></Col>
            </Row>
        </Flex>
    );
}

export default Profile;
