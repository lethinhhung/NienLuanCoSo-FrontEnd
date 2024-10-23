import { Badge, Flex } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import { useEffect, useState } from 'react';

import SearchBar from '~/components/SearchBar';
import CourseItem from '~/components/CourseItem';
import { getCoursesInfoApi, getTermsInfoApi, getTagsInfoApi } from '~/utils/api';
import LoadingSpin from '~/components/LoadingSpin';

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
            setLoading(false);
        };

        fetchCoursesInfo();
    }, []);

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
            <LoadingSpin loading={loading}></LoadingSpin>
            <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly" align="center">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((data, index) => (
                        <CourseItem onDelete={handleCourseDelete} key={index} data={data} termsInfo={termsInfo} />
                    ))
                ) : (
                    <div
                        hidden={loading}
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <Badge count={'No course created'}></Badge>
                    </div>
                )}
            </Flex>
        </div>
    );
}

export default Courses;
