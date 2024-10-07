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

import { useGetBrighterColor, useGetTextColorFromBackground } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getCourseInfoApi, getCoursesInfoApi } from '~/utils/api';

function Header() {
    const cx = classNames.bind(styles);

    const navigate = useNavigate();

    const cardColor = '#624e88';

    const [textColor, setTextColor] = useState('#ffffff');

    const handleBackClick = () => {
        navigate(-1);
    };

    const [courseInfo, setCourseInfo] = useState({});

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const courseId = await getCoursesInfoApi();
            const courseData = await getCourseInfoApi(courseId[0]);

            setCourseInfo(courseData);
        };

        fetchCourseInfo();
    }, []);

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

            <Breadcrumb
                className={cx('bread-crumb')}
                style={{}}
                separator=">"
                items={[
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
                                <span>Courses</span>
                            </Link>
                        ),
                    },
                    {
                        title: 'Current course',
                    },
                ]}
            />
        </Flex>
    );
}

export default Header;
