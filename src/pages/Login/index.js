import { Tabs, Typography, Flex, Button, Form, Image, Row, Col, Input } from 'antd';
import classNames from 'classnames/bind';

import logo from '~/assets/images/logo.png';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login() {
    const { Title } = Typography;

    const cx = classNames.bind(styles);

    const items = [
        {
            key: 'login',
            label: 'Login',
            children: <LoginForm />,
        },
        {
            key: 'register',
            label: 'Register',
            children: <RegisterForm />,
        },
    ];

    return (
        <Flex vertical justify="center" className={cx('wrapper')}>
            <Row>
                <Col span={9}></Col>
                <Col className={cx('logo-wrapper')} span={6}>
                    <Image className={cx('logo')} preview={false} width={150} src={logo} alt="hehe" />
                </Col>
                <Col span={9}></Col>
            </Row>
            <Row>
                <Col span={8}></Col>
                <Col className={cx('form-wrapper')} span={8}>
                    <Tabs
                        tabBarStyle={{ color: 'red' }}
                        size="large"
                        animated
                        centered
                        className={cx('tabs')}
                        type="card"
                        defaultActiveKey="login"
                        items={items}
                    />
                </Col>
                <Col span={8}></Col>
            </Row>
        </Flex>
    );
}

export default Login;
