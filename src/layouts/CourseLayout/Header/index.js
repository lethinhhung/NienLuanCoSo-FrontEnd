import {
    LeftOutlined,
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    DashboardOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Flex, Menu, Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetBrighterColor, useGetTextColorFromBackground } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getCourseInfoApi, getLessonInfoApi } from '~/utils/api';

function Header() {
    const cx = classNames.bind(styles);

    const { courseId, lessonId } = useParams();

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const [courseInfo, setCourseInfo] = useState({});
    const [lessonInfo, setLessonInfo] = useState({});

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const courseData = await getCourseInfoApi(courseId);
            setCourseInfo(courseData);
            if (lessonId !== undefined) {
                const lessonData = await getLessonInfoApi(lessonId);
                setLessonInfo(lessonData);
            }
        };

        fetchCourseInfo();
    }, []);

    let data = [
        {
            title: (
                <Link to="/">
                    <HomeOutlined />
                </Link>
            ),
        },
        {
            title: (
                <Link to="/courses">
                    <AppstoreOutlined />
                    <span> Courses</span>
                </Link>
            ),
        },
        {
            title: <Link to={'/course/' + courseInfo._id}>{courseInfo.emoji + ' ' + courseInfo.name}</Link>,
        },
    ];

    if (lessonId !== undefined) {
        data.push({
            title: lessonInfo.name,
        });
    }

    return (
        <Flex className={cx('wrapper')} vertical>
            <Flex
                style={{ backgroundColor: courseInfo.color }}
                justify="space-between"
                align="center"
                wrap
                className={cx('menu')}
            >
                <Button
                    style={{ color: useGetTextColorFromBackground(courseInfo.color) }}
                    type="text"
                    className={cx('btn')}
                    size="large"
                    shape="circle"
                    onClick={handleBackClick}
                >
                    <LeftOutlined />
                </Button>
                <h1 style={{ color: useGetTextColorFromBackground(courseInfo.color) }}>{courseInfo.name}</h1>
                {/* <Button className={cx('btn')} size="large" shape="circle">
                    More
                </Button> */}
            </Flex>

            <Breadcrumb className={cx('bread-crumb')} separator=">" items={data} />
        </Flex>
    );
}

export default Header;
