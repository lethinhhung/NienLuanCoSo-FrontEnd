import { Flex, Input, Row, Col } from 'antd';
import classNames from 'classnames/bind';

import TagsDrawerClosable from '../TagsDrawerClosable';
import styles from './SearchBar.module.scss';

function SearchBarSmall() {
    const cx = classNames.bind(styles);
    return (
        // <div className="wrapper" style={{ display: 'flex' }}>
        <Flex vertical className={cx('wrapper')} style={{ margin: '0 20px' }}>
            {/* <Row>
                <Col className={cx('search-input-wrapper')} offset={1} span={20}>
                    <Input placeholder="Search for courses..." className={cx('search-input')}></Input>
                </Col>
            </Row>
            <Row>
                <Col className={cx('tags-drawer-wrapper')} offset={1} span={20}>
                    <TagsDrawerClosable></TagsDrawerClosable>
                </Col>
            </Row> */}
            <div className={cx('search-input-wrapper')}>
                <Input placeholder="Search for courses..." className={cx('search-input')}></Input>
            </div>
            <div className={cx('tags-drawer-wrapper')}>
                <TagsDrawerClosable></TagsDrawerClosable>
            </div>
        </Flex>
        // </div>
    );
}

export default SearchBarSmall;
