import { Card, Row, Col } from 'antd';
import classNames from 'classnames/bind';

import Line from '~/components/Charts/Line';
import { Chart, ArcElement } from 'chart.js';

import styles from './Dashboard.module.scss';
import Note from '~/components/DashBoard/Note';
import EventCalendar from '~/components/DashBoard/EventCalendar';
import TermGrades from '~/components/DashBoard/TermGrades';
import Statistics from '~/components/DashBoard/Statistics';
import GradeRange from '~/components/DashBoard/GradeRange';
import Current from '~/components/DashBoard/Current';
import IncompleteProject from '~/components/DashBoard/IncompleteProject';
import TestsGrade from '~/components/DashBoard/TestsGrade';

Chart.register(ArcElement);
function DashboardLarge() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('large-wrapper')}>
            <Row>
                <Col className={cx('large-col')} span={8}>
                    <div className={cx('large-card')}>
                        <Note type="user" />
                    </div>
                    <div className={cx('large-card')}>
                        <GradeRange />
                    </div>

                    <div className={cx('large-card')}>
                        <Statistics />
                    </div>
                </Col>
                <Col className={cx('large-col')} span={8}>
                    <div className={cx('large-card')}>
                        <TermGrades />
                    </div>
                    <div className={cx('large-card')}>
                        <TestsGrade />
                    </div>

                    <div className={cx('large-card')}>
                        <IncompleteProject />
                    </div>
                </Col>

                <Col className={cx('large-col')} span={8}>
                    <EventCalendar />
                    <div className={cx('large-card')}>
                        <Current />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default DashboardLarge;
