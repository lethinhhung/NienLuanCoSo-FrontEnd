import classNames from 'classnames/bind';
import { Tag, Flex } from 'antd';

import styles from './TagsDrawer.module.scss';
import defaultTagColor from '../DefaultTagColor';

function TagsDrawer({ data, isClickable = false, onTagClick }) {
    const cx = classNames.bind(styles);

    const handleClicked = (e) => {
        if (isClickable) {
            const tagName = e.currentTarget.innerText.toLowerCase();
            console.log(tagName);
            if (onTagClick) {
                onTagClick(tagName);
            }
        }
    };

    return (
        <Flex justify="flex-end" wrap gap="5px 0" className={cx('wrapper')}>
            {data.map((result) => (
                <Tag onClick={handleClicked} key={result.key} color={result.color}>
                    {result.name}
                </Tag>
            ))}
        </Flex>
    );
}

export default TagsDrawer;
