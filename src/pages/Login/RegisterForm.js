import { Form, Input, Button, Flex } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

function RegisterForm() {
    const cx = classNames.bind(styles);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
            <Form.Item
                name="username"
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
                ]}
            >
                <Input.Password className={cx('input')} placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="repassword"
                wrapperCol={{
                    span: 24,
                }}
                rules={[
                    {
                        required: true,
                        message: 'Passwords not match',
                    },
                ]}
            >
                <Input.Password className={cx('input')} placeholder="Retype your password" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 24,
                }}
            >
                <Flex justify="flex-end">
                    <Button shape="circle" className={cx('submit-btn')} type="primary" htmlType="submit">
                        <RightOutlined />
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
}

export default RegisterForm;
