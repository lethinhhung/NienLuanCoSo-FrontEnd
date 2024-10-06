import classNames from 'classnames/bind';
import { Tag, Flex } from 'antd';
import { useEffect, useState } from 'react';

import styles from './TagsDrawer.module.scss';
import { getTagsInfoApi, getTagsInfoByIdsApi } from '~/utils/api';

function TagsDrawer({ tagsIds, isClickable = false, onTagClick, isDefault = true, data }) {
    const cx = classNames.bind(styles);

    const handleClicked = (e) => {
        if (isClickable) {
            const tagName = e.currentTarget.innerText.toLowerCase();
            if (onTagClick) {
                onTagClick(tagName);
            }
        }
    };

    const [options, setOptions] = useState([]);
    const [tagsInfo, setTagsInfo] = useState([]);

    useEffect(() => {
        if (isDefault) {
            setTagsInfo(data);
        } else {
            const fetchTagsInfo = async () => {
                const result = await getTagsInfoByIdsApi(tagsIds);
                setTagsInfo(result);
            };

            fetchTagsInfo();
        }
    }, [tagsIds]);

    return (
        <Flex justify="flex-end" wrap gap="5px 0" className={cx('wrapper')}>
            {tagsInfo.map((result) => (
                <Tag
                    style={{ cursor: 'pointer' }}
                    onClick={handleClicked}
                    key={result._id || result.key}
                    color={result.color}
                >
                    {result.name}
                </Tag>
            ))}
        </Flex>
    );
}

export default TagsDrawer;
