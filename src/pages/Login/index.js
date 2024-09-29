import { Tabs, Flex, Image, Row, Col } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '~/assets/images/logo.png';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login() {
    const cx = classNames.bind(styles);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const naviagte = useNavigate();

    const handleToHome = () => {
        naviagte('/');
    };

    const handleRegisterStatus = (status) => {
        if (status === 'success') {
            setRegisterSuccess(!registerSuccess);
            alert('Register Successfully');
        }
    };

    const items = [
        {
            key: 'login',
            label: 'Login',
            children: <LoginForm />,
        },
        {
            key: 'register',
            label: 'Register',
            children: <RegisterForm onRegister={handleRegisterStatus} />,
        },
    ];

    return (
        <Flex vertical justify="center" className={cx('wrapper')}>
            <Row>
                <Col span={9}></Col>
                <Col className={cx('logo-wrapper')} span={6}>
                    <Image
                        onClick={handleToHome}
                        className={cx('logo')}
                        preview={false}
                        width={150}
                        src={logo}
                        alt="hehe"
                    />
                </Col>
                <Col span={9}></Col>
            </Row>
            <Row>
                <Col span={8}></Col>
                <Col className={cx('form-wrapper')} span={8}>
                    <Tabs
                        size="large"
                        animated
                        centered
                        className={cx('tabs')}
                        type="card"
                        defaultActiveKey="login"
                        items={items}
                        key={registerSuccess}
                    />
                </Col>
                <Col span={8}></Col>
            </Row>
        </Flex>
    );
}

export default Login;
