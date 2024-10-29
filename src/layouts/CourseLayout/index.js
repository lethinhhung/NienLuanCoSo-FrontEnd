import { Flex, Layout, Affix, FloatButton, Tooltip } from 'antd';
import { CaretUpOutlined, HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './CourseLayout.module.scss';
import CustomHeader from './Header';
import CustomFooter from './Footer';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseLayout({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Content, Footer } = Layout;
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const [isHidden, setIsHidden] = useState(true);
    const headerRef = useRef();

    const [offsetHeight, setOffsetHeight] = useState(0);

    const layoutStyle = {
        overflow: 'hidden',
    };

    useEffect(() => {
        if (headerRef.current) {
            setOffsetHeight(headerRef.current.offsetHeight);
        }
        if (width <= 500) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, [width]);

    const handleToHome = () => {
        navigate('/');
    };

    ///

    return (
        <Flex gap="middle" wrap>
            <Layout className={cx('wrapper')} style={layoutStyle}>
                <Affix>
                    <Header ref={headerRef} className={cx('header')}>
                        <CustomHeader></CustomHeader>
                    </Header>
                </Affix>
                <Layout style={{ marginTop: offsetHeight - 64 }} className={cx('content-wrapper')}>
                    <Content className={cx('content')}>{children}</Content>
                </Layout>

                <Footer className={cx('footer')}>
                    <CustomFooter>Footer</CustomFooter>
                </Footer>
            </Layout>
            <FloatButton.Group className={cx('to-top-btn-group')}>
                <div hidden={!isHidden}>
                    <Tooltip placement="left" title="Home">
                        <div>
                            <FloatButton
                                className={cx('to-top-btn')}
                                onClick={handleToHome}
                                icon={<HomeOutlined />}
                            ></FloatButton>
                        </div>
                    </Tooltip>
                </div>

                <div>
                    <FloatButton.BackTop className={cx('to-top-btn')} icon={<CaretUpOutlined />}></FloatButton.BackTop>
                </div>
            </FloatButton.Group>
        </Flex>
    );
}

export default CourseLayout;
