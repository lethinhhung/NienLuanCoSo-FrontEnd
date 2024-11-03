import { Affix, Button, Card, Col, Flex, Image, Row, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './HomeLarge.module.scss';
import logo from '~/assets/images/logo.png';
import CourseItemFake from '~/components/CourseItemFake';
import { RightOutlined } from '@ant-design/icons';

function HomeLarge({ data, handleNext }) {
    const { Title } = Typography;
    const { Meta } = Card;

    const navigate = useNavigate();

    const cx = classNames.bind(styles);
    return (
        <>
            <Flex vertical align="center" justify="space-between" className={cx('wrapper')}>
                <Flex style={{ padding: '10px 10px 0 10px' }} align="center" justify="center">
                    <Image width={'100px'} preview={false} src={logo}></Image>
                </Flex>

                <Flex wrap style={{ width: '100%', maxWidth: '1500px' }} align="center">
                    <Row className={cx('content')} align="center" justify="space-between">
                        <Col span={12}>
                            <Flex wrap justify="center" align="center" style={{ width: '100%', height: '100%' }}>
                                <div style={{ width: '380px', height: '500px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '30px', left: '80px' }}>
                                        <CourseItemFake data={data[0]}></CourseItemFake>
                                    </div>
                                    <div style={{ position: 'absolute', top: '50px', left: '60px' }}>
                                        <CourseItemFake data={data[1]}></CourseItemFake>
                                    </div>
                                    <div style={{ position: 'absolute', top: '70px', left: '40px' }}>
                                        <CourseItemFake data={data[2]}></CourseItemFake>
                                    </div>
                                </div>
                            </Flex>
                        </Col>

                        <Col offset={2} span={10}>
                            <Flex vertical justify="space-between" style={{ height: '100%' }}>
                                <Title style={{ padding: '50px 0 20px 0' }}>Welcome to Study!</Title>
                                <div style={{ maxWidth: '500px' }}>
                                    <p
                                        style={{
                                            textAlign: 'justify',
                                            lineHeight: '2',
                                            fontSize: '16px',
                                            padding: '0px 30px 0px 0px',
                                        }}
                                    >
                                        Your ultimate study support tool designed to make learning smarter and more
                                        organized. With our rich text editor, you can take and customize notes
                                        effortlessly, making them both effective and engaging. Track your projects and
                                        tests with detailed, visually dynamic charts, helping you stay on top of your
                                        academic progress with ease. Plus, enjoy smart course management features that
                                        let you organize, personalize, and master your subjects like never before. Dive
                                        in, and transform your study experience today!
                                    </p>
                                </div>
                                <div style={{ height: '50px' }}></div>
                            </Flex>
                        </Col>
                    </Row>
                </Flex>

                <Flex style={{ marginBottom: '40px' }} vertical align="center" justify="center">
                    <Title level={5}>Getting started</Title>
                    <Button
                        className={cx('btn')}
                        size="large"
                        color="primary"
                        shape="circle"
                        icon={<RightOutlined />}
                        onClick={handleNext}
                    ></Button>
                </Flex>
            </Flex>
        </>
    );
}

export default HomeLarge;
