import classNames from 'classnames/bind';
import { Tag, Select } from 'antd';

import styles from './TagsDrawerClosable.module.scss';
import { useEffect, useState } from 'react';
import { getTagsInfoApi } from '~/utils/api';

function TagsDrawerClosable({ border = true, onTagsChange }) {
    const cx = classNames.bind(styles);

    const [options, setOptions] = useState([]);
    const [tagsInfo, setTagsInfo] = useState([]);
    const [selectClicked, setSelectClicked] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleSelectTags = (value) => {
        if (onTagsChange) {
            onTagsChange(value);
        }
    };

    const fetchTagsInfo = async () => {
        const data = await getTagsInfoApi();
        setTagsInfo(data);

        const newOptions = tagsInfo.map((tag) => ({
            id: tag._id,
            value: tag.name,
            color: tag.color,
        }));
        setOptions(newOptions);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchTagsInfo();
        // eslint-disable-next-line
    }, [selectClicked]);

    const tagRender = (props) => {
        const { value, closable, onClose } = props;
        let color = options.find((option) => option.value === value)?.color;

        if (color === '#ffffff') {
            color = '';
        }

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                    cursor: 'default',
                }}
            >
                {value}
            </Tag>
        );
    };

    return (
        <Select
            loading={loading}
            className={cx('tags-drawer')}
            placeholder="Tags"
            mode="multiple"
            tagRender={tagRender}
            defaultValue={[]}
            options={options}
            variant="border: none"
            onChange={handleSelectTags}
            onClick={() => setSelectClicked(true)}
        />
    );
}

export default TagsDrawerClosable;
