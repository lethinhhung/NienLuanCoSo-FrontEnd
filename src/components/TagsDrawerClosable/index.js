import classNames from 'classnames/bind';
import { Tag, Flex, Select } from 'antd';

import styles from './TagsDrawerClosable.module.scss';

function TagsDrawerClosable(props) {
    const cx = classNames.bind(styles);

    const options = [
        {
            value: 'gold',
        },
        {
            value: 'lime',
        },
        {
            value: 'green',
        },
        {
            value: 'cyan',
        },
    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {label}
            </Tag>
        );
    };
    return (
        <Select
            className={cx('tags-drawer')}
            placeholder="Tags"
            mode="multiple"
            tagRender={tagRender}
            defaultValue={[]}
            options={options}
            variant="border: none"
        />
    );
}

export default TagsDrawerClosable;
