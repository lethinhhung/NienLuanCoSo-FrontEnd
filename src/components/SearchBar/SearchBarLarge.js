import { Input, Row, Col } from 'antd';
import classNames from 'classnames/bind';

import TagsDrawerClosable from '../TagsDrawerClosable';
import styles from './SearchBar.module.scss';

function SearchBarLarge({ onSearch, onTagsChange }) {
    const cx = classNames.bind(styles);

    return (
        <div style={{ marginTop: '10px' }}>
            <Row>
                <Col className={cx('search-input-wrapper')} offset={7} span={10}>
                    <Input
                        placeholder="Search for courses..."
                        className={cx('search-input')}
                        onChange={(e) => onSearch(e.target.value)}
                    ></Input>
                </Col>
            </Row>

            <Row>
                <Col className={cx('tags-drawer-wrapper')} offset={7} span={10}>
                    <TagsDrawerClosable onTagsChange={onTagsChange}></TagsDrawerClosable>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBarLarge;
