import classNames from 'classnames/bind';
import { Card } from 'antd';

import styles from './CourseItem.module.scss';

function CourseItem() {
    const cx = classNames.bind(styles);
    return (
        <Card title="Card title" bordered={false} className={cx('wrapper')}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    );
}

export default CourseItem;
