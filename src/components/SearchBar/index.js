import { Flex, Input, Row, Col } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import SearchBarLarge from './SearchBarLarge';
import SearchBarSmall from './SearchBarSmall';
import { useWindowDimensions, useDebounce } from '~/hooks';
import TagsDrawerClosable from '../TagsDrawerClosable';
import styles from './SearchBar.module.scss';

function SearchBar(container) {
    const cx = classNames.bind(styles);
    const { width } = useWindowDimensions();

    const debounced = useDebounce(width, 500);

    const [searchBar, setSearchBar] = useState(<SearchBarLarge />);

    useEffect(() => {
        if (debounced >= 700) {
            setSearchBar(<SearchBarLarge />);
            console.log('large');
        } else {
            setSearchBar(<SearchBarSmall />);
            console.log('small');
        }
    }, [debounced]);

    return searchBar;

    // return (
    //     <div className="wrapper">
    //         <Row>
    //             <Col className={cx('search-input-wrapper')} offset={7} span={10}>
    //                 <Input placeholder="Search for courses..." className={cx('search-input')}></Input>
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Col className={cx('tags-drawer-wrapper')} offset={7} span={10}>
    //                 <TagsDrawerClosable></TagsDrawerClosable>
    //             </Col>
    //         </Row>
    //     </div>
    // );
}

export default SearchBar;
