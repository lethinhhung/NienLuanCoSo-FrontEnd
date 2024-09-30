import { Card, Row, Col, Flex, Image, Button, Modal, Upload, Input } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { UploadOutlined } from '@ant-design/icons';

import { updateUserApi, getAccountInfoApi } from '~/utils/api';
import styles from './Profile.module.scss';

function Profile() {
    const [file, setFile] = useState(null);
    const [discription, setDiscription] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const cx = classNames.bind(styles);
    const { TextArea } = Input;

    const getAccountInfo = async () => {
        const account = await getAccountInfoApi();
        return account.info;
    };

    const [info, setInfo] = useState({ name: '', discription: '', avatarPath: '' });

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfo();
            setInfo(accountInfo);
        };

        fetchAccountInfo();
    }, [discription]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const formData = new FormData();
        formData.append('discription', discription);

        formData.append('avatar', file);

        //Goi API
        try {
            const res = await updateUserApi(formData);
            console.log('Update successful:', res);
            alert('Update successfully!');
            setFile();
            setImagePreview();
            setDiscription();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Unkown error');
        }

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDiscriptionChange = (e) => {
        setDiscription(e.target.value);
    };

    const convertAvatarPath = (avatarPath) => {
        // Replace 'src\\' with 'localhost:8080/' and convert backslashes to forward slashes
        let url = avatarPath.replace(/^src\\public\\/, 'localhost:8080/').replace(/\\/g, '/');
        // Ensure the URL starts with 'http://'
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        return url;
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
                                            <input type="file" alt="upload" onChange={handleFileChange} />
                                        </form>
                                        <h3 className={cx('title')}>Discription</h3>
                                        <TextArea
                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                            placeholder={'Enter discription...'}
                                            onChange={handleDiscriptionChange}
                                            value={discription}
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
                                {' '}
                                <Image width={'100%'} src={convertAvatarPath(info.avatarPath)} />
                            </Col>
                            <Col span={18} style={{ paddingLeft: '20px' }}>
                                <Card
                                    title={'Name: ' + info.name}
                                    bordered
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {info.discription}
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
