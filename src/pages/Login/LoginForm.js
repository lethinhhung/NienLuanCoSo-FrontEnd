import { Form, Input, Button, Flex } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { loginApi } from '~/utils/api';
import styles from './Login.module.scss';
import { useAuth } from '~/contexts/Auth';

function LoginForm() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        const { name, password } = values;
        const res = await loginApi(name, password);

        if (res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            login(true);
            alert('Login successfully!');
            navigate('/dashboard');
        } else {
            alert('Usename/password not valid!');
        }

        console.log('Success:', res.access_token);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
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
                wrapperCol={{
                    span: 24,
                }}
            >
                <Flex justify="flex-end">
                    <Button
                        shape="circle"
                        icon={<RightOutlined />}
                        className={cx('submit-btn')}
                        type="primary"
                        htmlType="submit"
                    ></Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
