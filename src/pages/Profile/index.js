import { Card, Row, Col, Flex, Image } from 'antd';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

function Profile() {
    const { Meta } = Card;

    return (
        <Flex vertical>
            <Row style={{ height: '20px' }}></Row>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <Card
                        title="Account information"
                        bordered={false}
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
