import { Row, Col, Flex, Select, DatePicker, Badge, List } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Terms.module.scss';
import TermItem from '~/components/TermItem';
import { getTermsInfoApi } from '~/utils/api';
import LoadingSpin from '~/components/LoadingSpin';
import PageTitle from '~/components/PageTitle';

function Terms() {
    const cx = classNames.bind(styles);

    const { RangePicker } = DatePicker;
    const [loading, setLoading] = useState(true);
    const [termsInfo, setTermsInfo] = useState([]);
    const [filteredTerms, setFilteredTerms] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const fetchTermsInfo = async () => {
        const termsData = await getTermsInfoApi();

        setTermsInfo(termsData);
        setFilteredTerms(termsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchTermsInfo();
    }, []);

    const handleTermDelete = () => {
        setLoading(true);
        fetchTermsInfo();
    };

    const applyFilters = (time, status) => {
        let filtered = termsInfo;

        if (time.length === 2 && time[0] !== '' && time[1] !== '') {
            const [startDate, endDate] = time;
            const start = new Date(startDate);
            const end = new Date(endDate);

            filtered = filtered.filter((term) => {
                const termStartDate = new Date(term.startDate);
                const termEndDate = new Date(term.endDate);
                return termStartDate >= start && termEndDate <= end;
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
            <PageTitle title={'Terms'} />
            <Row>
                <Col offset={6} span={12}>
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
            <LoadingSpin loading={loading} />
            <Row>
                <Col offset={2} span={20}>
                    <Flex className={cx('wrapper')} wrap gap="small" justify="center">
                        {filteredTerms.length > 0 ? (
                            <List
                                style={{ width: '100%' }}
                                grid={{
                                    gutter: 32,
                                    xs: 1,
                                    sm: 1,
                                    md: 1,
                                    lg: 2,
                                    xl: 2,
                                    xxl: 2,
                                }}
                                dataSource={filteredTerms}
                                renderItem={(item) => (
                                    <List.Item style={{ margin: '30px 20px 30px 20px' }}>
                                        <Flex justify="center">
                                            <TermItem onDelete={handleTermDelete} data={item}></TermItem>
                                        </Flex>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <>
                                <div style={{ height: '60vh' }}></div>
                                <div
                                    hidden={loading}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <Badge count={'No term created'}></Badge>
                                </div>
                            </>
                        )}
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Terms;
