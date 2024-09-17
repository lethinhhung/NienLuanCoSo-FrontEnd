import { Flex } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';

import CourseItem from '~/components/CourseItem';

function Courses() {
    const cx = classNames.bind(styles);

    return (
        <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly" align="center">
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
        </Flex>
    );
}

export default Courses;
