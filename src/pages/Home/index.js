import classNames from 'classnames/bind';
import {
    Flex,
    Typography,
    Image,
    Button,
    Carousel,
    Card,
    Badge,
    Tooltip,
    Popconfirm,
    Descriptions,
    Row,
    Col,
    Affix,
} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import logo from '~/assets/images/logo.png';
import book from '~/assets/images/book.svg';
import { AuthProvider } from '~/contexts/Auth';
import CourseItem from '~/components/CourseItem';
import CourseItemFake from '~/components/CourseItemFake';
import { Emoji } from 'emoji-picker-react';
import { useWindowDimensions } from '~/hooks';
import HomeLarge from './HomeLarge';

import reactCover from '~/assets/images/react-cover.png';
import gitCover from '~/assets/images/git-cover.png';
import iotCover from '~/assets/images/iot-cover.jpg';
import HomeSmall from './HomeSmall';
import PageTitle from '~/components/PageTitle';

function Home() {
    const { Title } = Typography;
    const { Meta } = Card;
    const { isAuthenticated } = AuthProvider;

    const navigate = useNavigate();

    const handleNext = () => {
        if (isAuthenticated || localStorage.getItem('access_token')) {
            navigate('/dashboard');
        } else navigate('/login');
    };

    const data = [
        {
            color: '#e6d9a2',
            name: 'Nien Luan',
            emoji: '🧠',
            description: 'Nien luan....',
            img: gitCover,
            badgeColor: 'green',
        },
        {
            color: '#cb80ab',
            name: 'Nien Luan',
            emoji: '🧠',
            description: 'Nien luan....',
            img: iotCover,
            badgeColor: 'blue',
        },
        {
            color: '#8967b3',
            name: 'ReactJS',
            emoji: '⚛️',
            description: 'The library for web and native user interfaces',
            img: reactCover,
            badgeColor: 'red',
        },
    ];

    const { width, height } = useWindowDimensions();

    if (width > 900 && height > 800) {
        return (
            <div>
                <PageTitle title={'Welcome'} />
                <HomeLarge data={data} handleNext={handleNext} />
            </div>
        );
    } else
        return (
            <div>
                <PageTitle title={'Welcome'} />
                <HomeSmall data={data} handleNext={handleNext} />
            </div>
        );
}

export default Home;
