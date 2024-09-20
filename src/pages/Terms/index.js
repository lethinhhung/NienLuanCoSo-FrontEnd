import { Row, Col, Flex, Space, Select } from 'antd';
import classNames from 'classnames/bind';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';

import styles from './Terms.module.scss';
import SearchBar from '~/components/SearchBar';
import SearchBarLarge from '~/components/SearchBar/SearchBarLarge';
import SearchBarSmall from '~/components/SearchBar/SearchBarSmall';
import TermItem from '~/components/TermItem';

function Terms() {
    const cx = classNames.bind(styles);

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();

    return (
        <div>
            <Row>
                <Col offset={6} span={12}>
                    {/* Select Component */}
                    <Flex justify="center" wrap>
                        <Select
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
                        />
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col offset={2} span={20}>
                    <Flex className={cx('wrapper')} wrap gap="small" justify="space-evenly">
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                        <TermItem loading={loading}></TermItem>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
}

export default Terms;
