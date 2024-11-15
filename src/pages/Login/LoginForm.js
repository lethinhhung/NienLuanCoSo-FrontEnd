import { Form, Input, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { loginApi } from '~/utils/api';
import styles from './Login.module.scss';
import { useAuth } from '~/contexts/Auth';
import PageTitle from '~/components/PageTitle';
import { useContext } from 'react';
import NotificationContext from '~/contexts/NotificationContext';

function LoginForm({ name = '' }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { login } = useAuth();

    const { showNotification } = useContext(NotificationContext);

    const onFinish = async (values) => {
        const { name, password } = values;
        const res = await loginApi(name, password);

        if (res.access_token) {
            const currentTime = new Date();
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('login_time', currentTime);
            login(true);
            showNotification('Login Successful', 'Welcome back!', 'success');

            navigate('/dashboard');
        } else {
            showNotification('Login Failed', 'Invalid usename/password!', 'error');
        }

        console.log('Success:', res.access_token);
    };
    const onFinishFailed = (errorInfo) => {
        showNotification('Validation failed', 'Please enter all the required information.', 'error');
    };

    return (
        <div>
            <PageTitle title={'Login'} />
            <Form
                className={cx('form')}
                name="login"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                    name: name,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Flex justify="center">
                        <Button size="large" shape="square" className={cx('submit-btn')} type="primary" htmlType="submit">
                            <RightOutlined />
                        </Button>
                    </Flex>
                </Form.Item> */}
                <Form.Item
                    name="name"
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input className={cx('input')} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password className={cx('input')} placeholder="Password" />
                </Form.Item>
                <Form.Item
                    className={cx('submit')}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button size="large" shape="circle" className={cx('submit-btn')} type="primary" htmlType="submit">
                        <RightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginForm;
