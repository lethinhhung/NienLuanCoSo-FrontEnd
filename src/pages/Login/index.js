import { Tabs, Flex, Image, Row, Col, Card, Button, Tooltip, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { EditOutlined, FormOutlined, LoginOutlined, RightOutlined } from '@ant-design/icons';

import logo from '~/assets/images/logo.png';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useWindowDimensions } from '~/hooks';
import NotificationContext from '~/contexts/NotificationContext';

function Login() {
    const cx = classNames.bind(styles);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [form, setForm] = useState(<LoginForm />);
    const [btn, setBtn] = useState(<FormOutlined />);
    const [status, setStatus] = useState('Login');
    const { showNotification } = useContext(NotificationContext);

    const { Title } = Typography;

    const naviagte = useNavigate();

    const handleToHome = () => {
        naviagte('/');
    };

    const handleRegisterStatus = (status, name) => {
        if (status === 'success') {
            showNotification('Register successfully!', 'Now you can login in', 'success');
            setRegisterSuccess(!registerSuccess);
            setForm(<LoginForm name={name} />);
            setBtn(<FormOutlined />);
            setStatus('Login');
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

    const { height } = useWindowDimensions();

    return (
        <Flex vertical justify="center" className={cx('wrapper')}>
            {height > 700 ? (
                <Flex wrap vertical align="center" justify="center" className={cx('logo-wrapper')}>
                    <div style={{ marginTop: '10px' }}>
                        <Image
                            onClick={handleToHome}
                            className={cx('logo')}
                            preview={false}
                            width={100}
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div style={{ marginTop: '10px', marginBottom: '-30px' }}>
                        <Title level={2}>Study</Title>
                    </div>
                </Flex>
            ) : (
                <Flex wrap align="center" style={{ height: '50px', width: '100vw' }}>
                    <Image
                        onClick={handleToHome}
                        className={cx('logo-small')}
                        preview={false}
                        width={70}
                        src={logo}
                        alt="logo"
                    />

                    <Title style={{ margin: '10px 0 0 30px' }} level={2}>
                        Study
                    </Title>
                </Flex>
            )}

            <Flex wrap justify="center" className={cx('form-wrapper')}>
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
