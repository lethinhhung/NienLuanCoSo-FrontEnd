import { Flex, Layout, Affix, FloatButton } from 'antd';
import { CaretUpOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import CustomHeader from './Header';
import CustomFooter from './Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Sider, Content, Footer } = Layout;
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();

    const [isHidden, setIsHidden] = useState(true);

    const layoutStyle = {
        overflow: 'hidden',
    };

    useEffect(() => {
        if (width <= 500) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, [width]);

    const handleToHome = () => {
        navigate('/');
    };

    return (
        <Flex gap="middle" wrap>
            <Layout className={cx('wrapper')} style={layoutStyle}>
                <Affix>
                    <Header className={cx('header')}>
                        <Link hidden={isHidden} to={'/'}>
                            <img className={cx('logo')} src={logo} alt="logo" />
                        </Link>

                        <CustomHeader></CustomHeader>
                    </Header>
                </Affix>
                <Layout className={cx('content-wrapper')}>
                    {/* <Sider className={cx('slider')} width="20%">
                        Sider
                    </Sider> */}
                    <Content className={cx('content')}>{children}</Content>
                </Layout>
                <Affix offsetBottom={0}>
                    <Footer className={cx('footer')}>
                        <CustomFooter>Footer</CustomFooter>
                    </Footer>
                </Affix>
            </Layout>
            <FloatButton.Group>
                <FloatButton
                    icon={<PlusOutlined style={{ fontSize: '16px', color: '#08c' }} />}
                    className={cx('to-top-btn')}
                ></FloatButton>
                <div hidden={!isHidden}>
                    <FloatButton
                        onClick={handleToHome}
                        icon={<HomeOutlined />}
                        className={cx('to-home-btn')}
                    ></FloatButton>
                </div>
                <FloatButton.BackTop icon={<CaretUpOutlined />} className={cx('to-top-btn')}></FloatButton.BackTop>
            </FloatButton.Group>
        </Flex>
    );
}

export default DefaultLayout;
