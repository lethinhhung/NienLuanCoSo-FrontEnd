import { Form, Input, Button, Flex, notification } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import styles from './Login.module.scss';
import { createUserApi } from '~/utils/api';
import PageTitle from '~/components/PageTitle';
import NotificationContext from '~/contexts/NotificationContext';

function RegisterForm({ onRegister }) {
    const cx = classNames.bind(styles);
    const [status, setStatus] = useState(null);
    const { showNotification } = useContext(NotificationContext);

    const onFinish = async (values) => {
        if (!values) {
            showNotification('Please enter all the required information.', '', 'warning');
            return;
        }
        const { name, email, password, description } = values;

        const res = await createUserApi(name, email, password, description);
        console.log(res);
        if (res.result) {
            setStatus('success');
            onRegister('success', name);
        } else if (res.EC === 0) {
            showNotification('Duplicated username!', 'Choose another username', 'error');
            return;
        } else {
            showNotification('Unknown error!', '', 'error');
            return;
        }
    };
    const onFinishFailed = (errorInfo) => {
        showNotification('Validation failed', 'Please enter all the required information.', 'error');

        setStatus('failure');
        onRegister('failure', '');
    };

    return (
        <div>
            <PageTitle title={'Register'} />
            <Form
                className={cx('form')}
                name="register"
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
                        {
                            min: 8,
                            message: 'Username must be at least 8 characters long!',
                        },
                    ]}
                >
                    <Input className={cx('input')} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="email"
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input className={cx('input')} placeholder="Email" />
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
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character!',
                        },
                    ]}
                >
                    <Input.Password className={cx('input')} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    hasFeedback
                    dependencies={['password']}
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className={cx('input')} placeholder="Retype password" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                    className={cx('submit')}
                >
                    <Flex justify="center">
                        <Button
                            size="large"
                            shape="circle"
                            className={cx('submit-btn')}
                            type="primary"
                            htmlType="submit"
                        >
                            <RightOutlined />
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterForm;
