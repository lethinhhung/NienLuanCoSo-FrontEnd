import { Flex, Layout } from 'antd';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './DefaultLayout1.module.scss';
import CustomHeader from './Header';
import logo from '~/assets/images/logo.png';

function DefaultLayou1({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Footer, Sider, Content } = Layout;

    const layoutStyle = {
        overflow: 'hidden',
    };

    return (
        <Flex gap="middle" wrap>
            <Layout className={cx('wrapper')} style={layoutStyle}>
                <Header className={cx('header')}>
                    <Link to={'/'}>
                        <img className={cx('logo')} src={logo} alt="logo" />
                    </Link>
                    <CustomHeader></CustomHeader>
                </Header>
                <Layout className={cx('content-wrapper')}>
                    <Sider className={cx('slider')} width="20%">
                        Sider
                    </Sider>
                    <Content className={cx('content')}>{children}</Content>
                </Layout>
                <Footer className={cx('footer')}>Footer</Footer>
            </Layout>
        </Flex>
    );
}

export default DefaultLayou1;
