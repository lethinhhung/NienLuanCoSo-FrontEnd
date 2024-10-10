import { Flex } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import { useEffect, useState } from 'react';

import SearchBar from '~/components/SearchBar';
import CourseItem from '~/components/CourseItem';
import { getCoursesInfoApi, getTermsInfoApi, getTagsInfoApi } from '~/utils/api';

function Courses() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);
    const [coursesInfo, setCoursesInfo] = useState([]);
    const [termsInfo, setTermsInfo] = useState([]);
    const [tagsInfo, setTagsInfo] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCourseDelete = () => {
        setLoading(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const coursesData = await getCoursesInfoApi();
            const termsData = await getTermsInfoApi();
            const tagsData = await getTagsInfoApi();
            setCoursesInfo(coursesData);
            setTermsInfo(termsData);
            setTagsInfo(tagsData);
        };

        fetchCoursesInfo();
    }, [loading]);

    // const filteredCourses = coursesInfo.filter((course) => {
    //     const matchesSearchTerm = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    //     const matchesSelectedTags =
    //         selectedTags.length === 0 ||
    //         course.tags.some((tagId) => {
    //             const tagName = tagsInfo.find((tag) => tag._id === tagId)?.name;
    //             return selectedTags.includes(tagName);
    //         });
    //     return matchesSearchTerm && matchesSelectedTags;
    // });
    const filteredCourses = coursesInfo.filter((course) => {
        const matchesSearchTerm = course.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSelectedTags = selectedTags.every((selectedTag) =>
            course.tags.some((tagId) => {
                const tagName = tagsInfo.find((tag) => tag._id === tagId)?.name;
                return tagName === selectedTag;
            }),
        );
        return matchesSearchTerm && matchesSelectedTags;
    });

    const handleTagsChange = (tags) => {
        setSelectedTags(tags);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} onTagsChange={handleTagsChange} />
            <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly" align="center">
                {/* {coursesInfo.length > 0 ? (
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
                )} */}
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((data, index) => (
                        <CourseItem onDelete={handleCourseDelete} key={index} data={data} termsInfo={termsInfo} />
                    ))
                ) : (
                    <div>No course created...</div>
                )}
            </Flex>
        </div>
    );
}

export default Courses;
