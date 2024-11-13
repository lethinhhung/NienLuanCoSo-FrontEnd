import { LeftOutlined, HomeOutlined, AppstoreOutlined, BarChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Button, Typography } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useGetTextColorFromBackground, useWindowDimensions } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getCourseInfoApi, getLessonInfoApi } from '~/utils/api';

function Header() {
    const cx = classNames.bind(styles);

    const { Title } = Typography;

    const { courseId, lessonId, statisticsId } = useParams();

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const h1Ref = useRef();

    const [courseInfo, setCourseInfo] = useState({});
    const [lessonInfo, setLessonInfo] = useState({});
    const [originalText, setOriginalText] = useState('');

    const { width } = useWindowDimensions();

    const fetchCourseInfo = async () => {
        const courseData = await getCourseInfoApi(courseId);
        setCourseInfo(courseData);

        if (lessonId !== undefined) {
            const lessonData = await getLessonInfoApi(lessonId);
            setLessonInfo(lessonData);
        }
    };
    useEffect(() => {
        fetchCourseInfo();
    }, [courseId, lessonId]);

    useEffect(() => {
        const shortenText = (text, maxWidth) => {
            let shortenedText = text;
            while (h1Ref.current.offsetWidth > maxWidth && shortenedText.length > 0) {
                shortenedText = shortenedText.slice(0, -1);
                h1Ref.current.innerText = shortenedText + '...';
            }
        };

        if (h1Ref.current && h1Ref.current.offsetWidth > width * 0.8) {
            shortenText(courseInfo.name, width * 0.8);
        }
    }, [width, courseInfo.name]);

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
    if (statisticsId !== undefined) {
        data.push({
            title: (
                <>
                    <BarChartOutlined /> <span>Statistics</span>
                </>
            ),
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

                <h1
                    ref={h1Ref}
                    // className={cx('scrollable-text')}
                    style={{
                        color: useGetTextColorFromBackground(courseInfo.color),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {courseInfo.name}
                </h1>

                {/* <Button className={cx('btn')} size="large" shape="circle">
                    More
                </Button> */}
            </Flex>

            <Breadcrumb className={cx('bread-crumb')} separator=">" items={data} />
        </Flex>
    );
}

export default Header;
