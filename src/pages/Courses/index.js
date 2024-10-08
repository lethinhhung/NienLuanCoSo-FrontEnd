import { Flex } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import { useEffect, useState } from 'react';

import SearchBar from '~/components/SearchBar';
import CourseItem from '~/components/CourseItem';
import { getCoursesInfoApi, getTermsInfoApi } from '~/utils/api';

function Courses() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);
    const [coursesInfo, setCoursesInfo] = useState([]);
    const [termsInfo, setTermsInfo] = useState([]);

    const handleCourseDelete = () => {
        setLoading(true);
    };

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const coursesData = await getCoursesInfoApi();
            const termsData = await getTermsInfoApi();
            setCoursesInfo(coursesData);
            setTermsInfo(termsData);
        };

        fetchCoursesInfo();
    }, [loading]);

    return (
        <div>
            <SearchBar />
            <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly" align="center">
                {/* {coursesInfo.map((data, index) => (
                    <CourseItem key={index} loading={debounced} data={data}></CourseItem>
                ))} */}
                {coursesInfo.length > 0 ? (
                    coursesInfo.map((data, index) => (
                        <CourseItem
                            onDelete={handleCourseDelete}
                            key={index}
                            data={data}
                            termsInfo={termsInfo}
                        ></CourseItem>
                    ))
                ) : (
                    <div>No course created...</div>
                )}
            </Flex>
        </div>
    );
}

export default Courses;
