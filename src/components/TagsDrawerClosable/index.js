import classNames from 'classnames/bind';
import { Tag, Select } from 'antd';

import styles from './TagsDrawerClosable.module.scss';
import { useEffect, useState } from 'react';
import { getTagsInfoApi } from '~/utils/api';

function TagsDrawerClosable({ border = true }) {
    const cx = classNames.bind(styles);

    // const options = [
    //     {
    //         value: 'gold',
    //     },
    //     {
    //         value: 'lime',
    //     },
    //     {
    //         value: 'green',
    //     },
    //     {
    //         value: 'cyan',
    //     },
    // ];

    const [options, setOptions] = useState([]);
    const [tagsInfo, setTagsInfo] = useState([]);

    useEffect(() => {
        const fetchTagsInfo = async () => {
            const data = await getTagsInfoApi();
            setTagsInfo(data);

            const newOptions = tagsInfo.map((tag) => ({
                id: tag._id,
                value: tag.name,
                color: tag.color,
            }));
            setOptions(newOptions);
        };

        fetchTagsInfo();
    }, []);

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
                }}
            >
                {value}
            </Tag>
        );
    };

    const handleSelectTags = (dateString) => {
        console.log(dateString);
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
            onChange={handleSelectTags}
        />
    );
}

export default TagsDrawerClosable;
