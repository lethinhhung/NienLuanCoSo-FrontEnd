import { Card, Row, Col, Flex, Image, Button } from 'antd';
// import classNames from 'classnames/bind';
import { useState } from 'react';

import { updateUser } from '~/utils/api';
// import styles from './Profile.module.scss';
import avatar from '~/assets/images/default-avatar.png';

function Profile() {
    const [file, setFile] = useState(null);

    const handleEdit = async () => {
        if (!file) {
            console.error('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', 'admin');
        formData.append('discription', 'hehehehe');
        formData.append('avatar', file);

        try {
            const response = await updateUser(formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
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
                        extra={<Button onClick={handleEdit}>Edit</Button>}
                        style={{
                            width: '100%',
                        }}
                    >
                        <Row>
                            <Col span={6}>
                                {' '}
                                <Image
                                    width={'100%'}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </Col>
                            <Col span={18} style={{ paddingLeft: '20px' }}>
                                <Card
                                    title="Name"
                                    bordered
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    Discription
                                </Card>
                                <input type="file" onChange={handleFileChange} />
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
