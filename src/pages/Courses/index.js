import { Badge, Card, Flex, List, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import { useEffect, useState } from 'react';

import SearchBar from '~/components/SearchBar';
import CourseItem from '~/components/CourseItem';
import { getCoursesInfoApi, getTermsInfoApi, getTagsInfoApi } from '~/utils/api';
import LoadingSpin from '~/components/LoadingSpin';
import PageTitle from '~/components/PageTitle';

function Courses() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);
    const [coursesInfo, setCoursesInfo] = useState([]);
    const [termsInfo, setTermsInfo] = useState([]);
    const [tagsInfo, setTagsInfo] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleSearch = (course) => {
        setSearchCourse(course);
    };

    const fetchCoursesInfo = async () => {
        const coursesData = await getCoursesInfoApi();
        const termsData = await getTermsInfoApi();
        const tagsData = await getTagsInfoApi();
        setCoursesInfo(coursesData);
        setTermsInfo(termsData);
        setTagsInfo(tagsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoursesInfo();
    }, []);

    const handleCourseDelete = () => {
        setLoading(true);
        fetchCoursesInfo();
    };

    const filteredCourses = coursesInfo.filter((course) => {
        const matchesSearchCourse = course.name.toLowerCase().includes(searchCourse.toLowerCase());
        const matchesSelectedTags = selectedTags.every((selectedTag) =>
            course.tags.some((tagId) => {
                const tagName = tagsInfo.find((tag) => tag._id === tagId)?.name;
                return tagName === selectedTag;
            }),
        );

        const matchesSelectedStatus = (() => {
            const currentDate = new Date();
            const courseStartDate = new Date(course.startDate);
            const courseEndDate = new Date(course.endDate);

            if (selectedStatus === 'inprogress') {
                return courseStartDate <= currentDate && courseEndDate >= currentDate;
            } else if (selectedStatus === 'completed') {
                return courseEndDate < currentDate;
            } else if (selectedStatus === 'incoming') {
                return courseStartDate > currentDate;
            } else {
                return true;
            }
        })();

        return matchesSearchCourse && matchesSelectedTags && matchesSelectedStatus;
    });

    const handleTagsChange = (tags) => {
        setSelectedTags(tags);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    return (
        <div>
            <PageTitle title={'Courses'} />
            <SearchBar onSearch={handleSearch} onTagsChange={handleTagsChange} />
            <Flex className={cx('status-select')} style={{ width: '100%', marginTop: '15px' }} justify="center">
                <Select
                    defaultValue={'all'}
                    placeholder="Status"
                    style={{ width: 120 }}
                    onChange={handleStatusChange}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'inprogress', label: 'In progress' },
                        { value: 'incoming', label: 'Incoming' },
                    ]}
                />
            </Flex>
            <LoadingSpin loading={loading}></LoadingSpin>
            <Flex className={cx('wrapper')} justify="center">
                {filteredCourses.length > 0 ? (
                    // filteredCourses.map((data, index) => (
                    //     <CourseItem onDelete={handleCourseDelete} key={index} data={data} termsInfo={termsInfo} />
                    // ))
                    <div style={{ maxWidth: '1500px', width: '100%' }}>
                        <List
                            grid={{
                                gutter: 32,
                                xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 3,
                                xl: 3,
                                xxl: 4,
                            }}
                            dataSource={filteredCourses}
                            renderItem={(item) => (
                                <List.Item style={{ margin: '10px 20px 30px 20px' }}>
                                    <Flex justify="center">
                                        <CourseItem onDelete={handleCourseDelete} data={item} termsInfo={termsInfo} />
                                    </Flex>
                                </List.Item>
                            )}
                        ></List>
                    </div>
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
