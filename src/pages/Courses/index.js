import { Flex } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';

import SearchBar from '~/components/SearchBar';
import CourseItem from '~/components/CourseItem';
import { useDebounce } from '~/hooks';
import { useEffect, useState } from 'react';

function Courses() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    return (
        <div>
            <SearchBar />
            <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly" align="center">
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
                <CourseItem loading={debounced}></CourseItem>
            </Flex>
        </div>
    );
}

export default Courses;
