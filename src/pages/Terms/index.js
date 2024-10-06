import { Row, Col, Flex, Space, Select, DatePicker } from 'antd';
import classNames from 'classnames/bind';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';

import styles from './Terms.module.scss';
import SearchBar from '~/components/SearchBar';
import SearchBarLarge from '~/components/SearchBar/SearchBarLarge';
import SearchBarSmall from '~/components/SearchBar/SearchBarSmall';
import TermItem from '~/components/TermItem';
import { getTermsInfoApi } from '~/utils/api';
import CourseItem from '~/components/CourseItem';

function Terms() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    const { RangePicker } = DatePicker;

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();

    const onOk = () => {};

    const [termsInfo, setTermsInfo] = useState([
        {
            name: 'Empty',
        },
    ]);

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const coursesData = await getTermsInfoApi();

            setTermsInfo(coursesData);
        };

        fetchCoursesInfo();
    }, []);

    return (
        <div>
            <Row>
                <Col offset={6} span={12}>
                    {/* Select Component */}
                    <Flex className={cx('select-wrapper')} justify="center" wrap>
                        {/* <Select
                            placeholder="From"
                            style={{ width: 120 }}
                            options={[
                                { value: '2023', label: '2023' },
                                { value: '2024', label: '2025' },
                                { value: '2026', label: '2026' },
                            ]}
                        />
                        <Select
                            placeholder="To"
                            style={{ width: 120 }}
                            options={[
                                { value: '2023', label: '2023' },
                                { value: '2024', label: '2025' },
                                { value: '2026', label: '2026' },
                            ]}
                        /> */}
                        <div className={cx('time-select')}>
                            <RangePicker onOk={onOk} />
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
                        {termsInfo.length > 0 ? (
                            termsInfo.map((data, index) => (
                                <TermItem key={index} loading={debounced} data={data}></TermItem>
                            ))
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
