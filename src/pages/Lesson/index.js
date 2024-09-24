import { Image, Avatar, Card, Flex, Divider, Progress, Select, Row, Col, Button, Input } from 'antd';
import classNames from 'classnames/bind';

import styles from './Lesson.module.scss';
import { useDebounce, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import LessonsList from '~/components/LessonsList';

function Lesson() {
    const cx = classNames.bind(styles);

    const { Meta } = Card;

    const { TextArea } = Input;

    const [loading, setLoading] = useState(true);

    const debounced = useDebounce(loading, 1000);

    useEffect(() => {
        setLoading(false);
    }, [debounced]);

    const { width } = useWindowDimensions();

    return <div>This is the lesson</div>;
}

export default Lesson;
