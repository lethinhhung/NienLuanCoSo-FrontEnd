import classNames from 'classnames/bind';
import { Tag, Flex } from 'antd';

import styles from './TagsDrawer.module.scss';

function TagsDrawer({ data = [{ key: 1, name: 'Default tag', color: '' }], isClickable = false, onTagClick }) {
    const cx = classNames.bind(styles);

    const handleClicked = (e) => {
        if (isClickable) {
            const tagName = e.currentTarget.innerText.toLowerCase();
            if (onTagClick) {
                onTagClick(tagName);
            }
        }
    };

    return (
        <Flex justify="flex-end" wrap gap="5px 0" className={cx('wrapper')}>
            {data.map((result) => (
                <Tag style={{ cursor: 'pointer' }} onClick={handleClicked} key={result.key} color={result.color}>
                    {result.name}
                </Tag>
            ))}
        </Flex>
    );
}

export default TagsDrawer;
