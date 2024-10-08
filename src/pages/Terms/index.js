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

    const onOk = () => {};

    const [termsInfo, setTermsInfo] = useState([]);

    useEffect(() => {
        const fetchCoursesInfo = async () => {
            const termsData = await getTermsInfoApi();

            setTermsInfo(termsData);
        };

        fetchCoursesInfo();
    }, []);

    return (
        <div>
            <Row>
                <Col offset={6} span={12}>
                    {/* Select Component */}
                    <Flex className={cx('select-wrapper')} justify="center" wrap>
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
                            termsInfo.map((data, index) => <TermItem key={index} data={data}></TermItem>)
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
