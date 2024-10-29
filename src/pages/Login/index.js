import { Tabs, Flex, Image, Row, Col, Card, Button, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EditOutlined, FormOutlined, LoginOutlined, RightOutlined } from '@ant-design/icons';

import logo from '~/assets/images/logo.png';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useWindowDimensions } from '~/hooks';

function Login() {
    const cx = classNames.bind(styles);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [form, setForm] = useState(<LoginForm />);
    const [btn, setBtn] = useState(<FormOutlined />);
    const [status, setStatus] = useState('Login');

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

    const handleChangeForm = () => {
        if (status === 'Login') {
            setForm(<RegisterForm onRegister={handleRegisterStatus} />);
            setBtn(<LoginOutlined />);
            setStatus('Register');
        } else {
            setForm(<LoginForm />);
            setBtn(<FormOutlined />);
            setStatus('Login');
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

    const { height } = useWindowDimensions();

    return (
        <Flex vertical justify="center" className={cx('wrapper')}>
            {height > 700 ? (
                <Flex wrap justify="center" className={cx('logo-wrapper')}>
                    <Image
                        onClick={handleToHome}
                        className={cx('logo')}
                        preview={false}
                        width={100}
                        src={logo}
                        alt="logo"
                    />
                </Flex>
            ) : (
                <Flex wrap style={{ height: '50px' }}>
                    <Image
                        onClick={handleToHome}
                        className={cx('logo-small')}
                        preview={false}
                        width={70}
                        src={logo}
                        alt="logo"
                    />
                </Flex>
            )}

            <Flex wrap justify="center" className={cx('form-wrapper')}>
                {/* <Tabs
                            size="large"
                            animated
                            centered
                            className={cx('tabs')}
                            type="card"
                            defaultActiveKey="login"
                            items={items}
                            key={registerSuccess}
                        /> */}
                <Card
                    title={status}
                    extra={
                        <Tooltip title={status === 'Login' ? 'Register' : 'Login'}>
                            <Button size="large" shape="circle" onClick={handleChangeForm}>
                                {btn}
                            </Button>
                        </Tooltip>
                    }
                    bordered={false}
                    hoverable
                >
                    {form}
                </Card>
            </Flex>
        </Flex>
    );
}

export default Login;
