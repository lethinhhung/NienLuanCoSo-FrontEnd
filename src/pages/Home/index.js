import classNames from 'classnames/bind';
import { Flex, Typography, Image, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import logo from '~/assets/images/logo.png';
import styles from './Home.module.scss';
import book from '~/assets/images/book.svg';

function Home() {
    const { Title } = Typography;

    const navigate = useNavigate();

    const cx = classNames.bind(styles);

    const handleNext = () => {
        navigate('/dashboard');
    };

    return (
        <Flex className={cx('wrapper')} vertical align="center" justify="center">
            <Image width={'100px'} preview={false} src={logo}></Image>
            <Title className={cx('title')}>Learning Utility</Title>
            <Image width={'500px'} preview={false} src={book}></Image>
            <Button size="large" color="primary" shape="circle" icon={<RightOutlined />} onClick={handleNext}></Button>
        </Flex>
    );
}

export default Home;
