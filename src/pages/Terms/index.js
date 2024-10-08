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

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const termsData = await getTermsInfoApi();

            setTermsInfo(termsData);
            setFilteredTerms(termsData);
        };

        fetchCoursesInfo();
    }, []);

    const handleSelectTime = (date, dateString) => {
        if (dateString[0] === '' || dateString[1] === '') {
            setFilteredTerms(termsInfo);
        } else {
            const [startDate, endDate] = dateString;
            const start = new Date(startDate);
            const end = new Date(endDate);

            const filtered = termsInfo.filter((term) => {
                const termDate = new Date(term.startDate);
                return termDate >= start && termDate <= end;
            });

            setFilteredTerms(filtered);
        }
    };
    return (
        <div>
            <Row>
                <Col offset={6} span={12}>
                    {/* Select Component */}
                    <Flex className={cx('select-wrapper')} justify="center" wrap>
                        <div className={cx('time-select')}>
                            <RangePicker on onChange={handleSelectTime} />
                        </div>
                        <div className={cx('status-select')}>
                            <Select
                                defaultValue={'all'}
                                placeholder="Status"
                                style={{ width: 120 }}
                                options={[
                                    { value: 'all', label: 'All' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'onprogress', label: 'On Progress' },
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
