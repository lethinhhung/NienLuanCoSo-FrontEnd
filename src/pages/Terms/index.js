import { Row, Col, Flex, Space, Select, DatePicker } from 'antd';
import classNames from 'classnames/bind';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';

import styles from './Terms.module.scss';
import SearchBar from '~/components/SearchBar';
import SearchBarLarge from '~/components/SearchBar/SearchBarLarge';
import SearchBarSmall from '~/components/SearchBar/SearchBarSmall';
import TermItem from '~/components/TermItem';
import { getTermsInfoApi, getCoursesInfoApi } from '~/utils/api';
import CourseItem from '~/components/CourseItem';

function Terms() {
    const cx = classNames.bind(styles);

    const { RangePicker } = DatePicker;

    const [termsInfo, setTermsInfo] = useState([]);
    const [filteredTerms, setFilteredTerms] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const termsData = await getTermsInfoApi();

            setTermsInfo(termsData);
            setFilteredTerms(termsData);
        };

        fetchCoursesInfo();
    }, []);

    const applyFilters = (time, status) => {
        let filtered = termsInfo;

        if (time.length === 2 && time[0] !== '' && time[1] !== '') {
            const [startDate, endDate] = time;
            const start = new Date(startDate);
            const end = new Date(endDate);

            filtered = filtered.filter((term) => {
                const termDate = new Date(term.startDate);
                return termDate >= start && termDate <= end;
            });
        }

        if (status === 'onprogress') {
            const currentDate = new Date();
            filtered = filtered.filter((term) => {
                const termStartDate = new Date(term.startDate);
                const termEndDate = new Date(term.endDate);

                return termStartDate <= currentDate && termEndDate >= currentDate;
            });
        } else if (status === 'completed') {
            const currentDate = new Date();
            filtered = filtered.filter((term) => {
                const termDate = new Date(term.endDate);
                return termDate <= currentDate;
            });
        } else if (status === 'incoming') {
            const currentDate = new Date();
            filtered = filtered.filter((term) => {
                const termDate = new Date(term.startDate);
                return termDate > currentDate;
            });
        }

        setFilteredTerms(filtered);
    };

    const handleSelectTime = (date, dateString) => {
        setSelectedTime(dateString);
        applyFilters(dateString, selectedStatus);
    };

    const handleSelectStatus = (value) => {
        setSelectedStatus(value);
        applyFilters(selectedTime, value);
    };
    return (
        <div>
            <Row>
                <Col offset={6} span={12}>
                    {/* Select Component */}
                    <Flex className={cx('select-wrapper')} justify="center" wrap>
                        <div className={cx('time-select')}>
                            <RangePicker onChange={handleSelectTime} />
                        </div>
                        <div className={cx('status-select')}>
                            <Select
                                defaultValue={'all'}
                                placeholder="Status"
                                style={{ width: 120 }}
                                onChange={handleSelectStatus}
                                options={[
                                    { value: 'all', label: 'All' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'onprogress', label: 'On Progress' },
                                    { value: 'incoming', label: 'Incoming' },
                                ]}
                            />
                        </div>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col offset={2} span={20}>
                    <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly">
                        {/* {termsInfo.length > 0 ? (
                            termsInfo.map((data, index) => <TermItem key={index} data={data}></TermItem>)
                        ) : (
                            <div>No term created...</div>
                        )} */}
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((data, index) => <TermItem key={index} data={data}></TermItem>)
                        ) : (
                            <div>No term created...</div>
                        )}
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Terms;
