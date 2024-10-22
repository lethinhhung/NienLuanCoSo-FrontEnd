import { Flex, Input } from 'antd';
import classNames from 'classnames/bind';

import TagsDrawerClosable from '../TagsDrawerClosable';
import styles from './SearchBar.module.scss';

function SearchBarSmall({ onSearch, onTagsChange }) {
    const cx = classNames.bind(styles);

    return (
        <Flex vertical className={cx('wrapper')} style={{ margin: '10px 80px 0 80px' }}>
            <div className={cx('search-input-wrapper')}>
                <Input
                    placeholder="Search for courses..."
                    className={cx('search-input')}
                    onChange={(e) => onSearch(e.target.value)}
                ></Input>
            </div>

            <div className={cx('tags-drawer-wrapper')}>
                <TagsDrawerClosable onTagsChange={onTagsChange}></TagsDrawerClosable>
            </div>
        </Flex>
    );
}

export default SearchBarSmall;
